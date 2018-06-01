// @flow
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
    const tree = create(<Avatar name="Jenny" outline />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the verified icon', () => {
    const tree = create(<Avatar name="Jammy" verified />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct src', () => {
    const tree = create(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct size - sm', () => {
    const tree = create(
      <Avatar
        name="Strava"
        src="http://pinterest.com/img/strave.png"
        size="sm"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct size - md', () => {
    const tree = create(
      <Avatar
        name="Strava"
        src="http://pinterest.com/img/strave.png"
        size="md"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct size - lg', () => {
    const tree = create(
      <Avatar
        name="Strava"
        src="http://pinterest.com/img/strave.png"
        size="lg"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
