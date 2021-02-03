// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Layer from './Layer.js';

describe('Layer in server render', () => {
  it('does not use createPortal or render content', () => {
    // Only run test in server context
    if (typeof document !== 'undefined') {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(true).toEqual(true);
      return;
    }

    const tree = create(<Layer>content</Layer>).toJSON();
    expect(tree?.type).toBe('div');
  });
});
