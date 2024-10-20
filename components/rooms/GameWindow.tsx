type GameWindowProps = {
  className?: string;
  gameUrl: string;
};

export default function GameWindow({ className, gameUrl }: GameWindowProps) {
  return (
    <div>
      <iframe className={className} src={gameUrl}>
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
}
