type GameWindowProps = {
  gameUrl: string;
};

export default function GameWindow({ gameUrl }: GameWindowProps) {
  return (
    <div>
      <iframe
        className="absolute inset-0 m-auto w-[95%] h-[95vh] border"
        src={gameUrl}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
}
