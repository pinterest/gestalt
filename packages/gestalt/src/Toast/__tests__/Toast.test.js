// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Toast from '../Toast';

test('Confirmation Toast', () => {
  const tree = create(
    <Toast
      text={['Saved to', 'Home decor']}
      thumbnail={
        <img
          alt=""
          src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
        />
      }
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Guide Toast', () => {
  const tree = create(
    <Toast text="Same great profile, slightly new look. Learn more?" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Error Toast', () => {
  const tree = create(
    <Toast color="orange" text="Oops, we couldn't find that!" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
