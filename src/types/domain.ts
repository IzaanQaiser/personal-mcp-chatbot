export type DataSource =
  | "google_calendar"
  | "outlook_calendar"
  | "outlook_mail"
  | "d2l"
  | "files";

export type SyncStatus = "success" | "partial" | "failed" | "never_synced";

export type SourceReference = {
  source: string;
  sourceRecordId: string;
  title: string;
  timestamp: string;
  url?: string | null;
  lastSyncedAt?: string | null;
};

export type CalendarEvent = {
  id: string;
  source: string;
  externalId: string;
  calendarId?: string | null;
  title?: string | null;
  description?: string | null;
  location?: string | null;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  attendees?: unknown;
  url?: string | null;
  lastSyncedAt: string;
};

export type SchoolDeadline = {
  id: string;
  source: string;
  externalId?: string | null;
  courseId?: string | null;
  courseName?: string | null;
  title: string;
  description?: string | null;
  type?: string | null;
  dueAt?: string | null;
  url?: string | null;
  status?: string | null;
  lastSyncedAt: string;
};

export type EmailItem = {
  id: string;
  source: string;
  externalId: string;
  sender?: string | null;
  senderEmail?: string | null;
  subject?: string | null;
  snippet?: string | null;
  importance?: string | null;
  isRead?: boolean | null;
  receivedAt?: string | null;
  url?: string | null;
  lastSyncedAt: string;
};

export type SyncState = {
  source: string;
  lastSyncAt?: string | null;
  syncStatus: SyncStatus;
  recordsSynced: number;
  lastError?: string | null;
  updatedAt: string;
};

export type Conflict = {
  left: CalendarEvent;
  right: CalendarEvent;
};

export type TodaySchedule = {
  date: string;
  events: CalendarEvent[];
  deadlines: SchoolDeadline[];
  conflicts: Conflict[];
  staleSources: SyncState[];
  sourceReferences: SourceReference[];
};

export type WeekSchedule = {
  startDate: string;
  endDate: string;
  events: CalendarEvent[];
  deadlines: SchoolDeadline[];
  conflicts: Conflict[];
  sourceReferences: SourceReference[];
};

export type DailyBriefing = {
  generatedAt: string;
  schedule: TodaySchedule;
  notableEmails: EmailItem[];
  topFocus: string;
};
