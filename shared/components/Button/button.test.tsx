import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '.'

describe('Button', () => {
  it('renders button text', () => {
    render(<Button />)

    const heading = screen.getByRole('button', {
      name: /Button/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
