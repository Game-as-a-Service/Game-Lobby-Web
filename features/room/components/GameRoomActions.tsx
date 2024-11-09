import { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { Button, ButtonSize } from "@/components/shared/Button/v2";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/router";
import { useToast } from "@/components/shared/Toast";
import useUser from "@/hooks/useUser";
import { GameType } from "@/requests/games";
import { fastJoinGameEndpoint } from "@/requests/rooms";
import Icon from "@/components/shared/Icon";
import Modal from "@/components/shared/Modal";
import { cn } from "@/lib/utils";
import CreateRoomModal from "./CreateRoomForm";

interface GameRoomActions extends GameType {
  tabIndex?: number;
}

function GameRoomActions({
  id,
  name,
  minPlayers,
  maxPlayers,
  tabIndex,
}: Readonly<GameRoomActions>) {
  const { fetch } = useRequest();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const { updateRoomId } = useUser();
  const menuTabIndex = showMenu ? tabIndex : -1;

  const handleFastJoin = async () => {
    try {
      setIsLoading(true);
      const { roomId } = await fetch(fastJoinGameEndpoint(id));
      router.push(`/rooms/${roomId}`);
      updateRoomId(roomId);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(
          { state: "error", children: error.response?.data.message },
          { position: "top" }
        );
      } else {
        toast(
          { state: "error", children: `無法預期的錯誤： ${error}` },
          { position: "top" }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowMenu(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="m-4 flex gap-4 pt-10">
      <Button
        variant="primaryTransparent"
        className="flex"
        disabled={isLoading}
        tabIndex={tabIndex}
        onClick={handleFastJoin}
      >
        <Icon name="Gamepad" className="w-6 h-6" />
        快速遊戲
      </Button>
      <div className="relative">
        <Button
          variant="primaryTransparent"
          size={ButtonSize.Icon}
          tabIndex={tabIndex}
          onClick={() => setShowMenu((pre) => !pre)}
        >
          <Icon name="Menu" className="w-6 h-6 rotate-90" />
        </Button>
        <div
          className={cn(
            "absolute bottom-full right-0 mb-2 transition-transform origin-[calc(100%-22px)_bottom] z-20",
            !showMenu && "scale-0"
          )}
        >
          <ul className="py-4 frosted-shadow-box text-primary-800 bg-primary-200/60 whitespace-nowrap rounded-lg">
            <li>
              <Link
                href="/rooms"
                className="block w-full text-left px-4 py-1 hover:bg-primary-900/20 cursor-pointer"
                tabIndex={menuTabIndex}
              >
                加入現有房間
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="block w-full text-left px-4 py-1 hover:bg-primary-900/20 cursor-pointer"
                tabIndex={menuTabIndex}
                onClick={() => setShowCreateRoomModal(true)}
              >
                開設新房間
              </button>
              <Modal
                title={`開新房間: ${name}`}
                isOpen={showCreateRoomModal}
                onClose={() => setShowCreateRoomModal(false)}
                size="medium"
              >
                <CreateRoomModal
                  gameId={id}
                  minPlayers={minPlayers}
                  maxPlayers={maxPlayers}
                  onCancel={() => setShowCreateRoomModal(false)}
                />
              </Modal>
            </li>
            <li>
              <button
                type="button"
                className="block w-full text-left px-4 py-1 hover:bg-primary-900/20 cursor-pointer"
                onClick={() =>
                  toast(
                    {
                      children: "遊戲詳細介紹頁尚未實作，敬請期待",
                      state: "warning",
                    },
                    { position: "top" }
                  )
                }
                tabIndex={menuTabIndex}
              >
                遊戲詳情
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GameRoomActions;
