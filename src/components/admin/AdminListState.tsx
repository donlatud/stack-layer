import { MESSAGE_LOADING } from "../../constants/messages";

/**
 * สถานะต่างๆ ของ Admin list (Loading, Error, Empty)
 * ใช้ร่วมกันใน AdminArticlePage, AdminCategoryPage
 */

export type AdminListStateVariant = "table" | "list";

const STATE_CLASSES: Record<
  AdminListStateVariant,
  { loading: string; error: string; empty: string }
> = {
  table: {
    loading: "px-[24px] py-[60px] text-center text-body-1 text-brown-400",
    error: "px-[24px] py-[60px] text-center text-body-1 text-brand-red",
    empty: "px-[24px] py-[20px] text-body-1 text-brown-400",
  },
  list: {
    loading: "px-[24px] py-[32px] text-body-1 text-gray-500",
    error: "px-[24px] py-[32px] text-body-1 text-brand-red",
    empty: "px-[24px] py-[32px] text-body-1 text-gray-500",
  },
};

export interface LoadingStateProps {
  variant?: AdminListStateVariant;
  message?: string;
}

export function LoadingState({
  variant = "table",
  message = MESSAGE_LOADING,
}: LoadingStateProps) {
  return (
    <div className={STATE_CLASSES[variant].loading} role="status">
      {message}
    </div>
  );
}

export interface ErrorStateProps {
  message: string;
  variant?: AdminListStateVariant;
}

export function ErrorState({
  message,
  variant = "table",
}: ErrorStateProps) {
  return (
    <div className={STATE_CLASSES[variant].error} role="alert">
      {message}
    </div>
  );
}

export interface EmptyStateProps {
  message: string;
  variant?: AdminListStateVariant;
}

export function EmptyState({
  message,
  variant = "table",
}: EmptyStateProps) {
  return <div className={STATE_CLASSES[variant].empty}>{message}</div>;
}

/** Empty state สำหรับ table (render เป็น tr > td) */
export interface TableEmptyRowProps {
  message: string;
  colSpan: number;
}

export function TableEmptyRow({ message, colSpan }: TableEmptyRowProps) {
  return (
    <tr>
      <td
        className="px-[24px] py-[20px] text-body-1 text-brown-400"
        colSpan={colSpan}
      >
        {message}
      </td>
    </tr>
  );
}

/** Empty state สำหรับ list (render เป็น li) */
export interface ListEmptyItemProps {
  message: string;
}

export function ListEmptyItem({ message }: ListEmptyItemProps) {
  return (
    <li className="px-[24px] py-[32px] text-body-1 text-gray-500">{message}</li>
  );
}
