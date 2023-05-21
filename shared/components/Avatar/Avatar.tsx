import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export type AvatarType = "link" | "button" | "image"

export type AvatarSizeType = "small" | "large" | "default"

// Currently, the design only supports the default size,
// we retain the small and large size in advance for future use.
const AVATAR_SIZES: Record<AvatarSizeType, number> = {
  default: 34,
  small: 28,
  large: 40,
}

interface BaseAvatarProps {
  isOnline: boolean
  src: string
  size: AvatarSizeType
  type: AvatarType
}

interface AvatarLinkProps extends BaseAvatarProps {
  type: "link"
  href: string
  onClick?: never
}

interface AvatarButtonProps extends BaseAvatarProps {
  type: "button"
  href?: never
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

interface AvatarImageProps extends BaseAvatarProps {
  type: "image"
  href?: never
  onClick?: never
}

export type AvatarProps = AvatarLinkProps | AvatarButtonProps | AvatarImageProps

// #TODO
// Configure image hostname in `next.config.js`
export default function Avatar({
  isOnline,
  type,
  src,
  size,
  href,
  onClick,
}: AvatarProps) {
  const avatarSize = AVATAR_SIZES[size]

  const avatarVariants = {
    default: `w-[34px] h-[34px]`,
    small: `w-[28px] h-[28px]`,
    large: `w-[40px] h-[40px]`,
  }

  const avatarWrapperClassName = "block rounded-full w-fit h-fit relative"
  const avatarClassName = cn(avatarVariants[size], "rounded-full")
  const avatarFallbackClassName = cn(
    avatarVariants[size],
    "rounded-full bg-[#D9D9D9]"
  )

  const [isImgError, setIsImgError] = useState(false)

  const handleImageError = () => {
    setIsImgError(true)
  }

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
    )

  // #TODO
  // replace this with the badge component
  const onlineBadge = (
    <div className="absolute z-10 bottom-0 right-0">
      <div
        className="w-[13px] h-[13px] rounded-full bg-[#23A55A]"
        data-testid="online-badge"
      />
    </div>
  )

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
  )
}
