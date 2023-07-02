import Button from "@/components/shared/Button";

export type RoomButtonGroupProps = {
  isHost: boolean;
  isReady: boolean;
  onToggleReady: () => void;
  onClickLeave: () => void;
  onClickClose: () => void;
  onClickStart: () => void;
};

function RoomButtonGroup(props: RoomButtonGroupProps) {
  const {
    onToggleReady,
    onClickLeave,
    onClickClose,
    onClickStart,
    isHost,
    isReady,
  } = props;
  return (
    <div className="flex items-center">
      <div className="flex flex-col gap-[18px] font-normal text-sm leading-[22px] ml-[40px] mr-[52px]">
        {isHost || (
            <Button
            variant={isReady ? "danger" : "primary"}
            className="rounded-[21px] w-[165px] h-10 flex justify-center"
            onClick={onToggleReady}
          >
            {isReady ? "取消準備" : "準備"}
          </Button>
        )}
        <Button
          variant="dark"
          className="rounded-[21px] w-[165px] h-10 flex justify-center"
          onClick={onClickLeave}
        >
          退出房間
        </Button>
        {isHost && (
          <Button
            variant="dark"
            className="rounded-[21px] w-[165px] h-10 flex justify-center"
            onClick={onClickClose}
          >
            關閉房間
          </Button>
        )}
      </div>

      {isHost && (
        <Button
          variant="secondary"
          className="min-w-[152px] w-[166px] h-[132px] rounded-[30px] text-white text-2xl leading-9 flex justify-center"
          onClick={onClickStart}
        >
          開始遊戲
        </Button>
      )}
    </div>
  );
}

export default RoomButtonGroup;
