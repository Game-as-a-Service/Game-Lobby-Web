import { ReactEventHandler } from "react";
import Image, { ImageProps } from "next/image";
import gameDefaultCoverImg from "@/public/images/game-default-cover.png";

function Cover({ alt, onError, ...restProps }: ImageProps) {
  const handleError: ReactEventHandler<HTMLImageElement> = (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = gameDefaultCoverImg.src;
    }
    onError?.(e);
  };
  return <Image alt={alt} onError={handleError} {...restProps} />;
}

export default Cover;
