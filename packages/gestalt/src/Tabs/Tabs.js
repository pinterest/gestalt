// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Text from '../Text/Text';
import styles from './Tabs.css';

type Props = {|
  activeTabIndex: number,
  tabs: Array<{|
    text: any,
    href: string,
  |}>,
  onChange: ({
    event: SyntheticMouseEvent<>,
    activeTabIndex: number,
  }) => void,
|};

type State = {|
  focusedTabIndex: ?number,
  hoveredTabIndex: ?number,
|};

export default class Tabs extends React.Component<Props, State> {
  static propTypes = {
    activeTabIndex: PropTypes.number.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.exact({
        text: PropTypes.node,
        href: PropTypes.string,
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state: State = {
    focusedTabIndex: undefined,
    hoveredTabIndex: undefined,
  };

  handleTabClick = (i: number, e: SyntheticMouseEvent<>) => {
    const { onChange } = this.props;
    onChange({ activeTabIndex: i, event: e });
  };

  handleTabFocus = (i: number) => this.setState({ focusedTabIndex: i });
  handleTabBlur = () => this.setState({ focusedTabIndex: undefined });

  handleTabMouseEnter = (i: number) => this.setState({ hoveredTabIndex: i });
  handleTabMouseLeave = () => this.setState({ hoveredTabIndex: undefined });

  render() {
    const { tabs, activeTabIndex } = this.props;
    const { focusedTabIndex, hoveredTabIndex } = this.state;
    return (
      <div className={styles.Tabs} role="tablist">
        {tabs.map(({ text, href }, i) => {
          const isActive = i === activeTabIndex;
          const isHovered = i === hoveredTabIndex;
          const isFocused = i === focusedTabIndex;
          const cs = classnames(styles.tab, {
            [styles.tabIsNotActive]: !isActive,
            [styles.tabIsActive]: isActive,
          });
          return (
            <a
              aria-selected={isActive}
              className={cs}
              href={href}
              key={i}
              onClick={(e: SyntheticMouseEvent<>) => this.handleTabClick(i, e)}
              onFocus={() => this.handleTabFocus(i)}
              onBlur={this.handleTabBlur}
              onMouseEnter={() => this.handleTabMouseEnter(i)}
              onMouseLeave={this.handleTabMouseLeave}
              role="tab"
            >
              <Text
                bold
                color={isActive || isHovered || isFocused ? 'darkGray' : 'gray'}
                size="md"
              >
                {text}
              </Text>
            </a>
          );
        })}
      </div>
    );
  }
}
