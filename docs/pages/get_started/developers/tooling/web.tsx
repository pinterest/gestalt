import { Box, ButtonLink, Flex, Image, Link, List, Table, Text } from 'gestalt';
import trackButtonClick from '../../../../docs-components/buttons/trackButtonClick';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../../docs-components/consts';
import InternalOnlyIconButton from '../../../../docs-components/InternalOnlyIconButton';
import MainSection from '../../../../docs-components/MainSection';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

function TableEntry({
  metric,
  description,
  href,
}: {
  metric: string;
  description: string;
  href: string;
}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Flex
          alignItems="center"
          gap={{
            row: 1,
            column: 0,
          }}
        >
          <Text overflow="noWrap" size="100" underline>
            <Link
              externalLinkIcon="default"
              href={href}
              onClick={() => trackButtonClick(metric)}
              target="blank"
            >
              {metric}
            </Link>
          </Text>
          <InternalOnlyIconButton />
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Text size="100">{description}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function ToolingPage() {
  return (
    <Page title="Tooling">
      <PageHeader name="Web tooling" type="guidelines" />
      <MainSection name="Core design system">
        <List label="The core Gestalt Design System consists of:">
          {(
            [
              ['Gestalt Design Libraries', 'http://go/gestaltFigma'],
              ['Reusable component library in Github', 'https://github.com/pinterest/gestalt'],
              ['Gestalt component extensions in Pinboard', 'http://go/gestaltExtensions'],

              ['Gestalt Flow types library in Pinboard', 'http://go/gestaltExtensionsTypes'],
              [
                'Documentation site in gestalt.pinterest.systems',
                'https://gestalt.pinterest.systems/',
              ],
            ] as const
          ).map((item) => (
            <List.Item
              key={item[0]}
              text={
                <Text>
                  <Flex gap={1}>
                    <Link
                      accessibilityLabel={`${item[0]}. ${
                        item[1].startsWith('http://go') ? 'Restricted access.' : ''
                      }`}
                      display="inline"
                      externalLinkIcon="default"
                      href={item[1]}
                      onClick={() => trackButtonClick(item[0])}
                      target="blank"
                    >
                      {item[0]}
                    </Link>
                    {item[1].startsWith('http://go') ? <InternalOnlyIconButton size="sm" /> : null}
                  </Flex>
                </Text>
              }
            />
          ))}
        </List>
      </MainSection>
      <MainSection name="A tooling ecosystem">
        <MainSection.Subsection
          description={`
Gestalt is supported by an ecosystem of tools with the main goal of simplifying processes and automating tasks.

Gestalt's tooling ecosystem has several customers: the Gestalt development team, Pinterest engineers and designers, and non-Pinterest users of Gestalt.

The Gestalt team can highly benefit from measurement tools that support the communication of Gestalt's impact as well as inform Gestalt development decisions, generic codemods to modify Gestalt components after API changes, and generic scripts to locate Gestalt components in a codebase to simplify component usage analysis.

Any other engineers will highly benefit from reducing the amount of steps to adopt Gestalt by automating fixes and increasing Gestalt discoverability,  bringing documentation closer to the code editor, and improving and speeding up Gestalt’s onboarding experience

    `}
        />
      </MainSection>
      <MainSection name="Developer velocity tools">
        <MainSection.Subsection
          description={`Visit the [ESLint plugin](/get_started/developers/eslint_plugin) guidance page to see all the available ESLint rules.

Most rules come with out-of-the-box autofixes, automating the adoption of Gestalt best practices.`}
          title="ESLint plugin"
        />
        <MainSection.Subsection
          description={`Every major breaking change on our library comes with a codemod to facilitate the upgrade of the Gestalt dependency. Some codemods are custom built for each upgrade while some upgrades take advantage of generic codemods that only require running a codemod command with options.

Visit the [Releases](/get_started/developers/releases) guidance page to see all the available release codemods.
`}
          title="Release codemods"
        />
        <MainSection.Subsection
          description={`Use Gestalt's [playground sandbox](https://codesandbox.io/s/gestalt-cnwugg?file=/yourCode.js) to save code snippets. For instance, share code snippets to reproduce bugs or build small-size prototypes to share with peers.`}
          title="Playground sandbox"
        >
          <Flex justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <ButtonLink
              color="gray"
              href="https://codesandbox.io/s/gestalt-cnwugg?file=/yourCode.js"
              onClick={() => trackButtonClick('Playground sandbox')}
              target="blank"
              text="Create a sandbox snippet"
            />
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Visual Studio Code tooling">
        <MainSection.Subsection
          description="You can now see component and props documentation on hover in VSCode for certain Gestalt components. Quickly see what a component looks like, its sizes and other props documentation."
          title="Props documentation on hover in Visual Studio Code"
        >
          <Box display="flex" justifyContent="center" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Box marginBottom={6}>
              <Box as="figure" width={400}>
                <Image
                  alt=""
                  color="white"
                  naturalHeight={610}
                  naturalWidth={1034}
                  src="https://i.ibb.co/hCfRSFb/gestalt-vscode-docs.gif"
                />
                <Text align="center" size="100">
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
          badge="alpha"
          description="Access Gestalt component snippets and documentation right on your VSCode editor. Right at your fingertips!"
          title="Visual Studio Code extension for Gestalt"
        >
          <Text weight="bold">Quick access to Gestalt</Text>
          <Flex alignItems="center" direction="column" maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Box marginBottom={6}>
              <Flex direction="column">
                <Box as="figure" width={400}>
                  <Image
                    alt=""
                    color="white"
                    naturalHeight={1036}
                    naturalWidth={1228}
                    src="https://i.ibb.co/G2PMw6f/Screen-Shot-2022-01-27-at-4-24-36-PM.png"
                  />
                  <Text align="center" size="100">
                    <Box as="figcaption" marginTop={3}>
                      Quick access to Gestalt components and documentation on the VSCode sidebar.
                      Check for the Gestalt logo on the sidebar.
                    </Box>
                  </Text>
                </Box>
                <Box as="figure" width={400}>
                  <Image
                    alt=""
                    color="white"
                    naturalHeight={978}
                    naturalWidth={1398}
                    src="https://i.ibb.co/9Vjhyrm/Screen-Shot-2022-01-27-at-4-45-42-PM.png"
                  />
                  <Text align="center" size="100">
                    <Box as="figcaption" marginTop={3}>
                      {`List Gestalt components by typing "<"`}
                    </Box>
                  </Text>
                </Box>
                <Box as="figure" width={400}>
                  <Image
                    alt=""
                    color="white"
                    naturalHeight={982}
                    naturalWidth={1218}
                    src="https://i.ibb.co/BTCtDQk/Screen-Shot-2022-01-27-at-4-42-36-PM.png"
                  />
                  <Text align="center" size="100">
                    <Box as="figcaption" marginTop={3}>
                      List Gestalt components by pressing Alt+G/Option+G
                    </Box>
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 4,
              }}
            >
              <Text weight="bold">Snippets</Text>
              <Text>Using Gestalt snippets has the following benefits:</Text>
              <Text>- Auto-import</Text>
              <Text>- Required props are included</Text>
              <Text>- Quick select boolean & enum props</Text>
              <Box as="figure" width={400}>
                <Image
                  alt=""
                  color="white"
                  naturalHeight={320}
                  naturalWidth={400}
                  src="https://github.com/pinterest/vscode-gestalt/raw/main/images/vscode-gestalt-snippets-optimized.gif"
                />
                <Text align="center" size="100">
                  <Box as="figcaption" marginTop={3}>
                    Visual Studio Code extension for Gestalt animated demo: how to add Gestalt
                    component snippets to your code
                  </Box>
                </Text>
              </Box>
            </Flex>
            <ButtonLink
              color="gray"
              href="https://marketplace.visualstudio.com/items?itemName=pinterest.vscode-gestalt"
              onClick={() => trackButtonClick('Visual Studio Code extension')}
              target="blank"
              text="Install the extension"
            />
          </Flex>
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Measurement tools">
        <MainSection.Subsection
          description="Visualize and easily identify the Gestalt usage on a page."
          title="Gestalt Usage Visualizer"
        >
          <Flex
            alignItems="center"
            direction="column"
            gap={{
              row: 0,
              column: 4,
            }}
            maxWidth={DOCS_COPY_MAX_WIDTH_PX}
          >
            <Box>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 4,
                }}
              >
                <Text weight="bold">How to install</Text>
                <Box>
                  <Text inline>Drag this link: </Text>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    display="inlineBlock"
                    // eslint-disable-next-line no-template-curly-in-string, no-script-url
                    href="javascript:(function(){[...document.querySelectorAll('[style]'),...document.querySelectorAll('[class]')].filter(el=>[...el.classList].some(classname=>classname.length>3)||el.classList=='').forEach(el=>{el.setAttribute('style',`${el.getAttribute('style')||''};border:solid 1px#ff0000;`)})})();"
                    onClick={() => trackButtonClick('Gestalt Usage Visualizer')}
                    target="blank"
                  >
                    <Text inline underline>
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
                    <Text align="center" size="100">
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
          description={`Monitor Gestalt usage metrics with a full suite of dashboards.

To effectively communicate the impact of Gestalt, we measure and track adoption. The quantitative measurement of adoption is an important metric to determine if we're making forward progress towards system usage.

The following table lists the currently available metrics to track Gestalt adoption. Most metrics are in absolute (#) units, while a few are expressed in relative units (%)`}
          title="Metric dashboards"
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
              {(
                [
                  [
                    '% Gestalt components over HTML ',
                    '# total Gestalt components / (# native DOM elements + # total Gestalt component); % per site',
                    'https://statsboard.pinadmin.com/share/jh3g8',
                  ],
                  [
                    '% HTML coverage',
                    '# total Gestalt components with HTML equivalent/ (# native DOM elements with Gestalt equivalent + # total Gestalt components with HTML equivalent);',
                    'https://statsboard.pinadmin.com/share/j68ut',
                  ],
                  [
                    '% HTML coverage',
                    '# total Gestalt components with HTML equivalent/ (# native DOM elements with Gestalt equivalent + # total Gestalt components with HTML equivalent); per HTML tag',
                    'https://statsboard.pinadmin.com/share/cbaju',
                  ],
                  [
                    'HTML detailed coverage',
                    '# total Gestalt components with HTML equivalent, # total HTML components with Gestalt equivalent',
                    'https://statsboard.pinadmin.com/share/mt37a',
                  ],
                  [
                    'Gestalt Components: component level',
                    '# total Gestalt components; # per component',
                    'https://statsboard.pinadmin.com/share/9z982',
                  ],
                  [
                    'Gestalt Components: prop level',
                    '# total Gestalt components; # per prop & component',
                    'https://statsboard.pinadmin.com/share/nfjae',
                  ],
                  [
                    'Gestalt Components: prop value level',
                    '# total Gestalt components; # per prop value & prop & component',
                    'https://statsboard.pinadmin.com/share/4w3rk',
                  ],
                  [
                    'Native DOM Elements: tag level',
                    '# total native DOM elements; # per tag',
                    'https://statsboard.pinadmin.com/share/g8jn6',
                  ],
                  [
                    'Native DOM Elements: attribute level',
                    '# total native DOM elements; # per attribute & tag',
                    'https://statsboard.pinadmin.com/share/zxkz4',
                  ],
                  [
                    'Native DOM Elements: attribute value level',
                    '# total native DOM elements; # per attribute value & attribute & tag',
                    'https://statsboard.pinadmin.com/share/87dua',
                  ],
                  [
                    'Boxes with dangerouslySetInlineStyle',
                    '# Gestalt Box with dangerouslySetInlineStyle prop / (# total Gestalt Box); % per site',
                    'https://statsboard.pinadmin.com/share/6t565',
                  ],
                  [
                    'Top dangerouslySetInlineStyle style attribute keys',
                    '# most used CSS attributes passed to dangerouslySetInlineStyle; # per site',
                    'https://statsboard.pinadmin.com/d/gestalt/dangerouslyInlineStyle/Top%20dangerous%20style%20keys',
                  ],
                  [
                    'Usage by import source (direct import, subcomponent, Pinboard extension)',
                    '# total Gestalt components; # per source',
                    'https://statsboard.pinadmin.com/share/rb87s',
                  ],
                  [
                    'Usage by component category (Html equivalent, industry standard, Pinterest specific)',
                    '# total Gestalt components; # per category',
                    'https://statsboard.pinadmin.com/share/ns8f9',
                  ],
                  [
                    'Usage by component type (utility, building block, UI)',
                    '# total Gestalt components; # per type',
                    'https://statsboard.pinadmin.com/share/44jwh',
                  ],
                  [
                    'Component impressions',
                    '# component impressions; # per component',
                    'https://statsboard.pinadmin.com/share/j3a4z',
                  ],
                ] as const
              ).map((item) => (
                <TableEntry
                  key={`table_entry: ${item[0]}`}
                  description={item[1]}
                  href={item[2]}
                  metric={item[0]}
                />
              ))}
            </Table.Body>
          </Table>
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
