import React from "react";

export interface TimetableData {
  id: number;
  day: number;
  startHour: string;
  endHour: string;
  name: string;
  actions?: () => React.ReactNode;
  diff?: number;
}

export type TimetableOptions = {
  limitMinHour?: boolean;
  limitMaxHour?: boolean;
};
