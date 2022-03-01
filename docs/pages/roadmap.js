// @flow strict
import { type Node } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  TapArea,
  Tooltip,
  Link,
  Heading,
  Badge,
  Status,
  Table,
} from 'gestalt';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

const theme1 = [
  {
    'task': 'InfoButton component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Form component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Badge component improvements',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Web',
  },
  {
    'task': 'PageHeader component',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'Web',
  },
  {
    'task': 'Side nav menu component',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Link component improvements',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'InfoButton integration in input components',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Gestalt Illustration Library',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'All',
  },
  {
    'task': 'Gestalt animation support',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Messaging components',
    'deadline': 'Quarter 3',
    'status': 'inProgress',
    'platform': 'Web',
  },
  {
    'task': 'Table component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Multi-select component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Pagination component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Modal/Sheet component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
  },
  {
    'task': 'Popover component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
  },
  {
    'task': 'Dropdown component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
  },
  {
    'task': 'Button component enhancements',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Button component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
  },
  {
    'task': 'Button component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'iOS',
  },
  {
    'task': 'IconButton component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
  },
  {
    'task': 'IconButton component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'iOS',
  },
  {
    'task': 'Icon component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
  },
  {
    'task': 'Avatar component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
  },
  {
    'task': 'ButtonGroup component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'iOS',
  },
  {
    'task': 'Filters component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'RadioGroup component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Dataviz component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Masonry component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'App-level hooks w/in Gestalt',
    'deadline': '',
    'status': 'inProgress',
    'platform': 'Web',
  },
  {
    'task': 'Design tokenization',
    'deadline': '',
    'status': 'inProgress',
    'platform': '',
  },
];

const theme2 = [
  {
    'task': 'Gestalt docs IA update',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': '',
  },
  {
    'task': 'Visual search',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Public roadmap in Gestalt site',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': '',
  },
  {
    'task': 'Elevation visual guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Status component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': 'Web',
  },
  {
    'task': 'Datapoint component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Tag component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Badge component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Button component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
  },
  {
    'task': 'IconButton component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
  },
  {
    'task': 'Modal/Sheet component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Android/iOS',
  },
  {
    'task': 'Masonry component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Link component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Heading component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Text component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Tabs component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
  },
  {
    'task': 'Popover component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
  },
  {
    'task': 'Avatar component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
  },
  {
    'task': 'Product color visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Typographic visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Component scorecard',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Messaging pattern guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Dark mode visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
  },
  {
    'task': 'Icon component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
  },
  {
    'task': 'Checkbox component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'RadioGroup  component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Switch  component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'TextArea  component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'ButtonGroup  component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Help/guidance pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Iconography pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
  },
  {
    'task': 'Extended color visual guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
  },
];

const theme3 = [
  {
    'task': 'Form autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Box duplicate props autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Generalized prop naming autofix',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Generalized prop value change autofix',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
  {
    'task': 'Build testing helpers library',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
  },
];

function LockIcon({ size }: {| size: 12 | 14 |}) {
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
}

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

function TableRow({
  text,
  platform,
  quarter,
  status,
}: {|
  text: string,
  platform: string,
  quarter: string,
  status: StatusType,
|}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Text>{text}</Text>
      </Table.Cell>
      <Table.Cell>
        {platform ? (
          <Text>{platform}</Text>
        ) : (
          <Text size="100" weight="bold" color="gray">
            &mdash;
          </Text>
        )}
      </Table.Cell>
      <Table.Cell>
        {quarter ? (
          <Badge text={quarter} />
        ) : (
          <Text size="100" weight="bold" color="gray">
            TBD
          </Text>
        )}
      </Table.Cell>
      <Table.Cell>
        <TaskStatus status={status} />
      </Table.Cell>
    </Table.Row>
  );
}

export default function RoadmapPage(): Node {
  const theme1Items = theme1.map((obj) => (
    <TableRow
      key={obj.task}
      text={obj.task}
      platform={obj.platform}
      quarter={obj.deadline}
      status={obj.status}
    />
  ));

  const theme2Items = theme2.map((obj) => (
    <TableRow
      key={obj.task}
      text={obj.task}
      platform={obj.platform}
      quarter={obj.deadline}
      status={obj.status}
    />
  ));

  const theme3Items = theme3.map((obj) => (
    <TableRow
      key={obj.task}
      text={obj.task}
      platform={obj.platform}
      quarter={obj.deadline}
      status={obj.status}
    />
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

      <Table accessibilityLabel="Components and design tokens">
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Components and design tokens</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Platform</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Delivery</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Status</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{theme1Items}</Table.Body>
      </Table>
      <Table accessibilityLabel="System documentation">
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">System documentation</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Platform</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Delivery</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Status</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{theme2Items}</Table.Body>
      </Table>
      <Table accessibilityLabel="Tooling and infrastructure">
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Tooling and infrastructure</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Platform</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Delivery</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Status</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{theme3Items}</Table.Body>
      </Table>
      {/*
      <Heading size="500">System documentation</Heading>
      <Table accessibilityLabel="System documentation" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Task</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Platform</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Delivery</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Status</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{theme2Items}</Table.Body>
      </Table>

      <Heading size="500">Tooling &amp; infrastructure</Heading>
      <Table accessibilityLabel="Tooling &amp; infrastructure" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Task</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Platform</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Delivery</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Status</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{theme3Items}</Table.Body>
      </Table>
      */}
    </Page>
  );
}
