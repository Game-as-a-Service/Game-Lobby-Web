import Button from "@/components/shared/Button";

export type RoomButtonGroupProps = {
  onToggleReady: () => void;
  onClickLeave: () => void;
  onClickClose: () => void;
  onClickStart: () => void;
};

function RoomButtonGroup(props: RoomButtonGroupProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col gap-[18px] font-normal text-sm leading-[22px] ml-[40px] mr-[52px]">
        <Button
          variant="primary"
          className="rounded-[21px] w-[165px] h-10 flex justify-center"
          onClick={props.onToggleReady}
        >
          準備
        </Button>
        <Button
          variant="dark"
          className="rounded-[21px] w-[165px] h-10 flex justify-center"
          onClick={props.onClickLeave}
        >
          退出房間
        </Button>
        <Button
          variant="dark"
          className="rounded-[21px] w-[165px] h-10 flex justify-center"
          onClick={props.onClickClose}
        >
          關閉房間
        </Button>
      </div>

      <Button
        variant="secondary"
        className="min-w-[152px] w-[166px] h-[132px] rounded-[30px] text-white text-2xl leading-9 flex justify-center"
        onClick={props.onClickStart}
      >
        開始遊戲
      </Button>
    </div>
  );
}

export default RoomButtonGroup;
