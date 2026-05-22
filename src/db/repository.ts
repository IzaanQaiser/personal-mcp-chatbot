import type {
  CalendarEvent,
  EmailItem,
  SchoolDeadline,
  SyncState
} from "../types/domain.js";

export type DateRange = {
  start: string;
  end: string;
};

export type CalendarSearchInput = {
  query: string;
  startDate?: string;
  endDate?: string;
};

export type EmailSearchInput = {
  query: string;
  daysBack?: number;
};

export interface LifeHubRepository {
  listCalendarEvents(range: DateRange): Promise<CalendarEvent[]>;
  listSchoolDeadlines(range: DateRange): Promise<SchoolDeadline[]>;
  listEmailItems(range: DateRange): Promise<EmailItem[]>;
  searchCalendarEvents(input: CalendarSearchInput): Promise<CalendarEvent[]>;
  searchSchoolItems(query: string): Promise<SchoolDeadline[]>;
  searchEmailItems(input: EmailSearchInput): Promise<EmailItem[]>;
  listSyncStates(): Promise<SyncState[]>;
}
