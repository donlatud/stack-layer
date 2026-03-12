import { useMemo } from "react";

/**
 * Hook สำหรับกรอง list ฝั่ง client (search + filters)
 * ใช้ useMemo เพื่อหลีกเลี่ยงการคำนวณซ้ำ
 * ฝั่ง caller ควร wrap filterFn ด้วย useCallback เพื่อความ stable
 */
export function useFilteredList<T>(
  list: T[],
  filterFn: (item: T) => boolean
): T[] {
  return useMemo(() => list.filter(filterFn), [list, filterFn]);
}
