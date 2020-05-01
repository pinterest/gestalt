// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import SegmentedControl from './SegmentedControl.js';

describe('<SegmentedControl />', () => {
  it('handles a click', () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <SegmentedControl
        items={['Item1', 'Item2']}
        selectedItemIndex={0}
        onChange={mockOnChange}
      />
    );

    getByText('Item1').click();
    expect(mockOnChange).toHaveBeenCalled();

    getByText('Item2').click();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <SegmentedControl
        items={['Item1', 'Item2']}
        selectedItemIndex={0}
        onChange={() => {}}
      />
    );
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <SegmentedControl
        items={['Item1', 'Item2']}
        selectedItemIndex={0}
        size="lg"
        onChange={() => {}}
      />
    );
    expect(container.querySelector('.large')).toBeVisible();
  });
});
