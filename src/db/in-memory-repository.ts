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

type SeedState = {
  events?: CalendarEvent[];
  deadlines?: SchoolDeadline[];
  emails?: EmailItem[];
  syncStates?: SyncState[];
};

function overlaps(event: CalendarEvent, range: DateRange): boolean {
  return event.startTime <= range.end && event.endTime >= range.start;
}

export class InMemoryLifeHubRepository implements LifeHubRepository {
  private readonly events: CalendarEvent[];
  private readonly deadlines: SchoolDeadline[];
  private readonly emails: EmailItem[];
  private readonly syncStates: SyncState[];

  constructor(seed: SeedState = {}) {
    this.events = seed.events ?? [];
    this.deadlines = seed.deadlines ?? [];
    this.emails = seed.emails ?? [];
    this.syncStates = seed.syncStates ?? [];
  }

  async listCalendarEvents(range: DateRange): Promise<CalendarEvent[]> {
    return this.events
      .filter((event) => overlaps(event, range))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  async listSchoolDeadlines(range: DateRange): Promise<SchoolDeadline[]> {
    return this.deadlines
      .filter((deadline) => {
        if (!deadline.dueAt) {
          return false;
        }

        return deadline.dueAt >= range.start && deadline.dueAt <= range.end;
      })
      .sort((a, b) => (a.dueAt ?? "").localeCompare(b.dueAt ?? ""));
  }

  async listEmailItems(range: DateRange): Promise<EmailItem[]> {
    return this.emails
      .filter((email) => {
        if (!email.receivedAt) {
          return false;
        }

        return email.receivedAt >= range.start && email.receivedAt <= range.end;
      })
      .sort((a, b) => (b.receivedAt ?? "").localeCompare(a.receivedAt ?? ""));
  }

  async searchCalendarEvents(input: CalendarSearchInput): Promise<CalendarEvent[]> {
    const query = input.query.toLowerCase();

    return this.events.filter((event) => {
      const haystack = [event.title, event.description, event.location]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }

      if (input.startDate && event.startTime < input.startDate) {
        return false;
      }

      if (input.endDate && event.startTime > input.endDate) {
        return false;
      }

      return true;
    });
  }

  async searchSchoolItems(queryText: string): Promise<SchoolDeadline[]> {
    const query = queryText.toLowerCase();

    return this.deadlines.filter((deadline) => {
      const haystack = [deadline.title, deadline.description, deadline.courseName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }

  async searchEmailItems(input: EmailSearchInput): Promise<EmailItem[]> {
    const query = input.query.toLowerCase();
    const daysBack = Math.max(input.daysBack ?? 7, 1);
    const lowerBound = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString();

    return this.emails.filter((email) => {
      if (!email.receivedAt || email.receivedAt < lowerBound) {
        return false;
      }

      const haystack = [email.subject, email.snippet, email.sender]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }

  async listSyncStates(): Promise<SyncState[]> {
    return [...this.syncStates];
  }
}
