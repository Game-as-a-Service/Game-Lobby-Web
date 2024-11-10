import Button from "@/components/shared/Button/v2";
import Icon from "../shared/Icon";

type RoomButtonGroupProps = {
  isHost: boolean;
  isReady: boolean;
  onToggleReady: () => void;
  onClickLeave: () => void;
  onClickClose: () => void;
  onClickStart: () => void;
};

function RoomButtonGroup(props: RoomButtonGroupProps) {
  const { onClickLeave, onClickClose, onClickStart, isHost } = props;

  return (
    <div className="flex items-center gap-4 m-4">
      <Button
        variant="secondary"
        className="flex"
        onClick={isHost ? onClickClose : onClickLeave}
      >
        <Icon name="LeaveGame" className="w-6 h-6" />
        離開房間
      </Button>
      {isHost && (
        <Button variant="primary" className="flex" onClick={onClickStart}>
          <Icon name="Play" className="w-6 h-6" />
          開始遊戲
        </Button>
      )}
    </div>
  );
}

export default RoomButtonGroup;
