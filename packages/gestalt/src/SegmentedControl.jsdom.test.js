// @flow strict
import { render } from '@testing-library/react';
import SegmentedControl from './SegmentedControl.js';

describe('<SegmentedControl />', () => {
  it('handles a click', () => {
    const mockOnChange = jest.fn<
      [{| activeIndex: number, event: SyntheticMouseEvent<HTMLButtonElement> |}],
      void,
    >();
    const { getByText } = render(
      <SegmentedControl items={['Item1', 'Item2']} selectedItemIndex={0} onChange={mockOnChange} />,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('Item1').click();
    expect(mockOnChange).toHaveBeenCalled();

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('Item2').click();
    expect(mockOnChange).toHaveBeenCalled();
  });
});
