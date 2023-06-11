import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CoverProps {
  className?: string;
  src: string;
  alt: string;
  /** If `fill` is `false`, `width` is defined 320, but it can change as props from outside, the width and height will effect zoom in and out quality of the image for the responsive viewport */
  width?: number;
  /** If `fill` is `false`, `height` is defined 320, but it can change as props from outside the width and height will effect zoom in and out quality of the image for the responsive viewport */
  height?: number;
  /** If `fill` is `true`, the image will fill the viewport. According to next-image, `fill` is using `absolute` to position the image.  */
  fill?: boolean;
  sizes?: string;
}

const Cover: React.FC<CoverProps> = ({
  className = "",
  src,
  alt,
  width = 320,
  height = 320,
  fill = false,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  const coverClass = cn(
    "__cover",
    {
      relative: fill,
      "w-full": !fill,
    },
    "overflow-hidden bg-gray-500 cover",
    className
  );

  const isFill = () => {
    return fill
      ? {
          fill,
        }
      : {
          width,
          height,
        };
  };

  return (
    <div className={coverClass}>
      <Image
        className={cn("w-full object-cover object-center", {
          invisible: !loaded,
        })}
        src={src}
        alt={alt}
        quality={75}
        sizes="100vw"
        onLoadingComplete={() => setLoaded(true)}
        loading="lazy"
        {...isFill()}
        {...rest}
      />
    </div>
  );
};

export default Cover;
