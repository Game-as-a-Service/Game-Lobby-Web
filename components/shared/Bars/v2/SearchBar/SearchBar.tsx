import React from "react";
import SearchBarDumb from "./SearchBarDumb";
import SearchDrawer from "./SearchDrawer";

type Props = {
  onSearchText: (text: string) => void;
  onSearchType: (text: string) => void;
};

const SearchBar = ({ onSearchText, onSearchType }: Readonly<Props>) => {
  const [showDrawer, setShowDrawer] = React.useState(false);

  const category = {
    action: ["格鬥和武術", "第一人稱射擊", "第三人稱射擊", "街機和節奏"],
    adventure: ["休閒", "劇情豐富", "視覺小說"],
    simulation: ["太空和飛行", "建造和自動化", "戀愛", "沙盒和物理"],
    strategy: ["卡牌和棋盤", "即時策略", "回合制策略"],
  };

  return (
    <div>
      <SearchBarDumb
        onSearchText={onSearchText}
        onDrawerClick={() => setShowDrawer(!showDrawer)}
      ></SearchBarDumb>
      {showDrawer ? (
        <SearchDrawer
          category={category}
          className="absolute mt-6"
          onSearchType={onSearchType}
        ></SearchDrawer>
      ) : null}
    </div>
  );
};

export default SearchBar;
