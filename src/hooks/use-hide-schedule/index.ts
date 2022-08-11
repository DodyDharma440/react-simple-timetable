import { useCallback, useState } from "react";

export const useHideSchedule = () => {
  const [hidedSchedule, setHidedSchedule] = useState<number[]>([]);

  const handleHide = useCallback((id: number) => {
    setHidedSchedule((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      } else {
        return prev;
      }
    });
  }, []);

  const handleShowAll = useCallback(() => {
    setHidedSchedule([]);
  }, []);

  const handleShow = useCallback((id: number) => {
    setHidedSchedule((prev) => {
      const index = prev.findIndex((s) => s === id);
      prev.splice(index, 1);
      return [...prev];
    });
  }, []);

  return {
    hidedSchedule,
    onShowSchedule: handleShow,
    onShowAllSchedule: handleShowAll,
    onHideSchedule: handleHide,
  };
};
