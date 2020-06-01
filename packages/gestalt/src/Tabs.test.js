// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Tabs from './Tabs.js';

describe('<Tabs />', () => {
  test('Only add aria-selected to the active tab', () => {
    const tree = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
          { text: 'Messages', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />
    ).toJSON();

    const children = tree && tree.children;
    expect(children && children[0].props['aria-selected']).toEqual(true);
    expect(children && children[1].props['aria-selected']).toEqual(false);
    expect(children && children[2].props['aria-selected']).toEqual(false);
  });

  test('Adds id only if given', () => {
    const tree = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#', id: 'news-tab' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />
    ).toJSON();

    const children = tree && tree.children;
    expect(children && children[0].props.id).toEqual('news-tab');
    expect(children && children[1].props.id).toBeUndefined();
  });
});
