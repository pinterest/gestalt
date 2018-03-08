// @flow
import * as React from 'react';
import { Tabs } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

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
        type: `Array<{| text: any, href: string |}>`,
        required: true,
      },
      {
        name: 'onChange',
        type: `({ event: SyntheticMouseEvent<>, activeTabIndex: number }) => void`,
        required: true,
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    name="Example"
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
    scope={{ Tabs }}
  />
);

export default () => <CardPage cards={cards} />;
