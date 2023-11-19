import { PropsWithChildren } from "react";
import SearchBarDumb from "./SearchBarDumb";
import SearchDrawer from "./SearchDrawer";
import Tag from "@/components/shared/Tag";

interface TagProps extends React.ComponentPropsWithoutRef<"div"> {}

const SearchBar = ({}: PropsWithChildren<TagProps>) => {
  return (
    <div className={""}>
      <SearchBarDumb></SearchBarDumb>
      <SearchDrawer className="absolute mt-6"></SearchDrawer>
    </div>
  );
};

export default SearchBar;
