// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import Markdown from '../components/Markdown.js';
import Card from '../components/Card.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';

export default function ContainerPage(): Node {
  return (
    <Page title="Frequently asked questions">
      <PageHeader name="Frequently asked questions" showSourceLink={false} />
      <Card name="Gestalt usage">
        <Flex alignItems="start" direction="column" gap={4}>
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
              <li>Low maintaince (automatic design and code updates cross-platform)</li>
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
        <Flex alignItems="start" direction="column" gap={4}>
          <Heading size="400">How can I visualize which components use Gestalt?</Heading>

          <Text>
            Use{' '}
            <Link href="https://codepen.io/christianv/pen/BxmOBe" inline>
              <Text weight="bold">Gestalt usage visualizer</Text>
            </Link>
          </Text>

          <Text weight="bold">Installation</Text>

          <Text>
            Drag this link: {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              inline
              // eslint-disable-next-line no-script-url, no-template-curly-in-string
              href="javascript:(function(){[...document.querySelectorAll('[style]'),...document.querySelectorAll('[class]')].filter(el=>[...el.classList].some(classname=>classname.length>3)||el.classList=='').forEach(el=>{el.setAttribute('style',`${el.getAttribute('style')||''};border:solid 1px#ff0000;`)})})();"
            >
              <Text weight="bold">Gestalt usage visualiser</Text>
            </Link>{' '}
            into your bookmarks toolbar. If you do not see the bookmarks toolbar, go to View and
            select &apos;Show Bookmarks Bar&apos;.
          </Text>

          <Text weight="bold">Usage</Text>

          <Text>
            <ul>
              <li>Click the link in the bookmark bar.</li>
              <li>
                Red is bad: all places that are not using Gestalt will have a red border around
                them.
              </li>
              <li>Everything else is Gestalt (or using inline styles).</li>
            </ul>
          </Text>

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

          <Heading size="400">How can add a new icon?</Heading>
          <Text>
            If you need an icon that is not listed on our{' '}
            <Link inline href="/Icon">
              <Text weight="bold">docs</Text>{' '}
            </Link>{' '}
            for an experiment, use the <code>dangerouslySetSvgPath</code> prop on Icon. If the asset
            is ready, we will happily add the icon to Gestalt!
          </Text>
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
        <Flex alignItems="start" direction="column" gap={4}>
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
            <Link href="https://docs.cypress.io/" inline>
              <Text weight="bold">Cypress</Text>
            </Link>{' '}
            for our integration test. If you want to run the tests locally:
            <Markdown
              text={`
~~~bash
yarn docs
yarn cypress run
~~~
          `}
            />
          </Text>

          <Heading size="400">What is Gestalt teachings and how do I add a video?</Heading>
          <Text>
            <Link
              inline
              href="https://www.youtube.com/playlist?list=PLbmG-F9A233J1ID2Nl-zwfYNnhazHLZzV"
            >
              <Text weight="bold">Gestalt teachings</Text>
            </Link>{' '}
            is a youtube video playlist containing tips and tricks on how to use Gestalt. Use{' '}
            <Link
              inline
              href="https://www.youtube.com/playlist?list=PLbmG-F9A233J1ID2Nl-zwfYNnhazHLZzV&amp;jct=cIfcNOunrGwHcEAbFodTthlHYhkvWw"
            >
              <Text weight="bold">this special collaboration link</Text>
            </Link>{' '}
            to add your own videos to this list.
          </Text>
        </Flex>
      </Card>
      <Card name="Automated releases">
        <Flex alignItems="start" direction="column" gap={4}>
          <Heading size="400">How does versioning work in Gestalt?</Heading>
          <Text>
            The Gestalt library development approach is continuous releasing. Each major, minor, and
            patch change is merged to master and released as the latest supported Gestalt version.{' '}
            <Link href="https://github.com/pinterest/gestalt/releases" inline>
              <Text weight="bold">Check the release log.</Text>
            </Link>
          </Text>
          <Text>
            When a release will cause breaking changes — in usage or in typing — we provide a
            codemod to ease the upgrade process.{' '}
            <Link href="https://gestalt.pinterest.systems/Installation#Codemods" inline>
              <Text weight="bold">Read more about Codemods.</Text>
            </Link>
          </Text>
          <Heading size="400">
            My pull request fails on &quot;Semver / Require Label (pull_request)&quot;, how do I fix
            it?
          </Heading>
          <Text>Nothing you can do to fix it.</Text>
          <Text>
            A Gestalt Core maintainer will add a semver label (patch release / minor release / major
            release) when reviewing a PR..
          </Text>

          <Heading size="400">How do these automated releases work under the hood?</Heading>
          <Text>
            Automated releases use{' '}
            <Link href="https://github.com/features/actions" inline>
              <Text weight="bold">GitHub actions</Text>
            </Link>
            &nbsp;with the{' '}
            <Link
              href="https://github.com/pinterest/gestalt/blob/455e6d3bdc7caad0ca0991d692fb65219eea8353/.github/workflows/release.yml"
              inline
            >
              <Text weight="bold">these release steps</Text>
            </Link>{' '}
            for every merge on master:
            <ul>
              <li>Fetch semver&nbsp;label for the associated PR (patch / minor / major)</li>
              <li>Check out the repository</li>
              <li>Setup Node.js</li>
              <li>Bump package.json version</li>
              <li>Update CHANGELOG.md file</li>
              <li>Create GitHub release</li>
              <li>Publish to npm</li>
              <li>
                Update{' '}
                <Link href="https://pinterest.github.io/gestalt/" inline>
                  <Text weight="bold">Gestalt documentation</Text>
                </Link>
              </li>
            </ul>
          </Text>
        </Flex>
      </Card>
    </Page>
  );
}
