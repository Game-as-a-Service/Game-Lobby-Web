import React, { CSSProperties } from "react";
import Cover from "../Cover";
import Tag, { TagColor } from "../Tag/Tag";
import { cn } from "@/lib/utils";
import { GameListType } from "@/requests/games";
import Icon from "../Icon";

export interface CardProps {
  /** Card class name */
  className?: string;

  /** Card style */
  style?: CSSProperties;

  /** Card game data */
  game: GameListType;

  /** Card actions */
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, style, game, actions }) => {
  return (
    <div
      className={cn(
        "__card",
        "group/card relative rounded-[10px] bg-[var(--dark)] overflow-hidden",
        className
      )}
      style={style}
      data-testid="card"
    >
      <Cover
        className="__card__cover h-[125px]"
        src={game.imgUrl}
        fill={true}
        alt={game.name}
        data-testid="card__cover"
      />

      <div className="__card__body p-3">
        {game.category ? (
          <div
            className="__category flex gap-[10px]"
            data-testid="card__category"
          >
            {game.category.map((tag, index) => (
              <Tag
                key={index}
                color={index % 2 === 0 ? TagColor.INDIGO : TagColor.GREEN}
              >
                {tag}
              </Tag>
            ))}
          </div>
        ) : null}

        <h3
          className="__card__title h-12 my-4 overflow-hidden text-white line-clamp-2 overflow-ellipsis "
          data-testid="card__title"
        >
          {game.name}
        </h3>

        <div className="__card__footer flex justify-between">
          <div
            className="__rating flex items-center text-[#FF9110] gap-1"
            data-testid="card__rating"
          >
            <Icon name="star" />
            {game.rating}
          </div>
          <span className="__price text-[#618DFF]" data-testid="card__price">
            價格: {game.price}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "__card__actions",
          "group/actions opacity-0 invisible group-hover/card:visible group-hover/card:opacity-100 transition-all duration-100 ease-linear z-[3] absolute top-0 left-0 grid w-full h-full row-span-3 gap-0.5 bg-black",
          className
        )}
        data-testid="card__actions"
      >
        {actions}
      </div>
    </div>
  );
};

export default Card;
