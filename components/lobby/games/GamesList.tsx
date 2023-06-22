import { cn } from "@/lib/utils";

type GamesListProps = {
  className?: string;
  children: React.ReactNode;
};

export const GamesListWrapper = ({ className, children }: GamesListProps) => {
  const listClass = cn(
    "__games__list__wrapper",
    "grid grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] gap-2.5 my-10",
    className
  );

  return <div className={listClass}>{children}</div>;
};

export const GamesList = ({ className, children }: GamesListProps) => {
  return <div className={cn("__games__list grid", className)}>{children}</div>;
};
