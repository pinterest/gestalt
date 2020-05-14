// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Text from './Text.js';
import styles from './Tabs.css';
import layout from './Layout.css';

export default function Tabs({
  activeTabIndex,
  onChange,
  size = 'md',
  tabs,
  wrap,
}: {|
  activeTabIndex: number,
  onChange: ({
    event: SyntheticMouseEvent<>,
    activeTabIndex: number,
  }) => void,
  size?: 'md' | 'lg',
  tabs: Array<{|
    text: React.Node,
    href: string,
  |}>,
  wrap?: boolean,
|}) {
  const handleTabClick = (i: number, e: SyntheticMouseEvent<>) =>
    onChange({ activeTabIndex: i, event: e });

  return (
    <div
      className={classnames(
        styles.Tabs,
        wrap && layout.flexWrap,
        size === 'md' ? layout.medium : layout.large
      )}
      role="tablist"
    >
      {tabs.map(({ text, href }, i) => {
        const isActive = i === activeTabIndex;
        const cs = classnames(styles.tab, {
          [styles.tabIsNotActive]: !isActive,
          [styles.tabIsActive]: isActive,
        });
        return (
          <a
            aria-selected={isActive}
            className={cs}
            href={href}
            key={`${i}${href}`}
            onClick={(e: SyntheticMouseEvent<>) => handleTabClick(i, e)}
            role="tab"
          >
            <Text color={isActive ? 'white' : 'darkGray'} weight="bold">
              {text}
            </Text>
          </a>
        );
      })}
    </div>
  );
}

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.exact({
      text: PropTypes.node,
      href: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  wrap: PropTypes.bool,
};
