// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import AvatarPair from './AvatarPair.js';

describe('AvatarPair', () => {
  it('Renders renders 2 collaborators', () => {
    const component = create(
      <AvatarPair
        collaborators={[
          {
            name: 'Keerthi',
            src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
          },
          {
            name: 'Shanice',
            src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
          },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders renders the avatar with text when no image is provided', () => {
    const component = create(
      <AvatarPair
        collaborators={[
          {
            name: 'Keerthi',
            src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
          },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Renders only the first 2 collobarators when multiple are passed in', () => {
    const component = create(
      <AvatarPair
        collaborators={[
          {
            name: 'Keerthi',
            src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
          },
          {
            name: 'Shanice',
            src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
          },
          {
            name: 'James',
            src: 'https://i.ibb.co/7tGKGvb/james.jpg',
          },
        ]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
