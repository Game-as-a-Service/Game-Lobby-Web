import { PropsWithChildren } from "react";

import gameDefaultCoverImg from "@/public/images/game-default-cover.png";
import { GameType } from "@/requests/games";
import Cover from "@/components/shared/Cover";

function GameCardSimple({ children, img, name }: PropsWithChildren<GameType>) {
  return (
    <div className="group">
      <div className="relative aspect-game-cover flex items-end justify-end">
        <picture className="overflow-hidden">
          <Cover
            src={img || gameDefaultCoverImg.src}
            alt={name}
            draggable={false}
            priority
            fill
            className="object-cover"
          />
        </picture>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {children}
        </div>
      </div>
      <h2>{name}</h2>
    </div>
  );
}

export default GameCardSimple;
