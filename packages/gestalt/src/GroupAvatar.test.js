// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import GroupAvatar from './GroupAvatar.js';

describe('GroupAvatar', () => {
  it('renders multi-byte character initials', () => {
    const tree = create(
      <GroupAvatar collaborators={[{ name: '💩 astral' }]} size="md" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders single-byte character initials for 1 person', () => {
    const tree = create(
      <GroupAvatar collaborators={[{ name: 'Jane Smith' }]} size="md" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders single-byte character initials for 3 people', () => {
    const tree = create(
      <GroupAvatar
        collaborators={[
          { name: 'Jane Smith' },
          { name: 'Jane Smith' },
          { name: 'Jane Smith' },
        ]}
        size="md"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders avatars for 0 people', () => {
    const tree = create(<GroupAvatar collaborators={[]} size="md" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders avatars for 1 person', () => {
    const tree = create(
      <GroupAvatar
        collaborators={[{ name: 'Jane Smith', src: 'foo.png' }]}
        size="md"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders avatars for 2 people', () => {
    const tree = create(
      <GroupAvatar
        collaborators={[
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
        ]}
        size="md"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders avatars for 3 people', () => {
    const tree = create(
      <GroupAvatar
        collaborators={[
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
        ]}
        size="md"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders avatars for more than 3 AVATAR_SIZES', () => {
    const tree = create(
      <GroupAvatar
        collaborators={[
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
        ]}
        size="md"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an outline', () => {
    const tree = create(
      <GroupAvatar
        collaborators={[
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
        ]}
        outline
        size="md"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with container-based sizing', () => {
    const tree = create(
      <GroupAvatar
        collaborators={[
          { name: 'Jane Smith', src: 'foo.png' },
          { name: 'Jane Smith', src: 'foo.png' },
        ]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
