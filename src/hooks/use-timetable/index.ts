import { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { TimetableData, TimetableOptions } from "../../types";

export type UseTimetable = {
  data: TimetableData[];
  options?: TimetableOptions;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const useTimetable = (args: UseTimetable) => {
  const timetableData = useMemo(() => {
    return args.data;
  }, [args.data]);

  const defaultOptions = {
    limitMinHour: true,
    limitMaxHour: true,
    ...(args.options || {}),
  };

  const hours = useMemo(() => {
    const _hours: string[] = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const date = new Date();
        date.setHours(hour, minute);
        _hours.push(dayjs(date).format("HH:mm"));
      }
    }

    return _hours;
  }, []);

  const minHour = useMemo(() => {
    return Math.min(
      ...timetableData.map((s) => {
        return Number(s.startHour.split(":")[0]);
      })
    );
  }, [timetableData]);

  const maxHour = useMemo(() => {
    return Math.max(
      ...timetableData.map((s) => {
        return Number(s.endHour.split(":")[0]);
      })
    );
  }, [timetableData]);

  const withMinHour = useCallback(
    (hours: string[]) => {
      const _hours: string[] = [];

      hours.forEach((hour) => {
        if (Number(hour.split(":")[0]) >= minHour) {
          _hours.push(hour);
        }
      });

      if (defaultOptions.limitMinHour) {
        return _hours;
      }
      return hours;
    },
    [defaultOptions.limitMinHour, minHour]
  );

  const withMaxHour = useCallback(
    (hours: string[]) => {
      const _hours: string[] = [];

      hours.forEach((hour) => {
        if (Number(hour.split(":")[0]) <= maxHour) {
          _hours.push(hour);
        }
      });
      if (defaultOptions.limitMaxHour) {
        return _hours;
      }
      return hours;
    },
    [defaultOptions.limitMaxHour, maxHour]
  );

  const fixedHours = useMemo(() => {
    return withMinHour(withMaxHour(hours));
  }, [hours, withMaxHour, withMinHour]);

  return { days, hours: fixedHours, timetableData };
};
