import {render, screen} from '@testing-library/react';
import InternalLink from './InternalLink';

test('InternalLink handles onClick callback', () => {
  const mockOnClick = jest.fn<[{
    dangerouslyDisableOnNavigation: () => void,
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>
  }], undefined>();
  render(
    <InternalLink
      href="https://example.com"
      onClick={mockOnClick}
      tabIndex={0}
      wrappedComponent="button"
    >
      InternalLink
    </InternalLink>,
  );
  screen.getByText('InternalLink').click();
  expect(mockOnClick).toHaveBeenCalled();
});
