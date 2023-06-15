// @flow strict
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import IconButton from './IconButton.js';

describe('IconButton', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event:
            | SyntheticMouseEvent<HTMLButtonElement>
            | SyntheticKeyboardEvent<HTMLButtonElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    const { getByRole } = render(
      <IconButton accessibilityLabel="test" icon="add" onClick={mockOnClick} />,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByRole('button').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a button with sequential keyboard navigation and forwards a ref to the innermost <button> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(<IconButton accessibilityLabel="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a link button with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <IconButton
        accessibilityLabel="test"
        icon="add"
        role="link"
        href="http://www.pinterest.com"
        ref={ref}
        target="blank"
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual(
      'http://www.pinterest.com/',
    );
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled link button', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <IconButton
        disabled
        accessibilityLabel="test"
        icon="add"
        role="link"
        href="http://www.pinterest.com"
        ref={ref}
        target="blank"
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
  });

  it('renders a disabled button', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(<IconButton disabled accessibilityLabel="test" icon="add" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.disabled).toEqual(true);
  });

  it('renders an IconButton removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(<IconButton accessibilityLabel="test" icon="add" ref={ref} tabIndex={-1} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders a link IconButton removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    render(
      <IconButton
        accessibilityLabel="test"
        icon="add"
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

  it('renders a link button with correct new tab announcement with and without accessibilityLabel', () => {
    render(
      <IconButton
        accessibilityLabel="Visit Pinterest"
        icon="visit"
        role="link"
        target="blank"
        href="https://www.pinterest.com"
        tooltip={{ text: 'Link example' }}
      />,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });
});
