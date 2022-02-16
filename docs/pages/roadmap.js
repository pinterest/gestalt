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
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Form component',
    'deadline': 'Q1',
    'status': 'ok',
  },
  {
    'task': 'PageHeader component',
    'deadline': 'Q2',
    'status': 'inProgress',
  },
  {
    'task': 'Side nav menu component',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Link component',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'InfoButton integration in input components',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Messaging components',
    'deadline': 'Q3',
    'status': 'unstarted',
  },
  {
    'task': 'Table component',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Multi-select component',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Pagination component',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Modal/Sheet mweb component',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Popover mweb component',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Dropdown mweb component',
    'deadline': 'Q4',
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
    'status': 'unstarted',
  },
  {
    'task': 'Design tokenization',
    'deadline': '',
    'status': 'unstarted',
  },
];

const theme2 = [
  {
    'task': 'Gestalt docs IA update',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Visual search',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Public roadmap',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Component scorecard',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Elevation visual guidelines',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Product color visual guidelines',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Typographic visual guidelines',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Messaging pattern guidelines',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Dark Mode visual guidelines',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Help/guidance pattern guidelines',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Iconography pattern guidelines',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Extended color visual guidelines',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'Generated Docs for every component',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Status docs unification',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Datapoint docs unification',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Tag docs unification',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Badge docs unification',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Masonry docs unification',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Link docs unification',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Heading unification',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Text docs unification',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Checkbox docs unification',
    'deadline': 'Q3',
    'status': 'unstarted',
  },
  {
    'task': 'Toast unification',
    'deadline': 'Q3',
    'status': 'unstarted',
  },
  {
    'task': 'RadioGroup docs unification',
    'deadline': 'Q3',
    'status': 'unstarted',
  },
  {
    'task': 'Switch docs unification',
    'deadline': 'Q3',
    'status': 'unstarted',
  },
  {
    'task': 'TextArea docs unification',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
  {
    'task': 'ButtonGroup docs unification',
    'deadline': 'Q4',
    'status': 'unstarted',
  },
];

const theme3 = [
  {
    'task': 'Tooling: Testing support',
    'deadline': '',
    'status': 'unstarted',
  },
  {
    'task': 'Button mobile component guidelines',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'IconButton mobile component guidelines',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Modal/Sheet mobile guidelines',
    'deadline': 'Q1',
    'status': 'unstarted',
  },
  {
    'task': 'Tabs mobile guidelines',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Popover mobile guidelines',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Avatar mobile guidelines',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Toast mobile guidelines',
    'deadline': 'Q3',
    'status': 'unstarted',
  },
  {
    'task': 'Icon mobile guidelines',
    'deadline': 'Q3',
    'status': 'unstarted',
  },
  {
    'task': 'Gestalt Illustration Library',
    'deadline': 'Q2',
    'status': 'unstarted',
  },
  {
    'task': 'Gestalt Animation Support',
    'deadline': 'Q3',
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

function ListElement({
  text,
  quarter,
  complete,
}: {|
  text: string,
  quarter: string,
  complete: boolean,
|}) {
  return (
    <Box
      color={complete ? 'successWeak' : 'tertiary'}
      paddingX={4}
      flex="grow"
      marginBottom={2}
      marginEnd={2}
      height={64}
      rounding={2}
      overflow="hidden"
    >
      <Flex alignItems="center" height="100%">
        <Box flex="grow" marginEnd={4} overflow="hidden">
          <Heading size="100" lineClamp={1}>
            {text}
          </Heading>
        </Box>
        {quarter ? <Badge text={quarter} /> : null}
        {complete ? <Status type="ok" /> : null}
      </Flex>
    </Box>
  );
}

function TableRow({ text, quarter, status }: {| text: string, quarter: string, status: string |}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Flex gap={2} alignItems="center">
          <Status type={status} />
          <Text>{text}</Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>{quarter ? <Badge text={quarter} /> : <Text>TBD</Text>}</Table.Cell>
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
        <LockIcon />
      </Flex>
      <Heading size="500">Components and design tokens</Heading>
      <Table accessibilityLabel="Components and design tokens" stickyColumns={1}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Task</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Delivery</Text>
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
          </Table.Row>
        </Table.Header>
        <Table.Body>{theme2Items}</Table.Body>
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
