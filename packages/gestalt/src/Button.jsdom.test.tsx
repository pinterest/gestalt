import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
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
    render(<Button onClick={mockOnClick} text="ButtonText" />);
    screen.getByText('ButtonText').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a submit button and forwards a ref to the innermost <button> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<Button ref={ref} text="test" type="submit" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('submit');
  });

  it('renders a default button with sequential keyboard navigation and forwards a ref to the innermost <button> element', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<Button ref={ref} text="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('button');
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(0);
  });

  it('renders a disabled button', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<Button ref={ref} disabled text="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.disabled).toEqual(true);
  });

  it('renders a button removed from sequential keyboard navigation via tabIndex', () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    // @ts-expect-error - TS2322 - Type 'RefObject<HTMLAnchorElement | HTMLButtonElement>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
    render(<Button ref={ref} tabIndex={-1} text="test" />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current instanceof HTMLButtonElement && ref.current?.tabIndex).toEqual(-1);
  });

  it('renders with data-test-id', () => {
    const TEST_ID = 'button-test-123';
    render(<Button dataTestId={TEST_ID} iconEnd="visit" size="lg" text="Visit Pinterest" />);
    expect(
      screen.getByTestId(TEST_ID, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
