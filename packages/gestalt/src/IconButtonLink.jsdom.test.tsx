import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import IconButtonLink from './IconButtonLink';

describe('IconButtonLink', () => {
  it('handles click', () => {
    const mockOnClick = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void;
          event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<IconButtonLink accessibilityLabel="test" href="#" icon="add" onClick={mockOnClick} />);

    screen.getByRole('link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders with sequential keyboard navigation and forwards a ref to the innermost <a> element', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <IconButtonLink
        ref={ref}
        accessibilityLabel="test"
        href="http://www.pinterest.com"
        icon="add"
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
        ref={ref}
        accessibilityLabel="test"
        disabled
        href="http://www.pinterest.com"
        icon="add"
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
      <IconButtonLink ref={ref} accessibilityLabel="test" href="#" icon="add" tabIndex={-1} />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    expect(ref.current instanceof HTMLAnchorElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders with correct new tab announcement with accessibilityLabel', () => {
    render(
      <IconButtonLink
        accessibilityLabel="Visit Pinterest"
        href="https://www.pinterest.com"
        icon="visit"
        target="blank"
        tooltip={{ text: 'Link example' }}
      />,
    );

    expect(screen.getByLabelText('Visit Pinterest; Opens a new tab')).toBeVisible();
  });

  it('renders accessibilityLabel with no accessibilityLabel in Tooltip', () => {
    render(
      <IconButtonLink
        accessibilityLabel="Share Pin with friends"
        href="#"
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
      <IconButtonLink accessibilityLabel="Share" dataTestId={TEST_ID} href="#" icon="share" />,
    );
    expect(screen.getByTestId(TEST_ID, { exact: true })).toBeVisible();
  });
});
