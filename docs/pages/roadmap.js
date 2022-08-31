// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text, Link } from 'gestalt';
import Page from '../docs-components/Page.js';
import MainSection from '../docs-components/MainSection.js';
import PageHeader from '../docs-components/PageHeader.js';
// $FlowExpectedError[untyped-import]
import roadmapData from './RoadmapData.json';
import InternalOnlyIconButton from '../docs-components/InternalOnlyIconButton.js';

const inProgress = roadmapData.tasks.filter((x) => x.status === 'inProgress');

const future = roadmapData.tasks.filter((x) => x.status === 'unstarted');

const complete = roadmapData.tasks.filter((x) => x.status === 'ok');

const abandoned = roadmapData.tasks.filter((x) => x.status === 'problem');

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
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 2,
        }}
      >
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
  const inProgressItems = inProgress.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  const futureItems = future.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  const completeItems = complete.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery={obj.deadline}
      platform={obj.platform}
    />
  ));

  const abandonedItems = abandoned.map((obj) => (
    <Task
      key={obj.task}
      text={obj.task}
      description={obj.description}
      delivery=""
      platform={obj.platform}
    />
  ));

  return (
    <Page title={`Gestalt ${roadmapData.year} roadmap`}>
      <PageHeader name={`Gestalt ${roadmapData.year} roadmap`} type="guidelines" />
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 4,
        }}
      >
        <Text>
          {`The following reflects all public-facing work the Gestalt team plans to ship in ${roadmapData.year}.`}
        </Text>
        <Flex
          gap={{
            row: 1,
            column: 0,
          }}
          alignItems="center"
        >
          <Text>
            <Link
              href="https://jira.pinadmin.com/secure/PortfolioPlanView.jspa?id=525&sid=530&vid=1684#plan/backlog"
              inline
            >
              Visit our internal roadmap <InternalOnlyIconButton />
            </Link>
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 12,
        }}
      >
        <MainSection name="In progress">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            {inProgressItems}
          </Flex>
        </MainSection>
        <MainSection name="Upcoming">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            {futureItems}
          </Flex>
        </MainSection>
        <MainSection name="Complete">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            {completeItems}
          </Flex>
        </MainSection>
        <MainSection name="Abandoned">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            {abandonedItems}
          </Flex>
        </MainSection>
      </Flex>
    </Page>
  );
}
