interface CommentItemProps {
  avatar: string;
  name: string;
  date: string;
  content: string;
  canDelete?: boolean;
  onDelete?: () => void;
}

/** รายการคอมเมนต์หนึ่งรายการ: รูป, ชื่อ, วันที่, เนื้อหา, ปุ่มลบ (ถ้า canDelete) */
const CommentItem = ({
  avatar,
  name,
  date,
  content,
  canDelete = false,
  onDelete,
}: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex gap-[16px]">
        <img
          src={avatar}
          alt={name}
          className="w-[44px] h-[44px] rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col gap-[4px] flex-1">
          <span className="text-headline-4 text-brown-500">{name}</span>
          <span className="text-body-3 text-brown-400">{date}</span>
        </div>
        {canDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-body-3 text-brand-red hover:text-red-700 self-start"
          >
            Delete
          </button>
        )}
      </div>
      <div>
        <p className="text-body-1 text-brown-400">{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
