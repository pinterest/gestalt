// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import ErrorMessage from './ErrorMessage.js';

describe('ErrorMessage', () => {
  it('with errorMessage', () => {
    const tree = create(
      <ErrorMessage errorMessage="some error message" id="test" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with no errorMessage', () => {
    const tree = create(<ErrorMessage id="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
