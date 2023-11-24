type Props = {
  text: string;
};

const NavItem = ({ text }: Readonly<Props>) => {
  return (
    <button className="self-stretch h-14 hover:bg-white hover:bg-opacity-10 active:bg-violet-300 active:bg-opacity-20 rounded-[100px] justify-start items-center gap-3 inline-flex">
      <div className="grow shrink basis-0 self-stretch px-6 py-4 justify-start items-center gap-3 flex">
        <div className="grow shrink basis-0 text-start text-violet-200 text-sm font-medium font-['Noto Sans TC'] leading-[21px]">
          {text}
        </div>
      </div>
    </button>
  );
};

export default NavItem;
