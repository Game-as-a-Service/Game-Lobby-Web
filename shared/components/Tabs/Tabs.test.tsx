import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Tabs, { TabsProps } from "./Tabs";
import { Key } from "react";

describe("Tabs", () => {
  const tabs: TabsProps["tabs"] = [
    { key: "1", label: "Tab 1" },
    { key: "2", label: "Tab 2" },
    { key: "3", label: "Tab 3" },
  ];
  const tabPaneText = "Tab Pane Text";
  const renderTabPaneContent = (key: Key) => (
    <div>{`${tabPaneText} ${key}`}</div>
  );

  it("should renders all Tabs and the first TabPane when not given 'defaultActiveKey' prop", () => {
    render(<Tabs tabs={tabs} renderTabPaneContent={renderTabPaneContent} />);

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
    expect(screen.getByText(`${tabPaneText} 1`));
    expect(screen.queryByText(`${tabPaneText} 2`)).not.toBeInTheDocument();
    expect(screen.queryByText(`${tabPaneText} 3`)).not.toBeInTheDocument();
  });

  it("should renders the specific Tab-Pane when given 'defaultActiveKey' prop", () => {
    render(
      <Tabs
        tabs={tabs}
        renderTabPaneContent={renderTabPaneContent}
        defaultActiveKey={tabs[1].key}
      />
    );

    expect(screen.getByText(`${tabPaneText} 2`));
    expect(screen.queryByText(`${tabPaneText} 1`)).not.toBeInTheDocument();
    expect(screen.queryByText(`${tabPaneText} 3`)).not.toBeInTheDocument();
  });

  it("should renders the specific Tab-Pane when the tab clicked", () => {
    render(<Tabs tabs={tabs} renderTabPaneContent={renderTabPaneContent} />);

    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    fireEvent.click(tab3);

    expect(screen.getByText(`${tabPaneText} 3`));
    expect(screen.queryByText(`${tabPaneText} 1`)).not.toBeInTheDocument();
    expect(screen.queryByText(`${tabPaneText} 2`)).not.toBeInTheDocument();
  });

  it("should call the onChange handler when the active tab changed", () => {
    const handleTabChanged = jest.fn();
    render(
      <Tabs
        tabs={tabs}
        renderTabPaneContent={renderTabPaneContent}
        onChange={handleTabChanged}
        defaultActiveKey={tabs[2].key}
      />
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    fireEvent.click(tab1);

    expect(handleTabChanged).toHaveBeenCalled();
  });
});
