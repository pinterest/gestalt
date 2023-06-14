// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import roadmapData from './RoadmapData.json';
import InternalOnlyIconButton from '../docs-components/InternalOnlyIconButton.js';
import MainSection from '../docs-components/MainSection.js';
import Page from '../docs-components/Page.js';
import PageHeader from '../docs-components/PageHeader.js';

export type Platform = 'Android' | 'iOS' | 'Mobile web' | 'Web';
export type Status = 'inProgress' | 'problem' | 'ok' | 'unstarted';

const inProgress = roadmapData.tasks.filter((x) => x.status === 'inProgress');

const future = roadmapData.tasks.filter((x) => x.status === 'unstarted');

const complete = roadmapData.tasks.filter((x) => x.status === 'ok');

const abandoned = roadmapData.tasks.filter((x) => x.status === 'problem');

function Task({
  text,
  description,
  delivery,
  platforms,
}: {|
  text: string,
  description: string,
  delivery: string,
  platforms: $ReadOnlyArray<Platform>,
|}) {
  return (
    <MainSection.Subsection
      title={platforms.length > 0 ? `${text} (${platforms.join('/')})` : text}
    >
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
    </MainSection.Subsection>
  );
}

export default function RoadmapPage(): Node {
  const [inProgressItems, futureItems, completeItems, abandonedItems] = [
    inProgress,
    future,
    complete,
    abandoned,
  ].map((itemType) =>
    itemType.map((item) => (
      <Task
        key={item.task}
        text={item.task}
        description={item.description}
        delivery={item.deadline}
        platforms={item.platforms}
      />
    )),
  );

  return (
    <Page title={`Gestalt ${roadmapData.year} roadmap`}>
      <PageHeader name={`Gestalt ${roadmapData.year} roadmap`} type="guidelines" />
      <Flex direction="column" gap={4}>
        <Text>
          {`The following reflects all public-facing work the Gestalt team plans to ship in ${roadmapData.year}.`}{' '}
          For more details on our latest updates, visit the{' '}
          <Link href="/whats_new" display="inline">
            What&apos;s New page.
          </Link>
        </Text>
        <Flex gap={1} alignItems="center">
          <Text>
            <Link
              href="https://jira.pinadmin.com/secure/PortfolioPlanView.jspa?id=525&sid=530&vid=1684#plan/backlog"
              underline="always"
            >
              Visit our internal roadmap <InternalOnlyIconButton />
            </Link>
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap={12}>
        {[
          {
            name: 'In progress',
            items: inProgressItems,
          },
          {
            name: 'Upcoming',
            items: futureItems,
          },
          {
            name: 'Complete',
            items: completeItems,
          },
          {
            name: 'Abandoned',
            items: abandonedItems,
          },
        ].map(({ name, items }) => (
          <MainSection key={name} name={name}>
            <Flex direction="column" gap={8}>
              {items}
            </Flex>
          </MainSection>
        ))}
      </Flex>
    </Page>
  );
}
