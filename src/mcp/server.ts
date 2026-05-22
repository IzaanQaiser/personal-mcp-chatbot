import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createSupabaseServiceClient } from "../db/client.js";
import { SupabaseLifeHubRepository } from "../db/supabase-repository.js";
import {
  buildDailyBriefing,
  getConflicts,
  getConflictsInputSchema,
  getTodaySchedule,
  getUpcomingDeadlines,
  getWeekSchedule,
  searchCalendarEventsInputSchema,
  searchEmailInputSchema,
  upcomingDeadlinesInputSchema
} from "../tools/lifehub-tools.js";

function formatResult(payload: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(payload, null, 2)
      }
    ]
  };
}

function createServer() {
  const mcp = new McpServer({
    name: "life-mcp-hub",
    version: "0.1.0"
  });

  const repository = new SupabaseLifeHubRepository(createSupabaseServiceClient());

  mcp.registerTool(
    "get_today_schedule",
    {
      description: "Return today's schedule, deadlines, conflicts, and stale source warnings."
    },
    async () => formatResult(await getTodaySchedule(repository))
  );

  mcp.registerTool(
    "get_week_schedule",
    {
      description: "Return the next 7 days of events, deadlines, and conflicts."
    },
    async () => formatResult(await getWeekSchedule(repository))
  );

  mcp.registerTool(
    "get_upcoming_deadlines",
    {
      description: "Return upcoming deadlines for the requested number of days ahead.",
      inputSchema: upcomingDeadlinesInputSchema
    },
    async ({ daysAhead }) => formatResult(await getUpcomingDeadlines(repository, daysAhead))
  );

  mcp.registerTool(
    "search_calendar_events",
    {
      description: "Search calendar events by text and optional date range.",
      inputSchema: searchCalendarEventsInputSchema
    },
    async (input) => {
      const events = await repository.searchCalendarEvents(input);
      return formatResult({
        events,
        sourceReferences: events.map((event) => ({
          source: event.source,
          sourceRecordId: event.externalId,
          title: event.title ?? "Untitled event",
          timestamp: event.startTime,
          url: event.url,
          lastSyncedAt: event.lastSyncedAt
        }))
      });
    }
  );

  mcp.registerTool(
    "search_school_items",
    {
      description: "Search school items/deadlines by text.",
      inputSchema: {
        query: searchCalendarEventsInputSchema.query
      }
    },
    async ({ query }) => {
      const deadlines = await repository.searchSchoolItems(query);
      return formatResult({
        deadlines,
        sourceReferences: deadlines.map((item) => ({
          source: item.source,
          sourceRecordId: item.externalId ?? item.title,
          title: item.title,
          timestamp: item.dueAt ?? item.lastSyncedAt,
          url: item.url,
          lastSyncedAt: item.lastSyncedAt
        }))
      });
    }
  );

  mcp.registerTool(
    "search_email_items",
    {
      description: "Search recent emails by subject/snippet/sender.",
      inputSchema: searchEmailInputSchema
    },
    async (input) => {
      const emails = await repository.searchEmailItems(input);
      return formatResult({
        emails,
        sourceReferences: emails.map((email) => ({
          source: email.source,
          sourceRecordId: email.externalId,
          title: email.subject ?? "Untitled email",
          timestamp: email.receivedAt ?? email.lastSyncedAt,
          url: email.url,
          lastSyncedAt: email.lastSyncedAt
        }))
      });
    }
  );

  mcp.registerTool(
    "get_conflicts",
    {
      description: "Return overlapping events between two timestamps.",
      inputSchema: getConflictsInputSchema
    },
    async ({ startDate, endDate }) =>
      formatResult(await getConflicts(repository, startDate, endDate))
  );

  mcp.registerTool(
    "daily_briefing",
    {
      description:
        "Return a concise daily briefing with schedule, deadlines, conflicts, notable emails, and stale source warnings."
    },
    async () => formatResult(await buildDailyBriefing(repository))
  );

  mcp.registerTool(
    "sync_all_sources",
    {
      description:
        "Phase 1 placeholder. Returns acknowledgement; source connectors are implemented in later phases."
    },
    async () =>
      formatResult({
        status: "not_implemented_in_phase_1",
        message: "Use connector-specific sync commands once connector phases are implemented."
      })
  );

  return mcp;
}

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main().catch((error: unknown) => {
  console.error("MCP server startup failed", error);
  process.exit(1);
});
