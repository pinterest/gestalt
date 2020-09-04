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

  it('renders a submit button and forwards a ref to the innermost <button> element', () => {
    const ref = createRef();
    render(<Button type="submit" text="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('submit');
  });

  it('renders a default button and forwards a ref to the innermost <button> element', () => {
    const ref = createRef();
    render(<Button text="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('button');
  });

  it('renders a link button and forwards a ref to the innermost <a> element', () => {
    const ref = createRef();
    render(
      <Button
        text="test"
        role="link"
        href="http://www.pinterest.com"
        ref={ref}
        target="blank"
      />
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(
      ref.current instanceof HTMLAnchorElement && ref.current?.href
    ).toEqual('http://www.pinterest.com/');
  });

  it('renders a disabled link button', () => {
    const ref = createRef();
    render(
      <Button
        text="test"
        role="link"
        href="http://www.pinterest.com"
        disabled
        ref={ref}
        target="blank"
      />
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(
      ref.current instanceof HTMLAnchorElement && ref.current?.href
    ).toEqual('');
  });
});
