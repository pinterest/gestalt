// @flow strict
import { render, screen } from '@testing-library/react';
import SegmentedControl from './SegmentedControl.js';

describe('<SegmentedControl />', () => {
  it('handles a click', () => {
    const mockOnChange = jest.fn<
      [{| activeIndex: number, event: SyntheticMouseEvent<HTMLButtonElement> |}],
      void,
    >();
    render(
      <SegmentedControl items={['Item1', 'Item2']} selectedItemIndex={0} onChange={mockOnChange} />,
    );

    screen.getByText('Item1').click();
    expect(mockOnChange).toHaveBeenCalled();

    screen.getByText('Item2').click();
    expect(mockOnChange).toHaveBeenCalled();
  });
});
