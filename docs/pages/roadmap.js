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
    'link': '',
  },
  {
    'task': 'Form component',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Badge component improvements',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'PageHeader component',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Side nav menu component',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Link component improvements',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'InfoButton integration in input components',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Gestalt Illustration Library',
    'deadline': 'Quarter 2',
    'status': 'inProgress',
    'platform': 'All',
    'link': '',
  },
  {
    'task': 'Gestalt animation support',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Messaging components',
    'deadline': 'Quarter 3',
    'status': 'inProgress',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Table component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Multi-select component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Pagination component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Modal/Sheet component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'link': '',
  },
  {
    'task': 'Popover component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'link': '',
  },
  {
    'task': 'Dropdown component',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Mobile web',
    'link': '',
  },
  {
    'task': 'Button component enhancements',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Button component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'link': '',
  },
  {
    'task': 'Button component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'iOS',
    'link': '',
  },
  {
    'task': 'IconButton component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'link': '',
  },
  {
    'task': 'IconButton component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'iOS',
    'link': '',
  },
  {
    'task': 'Icon component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'link': '',
  },
  {
    'task': 'Avatar component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Android',
    'link': '',
  },
  {
    'task': 'ButtonGroup component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'iOS',
    'link': '',
  },
  {
    'task': 'Filters component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'RadioGroup component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Dataviz component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Masonry component',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'App-level hooks w/in Gestalt',
    'deadline': '',
    'status': 'inProgress',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Design tokenization',
    'deadline': '',
    'status': 'inProgress',
    'platform': '',
    'link': '',
  },
];

const theme2 = [
  {
    'task': 'Gestalt docs IA update',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Visual search',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Public roadmap in Gestalt site',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': '',
    'link': '/roadmap',
  },
  {
    'task': 'Elevation visual guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Status component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'ok',
    'platform': 'Web',
    'link': '/status',
  },
  {
    'task': 'Datapoint component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Tag component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Badge component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Button component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'IconButton component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'inProgress',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'Modal/Sheet component design guidelines',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'Masonry component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Link component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Heading component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Text component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Tabs component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'Popover component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'Avatar component design guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'Product color visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Typographic visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Component scorecard',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Messaging pattern guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Dark mode visual guidelines',
    'deadline': 'Quarter 2',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'Icon component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Android/iOS',
    'link': '',
  },
  {
    'task': 'Checkbox component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Toast component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'RadioGroup component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Switch component design guidelines',
    'deadline': 'Quarter 3',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'TextArea component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'ButtonGroup component design guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Help/guidance pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Iconography pattern guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
  {
    'task': 'Extended color visual guidelines',
    'deadline': 'Quarter 4',
    'status': 'unstarted',
    'platform': '',
    'link': '',
  },
];

const theme3 = [
  {
    'task': 'Form autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Box duplicate props autofix',
    'deadline': 'Quarter 1',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Generalized prop naming autofix',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Generalized prop value change autofix',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
  },
  {
    'task': 'Build testing helpers library',
    'deadline': '',
    'status': 'unstarted',
    'platform': 'Web',
    'link': '',
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
  link,
}: {|
  text: string,
  platform: string,
  quarter: string,
  status: StatusType,
  link: string,
|}) {
  return (
    <Table.Row>
      <Table.Cell>
        {link ? (
          <Text underline>
            <Link href={link}>{text}</Link>
          </Text>
        ) : (
          <Text>{text}</Text>
        )}
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
      link={obj.link}
    />
  ));

  const theme2Items = theme2.map((obj) => (
    <TableRow
      key={obj.task}
      text={obj.task}
      platform={obj.platform}
      quarter={obj.deadline}
      status={obj.status}
      link={obj.link}
    />
  ));

  const theme3Items = theme3.map((obj) => (
    <TableRow
      key={obj.task}
      text={obj.task}
      platform={obj.platform}
      quarter={obj.deadline}
      status={obj.status}
      link={obj.link}
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
