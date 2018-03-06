/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import GroupAvatar from '../GroupAvatar';

describe('DefaultAvatar', () => {
  it('renders multi-byte character initials', () => {
    const tree = create(
      <GroupAvatar collaborators={[{ name: '💩 astral' }]} size="md" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders single-byte character initials', () => {
    const tree = create(
      <GroupAvatar collaborators={[{ name: 'Jane Smith' }]} size="md" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders 2 avatars', () => {
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

  it('renders 3 avatars', () => {
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

  it('renders more than 3 AVATAR_SIZES', () => {
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
});
