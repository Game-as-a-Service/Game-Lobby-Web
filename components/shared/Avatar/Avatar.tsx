import { useState } from "react";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type AvatarType = "link" | "button" | "image";

type AvatarSizeType = "default" | "small" | "large";

type AvatarShape = "circle" | "square";

// Currently, the design only supports the default size,
// we retain the small and large size in advance for future use.
const AVATAR_SIZES: Record<AvatarSizeType, number> = {
  default: 34,
  small: 28,
  large: 40,
};

interface BaseAvatarProps {
  /** If true, an online badge will be displayed. */
  isOnline?: boolean;
  /** The address of avatar image. If the src is invalid or empty, the avatar fallback will be displayed instead. */
  src: string | StaticImageData;
  /** The size of avatar */
  size?: AvatarSizeType;
  /** The type based on the usage of avatar */
  type: AvatarType;
  /** The shape of avatar */
  shape?: AvatarShape;
}

interface AvatarLinkProps extends BaseAvatarProps {
  type: "link";
  /** The href attribute limited to the "link" avatar */
  href: string;
  onClick?: never;
}

interface AvatarButtonProps extends BaseAvatarProps {
  type: "button";
  href?: never;
  /** The onclick handler limited to the "button" avatar */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface AvatarImageProps extends BaseAvatarProps {
  type: "image";
  href?: never;
  onClick?: never;
}

type AvatarProps = AvatarLinkProps | AvatarButtonProps | AvatarImageProps;

// #TODO
// Configure image hostname in `next.config.js`
export default function Avatar({
  isOnline = false,
  type,
  src,
  size = "default",
  shape = "circle",
  href,
  onClick,
}: AvatarProps) {
  const avatarSize = AVATAR_SIZES[size];

  const avatarSizeVariants = {
    default: `w-[34px] h-[34px]`,
    small: `w-[28px] h-[28px]`,
    large: `w-[40px] h-[40px]`,
  };

  const avatarShapeVariants = {
    circle: "rounded-full",
    square: "rounded-[10px]",
  };

  const avatarWrapperClassName = cn(
    avatarShapeVariants[shape],
    "block w-fit h-fit relative"
  );

  const avatarClassName = cn(
    avatarSizeVariants[size],
    avatarShapeVariants[shape]
  );

  const avatarFallbackClassName = cn(
    avatarSizeVariants[size],
    avatarShapeVariants[shape],
    "bg-[#D9D9D9]"
  );

  const [isImgError, setIsImgError] = useState(false);

  const handleImageError = () => {
    setIsImgError(true);
  };

  const avatarImage =
    isImgError || !src ? (
      <div className={avatarFallbackClassName} data-testid="image-fallback" />
    ) : (
      <Image
        src={src}
        alt="avatar"
        width={avatarSize}
        height={avatarSize}
        className={avatarClassName}
        onError={handleImageError}
      />
    );

  // #TODO
  // replace this with the badge component
  const onlineBadge = (
    <div className="absolute z-10 bottom-0 right-0">
      <div
        className="w-[13px] h-[13px] rounded-full bg-[#23A55A]"
        data-testid="online-badge"
      />
    </div>
  );

  return (
    <>
      {type === "link" && (
        <Link href={href} className={avatarWrapperClassName}>
          {avatarImage}
          {isOnline && onlineBadge}
        </Link>
      )}
      {type === "button" && (
        <button className={avatarWrapperClassName} onClick={onClick}>
          {avatarImage}
          {isOnline && onlineBadge}
        </button>
      )}
      {type === "image" && (
        <div className={avatarWrapperClassName}>
          {avatarImage} {isOnline && onlineBadge}
        </div>
      )}
    </>
  );
}
