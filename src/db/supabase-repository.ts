import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CalendarEvent,
  EmailItem,
  SchoolDeadline,
  SyncState
} from "../types/domain.js";
import type {
  CalendarSearchInput,
  DateRange,
  EmailSearchInput,
  LifeHubRepository
} from "./repository.js";

function mapCalendarEvent(row: Record<string, unknown>): CalendarEvent {
  return {
    id: String(row.id),
    source: String(row.source),
    externalId: String(row.external_id),
    calendarId: (row.calendar_id as string | null) ?? null,
    title: (row.title as string | null) ?? null,
    description: (row.description as string | null) ?? null,
    location: (row.location as string | null) ?? null,
    startTime: String(row.start_time),
    endTime: String(row.end_time),
    isAllDay: Boolean(row.is_all_day),
    attendees: row.attendees_json,
    url: (row.url as string | null) ?? null,
    lastSyncedAt: String(row.last_synced_at)
  };
}

function mapDeadline(row: Record<string, unknown>): SchoolDeadline {
  return {
    id: String(row.id),
    source: String(row.source),
    externalId: (row.external_id as string | null) ?? null,
    courseId: (row.course_id as string | null) ?? null,
    courseName: (row.course_name as string | null) ?? null,
    title: String(row.title),
    description: (row.description as string | null) ?? null,
    type: (row.type as string | null) ?? null,
    dueAt: (row.due_at as string | null) ?? null,
    url: (row.url as string | null) ?? null,
    status: (row.status as string | null) ?? null,
    lastSyncedAt: String(row.last_synced_at)
  };
}

function mapEmail(row: Record<string, unknown>): EmailItem {
  return {
    id: String(row.id),
    source: String(row.source),
    externalId: String(row.external_id),
    sender: (row.sender as string | null) ?? null,
    senderEmail: (row.sender_email as string | null) ?? null,
    subject: (row.subject as string | null) ?? null,
    snippet: (row.snippet as string | null) ?? null,
    importance: (row.importance as string | null) ?? null,
    isRead: (row.is_read as boolean | null) ?? null,
    receivedAt: (row.received_at as string | null) ?? null,
    url: (row.url as string | null) ?? null,
    lastSyncedAt: String(row.last_synced_at)
  };
}

function mapSyncState(row: Record<string, unknown>): SyncState {
  return {
    source: String(row.source),
    lastSyncAt: (row.last_sync_at as string | null) ?? null,
    syncStatus: (row.sync_status as SyncState["syncStatus"]) ?? "never_synced",
    recordsSynced: Number(row.records_synced ?? 0),
    lastError: (row.error_message as string | null) ?? null,
    updatedAt: String(row.updated_at)
  };
}

export class SupabaseLifeHubRepository implements LifeHubRepository {
  constructor(private readonly client: SupabaseClient) {}

  async listCalendarEvents(range: DateRange): Promise<CalendarEvent[]> {
    const { data, error } = await this.client
      .from("calendar_events")
      .select("*")
      .lte("start_time", range.end)
      .gte("end_time", range.start)
      .order("start_time", { ascending: true });

    if (error) {
      throw new Error(`calendar_events query failed: ${error.message}`);
    }

    return (data ?? []).map((row) => mapCalendarEvent(row));
  }

  async listSchoolDeadlines(range: DateRange): Promise<SchoolDeadline[]> {
    const { data, error } = await this.client
      .from("school_deadlines")
      .select("*")
      .gte("due_at", range.start)
      .lte("due_at", range.end)
      .order("due_at", { ascending: true });

    if (error) {
      throw new Error(`school_deadlines query failed: ${error.message}`);
    }

    return (data ?? []).map((row) => mapDeadline(row));
  }

  async listEmailItems(range: DateRange): Promise<EmailItem[]> {
    const { data, error } = await this.client
      .from("email_items")
      .select("*")
      .gte("received_at", range.start)
      .lte("received_at", range.end)
      .order("received_at", { ascending: false });

    if (error) {
      throw new Error(`email_items query failed: ${error.message}`);
    }

    return (data ?? []).map((row) => mapEmail(row));
  }

  async searchCalendarEvents(input: CalendarSearchInput): Promise<CalendarEvent[]> {
    const safeQuery = input.query.trim();
    const query = this.client
      .from("calendar_events")
      .select("*")
      .or(
        `title.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%,location.ilike.%${safeQuery}%`
      )
      .order("start_time", { ascending: true });

    if (input.startDate) {
      query.gte("start_time", input.startDate);
    }

    if (input.endDate) {
      query.lte("start_time", input.endDate);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`calendar search failed: ${error.message}`);
    }

    return (data ?? []).map((row) => mapCalendarEvent(row));
  }

  async searchSchoolItems(queryText: string): Promise<SchoolDeadline[]> {
    const safeQuery = queryText.trim();
    const { data, error } = await this.client
      .from("school_deadlines")
      .select("*")
      .or(
        `title.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%,course_name.ilike.%${safeQuery}%`
      )
      .order("due_at", { ascending: true });

    if (error) {
      throw new Error(`school search failed: ${error.message}`);
    }

    return (data ?? []).map((row) => mapDeadline(row));
  }

  async searchEmailItems(input: EmailSearchInput): Promise<EmailItem[]> {
    const safeQuery = input.query.trim();
    const daysBack = Math.max(input.daysBack ?? 7, 1);
    const lowerBound = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await this.client
      .from("email_items")
      .select("*")
      .gte("received_at", lowerBound)
      .or(
        `subject.ilike.%${safeQuery}%,snippet.ilike.%${safeQuery}%,sender.ilike.%${safeQuery}%`
      )
      .order("received_at", { ascending: false });

    if (error) {
      throw new Error(`email search failed: ${error.message}`);
    }

    return (data ?? []).map((row) => mapEmail(row));
  }

  async listSyncStates(): Promise<SyncState[]> {
    const { data, error } = await this.client
      .from("sync_state")
      .select("*")
      .order("source", { ascending: true });

    if (error) {
      throw new Error(`sync_state query failed: ${error.message}`);
    }

    return (data ?? []).map((row) => mapSyncState(row));
  }
}
