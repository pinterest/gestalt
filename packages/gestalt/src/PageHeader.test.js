// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import PageHeader from './PageHeader.js';

describe('PageHeader', () => {
  it('renders', () => {
    const tree = create(<PageHeader title="Settings" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders subtext', () => {
    const tree = create(<PageHeader title="Settings" subtext="5 followers" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
