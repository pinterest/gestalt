// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text, TapArea, Tooltip, Link, Heading, Badge, Status } from 'gestalt';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

const theme1 = [
  {
    'task': 'InfoButton component',
    'deadline': 'Q1',
  },
  {
    'task': 'Form component',
    'deadline': 'Q1',
  },
  {
    'task': 'PageHeader component',
    'deadline': 'Q2',
  },
  {
    'task': 'Side nav menu component',
    'deadline': 'Q2',
  },
  {
    'task': 'Link component',
    'deadline': 'Q2',
  },
  {
    'task': 'InfoButton integration in input components',
    'deadline': 'Q2',
  },
  {
    'task': 'Messaging components',
    'deadline': 'Q3',
  },
  {
    'task': 'Table component',
    'deadline': 'Q4',
  },
  {
    'task': 'Multi-select component',
    'deadline': 'Q4',
  },
  {
    'task': 'Pagination component',
    'deadline': 'Q4',
  },
  {
    'task': 'Modal/Sheet mweb component',
    'deadline': 'Q4',
  },
  {
    'task': 'Popover mweb component',
    'deadline': 'Q4',
  },
  {
    'task': 'Dropdown mweb component',
    'deadline': 'Q4',
  },
  {
    'task': 'Web Button component',
    'deadline': '',
  },
  {
    'task': 'Android Button component',
    'deadline': '',
  },
  {
    'task': 'iOS Button component',
    'deadline': '',
  },
  {
    'task': 'iOS IconButton component',
    'deadline': '',
  },
  {
    'task': 'Android IconButton component',
    'deadline': '',
  },
  {
    'task': 'Android Icon component',
    'deadline': '',
  },
  {
    'task': 'Android Avatar component',
    'deadline': '',
  },
  {
    'task': 'iOS ButtonGroup component',
    'deadline': 'Q4',
  },
  {
    'task': 'Filters component',
    'deadline': '',
  },
  {
    'task': 'RadioGroup component',
    'deadline': '',
  },
  {
    'task': 'Dataviz component',
    'deadline': '',
  },
  {
    'task': 'Masonry component',
    'deadline': '',
  },
  {
    'task': 'App-level hooks w/in Gestalt',
    'deadline': '',
  },
  {
    'task': 'Design tokenization',
    'deadline': '',
  },
];

const theme2 = [
  {
    'task': 'Gestalt docs IA update',
    'deadline': 'Q1',
  },
  {
    'task': 'Visual search',
    'deadline': 'Q1',
  },
  {
    'task': 'Public roadmap',
    'deadline': 'Q1',
  },
  {
    'task': 'Component scorecard',
    'deadline': 'Q2',
  },
  {
    'task': 'Elevation visual guidelines',
    'deadline': 'Q1',
  },
  {
    'task': 'Product color visual guidelines',
    'deadline': 'Q2',
  },
  {
    'task': 'Typographic visual guidelines',
    'deadline': 'Q2',
  },
  {
    'task': 'Messaging pattern guidelines',
    'deadline': 'Q2',
  },
  {
    'task': 'Dark Mode visual guidelines',
    'deadline': 'Q2',
  },
  {
    'task': 'Help/guidance pattern guidelines',
    'deadline': 'Q4',
  },
  {
    'task': 'Iconography pattern guidelines',
    'deadline': 'Q4',
  },
  {
    'task': 'Extended color visual guidelines',
    'deadline': 'Q4',
  },
  {
    'task': 'Generated Docs for every component',
    'deadline': '',
  },
  {
    'task': 'Status docs unification',
    'deadline': 'Q1',
  },
  {
    'task': 'Datapoint docs unification',
    'deadline': 'Q1',
  },
  {
    'task': 'Tag docs unification',
    'deadline': 'Q1',
  },
  {
    'task': 'Badge docs unification',
    'deadline': 'Q1',
  },
  {
    'task': 'Masonry docs unification',
    'deadline': 'Q2',
  },
  {
    'task': 'Link docs unification',
    'deadline': 'Q2',
  },
  {
    'task': 'Heading unification',
    'deadline': 'Q2',
  },
  {
    'task': 'Text docs unification',
    'deadline': 'Q2',
  },
  {
    'task': 'Checkbox docs unification',
    'deadline': 'Q3',
  },
  {
    'task': 'Toast unification',
    'deadline': 'Q3',
  },
  {
    'task': 'RadioGroup docs unification',
    'deadline': 'Q3',
  },
  {
    'task': 'Switch docs unification',
    'deadline': 'Q3',
  },
  {
    'task': 'TextArea docs unification',
    'deadline': 'Q4',
  },
  {
    'task': 'ButtonGroup docs unification',
    'deadline': 'Q4',
  },
];

const theme3 = [
  {
    'task': 'Tooling: Testing support',
    'deadline': '',
  },
  {
    'task': 'Mobile component guidelines',
    'deadline': '',
  },
  {
    'task': 'Button mobile component guidelines',
    'deadline': 'Q1',
  },
  {
    'task': 'IconButton mobile component guidelines',
    'deadline': 'Q1',
  },
  {
    'task': 'Modal/Sheet mobile guidelines',
    'deadline': 'Q1',
  },
  {
    'task': 'Tabs mobile guidelines',
    'deadline': 'Q2',
  },
  {
    'task': 'Popover mobile guidelines',
    'deadline': 'Q2',
  },
  {
    'task': 'Avatar mobile guidelines',
    'deadline': 'Q2',
  },
  {
    'task': 'Toast mobile guidelines',
    'deadline': 'Q3',
  },
  {
    'task': 'Icon mobile guidelines',
    'deadline': 'Q3',
  },
  {
    'task': 'Gestalt Illustration Library',
    'deadline': 'Q2',
  },
  {
    'task': 'Gestalt Animation Support',
    'deadline': 'Q3',
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
      minWidth={250}
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

export default function RoadmapPage(): Node {
  const theme1Items = theme1.map((obj) => (
    <ListElement key={obj.task} text={obj.task} quarter={obj.deadline} />
  ));

  const theme2Items = theme2.map((obj) => (
    <ListElement key={obj.task} text={obj.task} quarter={obj.deadline} />
  ));

  const theme3Items = theme3.map((obj) => (
    <ListElement key={obj.task} text={obj.task} quarter={obj.deadline} />
  ));

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
      <Heading size="500">Components and stuff</Heading>
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
    </Page>
  );
}
