import { FC, ReactNode, useState, useCallback, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import UIContext, { UIState } from "./UIContext";

export interface UIProviderProps {
  children: ReactNode;
}

const getDefaultIsChatVisible = (router: NextRouter, prevState: boolean) =>
  router.pathname === "/rooms/[roomId]" ? true : prevState;

const getDefaultIsSearchBarVisible = (router: NextRouter) =>
  ["/", "/rooms"].includes(router.pathname);

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const router = useRouter();

  // UI 狀態管理
  const [uiState, setUIState] = useState<UIState>({
    isChatVisible: getDefaultIsChatVisible(router, false),
    isSearchBarVisible: getDefaultIsSearchBarVisible(router),
    isSidebarVisible: true,
    isHeaderVisible: true,
    isFullscreen: false,
    isUIVisible: true,
  });

  // 根據路由調整 UI 狀態
  useEffect(() => {
    setUIState((prev) => ({
      ...prev,
      // 在房間頁面自動顯示 chat
      isChatVisible: getDefaultIsChatVisible(router, prev.isChatVisible),
      // 只在首頁和房間列表頁顯示搜尋列
      isSearchBarVisible: getDefaultIsSearchBarVisible(router),
    }));
  }, [router]);

  // 全螢幕 API 控制
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setUIState((prev) => ({
        ...prev,
        isFullscreen,
        isUIVisible: isFullscreen ? false : prev.isUIVisible,
        isChatVisible: isFullscreen ? false : prev.isChatVisible,
      }));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Chat 控制
  const toggleChat = useCallback(() => {
    setUIState((prev) => ({ ...prev, isChatVisible: !prev.isChatVisible }));
  }, []);

  const showChat = useCallback(() => {
    setUIState((prev) => ({ ...prev, isChatVisible: true }));
  }, []);

  const hideChat = useCallback(() => {
    setUIState((prev) => ({ ...prev, isChatVisible: false }));
  }, []);

  // 搜尋列控制
  const toggleSearchBar = useCallback(() => {
    setUIState((prev) => ({
      ...prev,
      isSearchBarVisible: !prev.isSearchBarVisible,
    }));
  }, []);

  const showSearchBar = useCallback(() => {
    setUIState((prev) => ({ ...prev, isSearchBarVisible: true }));
  }, []);

  const hideSearchBar = useCallback(() => {
    setUIState((prev) => ({ ...prev, isSearchBarVisible: false }));
  }, []);

  // 側邊欄控制
  const toggleSidebar = useCallback(() => {
    setUIState((prev) => ({
      ...prev,
      isSidebarVisible: !prev.isSidebarVisible,
    }));
  }, []);

  const showSidebar = useCallback(() => {
    setUIState((prev) => ({ ...prev, isSidebarVisible: true }));
  }, []);

  const hideSidebar = useCallback(() => {
    setUIState((prev) => ({ ...prev, isSidebarVisible: false }));
  }, []);

  // Header 控制
  const toggleHeader = useCallback(() => {
    setUIState((prev) => ({ ...prev, isHeaderVisible: !prev.isHeaderVisible }));
  }, []);

  const showHeader = useCallback(() => {
    setUIState((prev) => ({ ...prev, isHeaderVisible: true }));
  }, []);

  const hideHeader = useCallback(() => {
    setUIState((prev) => ({ ...prev, isHeaderVisible: false }));
  }, []);

  // 全螢幕控制
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen toggle failed:", error);
    }
  }, []);

  const enterFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error("Enter fullscreen failed:", error);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Exit fullscreen failed:", error);
    }
  }, []);

  // 整體 UI 控制
  const toggleUI = useCallback(() => {
    setUIState((prev) => ({ ...prev, isUIVisible: !prev.isUIVisible }));
  }, []);

  const showUI = useCallback(() => {
    setUIState((prev) => ({ ...prev, isUIVisible: true }));
  }, []);

  const hideUI = useCallback(() => {
    setUIState((prev) => ({ ...prev, isUIVisible: false }));
  }, []);

  // 重置所有狀態
  const resetUI = useCallback(() => {
    setUIState({
      isChatVisible: getDefaultIsChatVisible(router, false),
      isSearchBarVisible: getDefaultIsSearchBarVisible(router),
      isSidebarVisible: true,
      isHeaderVisible: true,
      isFullscreen: false,
      isUIVisible: true,
    });
  }, [router]);

  const contextValue = {
    ...uiState,
    toggleChat,
    showChat,
    hideChat,
    toggleSearchBar,
    showSearchBar,
    hideSearchBar,
    toggleSidebar,
    showSidebar,
    hideSidebar,
    toggleHeader,
    showHeader,
    hideHeader,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleUI,
    showUI,
    hideUI,
    resetUI,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

export default UIProvider;
