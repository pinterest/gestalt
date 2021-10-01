// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex, Icon, Link, Image, Text, Table, TapArea, Tooltip } from 'gestalt';
import MainSection from '../components/MainSection.js';
import { MAX_WIDTH } from '../components/MainSectionSubsection.js';

import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

const ListElement = ({ text, href }: {| text: string, href: string |}) => (
  <li>
    <Flex alignItems="center" gap={1}>
      <Link accessibilityLabel={`${text}, opens new window`} target="blank" inline href={href}>
        <Text underline inline>
          {text}
        </Text>
      </Link>
      <Box aria-hidden>
        <Icon accessibilityLabel="" icon="visit" size={14} />
      </Box>
      {href.startsWith('http://go') ? (
        <Tooltip text="This link is private. You must be a Pinterest employee to access it.">
          <TapArea rounding="circle">
            <Icon accessibilityLabel="" icon="lock" size={14} />{' '}
          </TapArea>
        </Tooltip>
      ) : null}
    </Flex>
  </li>
);

const TableEntry = ({
  metric,
  description,
  href,
}: {|
  metric: string,
  description: string,
  href: string,
|}) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Flex alignItems="center" gap={1}>
          <Link href={href} target="blank">
            <Text size="sm" underline overflow="noWrap">
              {metric}
            </Text>
          </Link>
          <Box aria-hidden>
            <Icon accessibilityLabel="" icon="visit" size={12} />
          </Box>
          <Tooltip text="This link is private. You must be a Pinterest employee to access it.">
            <Icon accessibilityLabel="" icon="lock" size={12} />
          </Tooltip>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Text size="sm">{description}</Text>
      </Table.Cell>
    </Table.Row>
  );
};

export default function ToolingPage(): Node {
  return (
    <Page title="Tooling">
      <PageHeader name="Tooling" showSourceLink={false} />
      <MainSection name="Core design system">
        <MainSection.Subsection />
        <Flex gap={2} maxWidth={MAX_WIDTH} direction="column">
          <Text>The core Gestalt Design System consists of:</Text>
          <ul>
            {[
              ['Gestalt Design Libraries', 'http://go/gestaltFigma'],
              ['Reusable component library in Github', 'https://github.com/pinterest/gestalt'],
              ['Gestalt component extensions in Pinboard', 'http://go/gestaltExtensions'],

              ['Gestalt Flow types library in Pinboard', 'http://go/gestaltExtensionsTypes'],
              [
                'Documentation site in gestalt.pinterest.systems',
                'https://gestalt.pinterest.systems/',
              ],
            ].map((item, idx) => {
              return <ListElement key={idx} text={item[0]} href={item[1]} />;
            })}
          </ul>
        </Flex>
      </MainSection>
      <MainSection name="A tooling ecosystem">
        <MainSection.Subsection
          description={`
Gestalt is supported by an ecosystem of tools with the main goal of simplifying processes and automating tasks.

Gestalt's tooling ecosystem has different customers: the Gestalt development team, Pinterest engineers and designers, and non-Pinterest users of Gestalt.

The Gestalt team can highly benefit from measurement tools that support the communication of Gestalt's impact as well as inform Gestalt development decisions, generic codemods to modify Gestalt components after API changes, and generic scripts to locate Gestalt components in a codebase to simplify component usage analysis.

Any other engineers will highly benefit from reducing the amount of steps to adopt Gestalt by automating fixes and increasing Gestalt discoverability,  bringing documentation closer to the code editor, and improving and speeding up Gestalt’s onboarding experience

    `}
        />
      </MainSection>
      <MainSection name="Developer velocity tools">
        <MainSection.Subsection
          title="Eslint plugin"
          description={`Visit the [Eslint plugin](/tooling) guidance page to see all the available Eslint rules.

Most rules come with out-of-the-box autofixes, automating the adoption of Gestalt best practices.`}
        />
        <MainSection.Subsection
          title="Release codemods"
          description={`Every major breaking change on our library comes with a codemod to facilitate the upgrade of the Gestalt dependency.

Visit the [release log](/whats_new) or check the [codemod directory](https://github.com/pinterest/gestalt/tree/master/packages/gestalt-codemods).`}
        />
        <MainSection.Subsection
          title="Playground sandbox"
          description={`Use Gestalt's [playground sandbox](https://codesandbox.io/s/k5plvp9v8v) to save code snippets. For instance, share code snippets to reproduce bugs or build small-size code examples to share with peers.`}
        >
          <Flex maxWidth={MAX_WIDTH} justifyContent="center">
            <Button
              color="gray"
              target="blank"
              role="link"
              text="Create a sandbox snippet"
              href="https://codesandbox.io/s/k5plvp9v8v"
            />
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Visual Studio Code tooling">
        <MainSection.Subsection
          badge="alpha"
          title="Props documentation on hover in Visual Studio Code"
          description="You can now see component and props documentation on hover in VSCode for certain Gestalt components. Quickly see what a component looks like, its sizes and other props documentation."
        >
          <Box maxWidth={MAX_WIDTH} display="flex" justifyContent="center">
            <Box marginBottom={6}>
              <Box as="figure" width={400}>
                <Image
                  alt=""
                  color="white"
                  naturalHeight={610}
                  naturalWidth={1034}
                  src="https://i.ibb.co/hCfRSFb/gestalt-vscode-docs.gif"
                />
                <Text size="sm" align="center">
                  <Box as="figcaption" marginTop={3}>
                    Props documentation on hover in Visual Studio Code animated demo: hover on each
                    component or prop name to display the associated documentation right on your
                    code editor
                  </Box>
                </Text>
              </Box>
            </Box>
          </Box>
        </MainSection.Subsection>
        <MainSection.Subsection
          badge="beta"
          title="Visual Studio Code extension for Gestalt"
          description="Get Gestalt component snippets right on your VSCode editor!"
        >
          <Flex maxWidth={MAX_WIDTH} direction="column" alignItems="center">
            <Box marginBottom={6}>
              <Box as="figure" width={400}>
                <Image
                  alt=""
                  color="white"
                  naturalHeight={320}
                  naturalWidth={400}
                  src="https://github.com/pinterest/vscode-gestalt/raw/main/images/vscode-gestalt-snippets-optimized.gif"
                />
                <Text size="sm" align="center">
                  <Box as="figcaption" marginTop={3}>
                    Visual Studio Code extension for Gestalt animated demo: how to add Gestalt
                    component snippets to your code
                  </Box>
                </Text>
              </Box>
            </Box>
            <Button
              color="gray"
              target="blank"
              role="link"
              text="Install the extension"
              href="https://marketplace.visualstudio.com/items?itemName=pinterest.vscode-gestalt"
            />
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Measurement tools">
        <MainSection.Subsection
          title="Gestalt Usage Visualizer"
          description="Visualize and easily identify the Gestalt usage on a page."
        >
          <Flex maxWidth={MAX_WIDTH} gap={4} direction="column" alignItems="center">
            <Box>
              <Flex direction="column" gap={4}>
                <Text weight="bold">How to install</Text>
                <Box>
                  <Text inline>Drag this link: </Text>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    inline
                    target="blank"
                    hoverStyle="underline"
                    // eslint-disable-next-line no-script-url
                    href="javascript:(function(){if(!document.getElementById('gestalt-usuage-visualizer')) {var script = document.createElement('script');script.id = 'gestalt-usuage-visualizer';script.src = 'https://unpkg.com/gestalt-usage-visualizer/index.js';document.head.appendChild(script);}})();"
                  >
                    <Text underline inline>
                      Gestalt Usage Visualiser
                    </Text>
                  </Link>
                  <Text inline>
                    {' '}
                    into your bookmarks toolbar. If you don&apos;t see the bookmarks toolbar, go to
                    View and select &apos;Show Bookmarks Bar&apos;
                  </Text>
                </Box>
                <Text weight="bold">How to use it</Text>
                <Text>
                  Click the link in the bookmark bar. Red-bordered areas point to all places that
                  aren&apos;t using Gestalt.
                </Text>
                <Box marginBottom={6}>
                  <Box as="figure" width={400}>
                    <Image
                      alt=""
                      color="white"
                      naturalHeight={240}
                      naturalWidth={600}
                      src="https://s14.postimg.cc/3ue4bpbtd/Screen_Shot_2018-05-07_at_11.17.01_AM.png"
                    />
                    <Text size="sm" align="center">
                      <Box as="figcaption" marginTop={3}>
                        Gestalt extension demo: the areas highlighted in red are not using Gestalt
                        components
                      </Box>
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Metric dashboards"
          description={`Monitor Gestalt usage metrics with a full suite of dashboards.

To effectively communicate the impact of Gestalt, we must measure and track adoption. Moreover, the quantitative measurement of adoption becomes an important metric to determine if we're making forward progress towards system usage and reflect a healthy design systems usage.

The following table lists the currently available metrics to track Gestalt adoption. Most metrics are in absolute (#) units while just a few are expressed in relative units (%)`}
        >
          <Table accessibilityLabel="Gestalt usage metrics">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Text weight="bold">Metric</Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text weight="bold">Description</Text>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {[
                [
                  'Gestalt Components',
                  '# total Gestalt components / (# native DOM elements + # total Gestalt component); % per site',
                  'http://go/metrics_gestalt_percentage',
                ],
                [
                  'Gestalt Components: component level',
                  '# total Gestalt components; # per component',
                  'http://go/metrics_gestalt_component',
                ],
                [
                  'Gestalt Components: prop level',
                  '# total Gestalt components; # per prop & component',
                  'http://go/metrics_gestalt_prop',
                ],
                [
                  'Gestalt Components: prop value level',
                  '# total Gestalt components; # per prop value & prop & component',
                  'http://go/metrics_gestalt_value',
                ],
                [
                  'Gestalt Extension Components: component level',
                  '# total Gestalt extension components; # per component',
                  'http://go/metrics_gestaltExtension_component',
                ],
                [
                  'Gestalt Extension Components: prop level',
                  '# total Gestalt extension components; # per prop & component',
                  'http://go/metrics_gestaltExtension_prop',
                ],
                [
                  'Gestalt Extension Components: prop value level',
                  '# total Gestalt extension components; # per prop value & prop & component',
                  'http://go/metrics_gestaltExtension_value',
                ],
                [
                  'Native DOM Elements: tag level',
                  '# total native DOM elements; # per tag',
                  'http://go/metrics_nativeDom_element',
                ],
                [
                  'Native DOM Elements: attribute level',
                  '# total native DOM elements; # per attribute & tag',
                  'http://go/metrics_nativeDom_attribute',
                ],
                [
                  'Native DOM Elements: attribute value level',
                  '# total native DOM elements; # per attribute value & attribute & tag',
                  'http://go/metrics_nativeDom_value',
                ],
                [
                  'Deprecated Components',
                  '# total deprecated components; # per component',
                  'http://go/metrics_deprecated_component',
                ],
                [
                  'Deprecated Components',
                  '# total deprecated components; # per site',
                  'http://go/metrics_deprecated_site',
                ],
                [
                  'Boxes with dangerouslySetInlineStyle',
                  '# Gestalt Box with dangerouslySetInlineStyle prop / (# total Gestalt Box); % per site',
                  'http://go/metrics_dangerouslySetInlineStyle',
                ],
                [
                  'Top dangerouslySetInlineStyle style attribute keys',
                  '# most used CSS attributes passed to dangerouslySetInlineStyle; # per site',
                  'http://go/metrics_dangerouslySetInlineStyle_keys',
                ],
              ].map((item, idx) => {
                return (
                  <TableEntry
                    key={`table_entry_${idx}`}
                    metric={item[0]}
                    description={item[1]}
                    href={item[2]}
                  />
                );
              })}
            </Table.Body>
          </Table>
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
