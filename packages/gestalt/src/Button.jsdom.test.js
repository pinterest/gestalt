// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button.js';

describe('Button', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button text="ButtonText" onClick={mockOnClick} />
    );
    getByText('ButtonText').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('forwards a ref to the innermost button element', () => {
    const ref = React.createRef();
    render(<Button disabled text="test" type="submit" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('submit');
  });
});
