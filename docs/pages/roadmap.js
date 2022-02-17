// @flow strict
import { type Node } from 'react';
import { Flex, Icon, Text, TapArea, Tooltip, Link, Heading, Badge, Status, Table } from 'gestalt';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

const theme1 = [
  {
    'task': 'InfoButton component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Form component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'PageHeader component',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
  },
  {
    'task': 'Side nav menu component',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Link component',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'InfoButton integration in input components',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Gestalt Illustration Library',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
  },
  {
    'task': 'Gestalt Animation Support',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
  },
  {
    'task': 'Messaging components',
    'deadline': 'Quarter 3',
    'status': 'inProgress',
  },
  {
    'task': 'Table component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Multi-select component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Pagination component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Modal/Sheet mweb component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Popover mweb component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Dropdown mweb component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Web Button component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Android Button component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'iOS Button component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'iOS IconButton component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Android IconButton component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Android Icon component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Android Avatar component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'iOS ButtonGroup component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Filters component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'RadioGroup component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Dataviz component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Masonry component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'App-level hooks w/in Gestalt',
    'deadline': '',
    'status': 'inProgress',
  },
  {
    'task': 'Design tokenization',
    'deadline': '',
    'status': 'inProgress',
  },
];

const theme2 = [
  {
    'task': 'Gestalt docs IA update',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
  },
  {
    'task': 'Visual search',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Public roadmap',
    'deadline': 'Quarter 1',
    'status': 'ok',
  },
  {
    'task': 'Elevation visual guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Status docs unification',
    'deadline': 'Quarter 1',
    'status': 'ok',
  },
  {
    'task': 'Datapoint docs unification',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Tag docs unification',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Badge docs unification',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Button mobile component guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
  },
  {
    'task': 'IconButton mobile component guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
  },
  {
    'task': 'Modal/Sheet mobile guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Masonry docs unification',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Link docs unification',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Heading unification',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Text docs unification',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Tabs mobile guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Popover mobile guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Avatar mobile guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Product color visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Typographic visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Component scorecard',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Messaging pattern guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Dark Mode visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
  },
  {
    'task': 'Toast mobile guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
  },
  {
    'task': 'Icon mobile guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
  },
  {
    'task': 'Checkbox docs unification',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
  },
  {
    'task': 'Toast unification',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
  },
  {
    'task': 'RadioGroup docs unification',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
  },
  {
    'task': 'Switch docs unification',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
  },
  {
    'task': 'TextArea docs unification',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'ButtonGroup docs unification',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Help/guidance pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Iconography pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
  {
    'task': 'Extended color visual guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
  },
];

const theme3 = [
  {
    'task': 'Form autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Box duplicate props autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
  },
  {
    'task': 'Generalized prop naming autofix',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Generalized prop value change autofix',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Build testing helpers library',
    'deadline': '',
    'status': 'unstarted',
  },
];

function LockIcon({ size }: {| size: 12 | 14 |}) {
  return (
    <Tooltip text="Access is restricted to Pinterest employees" accessibilityLabel="">
      <TapArea rounding="circle">
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
  quarter,
  status,
}: {|
  text: string,
  quarter: string,
  status: StatusType,
|}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Flex gap={2} alignItems="center">
          <Text>{text}</Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        {quarter ? (
          <Badge text={quarter} />
        ) : (
          <Text size="100" weight="bold">
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
    <TableRow key={obj.task} text={obj.task} quarter={obj.deadline} status={obj.status} />
  ));

  const theme2Items = theme2.map((obj) => (
    <TableRow key={obj.task} text={obj.task} quarter={obj.deadline} status={obj.status} />
  ));

  const theme3Items = theme3.map((obj) => (
    <TableRow key={obj.task} text={obj.task} quarter={obj.deadline} status={obj.status} />
  ));
  /*
  const theme3Items = theme3.map((obj) => (
    <Flex.Item key={obj.task} flexBasis={0} minWidth={300} flex="grow">
      <ListElement key={obj.task} text={obj.task} quarter={obj.deadline} status={obj.status} />
    </Flex.Item>
  ));
  */

  return (
    <Page title="Upcoming work in 2022">
      <PageHeader name="Upcoming work in 2022" showSourceLink={false} />
      <Flex>
        <Text>
          <Link href="https://jira.pinadmin.com/secure/PortfolioPlanView.jspa?id=525&sid=530&vid=1684#plan/backlog">
            View full roadmap
          </Link>
        </Text>
        <LockIcon size={14} />
      </Flex>
      <Heading size="500">Components & design tokens</Heading>
      <Table accessibilityLabel="Components and design tokens" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Task</Text>
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

      <Heading size="500">System documentation</Heading>
      <Table accessibilityLabel="System documentation" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Task</Text>
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

      <Heading size="500">Tooling & infrastructure</Heading>
      <Table accessibilityLabel="Tooling & infrastructure" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Task</Text>
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
      <Flex direction="row" wrap>
        {theme1Items}
      </Flex>

      <Heading size="500">Documentation and stuff</Heading>
      <Flex direction="row" wrap>
        {theme2Items}
      </Flex>

      <Heading size="500">Stuff and stuff</Heading>
      <Flex direction="row" wrap>
        {theme3Items}
      </Flex>
      */}
    </Page>
  );
}
