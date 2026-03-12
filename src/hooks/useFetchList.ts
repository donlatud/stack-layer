import { useState, useCallback, useEffect, useRef } from "react";

export interface UseFetchListReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook สำหรับโหลด list จาก API (articles, categories ฯลฯ)
 * คืนค่า data, isLoading, error และ refetch
 * การค้นหา/กรอง (searchQuery, filters) ให้ page จัดการเองแล้วใช้ data ที่ได้จาก hook
 */
export interface UseFetchListOptions {
  autoLoad?: boolean;
  /** ข้อความ error เมื่อโหลดไม่สำเร็จ (default "Failed to load data.") */
  errorMessage?: string;
}

export function useFetchList<T>(
  fetchFn: () => Promise<T[]>,
  options: UseFetchListOptions = {}
): UseFetchListReturn<T> {
  const { autoLoad = true, errorMessage = "Failed to load data." } = options;
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFnRef.current();
      setData(result);
    } catch (err) {
      console.error("Error loading list:", err);
      setError(errorMessage);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (autoLoad) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad]);

  return { data, isLoading, error, refetch };
}
