import { describe, expect, it } from "vitest";
import { InMemoryLifeHubRepository } from "../src/db/in-memory-repository.js";
import {
  buildDailyBriefing,
  getConflicts,
  getTodaySchedule,
  getUpcomingDeadlines,
  getWeekSchedule
} from "../src/tools/lifehub-tools.js";
import type {
  CalendarEvent,
  EmailItem,
  SchoolDeadline,
  SyncState
} from "../src/types/domain.js";

const baseNow = new Date("2026-05-23T12:00:00.000Z");

const events: CalendarEvent[] = [
  {
    id: "evt_1",
    source: "google_calendar",
    externalId: "gcal_evt_1",
    title: "Lab",
    startTime: "2026-05-23T13:00:00.000Z",
    endTime: "2026-05-23T14:00:00.000Z",
    isAllDay: false,
    lastSyncedAt: "2026-05-23T11:50:00.000Z"
  },
  {
    id: "evt_2",
    source: "outlook_calendar",
    externalId: "outlook_evt_1",
    title: "Standup",
    startTime: "2026-05-23T13:30:00.000Z",
    endTime: "2026-05-23T14:30:00.000Z",
    isAllDay: false,
    lastSyncedAt: "2026-05-23T11:45:00.000Z"
  }
];

const deadlines: SchoolDeadline[] = [
  {
    id: "ddl_1",
    source: "d2l",
    externalId: "d2l_1",
    courseName: "ECE318",
    title: "Lab Report",
    dueAt: "2026-05-23T23:59:00.000Z",
    lastSyncedAt: "2026-05-23T11:30:00.000Z"
  }
];

const emails: EmailItem[] = [
  {
    id: "mail_1",
    source: "outlook_mail",
    externalId: "mail_1",
    subject: "Deadline reminder",
    snippet: "Lab report due tonight",
    importance: "high",
    isRead: false,
    receivedAt: "2026-05-23T10:00:00.000Z",
    lastSyncedAt: "2026-05-23T11:35:00.000Z"
  }
];

const syncStates: SyncState[] = [
  {
    source: "google_calendar",
    lastSyncAt: "2026-05-23T11:50:00.000Z",
    syncStatus: "success",
    recordsSynced: 10,
    updatedAt: "2026-05-23T11:50:00.000Z"
  },
  {
    source: "d2l",
    lastSyncAt: "2026-05-23T06:00:00.000Z",
    syncStatus: "success",
    recordsSynced: 4,
    updatedAt: "2026-05-23T06:00:00.000Z"
  }
];

function makeRepo() {
  return new InMemoryLifeHubRepository({ events, deadlines, emails, syncStates });
}

describe("lifehub tools", () => {
  it("returns today's schedule with conflicts and stale sources", async () => {
    const result = await getTodaySchedule(makeRepo(), baseNow);

    expect(result.events).toHaveLength(2);
    expect(result.deadlines).toHaveLength(1);
    expect(result.conflicts).toHaveLength(1);
    expect(result.staleSources).toHaveLength(1);
    expect(result.staleSources[0]?.source).toBe("d2l");
  });

  it("returns week schedule", async () => {
    const result = await getWeekSchedule(makeRepo(), baseNow);

    expect(result.events).toHaveLength(2);
    expect(result.deadlines).toHaveLength(1);
    expect(result.conflicts).toHaveLength(1);
  });

  it("returns upcoming deadlines for the requested window", async () => {
    const result = await getUpcomingDeadlines(makeRepo(), 7, baseNow);

    expect(result.deadlines).toHaveLength(1);
    expect(result.daysAhead).toBe(7);
  });

  it("returns conflicts for explicit range", async () => {
    const result = await getConflicts(
      makeRepo(),
      "2026-05-23T00:00:00.000Z",
      "2026-05-23T23:59:59.999Z"
    );

    expect(result.conflicts).toHaveLength(1);
  });

  it("builds a daily briefing with notable emails", async () => {
    const result = await buildDailyBriefing(makeRepo(), baseNow);

    expect(result.notableEmails).toHaveLength(1);
    expect(result.schedule.events).toHaveLength(2);
    expect(result.topFocus).toBe("Lab Report");
  });
});
