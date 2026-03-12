import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";

export interface ArticleThumbnailFieldProps {
  thumbnailPreview: string;
  onThumbnailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveThumbnail: () => void;
}

export function ArticleThumbnailField({
  thumbnailPreview,
  onThumbnailUpload,
  onRemoveThumbnail,
}: ArticleThumbnailFieldProps) {
  return (
    <section className="mb-[32px]">
      <label htmlFor="thumbnail-image" className="block text-body-2 text-brown-600 mb-[12px]">
        Thumbnail image
      </label>
      <div className="flex items-end gap-[24px]">
        <div className="relative w-[300px] h-[300px] shrink-0 bg-gray-100 rounded-[8px] border border-gray-300 overflow-hidden flex items-center justify-center">
          {thumbnailPreview ? (
            <>
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={onRemoveThumbnail}
                className="absolute top-[8px] right-[8px] w-[24px] h-[24px] bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Remove thumbnail"
              >
                <X className="w-[14px] h-[14px]" />
              </button>
            </>
          ) : (
            <Upload className="w-[32px] h-[32px] text-gray-400" />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <input
            id="thumbnail-image"
            type="file"
            accept="image/*"
            onChange={onThumbnailUpload}
            className="hidden"
          />
          <label htmlFor="thumbnail-image">
            <Button
              type="button"
              variant="outline"
              className="h-[44px] px-[24px] rounded-[8px] border border-gray-300 bg-white text-brown-600 hover:bg-gray-50 cursor-pointer"
              asChild
            >
              <span>Upload thumbnail image</span>
            </Button>
          </label>
        </div>
      </div>
    </section>
  );
}
