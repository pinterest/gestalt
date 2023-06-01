// @flow strict
import { render } from '@testing-library/react';
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

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('News').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 0,
      }),
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('You').click();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        activeTabIndex: 1,
      }),
    );
  });
});
