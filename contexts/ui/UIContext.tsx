import { createContext } from "react";

export interface UIState {
  // Chat 相關
  isChatVisible: boolean;

  // UI 元件顯示狀態
  isSearchBarVisible: boolean;
  isSidebarVisible: boolean;
  isHeaderVisible: boolean;

  // 全螢幕狀態
  isFullscreen: boolean;

  // 整體 UI 顯示（用於遊戲中隱藏所有 UI）
  isUIVisible: boolean;
}

export interface UIActions {
  // Chat 控制
  toggleChat: () => void;
  showChat: () => void;
  hideChat: () => void;

  // 搜尋列控制
  toggleSearchBar: () => void;
  showSearchBar: () => void;
  hideSearchBar: () => void;

  // 側邊欄控制
  toggleSidebar: () => void;
  showSidebar: () => void;
  hideSidebar: () => void;

  // Header 控制
  toggleHeader: () => void;
  showHeader: () => void;
  hideHeader: () => void;

  // 全螢幕控制
  toggleFullscreen: () => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;

  // 整體 UI 控制
  toggleUI: () => void;
  showUI: () => void;
  hideUI: () => void;

  // 重置所有狀態
  resetUI: () => void;
}

export interface UIContextType extends UIState, UIActions {}

const defaultState: UIState = {
  isChatVisible: false,
  isSearchBarVisible: true,
  isSidebarVisible: true,
  isHeaderVisible: true,
  isFullscreen: false,
  isUIVisible: true,
};

const defaultActions: UIActions = {
  toggleChat: () => {},
  showChat: () => {},
  hideChat: () => {},
  toggleSearchBar: () => {},
  showSearchBar: () => {},
  hideSearchBar: () => {},
  toggleSidebar: () => {},
  showSidebar: () => {},
  hideSidebar: () => {},
  toggleHeader: () => {},
  showHeader: () => {},
  hideHeader: () => {},
  toggleFullscreen: () => {},
  enterFullscreen: () => {},
  exitFullscreen: () => {},
  toggleUI: () => {},
  showUI: () => {},
  hideUI: () => {},
  resetUI: () => {},
};

const defaultValue: UIContextType = {
  ...defaultState,
  ...defaultActions,
};

const UIContext = createContext<UIContextType>(defaultValue);

export default UIContext;
