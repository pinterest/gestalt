// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import IconButton from './IconButton.js';

describe('IconButton', () => {
  it('forwards a ref to the innermost button element', () => {
    const ref = React.createRef();
    render(<IconButton disabled accessibilityLabel="test" ref={ref} />);
    expect(ref.current instanceof HTMLButtonElement).toEqual(true);
    expect(ref.current?.type).toEqual('button');
  });
});
