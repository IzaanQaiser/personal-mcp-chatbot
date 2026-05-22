import { z } from "zod";
import type {
  CalendarEvent,
  Conflict,
  DailyBriefing,
  SourceReference,
  TodaySchedule,
  WeekSchedule
} from "../types/domain.js";
import type { LifeHubRepository } from "../db/repository.js";
import { dayRange, isoDate, nextDaysRange } from "./time.js";

function detectConflicts(events: CalendarEvent[]): Conflict[] {
  const sorted = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime));
  const conflicts: Conflict[] = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const left = sorted[index];

    for (let rightIndex = index + 1; rightIndex < sorted.length; rightIndex += 1) {
      const right = sorted[rightIndex];

      if (right.startTime >= left.endTime) {
        break;
      }

      if (right.startTime < left.endTime) {
        conflicts.push({ left, right });
      }
    }
  }

  return conflicts;
}

function refsFromEvents(events: CalendarEvent[]): SourceReference[] {
  return events.map((event) => ({
    source: event.source,
    sourceRecordId: event.externalId,
    title: event.title ?? "Untitled event",
    timestamp: event.startTime,
    url: event.url,
    lastSyncedAt: event.lastSyncedAt
  }));
}

function refsFromDeadlines(deadlines: { source: string; externalId?: string | null; title: string; dueAt?: string | null; url?: string | null; lastSyncedAt: string }[]): SourceReference[] {
  return deadlines.map((deadline) => ({
    source: deadline.source,
    sourceRecordId: deadline.externalId ?? deadline.title,
    title: deadline.title,
    timestamp: deadline.dueAt ?? deadline.lastSyncedAt,
    url: deadline.url,
    lastSyncedAt: deadline.lastSyncedAt
  }));
}

function dedupeReferences(references: SourceReference[]): SourceReference[] {
  const seen = new Set<string>();

  return references.filter((reference) => {
    const key = `${reference.source}:${reference.sourceRecordId}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function getTodaySchedule(
  repository: LifeHubRepository,
  now: Date = new Date()
): Promise<TodaySchedule> {
  const range = dayRange(now);
  const nowMs = now.getTime();
  const [events, deadlines, syncStates] = await Promise.all([
    repository.listCalendarEvents(range),
    repository.listSchoolDeadlines(range),
    repository.listSyncStates()
  ]);

  const conflicts = detectConflicts(events);
  const staleSources = syncStates.filter((state) => {
    if (!state.lastSyncAt) {
      return true;
    }

    const ageMinutes = (nowMs - Date.parse(state.lastSyncAt)) / (1000 * 60);
    if (state.source.includes("calendar") || state.source.includes("mail")) {
      return ageMinutes > 60;
    }

    if (state.source === "d2l") {
      return ageMinutes > 180;
    }

    return ageMinutes > 120;
  });

  return {
    date: isoDate(now),
    events,
    deadlines,
    conflicts,
    staleSources,
    sourceReferences: dedupeReferences([
      ...refsFromEvents(events),
      ...refsFromDeadlines(deadlines)
    ])
  };
}

export async function getWeekSchedule(
  repository: LifeHubRepository,
  now: Date = new Date()
): Promise<WeekSchedule> {
  const range = nextDaysRange(7, now);
  const [events, deadlines] = await Promise.all([
    repository.listCalendarEvents(range),
    repository.listSchoolDeadlines(range)
  ]);

  const conflicts = detectConflicts(events);

  return {
    startDate: range.start,
    endDate: range.end,
    events,
    deadlines,
    conflicts,
    sourceReferences: dedupeReferences([
      ...refsFromEvents(events),
      ...refsFromDeadlines(deadlines)
    ])
  };
}

export async function getUpcomingDeadlines(
  repository: LifeHubRepository,
  daysAhead: number,
  now: Date = new Date()
) {
  const range = nextDaysRange(daysAhead, now);
  const deadlines = await repository.listSchoolDeadlines(range);

  return {
    daysAhead,
    deadlines,
    sourceReferences: refsFromDeadlines(deadlines)
  };
}

export async function getConflicts(
  repository: LifeHubRepository,
  startDate: string,
  endDate: string
) {
  const events = await repository.listCalendarEvents({ start: startDate, end: endDate });
  const conflicts = detectConflicts(events);

  return {
    startDate,
    endDate,
    conflicts,
    sourceReferences: dedupeReferences(refsFromEvents(events))
  };
}

export async function buildDailyBriefing(
  repository: LifeHubRepository,
  now: Date = new Date()
): Promise<DailyBriefing> {
  const schedule = await getTodaySchedule(repository, now);
  const emailRange = nextDaysRange(2, new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const emails = await repository.listEmailItems(emailRange);
  const notableEmails = emails.filter(
    (email) => email.isRead === false || (email.importance ?? "").toLowerCase() === "high"
  );

  const topFocus =
    schedule.deadlines[0]?.title ??
    schedule.events[0]?.title ??
    "No urgent items detected from current synced data.";

  return {
    generatedAt: new Date().toISOString(),
    schedule,
    notableEmails,
    topFocus
  };
}

export const upcomingDeadlinesInputSchema = {
  daysAhead: z.number().int().min(1).max(30)
};

export const searchCalendarEventsInputSchema = {
  query: z.string().min(1),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
};

export const searchEmailInputSchema = {
  query: z.string().min(1),
  daysBack: z.number().int().min(1).max(30).optional()
};

export const getConflictsInputSchema = {
  startDate: z.string().datetime(),
  endDate: z.string().datetime()
};
