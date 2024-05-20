import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import ButtonToggle from './ButtonToggle';

describe('ButtonToggle', () => {
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
    render(<ButtonToggle onClick={mockOnClick} text="ButtonText" />);
    screen.getByText('ButtonText').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a button and forwards a ref to the innermost <button> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<ButtonToggle ref={ref} text="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.textContent).toEqual('test');
  });

  it('renders a default button with sequential keyboard navigation and forwards a ref to the innermost <button> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<ButtonToggle ref={ref} text="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('button');
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled button', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<ButtonToggle ref={ref} disabled text="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.disabled).toEqual(true);
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'button-test-123';
    render(<ButtonToggle dataTestId={TEST_ID} iconStart="sparkle" size="lg" text="Default" />);
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
