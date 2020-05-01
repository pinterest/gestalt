// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Button from './Button.js';
import Link from './Link.js';
import Toast from './Toast.js';

describe('<Toast />', () => {
  test('Text Only', () => {
    const tree = create(
      <Toast text="Same great profile, slightly new look. Learn more?" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Red Toast', () => {
    const tree = create(
      <Toast
        color="red"
        text="Same great profile, slightly new look. Learn more?"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image', () => {
    const tree = create(
      <Toast
        thumbnail={
          <img
            alt=""
            src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
          />
        }
        text={
          <>
            Saved to{' '}
            <Link href="https://www.pinterest.com/search/pins/?q=home%20decor">
              Home decor
            </Link>
          </>
        }
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image + Button', () => {
    const tree = create(
      <Toast
        thumbnail={
          <img
            alt=""
            src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
          />
        }
        text={
          <>
            Saved to{' '}
            <Link href="https://www.pinterest.com/search/pins/?q=home%20decor">
              Home decor
            </Link>
          </>
        }
        button={<Button size="lg" text="Undo" />}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
