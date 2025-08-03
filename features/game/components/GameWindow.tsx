import { useEffect, useRef, useState } from "react";
import Icon from "@/components/shared/Icon";
import useAutoReset from "@/hooks/useAutoReset";
import { cn } from "@/lib/utils";
import { useUI } from "@/contexts/ui";

type GameWindowProps = {
  className?: string;
  gameUrl: string;
  onReportQuestion?: () => void;
  onLeaveGame?: () => void;
};

const GameWindow = ({
  className,
  gameUrl,
  onReportQuestion,
  onLeaveGame,
}: Readonly<GameWindowProps>) => {
  const [isExtendToolBar, setIsExtendToolBar] = useState(false);
  const [isShowToolBar, setIsShowToolBar] = useAutoReset(
    false,
    2000,
    !isExtendToolBar
  );
  const toolBarRef = useRef<HTMLDivElement>(null);

  const stopPropagation =
    (callback: () => void) => (event?: React.MouseEvent) => {
      event?.stopPropagation();
      callback();
    };

  const {
    isUIVisible,
    isChatVisible,
    isFullscreen,
    toggleUI,
    toggleChat,
    toggleFullscreen,
    resetUI,
  } = useUI();

  const buttons = [
    {
      icon: "ShowUi",
      label: isUIVisible ? "隱藏UI" : "顯示UI",
      onClick: stopPropagation(toggleUI),
    },
    {
      icon: "ShowChat",
      label: isChatVisible ? "隱藏聊天室" : "顯示聊天室",
      onClick: stopPropagation(toggleChat),
    },
    {
      icon: "FullScreen",
      label: isFullscreen ? "視窗模式" : "全螢幕模式",
      onClick: stopPropagation(toggleFullscreen),
    },
    {
      icon: "ReportQuestion",
      label: "回報問題",
      onClick: onReportQuestion,
    },
    {
      icon: "LeaveGame",
      label: "離開遊戲",
      onClick: onLeaveGame,
    },
  ] as const;

  const handleKeyDown = (event: React.KeyboardEvent, action?: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action?.();
    }
  };

  const handleShowToolBar = () => {
    setIsShowToolBar(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!toolBarRef.current?.contains(event.target as Node)) {
        setIsExtendToolBar(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsExtendToolBar(true);

    const timer = setTimeout(() => {
      setIsExtendToolBar(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExtendToolBar) {
      setIsShowToolBar(true);
    }
  }, [setIsShowToolBar, isExtendToolBar]);

  useEffect(() => {
    return () => resetUI();
  }, [resetUI]);

  return (
    <div className="relative">
      {/* 遊戲 iframe */}
      <iframe className={className} src={gameUrl}>
        <p>Your browser does not support iframes.</p>
      </iframe>

      {/* Backdrop - 只在工具列展開時顯示 */}
      {isExtendToolBar && (
        <div
          className="absolute inset-0"
          onClick={() => setIsExtendToolBar(false)}
        />
      )}

      <div
        className="absolute inset-x-1/4 h-20 z-40 bottom-full"
        onMouseMove={handleShowToolBar}
      />

      {/* 遊戲工具欄 */}
      <div
        ref={toolBarRef}
        className={cn(
          "absolute top-4 left-1/2 -translate-x-1/2 z-40",
          "w-[512px] h-48 pb-4 flex flex-col items-center justify-center",
          "bg-white/10 backdrop-blur-md rounded-lg transition-all duration-300",
          isShowToolBar ? "will-change-all" : "opacity-0 pointer-events-none",
          isExtendToolBar
            ? "opacity-100 pointer-events-auto"
            : "-translate-y-[35px] p-0 w-[132px] h-4 overflow-hidden cursor-pointer"
        )}
        onMouseMove={handleShowToolBar}
        onClick={() => setIsExtendToolBar(true)}
      >
        <div
          className={cn(
            "transition-opacity opacity-0 pointer-events-none",
            isExtendToolBar && "opacity-100 pointer-events-auto delay-200"
          )}
        >
          <div className="flex items-center gap-8 mb-5">
            {buttons.map((button) => (
              <button
                key={button.label}
                className="flex flex-col items-center text-white hover:text-gray-300 transition-colors"
                onClick={button.onClick}
                onKeyDown={(e) => handleKeyDown(e, button.onClick)}
                tabIndex={0}
                aria-label={button.label}
              >
                <Icon name={button.icon} className="m-3 w-6 h-6" />
                <span className="text-sm whitespace-nowrap">
                  {button.label}
                </span>
              </button>
            ))}
          </div>

          <div className="text-white text-center">
            <span className="text-sm">切換排版、離開遊戲，請按下</span>
            <span className="mx-2 px-2 py-1 border border-solid border-white rounded text-sm font-medium">
              ESC
            </span>
            <span className="text-sm">呼叫選單</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWindow;
