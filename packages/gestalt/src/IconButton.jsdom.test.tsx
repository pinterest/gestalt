import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import IconButton from './IconButton';

describe('IconButton', () => {
  it('renders with icon', () => {
    const { container } = render(<IconButton accessibilityLabel="Pinterest" icon="pin" />);
    expect(container).toMatchSnapshot();
  });

  it('renders with disabled state', () => {
    const { container } = render(<IconButton accessibilityLabel="Pinterest" disabled icon="pin" />);
    expect(container).toMatchSnapshot();
  });

  it('renders with svg', () => {
    const { container } = render(
      <IconButton
        accessibilityLabel="Pinterest"
        dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with tooltip', () => {
    const { container } = render(
      <IconButton
        accessibilityLabel="Share"
        icon="share"
        tooltip={{
          text: 'This Pin is private unless you share it with others.',
          idealDirection: 'up',
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with tooltip and no accessibilityLabel', () => {
    const { container } = render(
      <IconButton
        accessibilityLabel="Share"
        icon="share"
        tooltip={{
          text: 'Share',
          idealDirection: 'up',
          accessibilityLabel: '',
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'button-test-123';
    render(<IconButton accessibilityLabel="Share" dataTestId={TEST_ID} icon="share" />);
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });

  it('handles click', () => {
    const mockOnClick = jest.fn<
      [
        {
          event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
        },
      ],
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<IconButton accessibilityLabel="test" icon="add" onClick={mockOnClick} />);
    screen.getByRole('button').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a button with sequential keyboard navigation and forwards a ref to the innermost <button> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
// @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<IconButton ref={ref} accessibilityLabel="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled button', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
// @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<IconButton ref={ref} accessibilityLabel="test" disabled icon="add" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.disabled).toEqual(true);
  });

  it('renders an IconButton removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
// @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<IconButton ref={ref} accessibilityLabel="test" icon="add" tabIndex={-1} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(-1);
  });
});
