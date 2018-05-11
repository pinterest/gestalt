/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders multi-byte character initials', () => {
    const component = create(<Avatar name="💩 astral" />, {
      createNodeMock() {
        return { clientWidth: 100 };
      },
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an outline', () => {
    const tree = create(<Avatar outline name="Jenny" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
