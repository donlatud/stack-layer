import { Trash2 } from "lucide-react";
import BlackButton from "../common/BlackButton";
import { Button } from "../ui/button";

export interface ArticleFormHeaderButtonsProps {
  isEditMode: boolean;
  isLoading: boolean;
  onSaveAsDraft: () => void;
  onSaveAndPublish: () => void;
}

export function ArticleFormHeaderButtons({
  isEditMode,
  isLoading,
  onSaveAsDraft,
  onSaveAndPublish,
}: ArticleFormHeaderButtonsProps) {
  return (
    <div className="flex items-center gap-[12px]">
      <Button
        type="button"
        variant="outline"
        className="h-[44px] w-[187px] px-[24px] rounded-[999px] border border-gray-300 bg-white text-brown-600 hover:bg-gray-50 disabled:opacity-50"
        onClick={onSaveAsDraft}
        disabled={isLoading}
      >
        Save as draft
      </Button>
      <BlackButton
        type="button"
        className="h-[44px] w-[210px] px-[24px] disabled:opacity-50"
        onClick={onSaveAndPublish}
        disabled={isLoading}
      >
        {isEditMode ? "Save" : "Save and publish"}
      </BlackButton>
    </div>
  );
}

export interface ArticleFormDeleteButtonProps {
  onDelete: () => void;
}

export function ArticleFormDeleteButton({ onDelete }: ArticleFormDeleteButtonProps) {
  return (
    <section className="pt-[24px] border-t border-gray-200">
      <button
        type="button"
        onClick={onDelete}
        className="flex items-center gap-[8px] text-body-1 text-brand-red hover:text-red-700 transition-colors"
      >
        <Trash2 className="w-[18px] h-[18px]" />
        Delete article
      </button>
    </section>
  );
}
