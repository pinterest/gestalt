// @flow
import * as React from 'react';
import Tabs from './Tabs';
import { ns, card, PropTable } from '../../.corkboard/cards';

ns(
  'Tabs',
  `Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels please use a SegmentedControl.`
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
  />,
  { heading: false }
);

card(
  'Demo',
  atom => {
    const state = atom.deref();
    return (
      <Tabs
        tabs={[
          {
            text: 'Boards',
            href: '#',
          },
          {
            text: 'Pins',
            href: '#',
          },
          {
            text: 'Done',
            href: '#',
          },
        ]}
        {...state}
        onChange={({ activeTabIndex, event }) => {
          event.preventDefault();
          atom.set(props => ({
            ...props,
            activeTabIndex,
          }));
        }}
      />
    );
  },
  { initialState: { activeTabIndex: 0 } }
);

// card(
//   'Example',
//   md`
// For the sake of a demo, this example doesn't use the default link behavior of Tabs. Please try to avoid this and use a SegmentedControl if you need this behavior.
// `,
//   <Example
//     defaultCode={`
// class TabsExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleTabChange = this._handleTabChange.bind(this);
//     this.state = { activeTabIndex: 0 };
//   }
//   _handleTabChange({ activeTabIndex, event }) {
//     event.preventDefault();
//     this.setState({ activeTabIndex });
//   }
// 	render() {
//     const tabContent = [
//       'Your basic account settings',
//       'Your profile settings',
//       'Your notification settings',
//       'Your homefeed settings',
//     ];
// 		return (
//       <Box>
//         <Tabs
//           activeTabIndex={this.state.activeTabIndex}
//           onChange={this.handleTabChange}
//           tabs={[
//             {
//               text: 'Account Basics',
//               href: '#',
//             },
//             {
//               text: 'Profile',
//               href: '#',
//             },
//             {
//               text: 'Notifications',
//               href: '#',
//             },
//             {
//               text: 'Homefeed',
//               href: '#',
//             },
//           ]}
//         />
//         <Box padding={2}>
//           {tabContent[this.state.activeTabIndex]}
//         </Box>
//       </Box>
//     );
//   }
// }
// `}
//     scope={{ Tabs }}
//   />,
//   { stacked: true }
// );
