// @flow strict
import { type Node } from 'react';
import { Icon, Text, TapArea, Tooltip, Link, Status } from 'gestalt';
import Page from '../components/Page.js';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';

const tasks = [
  {
    'task': 'InfoButton component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Creation of a component to provide contextual information for elements within a layout.',
    'link': '',
  },
  {
    'task': 'Form component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of a component to encapuslate and structure form elements in a layout.',
    'link': '',
  },
  {
    'task': 'Badge component improvements',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Web',
    'description': 'Expanding on Badge to include additional colors and states.',
    'link': '',
  },
  {
    'task': 'PageHeader component',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'Web',
    'description':
      'Adjustments to the existing PageHeader component to be more compatible with product needs.',
    'link': '',
  },
  {
    'task': 'Side nav menu component',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Creation of a baseline component to support side navigation layout patterns',
    'link': '',
  },
  {
    'task': 'Link component improvements',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'InfoButton integration in input components',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Providing the ability in form components to add an InfoButton to provide contextual help.',
    'link': '',
  },
  {
    'task': 'Gestalt illustration library',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'All',
    'description':
      'Creation of a baseline set of illustrations that cover high-frequency product states (e.g., Error, Success, Empty).',
    'link': '',
  },
  {
    'task': 'Gestalt animation support',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Built-in animation capabilities within Gestalt to support high-frequency UI transitions within the product.',
    'link': '',
  },
  {
    'task': 'Messaging components',
    'deadline': 'Quarter 3',
    'status': 'inProgress',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Table component enhancements',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Multi-select component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Pagination component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Modal/Sheet component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Popover component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Dropdown component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Button component update',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'Visual updates to the Button component on the Web platform',
    'link': '',
  },
  {
    'task': 'Button component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'IconButton component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Icon component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Avatar component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'ButtonGroup component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'iOS',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Filters component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'RadioGroup component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Dataviz component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Masonry component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'App-level hooks w/in Gestalt',
    'deadline': '',
    'status': 'inProgress',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Design tokenization',
    'deadline': '',
    'status': 'inProgress',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Gestalt docs IA update',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': '',
    'description':
      'Update of the Gestalt docs site&rsquo;s information architecture to support pattern guidelines and mobile component documentation.',
    'link': '',
  },
  {
    'task': 'Visual search',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Public roadmap in Gestalt site',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': '',
    'description': 'Publish and maintain a public roadmap for Gestalt development.',
    'link': '/roadmap',
  },
  {
    'task': 'Elevation visual guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
    'description':
      'Development of usage guidelines and best practices for usage of elevation within Gestalt.',
    'link': '',
  },
  {
    'task': 'Status component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Status web documentation.',
    'link': '/status',
  },
  {
    'task': 'Datapoint component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Datapoint web documentation.',
    'link': '',
  },
  {
    'task': 'Tag component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Tag web documentation.',
    'link': '',
  },
  {
    'task': 'Badge component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Badge web documentation.',
    'link': '',
  },
  {
    'task': 'Button component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Button mobile documentation.',
    'link': '',
  },
  {
    'task': 'IconButton component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to IconButton mobile documentation.',
    'link': '',
  },
  {
    'task': 'Modal/Sheet component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Modal/Sheet mobile documentation.',
    'link': '',
  },
  {
    'task': 'Masonry component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Masonry web documentation.',
    'link': '',
  },
  {
    'task': 'Link component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Link web documentation.',
    'link': '',
  },
  {
    'task': 'Heading component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Heading web documentation.',
    'link': '',
  },
  {
    'task': 'Text component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Text web documentation.',
    'link': '',
  },
  {
    'task': 'Tabs component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Tabs mobile documentation.',
    'link': '',
  },
  {
    'task': 'Popover component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Popover mobile documentation.',
    'link': '',
  },
  {
    'task': 'Avatar component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Avatar mobile documentation.',
    'link': '',
  },
  {
    'task': 'Product color visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Typographic visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Component scorecard',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Messaging pattern guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Dark mode visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Toast mobile documentation.',
    'link': '',
  },
  {
    'task': 'Icon component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'description':
      'Addition of best practices, accessibility, localization and related components to Icon mobile documentation.',
    'link': '',
  },
  {
    'task': 'Checkbox component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Checkbox web documentation.',
    'link': '',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Toast web documentation.',
    'link': '',
  },
  {
    'task': 'RadioGroup component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to RadioGroup web documentation.',
    'link': '',
  },
  {
    'task': 'Switch component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to Switch web documentation.',
    'link': '',
  },
  {
    'task': 'TextArea component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to TextArea web documentation.',
    'link': '',
  },
  {
    'task': 'ButtonGroup component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'description':
      'Addition of best practices, accessibility, localization and related components to ButtonGroup web documentation.',
    'link': '',
  },
  {
    'task': 'Help/guidance pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Iconography pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Extended color visual guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Form autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Box duplicate props autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Generalized prop naming autofix',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Generalized prop value change autofix',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
  {
    'task': 'Build testing helpers library',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'description': 'TBD',
    'link': '',
  },
];

const inProgress = tasks.filter((x) => x.status === 'inProgress');

const future = tasks.filter((x) => x.status === 'unstarted');

const complete = tasks.filter((x) => x.status === 'ok');

const LockIcon = function LockIcon({ size }: {| size: 12 | 14 |}) {
  return (
    <Tooltip text="Access is restricted to Pinterest employees" accessibilityLabel="" inline>
      <TapArea rounding="circle" fullWidth={false}>
        <Icon
          accessibilityLabel="Access is restricted to Pinterest employees"
          icon="lock"
          size={size}
        />{' '}
      </TapArea>
    </Tooltip>
  );
};

type StatusType = 'unstarted' | 'inProgress' | 'halted' | 'ok' | 'problem' | 'canceled' | 'warning';

function TaskStatus({ status }: {| status: StatusType |}) {
  let statusTitle = '';

  switch (status) {
    case 'unstarted':
      statusTitle = 'Not started';
      break;
    case 'inProgress':
      statusTitle = 'In progress';
      break;
    case 'ok':
      statusTitle = 'Complete';
      break;
    default:
      statusTitle = '';
  }

  return <Status type={status} title={statusTitle} />;
}

function Task({ text, description }: {| text: string, description: string |}) {
  return <MainSection.Subsection title={text} description={description} />;
}

export default function RoadmapPage(): Node {
  const theme1Items = inProgress.map((obj) => (
    <Task key={obj.task} text={obj.task} description={obj.description} />
  ));

  const theme2Items = future.map((obj) => (
    <Task key={obj.task} text={obj.task} description={obj.description} />
  ));

  const theme3Items = complete.map((obj) => (
    <Task key={obj.task} text={obj.task} description={obj.description} />
  ));

  return (
    <Page title="Upcoming work in 2022">
      <PageHeader name="Upcoming work in 2022" showSourceLink={false} />

      <Text>
        The following reflects all public-facing work the Gestalt team plans to ship in 2022. To see
        the full list of work our team plans to take on, please visit our
        <Link href="https://jira.pinadmin.com/secure/PortfolioPlanView.jspa?id=525&sid=530&vid=1684#plan/backlog">
          internal roadmap <LockIcon size={14} />
        </Link>
      </Text>
      <MainSection name="In progress">{theme1Items}</MainSection>
      <MainSection name="Upcoming">{theme2Items}</MainSection>
      <MainSection name="Complete">{theme3Items}</MainSection>
    </Page>
  );
}
