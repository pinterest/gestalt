// @flow strict
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import IconButtonLink from './IconButtonLink.js';

describe('IconButtonLink', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    render(<IconButtonLink href="#" accessibilityLabel="test" icon="add" onClick={mockOnClick} />);

    screen.getByRole('link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <IconButtonLink
        accessibilityLabel="test"
        icon="add"
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

  it('renders disabled', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <IconButtonLink
        disabled
        accessibilityLabel="test"
        icon="add"
        href="http://www.pinterest.com"
        ref={ref}
        target="blank"
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.href).toEqual('');
  });

  it('renders removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <IconButtonLink href="#" accessibilityLabel="test" icon="add" ref={ref} tabIndex={-1} />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders with correct new tab announcement with accessibilityLabel', () => {
    render(
      <IconButtonLink
        accessibilityLabel="Visit Pinterest"
        icon="visit"
        target="blank"
        href="https://www.pinterest.com"
        tooltip={{ text: 'Link example' }}
      />,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });

  it('renders accessibilityLabel with no accessibilityLabel in Tooltip', () => {
    render(
      <IconButtonLink
        href="#"
        accessibilityLabel="Share Pin with friends"
        icon="share"
        tooltip={{
          text: 'Share',
          idealDirection: 'up',
          accessibilityLabel: '',
        }}
      />,
    );
    expect(screen.getByLabelText('Share Pin with friends')).toBeVisible();
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'button-test-123';
    render(
      <IconButtonLink href="#" dataTestId={TEST_ID} accessibilityLabel="Share" icon="share" />,
    );
    expect(screen.getByTestId(TEST_ID, { exact: true })).toBeVisible();
  });
});
