import { render, screen } from '@testing-library/react';
import SegmentedControl from './SegmentedControl';

describe('<SegmentedControl />', () => {
  it('handles a click', () => {
    const mockOnChange = jest.fn<
      [
        {
          activeIndex: number;
          event: React.MouseEvent<HTMLButtonElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(
      <SegmentedControl items={['Item1', 'Item2']} onChange={mockOnChange} selectedItemIndex={0} />,
    );

    screen.getByText('Item1').click();
    expect(mockOnChange).toHaveBeenCalled();

    screen.getByText('Item2').click();
    expect(mockOnChange).toHaveBeenCalled();
  });
});
