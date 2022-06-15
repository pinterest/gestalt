// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Text, TapArea, Tooltip, Link } from 'gestalt';
import Page from '../components/Page.js';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
// $FlowExpectedError[untyped-import]
import roadmapData from './RoadmapData.json';

const inProgress = roadmapData.tasks.filter((x) => x.status === 'inProgress');

const future = roadmapData.tasks.filter((x) => x.status === 'unstarted');

const complete = roadmapData.tasks.filter((x) => x.status === 'ok');

export const LockIcon = function LockIcon({ size }: {| size: 12 | 16 |}) {
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

function Task({
  text,
  description,
  delivery,
  platform,
}: {|
  text: string,
  description: string,
  delivery: string,
  platform: string,
|}) {
  const title = platform ? `${text} (${platform})` : text;

  const desc = (
    <Box marginTop={-6}>
      <Flex direction="column" gap={2}>
        <Text>{description}</Text>
        {delivery ? (
          <Text size="100">
            Scheduled for {delivery}, {roadmapData.year}
          </Text>
        ) : null}
      </Flex>
    </Box>
  );

  return <MainSection.Subsection title={title}>{desc}</MainSection.Subsection>;
}

export default function RoadmapPage(): Node {
  const theme1Items = inProgress.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  const theme2Items = future.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  const theme3Items = complete.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  return (
    <Page title={`Gestalt ${roadmapData.year} roadmap`}>
      <PageHeader name={`Gestalt ${roadmapData.year} roadmap`} showSourceLink={false} />

      <Flex direction="column" gap={4}>
        <Text>
          {`The following reflects all public-facing work the Gestalt team plans to ship in ${roadmapData.year}.`}
        </Text>
        <Flex gap={1} alignItems="center">
          <Text>
            <Link
              href="https://jira.pinadmin.com/secure/PortfolioPlanView.jspa?id=525&sid=530&vid=1684#plan/backlog"
              inline
            >
              Visit our internal roadmap <LockIcon size={16} />
            </Link>
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap={12}>
        <MainSection name="In progress">
          <Flex direction="column" gap={8}>
            {theme1Items}
          </Flex>
        </MainSection>
        <MainSection name="Upcoming">
          <Flex direction="column" gap={8}>
            {theme2Items}
          </Flex>
        </MainSection>
        <MainSection name="Complete">
          <Flex direction="column" gap={8}>
            {theme3Items}
          </Flex>
        </MainSection>
      </Flex>
    </Page>
  );
}
