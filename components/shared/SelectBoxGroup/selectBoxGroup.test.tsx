import React, { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SelectBoxGroup from ".";

describe("SelectBoxGroup", () => {
  const items = [
    { key: "1", label: "Option 1", value: "option1" },
    { key: "2", label: "Option 2", value: "option2" },
  ];

  it("should displays the correct label text", () => {
    const label = "Select an option";
    render(<SelectBoxGroup items={items} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should update selection state and call onChange callback when an option is clicked", async () => {
    const onChangeMock = jest.fn();

    const ControllerComponent = () => {
      const [value, setValue] = useState(items[0].value);
      const handleChange = (v: (typeof items)[0]["value"]) => {
        setValue(v);
        onChangeMock(v);
      };

      return (
        <SelectBoxGroup items={items} value={value} onChange={handleChange} />
      );
    };

    render(<ControllerComponent />);

    await act(async () => {
      await userEvent.click(screen.getByText("Option 2"));
    });

    expect(onChangeMock).toHaveBeenCalledWith("option2");
    expect(screen.getByText("Option 1")).toHaveAttribute(
      "aria-checked",
      "false"
    );
    expect(screen.getByText("Option 2")).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("should sync selection state when value prop is updated", () => {
    const { rerender } = render(
      <SelectBoxGroup items={items} value="option1" />
    );

    expect(screen.getByText("Option 1")).toHaveAttribute(
      "aria-checked",
      "true"
    );

    rerender(<SelectBoxGroup items={items} value="option2" />);

    expect(screen.getByText("Option 2")).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByText("Option 1")).toHaveAttribute(
      "aria-checked",
      "false"
    );
  });
});
