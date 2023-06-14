import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordField from "./PasswordField";
import React from "react";

describe("PasswordField", () => {
  it("should render PasswordField component", () => {
    const setPasswordValues = jest.fn();
    render(
      <PasswordField
        active={false}
        title={"私人房間"}
        subTitle={"請輸入此房間密碼"}
        passwordValues={["", "", "", ""]}
        setPasswordValues={setPasswordValues}
      />
    );
    expect(screen.getByText("私人房間")).toBeInTheDocument();
    expect(screen.getByText("請輸入此房間密碼")).toBeInTheDocument();
  });

  it("should render 4 password input fields when active is true", () => {
    const setPasswordValues = jest.fn();
    render(
      <PasswordField
        active={true}
        title={"私人房間"}
        subTitle={"請輸入此房間密碼"}
        passwordValues={["", "", "", ""]}
        setPasswordValues={setPasswordValues}
      />
    );
    const passwordFields = screen.getAllByTestId(/input-password-\d/);
    expect(passwordFields.length).toBe(4);
  });

  it("should set passwords when user types in the fields", async () => {
    const setPasswordValues = jest.fn();
    render(
      <PasswordField
        active={true}
        title={"私人房間"}
        subTitle={"請輸入此房間密碼"}
        passwordValues={["", "", "", ""]}
        setPasswordValues={setPasswordValues}
      />
    );
    const passwordFields = screen.getAllByTestId(/input-password-\d/);
    const firstField = passwordFields[0];
    const secondField = passwordFields[1];
    const thirdField = passwordFields[2];
    const fourthField = passwordFields[3];
    await userEvent.type(firstField, "1");
    await userEvent.type(secondField, "2");
    await userEvent.type(thirdField, "3");
    await userEvent.type(fourthField, "4");
    expect(setPasswordValues).toHaveBeenCalledTimes(4);
    expect(setPasswordValues).toHaveBeenCalledWith(["1", "", "", ""]);
    expect(setPasswordValues).toHaveBeenCalledWith(["", "2", "", ""]);
    expect(setPasswordValues).toHaveBeenCalledWith(["", "", "3", ""]);
    expect(setPasswordValues).toHaveBeenCalledWith(["", "", "", "4"]);
  });

  it("should delete passwords in the fields", async () => {
    const setPasswordValues = jest.fn();
    render(
      <PasswordField
        active={true}
        title={"私人房間"}
        subTitle={"請輸入此房間密碼"}
        passwordValues={["", "", "", ""]}
        setPasswordValues={setPasswordValues}
      />
    );
    const passwordFields = screen.getAllByTestId(/input-password-\d/);
    const firstField = passwordFields[0];
    const secondField = passwordFields[1];
    await userEvent.type(firstField, "1");
    await userEvent.type(secondField, "2"); // fill 2nd digit
    await userEvent.type(secondField, "{backspace}"); // delete 1st digit
    await userEvent.type(firstField, "{del}"); // delete 2nd digit and all subsequent digits
    expect(setPasswordValues).toHaveBeenCalledWith(["", "", "", ""]);
  });

  it("should move focus when user presses arrow keys", async () => {
    const setPasswordValues = jest.fn();
    render(
      <PasswordField
        active={true}
        title={"私人房間"}
        subTitle={"請輸入此房間密碼"}
        passwordValues={["1", "2", "", ""]}
        setPasswordValues={setPasswordValues}
      />
    );
    const passwordFields = screen.getAllByTestId(/input-password-\d/);
    const firstField = passwordFields[0];
    const secondField = passwordFields[1];
    const thirdField = passwordFields[2];
    await userEvent.type(firstField, "{arrowright}");
    await userEvent.type(secondField, "{arrowright}");
    await userEvent.type(thirdField, "{arrowleft}");
    expect(secondField).toHaveFocus();
  });
});
