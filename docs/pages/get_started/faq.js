// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import Markdown from '../../docs-components/Markdown.js';
import Card from '../../docs-components/Card.js';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';

export default function ContainerPage(): Node {
  return (
    <Page title="Frequently asked questions">
      <PageHeader name="Frequently asked questions" type="guidelines" />
      <Card name="Gestalt usage">
        <Flex
          alignItems="start"
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Heading size="400">What are the benefits of using the Gestalt library?</Heading>
          <Text>
            Using Gestalt guarantees adherence and compliance to Pinterest design standards and best
            practices which results in UI and UX consistency across surfaces.
          </Text>
          <Text>
            Gestalt also provides:
            <ul>
              <li>Styled, tested, and accessible components</li>
              <li>Right-to-left, internationalization, and dark-mode support</li>
              <li>Low maintenance (automatic design and code updates cross-platform)</li>
              <li>Well-documented components and continuous Gestalt team support</li>
            </ul>
          </Text>
          <Text>
            Gestalt increases designers and developers velocity with the highest design and code
            quality.
          </Text>
        </Flex>
      </Card>
      <Card name="Component usage">
        <Flex
          alignItems="start"
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
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

          <Text>
            To add it to Gestalt, get a streamlined &amp; optimized version of the SVG not contain
            strokes / transforms / ...
          </Text>

          <Heading size="400">How do I add Gestalt as a dependency?</Heading>
          <Text>
            Import exact versions. ^1.37.0 is imprecise and could import v1.38.0 which could affect
            snapshots from version to version. Check{' '}
            <Link inline href="https://devhints.io/semver">
              <Text weight="bold">semver documentation</Text>
            </Link>{' '}
            for hints on the differences.
          </Text>

          <Heading size="400">How do I import components from Gestalt?</Heading>
          <Text>
            Add the following to your import declarations:
            <Markdown
              text="
~~~jsx
import { Button, Text } from 'gestalt';
~~~"
            />
          </Text>

          <Heading size="400">What&apos;s required to support IE11?</Heading>
          <Text>
            Gestalt supports IE11 currently, but you will need to use a polyfill because the css
            file uses css variables. Below is an example of how we set the polyfill up in the docs
            which should go in the &lt;head /&gt; of your html.
            <Markdown
              text={`
~~~jsx
// Load polyfills for IE 11
if (/MSIE \\d|Trident.*rv:/.test(navigator.userAgent)) {
  document.write(
    '<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>' +
    '<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"></script>'
  );
}
~~~
          `}
            />
          </Text>
        </Flex>
      </Card>
      <Card name="Component development">
        <Flex
          alignItems="start"
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Heading size="400">How do I get access to the Gestalt repo?</Heading>
          <Text>
            The{' '}
            <Link href="https://github.com/pinterest/gestalt" inline>
              <Text weight="bold">Gestalt repository</Text>
            </Link>{' '}
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
            What do we use for integration tests and how do we run the tests locally?{' '}
          </Heading>
          <Text>
            We use{' '}
            <Link href="https://playwright.dev/" inline>
              <Text weight="bold">Playwright</Text>
            </Link>{' '}
            for our integration tests. If you want to run the tests locally:
            <Markdown
              text={`
~~~bash
yarn playwright:test
~~~
          `}
            />
          </Text>

          <Heading size="400">Is there any internal Pinterest documentation for Gestalt?</Heading>
          <Text>
            If you&apos;re a Pinterest employee, you can visit Pinterest&apos;s web platform
            documentation for Gestalt{' '}
            <Link inline href="http://pinch.pinadmin.com/gestalt_wiki">
              <Text weight="bold">here.</Text>
            </Link>
          </Text>
        </Flex>
      </Card>
    </Page>
  );
}
