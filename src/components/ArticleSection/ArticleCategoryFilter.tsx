import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ArticleCategoryFilter = () => {
  return (
    <div className="flex flex-col gap-1 rounded-[8px] lg:hidden">
      <label className="text-body-1 text-brown-400 ">Category</label>
      <Select defaultValue="highlight">
        <SelectTrigger className="w-full border-brown-300 bg-white text-brown-400 focus:ring-brown-400 cursor-pointer transition-all duration-200 hover:border-brown-400 hover:bg-brown-50 active:scale-[0.98]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="highlight">Highlight</SelectItem>
          <SelectItem value="cat">Cat</SelectItem>
          <SelectItem value="inspiration">Inspiration</SelectItem>
          <SelectItem value="research">Research</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArticleCategoryFilter;

