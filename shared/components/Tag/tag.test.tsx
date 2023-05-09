import { cleanup, render, screen } from "@testing-library/react"
import Tag, { TagColor } from "./Tag"
import "@testing-library/jest-dom"
import React from "react"

describe("Tag", () => {
  afterEach(cleanup)

  it("renders children", () => {
    render(<Tag>Child Text</Tag>)
    expect(screen.getByText("Child Text")).toBeInTheDocument()
  })

  it("applies the correct color class based on the color prop", () => {
    const { rerender } = render(<Tag color={TagColor.GREEN}>Child Text</Tag>)
    expect(screen.getByText("Child Text")).toHaveClass("bg-green-500")

    rerender(<Tag color={TagColor.RED}>Child Text</Tag>)
    expect(screen.getByText("Child Text")).toHaveClass("bg-red-500")
  })

  it("applies the default color class when no color prop is provided", () => {
    render(<Tag>Child Text</Tag>)
    expect(screen.getByText("Child Text")).toHaveClass("bg-indigo-500")
  })
})
