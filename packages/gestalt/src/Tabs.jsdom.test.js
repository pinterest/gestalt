// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Tabs from './Tabs.js';

describe('<Tabs />', () => {
  it('handles click', () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
          { text: 'Messages', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={mockOnChange}
      />,
    );

    getByText('News').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 0,
      }),
    );

    getByText('You').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 1,
      }),
    );
  });
});
