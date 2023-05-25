interface CategoryTitle {
  title: string;
}

function CategoryTitle({ title }: CategoryTitle) {
  return (
    <div className="relative pl-2 inline-block text-base font-black text-white before:contents-[''] before:w-1 before:h-4 before:bg-[#2F88FF] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%]">
      {title}
    </div>
  );
}

export default CategoryTitle;
