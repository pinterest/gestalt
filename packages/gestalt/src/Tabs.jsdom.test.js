// @flow strict
import { render, screen } from '@testing-library/react';
import Tabs from './Tabs.js';

describe('<Tabs />', () => {
  it('handles click', () => {
    const mockOnChange = jest.fn<
      [
        {|
          +activeTabIndex: number,
          dangerouslyDisableOnNavigation: () => void,
          event:
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>
            | SyntheticMouseEvent<HTMLDivElement>
            | SyntheticKeyboardEvent<HTMLDivElement>,
        |},
      ],
      void,
    >();
    render(
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

    screen.getByText('News').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 0,
      }),
    );

    screen.getByText('You').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 1,
      }),
    );
  });
});
