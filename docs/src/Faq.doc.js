// @flow strict
import React, { type Node } from 'react';
import { Box, Heading, Link, Stack, Text } from 'gestalt';
import Markdown from './components/Markdown.js';
import Card from './components/Card.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(<PageHeader name="Frequently Asked Questions" showSourceLink={false} />);

card(
  <Card name="Component Usage">
    <Stack gap={4}>
      <Heading size="sm">
        How can I visualize which components use Gestalt?
      </Heading>

      <Text>
        Use{' '}
        <Link href="https://codepen.io/christianv/pen/BxmOBe" inline>
          <Text weight="bold">Gestalt Usage Visualizer</Text>
        </Link>
      </Text>

      <Text weight="bold">Installation</Text>

      <Text>
        Drag this link:{' '}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          inline
          // eslint-disable-next-line no-script-url
          href="javascript:(function(){if(!document.getElementById('gestalt-usuage-visualizer')) {var script = document.createElement('script');script.id = 'gestalt-usuage-visualizer';script.src = 'https://unpkg.com/gestalt-usage-visualizer/index.js';document.head.appendChild(script);}})();"
        >
          <Text weight="bold">Gestalt Usage Visualiser</Text>
        </Link>{' '}
        into your bookmarks toolbar. If you do not see the bookmarks toolbar, go
        to View and select &apos;Show Bookmarks Bar&apos;.
      </Text>

      <Text weight="bold">Usage</Text>

      <Text>
        <ul>
          <li>Click the link in the bookmark bar.</li>
          <li>
            Red is bad: all places that are not using gestalt will have a red
            border around them.
          </li>
          <li>
            Everything else is GestaltproviderToProvider2 (or using inline
            styles).
          </li>
        </ul>
      </Text>

      <Heading size="sm">What is a boint?</Heading>
      <Text>
        A boint is a Pinterest specific unit of spacing that is equivalent to
        4px. 1 boint = 4px, 2 boints = 8px, etc.
      </Text>
      <Box>
        <Text>
          Gestalt component props such as margin and padding work with boint
          units.
        </Text>
        <Markdown
          text="
~~~bash
padding 0 .. 12
~~~"
        />
      </Box>

      <Heading size="sm">How can add a new Icon?</Heading>
      <Text>
        If you need an Icon that is not listed on our{' '}
        <Link inline href="/Icon">
          <Text weight="bold">docs</Text>{' '}
        </Link>{' '}
        for an experiment, use the <code>dangerouslySetSvgPath</code> prop on
        Icon. If the asset is ready, we will happily add the Icon to Gestalt!
      </Text>
      <Text>
        To add it to Gestalt, get a streamlined &amp; optimized version of the
        SVG not contain strokes / transforms / ...
      </Text>

      <Heading size="sm">How do I add Gestalt as a dependency?</Heading>
      <Text>
        Import exact versions. ^1.37.0 is imprecise and could import v1.38.0
        which could affect snapshots from version to version. Check{' '}
        <Link inline href="https://devhints.io/semver">
          <Text weight="bold">semver documentation</Text>
        </Link>{' '}
        for hints on the differences.
      </Text>

      <Heading size="sm">How do I import components from Gestalt?</Heading>
      <Text>
        Add the following to your import declarations:
        <Markdown
          text="
~~~js
import { Button, Text } from 'gestalt';
~~~"
        />
      </Text>

      <Heading size="sm">What&apos;s required to support IE11?</Heading>
      <Text>
        Gestalt supports IE11 currently, but you will need to use a polyfill
        because the css file uses css variables. Below is an example of how we
        set the polyfill up in the docs which should go in the &lt;head /&gt; of
        your html.
        <Markdown
          text={`
~~~js
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
    </Stack>
  </Card>
);

card(
  <Card name="Component Development">
    <Stack gap={4}>
      <Heading size="sm">How do I get access to the Gestalt repo?</Heading>
      <Text>
        The{' '}
        <Link href="https://github.com/pinterest/gestalt" inline>
          <Text weight="bold">Gestalt repository</Text>
        </Link>{' '}
        is public and you do not need special permissions to make pull requests.
      </Text>

      <Heading size="sm">
        What is Gestalt Teachings and how do I add a video?
      </Heading>
      <Text>
        <Link
          inline
          href="https://www.youtube.com/playlist?list=PLbmG-F9A233J1ID2Nl-zwfYNnhazHLZzV"
        >
          <Text weight="bold">Gestalt Teachings</Text>
        </Link>{' '}
        is a youtube video playlist containing tips and tricks on how to use
        Gestalt. Use{' '}
        <Link
          inline
          href="https://www.youtube.com/playlist?list=PLbmG-F9A233J1ID2Nl-zwfYNnhazHLZzV&amp;jct=cIfcNOunrGwHcEAbFodTthlHYhkvWw"
        >
          <Text weight="bold">this special collaboration link</Text>
        </Link>{' '}
        to add your own videos to this list.
      </Text>
    </Stack>
  </Card>
);

card(
  <Card name="Automated Releases">
    <Stack gap={4}>
      <Heading size="sm">How often does Gestalt release a new version?</Heading>
      <Text>
        Gestalt releases happen on every merge to master.{' '}
        <Link href="https://github.com/pinterest/gestalt/releases" inline>
          <Text weight="bold">Check the release log</Text>
        </Link>
        .
      </Text>

      <Heading size="sm">
        My Pull Request fails on &quot;Semver / Require Label
        (pull_request)&quot;, how do I fix it?
      </Heading>
      <Text>Nothing you can do to fix it.</Text>
      <Text>
        A Gestalt Core maintainer will add a semver label (patch release / minor
        release / major release) when reviewing a PR..
      </Text>

      <Heading size="sm">
        How do these automated releases work under the hood?
      </Heading>
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
          <li>
            Fetch semver&nbsp;label for the associated PR (patch / minor /
            major)
          </li>
          <li>Check out the repository</li>
          <li>Setup Node.js</li>
          <li>Bump package.json version</li>
          <li>Update CHANGELOG.md file</li>
          <li>Create GitHub release</li>
          <li>Publish to npm</li>
          <li>
            Update{' '}
            <Link href="https://pinterest.github.io/gestalt/" inline>
              <Text weight="bold">Gestalt Documentation</Text>
            </Link>
          </li>
        </ul>
      </Text>
    </Stack>
  </Card>
);

export default cards;
