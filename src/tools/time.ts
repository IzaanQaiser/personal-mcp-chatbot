import type { DateRange } from "../db/repository.js";

export function dayRange(base: Date = new Date()): DateRange {
  const start = new Date(base);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  end.setMilliseconds(end.getMilliseconds() - 1);

  return {
    start: start.toISOString(),
    end: end.toISOString()
  };
}

export function nextDaysRange(days: number, base: Date = new Date()): DateRange {
  const normalizedDays = Math.max(days, 1);
  const start = new Date(base);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + normalizedDays);
  end.setMilliseconds(end.getMilliseconds() - 1);

  return {
    start: start.toISOString(),
    end: end.toISOString()
  };
}

export function isoDate(base: Date = new Date()): string {
  return base.toISOString().slice(0, 10);
}
