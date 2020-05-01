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
      />
    );

    getByText('News').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 0,
      })
    );

    getByText('You').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 1,
      })
    );
  });

  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />
    );
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
        size="lg"
      />
    );
    expect(container.querySelector('.large')).toBeVisible();
  });
});
