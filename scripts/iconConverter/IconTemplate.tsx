type IconNameProps = {
  className?: string;
};

export default function IconName({ className }: Readonly<IconNameProps>) {
  return (
    <svg className={className} replace-attributes>
      replace-content
    </svg>
  );
}
