import { cn } from "@/lib/utils";

type RoomsListProps = {
  className?: string;
  children: React.ReactNode;
};

type RoomsListTitleProps = {
  className?: string;
  children: React.ReactNode;
};

export const RoomsListTitle = ({
  children,
  className,
}: RoomsListTitleProps) => {
  const titleClass = cn(
    "rooms__list__title",
    "font-black text-white border-l-4 border-blue pl-2",
    className
  );

  return <h2 className={titleClass}>{children}</h2>;
};

export const RoomsListWrapper = ({ className, children }: RoomsListProps) => {
  const listClass = cn(
    "rooms__list__wrapper",
    "grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2.5 my-5",
    className
  );

  return <div className={listClass}>{children}</div>;
};

export const RoomsList = ({ className, children }: RoomsListProps) => {
  return (
    <div className={cn("rooms__list flex flex-col h-full", className)}>
      {children}
    </div>
  );
};
