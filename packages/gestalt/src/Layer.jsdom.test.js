// @flow strict
import { render, screen } from '@testing-library/react';
import Layer from './Layer.js';
import { FixedZIndex } from './zIndex.js';

describe('Layer in browser render', () => {
  if (typeof document !== 'undefined') {
    it('appends itself to body on mount', () => {
      const { body } = document;
      render(<Layer>content</Layer>);

      expect(body && body.contains(screen.getByText('content'))).toBeTruthy();
    });

    it('removes itself from body on unmount', () => {
      const { body } = document;
      const { unmount } = render(<Layer>content</Layer>);
      unmount();
      expect(body && body.contains(screen.queryByText('content'))).toBeFalsy();
    });

    it('sets the zIndex if it is defined', () => {
      render(<Layer zIndex={new FixedZIndex(200)}>content</Layer>);
      expect(screen.getByText('content').style.zIndex).toEqual('200');
    });
  }
});
