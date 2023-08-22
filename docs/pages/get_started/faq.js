// @flow strict
import { Fragment, type Node } from 'react';
import { Box, Flex, Heading, Link, List, Text } from 'gestalt';
import Card from '../../docs-components/Card.js';
import Markdown from '../../docs-components/Markdown.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';

function InlineLink({ children, href }: {| children: string, href: string |}) {
  return (
    <Fragment>
      {' '}
      <Link display="inlineBlock" href={href}>
        {children}
      </Link>{' '}
    </Fragment>
  );
}

export default function DocsPage(): Node {
  return (
    <Page title="Frequently asked questions">
      <PageHeader name="Frequently asked questions" type="guidelines" />

      <Card name="Gestalt usage">
        <Flex alignItems="start" direction="column" gap={4}>
          <Heading size="400">What are the benefits of using the Gestalt library?</Heading>
          <Text>
            Using Gestalt guarantees adherence and compliance to Pinterest design standards and best
            practices which results in UI and UX consistency across surfaces.
          </Text>
          <List label="Gestalt also provides:">
            <List.Item text="Styled, tested, and accessible components" />
            <List.Item text="Right-to-left, internationalization, and dark-mode support" />
            <List.Item text="Low maintenance (automatic design and code updates cross-platform)" />
            <List.Item text="Well-documented components and continuous Gestalt team support" />
          </List>

          <Text>
            Gestalt increases designers and developers velocity with the highest design and code
            quality.
          </Text>
        </Flex>
      </Card>

      <Card name="Component usage">
        <Flex alignItems="start" direction="column" gap={4}>
          <Heading size="400">What is a boint?</Heading>
          <Text>
            A boint is a Pinterest specific unit of spacing that is equivalent to 4px. 1 boint =
            4px, 2 boints = 8px, etc.
          </Text>
          <Box>
            <Text>Gestalt component props such as margin and padding work with boint units.</Text>
            <Markdown
              text="
~~~bash
padding 0 .. 12
~~~"
            />
          </Box>

          <Heading size="400">How do I add Gestalt as a dependency?</Heading>
          <Text>
            Check out our
            <InlineLink href="/get_started/developers/installation">installation guide</InlineLink>
            for instructions. Note: we recommend using exact versions. ^1.37.0 is imprecise and
            could import v1.38.0, which could affect snapshots from version to version. Check
            <InlineLink href="https://devhints.io/semver">semver documentation</InlineLink>
            for hints on the differences.
          </Text>

          <Heading size="400">How do I import components from Gestalt?</Heading>
          <Text>
            Gestalt uses named exports — there is no default export. Simply import the components
            you need in your file:
            <Markdown
              text="
~~~jsx
import { Button, Text } from 'gestalt';
~~~"
            />
          </Text>

          <Heading size="400">How do I import Flow types from Gestalt?</Heading>
          <Text>
            You don&apos;t! We do not explicitly export our Flow types — any types that are
            available externally are considered internal and subject to breaking changes without
            warning. We also recommend against manually copying type values into your codebase, as
            those are also subject to change and you will need to manually update your copied types.
          </Text>
          <Text>
            The recommended way of accessing Gestalt types (e.g. for a wrapper component) is to use
            Flow&apos;s
            <InlineLink href="https://flow.org/en/docs/types/utilities/">utility types</InlineLink>
            to use the component&apos;s types directly:
          </Text>
          <Markdown
            text="
~~~jsx
$ElementType<React$ElementConfig<typeof ComponentName>, 'propName'>
~~~"
          />

          <Heading size="400">Does Gestalt have TypeScript support?</Heading>
          <Text>
            Yes. Gestalt officially supports and maintains TypeScript declaration files for our
            gestalt, gestalt-charts, and gestalt-datepicker packages.
          </Text>
        </Flex>
      </Card>

      <Card name="Component development">
        <Flex alignItems="start" direction="column" gap={4}>
          <Heading size="400">How do I get access to the Gestalt repo?</Heading>
          <Text>
            The
            <InlineLink href="https://github.com/pinterest/gestalt">Gestalt repository</InlineLink>
            is public and you do not need special permissions to make pull requests.
          </Text>

          <Heading size="400">How do I easily generate files for a component?</Heading>
          <Text>
            Run the following and replace &quot;ComponentName&quot; with the name of your component.
            <Markdown
              text="
~~~jsx
yarn generate ComponentName
~~~"
            />
          </Text>

          <Heading size="400">
            What do we use for integration tests and how do we run the tests locally?
          </Heading>
          <Text>
            We use <InlineLink href="https://playwright.dev/">Playwright</InlineLink>
            for our integration tests. If you want to run the tests locally:
            <Markdown
              text={`
~~~bash
yarn playwright:test
~~~
          `}
            />
          </Text>
          <Heading size="400">How do I update a visual snapshot for a specific test?</Heading>
          <Text>
            Run <code>yarn playwright:test</code> and specify a visual test file:
          </Text>
          <Markdown
            text="
~~~bash
yarn playwright:test visual-test/Video.spec.mjs --update-snapshots
~~~"
          />

          <Heading size="400">What is Gestalt teachings and how do I add a video?</Heading>
          <Heading size="400">Is there any internal Pinterest documentation for Gestalt?</Heading>
          <Text>
            If you&apos;re a Pinterest employee, you can visit
            <InlineLink href="http://pinch.pinadmin.com/gestalt_wiki">
              Pinterest&apos;s web platform documentation for Gestalt.
            </InlineLink>
          </Text>
        </Flex>
      </Card>
    </Page>
  );
}
