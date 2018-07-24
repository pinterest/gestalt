// @flow
import * as React from 'react';
import { Tabs } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Tabs"
    description={`Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels please use a SegmentedControl.`}
  />
);

card(
  <PropTable
    Component={Tabs}
    props={[
      {
        name: 'activeTabIndex',
        type: 'number',
        required: true,
      },
      {
        name: 'tabs',
        type: `Array<{| text: React.Node, href: string |}>`,
        required: true,
      },
      {
        name: 'onChange',
        type: `({ event: SyntheticMouseEvent<>, activeTabIndex: number }) => void`,
        required: true,
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    direction="row"
    defaultCode={`
class TabExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this.handleChange = this._handleChange.bind(this);
  }
  _handleChange({ activeTabIndex, event }) {
    event.preventDefault();
    this.setState({
      activeIndex: activeTabIndex
    });
  }
  render() {
    return (
      <Tabs
        tabs={[
          {
            text: "Boards",
            href: "#"
          },
          {
            text: "Pins",
            href: "#"
          },
          {
            text: "Topics",
            href: "#"
          }
        ]}
        activeTabIndex={this.state.activeIndex}
        onChange={this.handleChange}
      />
    );
  }
}
  `}
  />
);

export default cards;
