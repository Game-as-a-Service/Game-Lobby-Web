import { PropsWithChildren } from "react";

import gameDefaultCoverImg from "@/public/images/game-default-cover.png";
import { GameRegistration } from "@/api";
import Image from "@/components/shared/Image";

function GameCardSimple({
  children,
  imageUrl,
  displayName,
}: PropsWithChildren<GameRegistration>) {
  return (
    <div className="group">
      <div className="relative aspect-game-cover flex items-end justify-end">
        <picture className="overflow-hidden">
          <Image
            src={imageUrl || gameDefaultCoverImg.src}
            alt={displayName}
            className="object-cover"
            fill
          />
        </picture>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {children}
        </div>
      </div>
      <h2>{displayName}</h2>
    </div>
  );
}

export default GameCardSimple;
