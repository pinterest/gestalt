// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Layer from './Layer.js';

describe('Layer in browser render', () => {
  if (typeof document !== 'undefined') {
    it('appends itself to body on mount', () => {
      const { body } = document;
      const { getByText } = render(<Layer>content</Layer>);
      const element = getByText('content');
      expect(body && body.contains(element)).toBeTruthy();
    });

    it('removes itself from body on unmount', () => {
      const { body } = document;
      const { getByText, unmount } = render(<Layer>content</Layer>);
      const element = getByText('content');
      unmount();
      expect(body && body.contains(element)).toBeFalsy();
    });
  }
});
