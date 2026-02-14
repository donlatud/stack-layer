interface CommentInputProps {
  disabled?: boolean;
  onRequireLogin?: () => void;
  /** โหมดสมาชิก: controlled input + ส่ง comment ผ่าน onSend */
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (text: string) => void;
  isSending?: boolean;
}

/**
 * ช่องเขียนคอมเมนต์ + ปุ่ม Send
 * disabled และมี onRequireLogin: คลิก/โฟกัสจะเรียก onRequireLogin (เพื่อแสดง LoginRequired)
 * มี onSend: ใช้ value/onChange และกด Send จะเรียก onSend(text)
 */
const CommentInput = ({
  disabled = false,
  onRequireLogin,
  value = "",
  onChange,
  onSend,
  isSending = false,
}: CommentInputProps) => {
  const handleSend = () => {
    if (disabled) {
      onRequireLogin?.();
      return;
    }
    if (onSend && value.trim()) {
      onSend(value.trim());
    }
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-col gap-[4px]">
        <h2 className="text-body-1 text-brown-400">Comment</h2>
        <textarea
          placeholder="What are your thoughts?"
          readOnly={disabled}
          value={onChange != null ? value : undefined}
          onChange={onChange != null ? (e) => onChange(e.target.value) : undefined}
          onClick={() => {
            if (disabled) onRequireLogin?.();
          }}
          onFocus={(e) => {
            if (!disabled) return;
            e.currentTarget.blur();
            onRequireLogin?.();
          }}
          className="w-full min-h-[102px] px-[16px] py-[12px] border border-brown-300 rounded-[8px] bg-white text-body-1 text-brown-600 placeholder-brown-400 placeholder:text-body-1 resize-none focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
        />
      </div>
      <button
        type="button"
        onClick={handleSend}
        disabled={isSending}
        className="self-start md:self-end h-[48px] px-[40px] py-[12px] bg-brown-600 text-white text-body-1 rounded-[999px] hover:opacity-90 transition-colors disabled:opacity-60"
      >
        {isSending ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default CommentInput;
