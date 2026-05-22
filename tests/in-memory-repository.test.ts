import { describe, expect, it } from "vitest";
import { InMemoryLifeHubRepository } from "../src/db/in-memory-repository.js";

describe("in-memory repository", () => {
  it("filters calendar by overlapping range", async () => {
    const repository = new InMemoryLifeHubRepository({
      events: [
        {
          id: "evt_1",
          source: "google_calendar",
          externalId: "external_1",
          title: "Event A",
          startTime: "2026-05-23T10:00:00.000Z",
          endTime: "2026-05-23T11:00:00.000Z",
          isAllDay: false,
          lastSyncedAt: "2026-05-23T09:00:00.000Z"
        },
        {
          id: "evt_2",
          source: "google_calendar",
          externalId: "external_2",
          title: "Event B",
          startTime: "2026-05-24T10:00:00.000Z",
          endTime: "2026-05-24T11:00:00.000Z",
          isAllDay: false,
          lastSyncedAt: "2026-05-23T09:00:00.000Z"
        }
      ]
    });

    const events = await repository.listCalendarEvents({
      start: "2026-05-23T00:00:00.000Z",
      end: "2026-05-23T23:59:59.999Z"
    });

    expect(events).toHaveLength(1);
    expect(events[0]?.title).toBe("Event A");
  });

  it("searches email items by text and daysBack", async () => {
    const repository = new InMemoryLifeHubRepository({
      emails: [
        {
          id: "mail_1",
          source: "outlook_mail",
          externalId: "mail_1",
          subject: "Important notice",
          snippet: "Assignment due",
          receivedAt: new Date().toISOString(),
          lastSyncedAt: new Date().toISOString()
        }
      ]
    });

    const emails = await repository.searchEmailItems({
      query: "assignment",
      daysBack: 2
    });

    expect(emails).toHaveLength(1);
  });
});
