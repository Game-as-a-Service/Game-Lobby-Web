import React from 'react';
import Image from 'next/image';

interface CoverProps {
    className?: string;
    src: string;
    width?: number;
    height?: number;
    alt: string;
    fill?: boolean;
}

const Cover: React.FC<CoverProps>= ( {
    className = '', 
    src,  
    width, 
    height, 
    alt,
    ...rest
  }) => {
  return (
    <div className="w-full overflow-hidden cover" style={{height}}>
        <Image 
            className={`w-full object-cover object-center ${className}`}
            src={src}
            alt={alt}
            width={width}
            height={height}
            {...rest}
        />
    </div>
   
  )
}

export default Cover;