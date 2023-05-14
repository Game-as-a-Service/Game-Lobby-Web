import React, { SyntheticEvent, CSSProperties } from 'react';
import Image from 'next/image';
import Button from '../Button';
import Cover from '../Cover';
import Tag from '../Tag';

type Image = {
  src: string;
  alt: string;
}

interface CardProps {
  id: string;
  className?: string;
  style?: CSSProperties;
  cover: Image;
  title: string;
  tags?: string[];
  rating: number;
  price: number;
  onClick: (e: SyntheticEvent, action: string) => void;
}

const Card: React.FC<CardProps> = ( { 
  id,
  className = '',  
  style,
  cover,
  title,
  tags,
  rating,
  price,
  onClick,
}) => {
  const { src, alt } = cover || {};
  
  return (
    <div 
      className={`group/card relative rounded-[10px] card bg-[var(--dark)] overflow-hidden ${className}`}
      style={style}
    >
      {/* card-cover start */}
      <Cover src={src} width={210} height={123} alt={alt} />
      {/* card-cover end */}

      {/* card-body start */}
      <div className="p-3 card-body ">

        {/* tags start */}
        {tags ? (
          <div className="tags flex gap-[10px]">
            {tags.map( (tag, index) => ( <Tag key={index} bgColor="#5865F2">{tag}</Tag>) )}
          </div>
        ): null}
        {/* tags end */}
        
        {/* card-title start */}
        <h3 className="h-12 my-4 overflow-hidden text-white line-clamp-2 overflow-ellipsis card-title ">
          {title}
        </h3>
        {/* card-title end */}

        {/* card-footer start */}
        <div className="flex justify-between card-footer">
          <div className="flex align-center text-[#FF9110] gap-1 rating">
            <Image src="images/star.svg" width={16} height={16} alt="Rating" /> {rating}
          </div>
          <span className="text-[#618DFF] price">價格: {price}</span>
        </div>
        {/* card-footer end */}
        
      </div>
      {/* card-body end */}

      {/* actions start */}
      <div className="group/actions opacity-0 invisible group-hover/card:visible group-hover/card:opacity-100 transition-all duration-100 ease-linear z-[3] absolute top-0 left-0 grid w-full h-full row-span-3 gap-2 bg-[var(--dark)] actions">
        <Button className="w-full rounded-none" onClick={(e) => onClick(e, 'create')}>開設新房間</Button>
        <Button className="w-full rounded-none" onClick={(e) => onClick(e, 'join')}>加入現有房間</Button>
        <Button className="w-full rounded-none" onClick={(e) => onClick(e, `detail-${id}`)}>遊戲詳情</Button>
      </div>
      {/* actions end */}

    </div>
  )
}

export default Card
