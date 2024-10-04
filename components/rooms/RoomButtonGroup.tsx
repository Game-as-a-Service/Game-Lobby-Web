import Button from "@/components/shared/Button/v2";

type RoomButtonGroupProps = {
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
    <div className="flex items-center gap-4 m-4">
      <Button
        variant="secondary"
        onClick={isHost ? onClickClose : onClickLeave}
      >
        離開房間
      </Button>
      {isHost ? (
        <Button variant="primary" onClick={onClickStart}>
          開始遊戲
        </Button>
      ) : (
        <Button variant="secondary" onClick={onToggleReady}>
          {isReady ? "取消準備" : "準備"}
        </Button>
      )}
    </div>
  );
}

export default RoomButtonGroup;
