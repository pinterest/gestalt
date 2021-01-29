// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Tabs from './Tabs.js';

describe('<Tabs />', () => {
  test('Only add aria-selected to the active tab', () => {
    const instance = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
          { text: 'Messages', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />,
    ).root;
    const links = instance.findAll((element) => element.type === 'a');
    expect(links && links[0].props['aria-selected']).toEqual(true);
    expect(links && links[1].props['aria-selected']).toEqual(false);
    expect(links && links[2].props['aria-selected']).toEqual(false);
  });

  test('Adds id only if given', () => {
    const instance = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#', id: 'news-tab' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />,
    ).root;

    const links = instance.findAll((element) => element.type === 'a');
    expect(links && links[0].props.id).toEqual('news-tab');
    expect(links && links[1].props.id).toBeUndefined();
  });

  test('matches snapshot with default props', () => {
    const tree = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot with lg size and wrap', () => {
    const tree = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#' },
          { text: 'You', href: '#' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
        size="lg"
        wrap
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('matches snapshot with dot indicators', () => {
    const tree = create(
      <Tabs
        tabs={[
          { text: 'News', href: '#', indicator: 'dot' },
          { text: 'You', href: '#', indicator: 'dot' },
        ]}
        activeTabIndex={0}
        onChange={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
