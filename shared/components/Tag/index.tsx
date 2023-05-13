type SpanProps = {
    children: React.ReactNode;
    style?: React.CSSProperties
    bgColor?: string,
    className?: string
}

const Tag: React.FC<SpanProps> = ({ 
    children,
    className = '',
    style,
    bgColor,
}) => {
return (
    <span 
        className={`tag inline-flex text-sm p-2 rounded-[4px] text-white ${className}`} 
        style={{...style, backgroundColor: bgColor}}
    >
        {children}
    </span>
  )
}

export default Tag