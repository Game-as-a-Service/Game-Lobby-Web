import { cn } from "@/lib/utils";

export type ChatTab = {
  id: "lobby" | "friend" | "room";
  text: string;
  notifications?: number;
};

export type ChatHeaderProps = {
  tabs: ChatTab[];
  activeTab: ChatTab["id"];
  onToggle: (id: ChatTab["id"]) => void;
};

export default function ChatHeader({
  tabs,
  activeTab,
  onToggle,
}: Readonly<ChatHeaderProps>) {
  const toggleTab = (id: ChatTab["id"]) => () => onToggle(id);

  return (
    <header className="gradient-black border-b border-gradient-purple p-4">
      <div className="text-primary-100 fz-22-b pb-6">聊天室</div>
      <div className="flex gap-4">
        {tabs.map(({ id, text, notifications }) => (
          <button
            key={id}
            className={cn(
              "relative text-primary-300 py-1 px-2 rounded-full border border-primary-700/40 transition-colors",
              activeTab === id ? "bg-primary-200/20" : "hover:bg-basic-white/8"
            )}
            onClick={toggleTab(id)}
          >
            {Number(notifications) > 0 && (
              <span className="absolute right-0 -top-2 fz-12 w-4 h-4 leading-4 rounded-full bg-secondary-500 text-basic-white">
                {notifications}
              </span>
            )}
            {text}
          </button>
        ))}
      </div>
    </header>
  );
}
