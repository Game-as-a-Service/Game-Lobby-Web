import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tag, { COLOR } from './Tag';

describe('Tag', () => {
  it('renders tag text', () => {
    render(<Tag color={COLOR.COLOR1}>123</Tag>);
    const tag = screen.getByText(/123/);
    expect(tag).toBeInTheDocument();
  });

  it('vaildate tag color', () => {
    render(<Tag color={COLOR.COLOR1}>123</Tag>);
    const tag = screen.getByText(/123/);
    expect(tag).toHaveClass(COLOR.COLOR1);
  });
});