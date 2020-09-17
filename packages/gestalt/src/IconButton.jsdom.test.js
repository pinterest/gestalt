// @flow strict
import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import IconButton from './IconButton.js';

describe('IconButton', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <IconButton accessibilityLabel="test" icon="add" onClick={mockOnClick} />
    );
    getByRole('button').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a button and forwards a ref to the innermost <button> element', () => {
    const ref = createRef();
    render(<IconButton disabled accessibilityLabel="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(
      ref.current instanceof HTMLButtonElement && ref.current?.disabled
    ).toEqual(true);
  });

  it('renders a link button and forwards a ref to the innermost <a> element', () => {
    const ref = createRef();
    render(
      <IconButton
        accessibilityLabel="test"
        icon="add"
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
      <IconButton
        disabled
        accessibilityLabel="test"
        icon="add"
        role="link"
        href="http://www.pinterest.com"
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
