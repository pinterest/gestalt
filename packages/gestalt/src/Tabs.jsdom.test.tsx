import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

describe('<Tabs />', () => {
  it('handles click', () => {
    const mockOnChange = jest.fn<
      [
        {
          readonly activeTabIndex: number;
          dangerouslyDisableOnNavigation: () => void;
          event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(
      <Tabs
        activeTabIndex={0}
        onChange={mockOnChange}
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
          { text: 'Messages', href: '#' },
        ]}
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
