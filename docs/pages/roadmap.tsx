import { ReactNode } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';
import roadmapData from './RoadmapData.json';
import InternalOnlyIconButton from '../docs-components/InternalOnlyIconButton';
import MainSection from '../docs-components/MainSection';
import Page from '../docs-components/Page';
import PageHeader from '../docs-components/PageHeader';

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
}: {
  text: string;
  description: string;
  delivery: string;
  platforms: ReadonlyArray<Platform>;
}) {
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

export default function RoadmapPage() {
  const [inProgressItems, futureItems, completeItems, abandonedItems] = [
    inProgress,
    future,
    complete,
    abandoned,
  ].map((itemType) =>
    itemType.map((item) => (
      <Task
        key={item.task}
        delivery={item.deadline}
        description={item.description}
// @ts-expect-error - TS2322 - Type 'string[]' is not assignable to type 'readonly Platform[]'.
        platforms={item.platforms}
        text={item.task}
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
          <Link display="inline" href="/whats_new">
            What&apos;s New page.
          </Link>
        </Text>
        <Flex alignItems="center" gap={1}>
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
