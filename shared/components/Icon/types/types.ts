export interface IconVariants {
    name: string;
    definition: {
      svg?: {
        viewBox?: string;
      };
      path?: {
        d?: string;
        fill?: string;
        fillRule?: "nonzero" | "evenodd" | "inherit";
        stroke?: string;
        strokeWidth?: string | number;
        transform?: string;
      };
    };
  }