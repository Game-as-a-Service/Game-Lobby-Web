import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import getBase64Image from '@/utils/getBase64Image';

interface CoverProps {
    className?: string;
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
}

const Cover: React.FC<CoverProps> = ({
    className = '',
    src,
    alt,
    width = 320,
    height = 320,
    fill = false,
    ...rest
  }) => {

  const [blurDataURL, setBlurDataURL] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    const base64 = getBase64Image(src);
    base64.then( data => {
      setBlurDataURL(data)
    })

  }, [src]);
  
    
  return (
    <>
    <div className={`${fill ? 'relative' : 'w-full'} overflow-hidden bg-gray-500 cover ${className}`}>
        {fill ? 
        (
          <Image 
            className={`
              w-full object-cover object-center
              ${loaded ? '' : 'invisible'}
            `}
            src={src}
            alt={alt}
            quality={75}
            sizes="100vw"
            blurDataURL={blurDataURL}
            placeholder="blur"
            onLoadingComplete={() => setLoaded(true)}
            loading="lazy"
            fill={fill}
            {...rest}
          />
        ) : (
          <Image 
            className={`
              w-full object-cover object-center
              ${loaded ? '' : 'invisible'}
            `}
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={75}
            sizes="100vw"
            blurDataURL={blurDataURL}
            placeholder="blur"
            onLoadingComplete={() => setLoaded(true)}
            loading="lazy"
            {...rest}
          />
        )}
       
    </div>

    <style jsx global>{`
      .unblur {
        animation: unblur 1s linear;
      }

      @keyframes unblur {
        from {
          filter: blur(20px);
        }
        to {
          filter: blur(0);
        }
      }
    `}</style>
    </>
    
   
  )
}

export default Cover;