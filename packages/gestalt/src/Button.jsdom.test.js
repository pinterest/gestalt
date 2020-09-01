// @flow strict
import React, { createRef } from 'react';
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

  it('forwards a ref to the innermost button element with type button', () => {
    const ref = createRef();
    render(<Button disabled text="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    // $FlowIgnore[prop-missing]
    expect(ref.current?.disabled).toEqual(true);
  });

  it('forwards a ref to the innermost a element with type link', () => {
    const ref = createRef();
    render(
      <Button text="test" role="link" href="test" ref={ref} target="blank" />
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    // $FlowIgnore[prop-missing]
    expect(ref.current?.target).toEqual('_blank');
  });
});
