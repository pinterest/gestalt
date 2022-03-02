// @flow strict
import { createRef } from 'react';
import { render } from '@testing-library/react';
import Button from './Button.js';

describe('Button', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button text="ButtonText" onClick={mockOnClick} />);
    getByText('ButtonText').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a submit button and forwards a ref to the innermost <button> element', () => {
    const ref = createRef();
    render(<Button type="submit" text="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('submit');
  });

  it('renders a default button with sequential keyboard navigation and forwards a ref to the innermost <button> element', () => {
    const ref = createRef();
    render(<Button text="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('button');
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a link button with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef();
    render(
      <Button text="test" role="link" href="http://www.pinterest.com" ref={ref} target="blank" />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
      'http://www.pinterest.com/',
    );
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled button', () => {
    const ref = createRef();
    render(<Button text="test" disabled ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.disabled).toEqual(true);
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
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
  });

  it('renders a button removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef();
    render(<Button text="test" ref={ref} tabIndex={-1} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders a link button removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef();
    render(
      <Button
        text="test"
        role="link"
        href="http://www.pinterest.com"
        ref={ref}
        tabIndex={-1}
        target="blank"
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(-1);
  });
});
