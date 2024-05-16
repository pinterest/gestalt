import { render, screen } from '@testing-library/react';
import Layer from './Layer';
import { FixedZIndex } from './zIndex';

describe('Layer in browser render', () => {
  if (typeof document !== 'undefined') {
    it('appends itself to body on mount', () => {
      const { body } = document;
// @ts-expect-error - TS2786 - 'Layer' cannot be used as a JSX component.
      render(<Layer>content</Layer>);

      expect(body && body.contains(screen.getByText('content'))).toBeTruthy();
    });

    it('removes itself from body on unmount', () => {
      const { body } = document;
// @ts-expect-error - TS2786 - 'Layer' cannot be used as a JSX component.
      const { unmount } = render(<Layer>content</Layer>);
      unmount();
      expect(body && body.contains(screen.queryByText('content'))).toBeFalsy();
    });

    it('sets the zIndex if it is defined', () => {
// @ts-expect-error - TS2786 - 'Layer' cannot be used as a JSX component.
      render(<Layer zIndex={new FixedZIndex(200)}>content</Layer>);
      expect(screen.getByText('content').style.zIndex).toEqual('200');
    });
  }
});
