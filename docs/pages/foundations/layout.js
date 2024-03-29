// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, Image, List, Table, Text } from 'gestalt';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

export default function DocsPage(): ReactNode {
  return (
    <Page title="Layout">
      <PageHeader
        description="A well-designed page layout effectively guides the viewer's attention, enhances information hierarchy‌ and improves overall user experience. There are many ways to approach layout based on the product surface and end-user needs—a person casually browsing their Pinterest feed needs a different layout than a developer reading our API docs or an advertiser analyzing campaign data. We’ll start here by documenting layouts for core Pinterest surfaces on mobile devices."
        name="Layout"
        type="guidelines"
      />
      <MainSection
        description="Grid guidelines refer to the grid layout of Pin representations (reps) only."
        name="Pin grid"
      >
        <MainSection.Subsection title="Phone" />
        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A two-column default grid layout on a phone."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/8oun8171j4821g13w5ih1w0sqg3qnkqv/phone-grid-default-png.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Default view
                </Heading>
                <Text>2 Pin reps per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A three-column compact grid layout on a phone."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/211lwttigo2qfyc11j5u008781odti10/Phone-grid-compact.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Compact view
                </Heading>
                <Text>2 Pin reps per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A one-column wide grid layout on a phone."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/07n3x73355m148sq53xqlgpk5uf1ovqv/Pin-grid-wide.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Wide view
                </Heading>
                <Text>1 Pin rep per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
        </Flex>

        <MainSection.Subsection title="Tablet portrait" />
        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A three-column default grid layout on a tablet in portrait orientation."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/c10r01156to084m37v1o7d42721fva66/tablet-portrait-grid-default-png.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Default view
                </Heading>
                <Text>3 Pin reps per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A four-column compact grid layout on a tablet in portrait orientation."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/x7724223hiw2007pv53l6sn23jvc0m4m/tablet-portrait-grid-compact-png.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Compact view
                </Heading>
                <Text>4 Pin reps per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A 2-column wide grid layout on a tablet in portrait orientation."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/64j84aj3e5r3nb4fcco0h0mp6203g71n/tablet-portrait-grid-wide-png.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Wide view
                </Heading>
                <Text>2 Pin rep per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
        </Flex>

        <MainSection.Subsection title="Tablet landscape" />
        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A four-column default grid layout on a tablet in landscape orientation."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/3e5n2262im4150m4crv31aa6n57se76n/tablet-landscape-grid-default-png.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Default view
                </Heading>
                <Text>4 Pin reps per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A five-column compact grid layout on a tablet in landscape orientation."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/62fsf38t5smpfysnjq1mf0c016vt0l61/tablet-landscape-grid-compact-png.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Compact view
                </Heading>
                <Text>5 Pin reps per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              maxHeight={386}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A 3-column wide grid layout on a tablet in landscape orientation."
                naturalHeight={672}
                naturalWidth={840}
                src="https://www.pinterest-assets.com/AssetLink/y73nv03v530061syj6bfw3xd0f0f7ybc/tablet-landscape-grid-wide-png.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Heading accessibilityLevel={4} size="300">
                  Wide view
                </Heading>
                <Text>3 Pin reps per row</Text>
              </Box>
            </Flex>
          </Flex.Item>
        </Flex>
      </MainSection>

      <MainSection name="Spacing">
        <MainSection.Subsection title="Margins and gutters">
          <Box marginBottom={2} marginTop={-6}>
            <Table accessibilityLabel="Spacing for margins and gutters">
              <Table.Header>
                <Table.Row>
                  {['Space', 'Use case'].map((item) => (
                    <Table.HeaderCell key={item}>
                      <Text align={item === 'RTL' ? 'end' : 'start'} size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-400
                    </Heading>
                    <Text size="200">16px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Margins for all text-based content (e.g. titles, body text, lists)" />
                      <List.Item text="Margins inside modals (i.e. action sheet, alert, fullscreen, sheet)" />
                      <List.Item text="Tablet grid gutters" />
                    </List>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-200
                    </Heading>
                    <Text size="200">8px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Margins for all image-based content (e.g. Pin reps, board reps, profile reps)" />
                      <List.Item text="Margins inside bars (except 16 for action bars)" />
                      <List.Item text="Phone grid gutters" />
                    </List>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>
        </MainSection.Subsection>

        <MainSection.Subsection title="Horizontal padding">
          <Box marginBottom={2} marginTop={-6}>
            <Table accessibilityLabel="Spacing for horizontal padding">
              <Table.Header>
                <Table.Row>
                  {['Space', 'Use case'].map((item) => (
                    <Table.HeaderCell key={item}>
                      <Text align={item === 'RTL' ? 'end' : 'start'} size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-400
                    </Heading>
                    <Text size="200">16px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Between button and text" />
                      <List.Item text="Between image and text" />
                    </List>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-200
                    </Heading>
                    <Text size="200">8px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Between buttons (e.g. alerts, banners)" />
                      <List.Item text="Between image and text" />
                      <List.Item text="Between comment/search/send field and button" />
                    </List>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>
        </MainSection.Subsection>

        <MainSection.Subsection title="Vertical padding">
          <Box marginBottom={2} marginTop={-6}>
            <Table accessibilityLabel="Spacing for vertical padding">
              <Table.Header>
                <Table.Row>
                  {['Space', 'Use case'].map((item) => (
                    <Table.HeaderCell key={item}>
                      <Text align={item === 'RTL' ? 'end' : 'start'} size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-800
                    </Heading>
                    <Text size="200">32px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Between content blocks" />
                    </List>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-600
                    </Heading>
                    <Text size="200">24px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Between Pin reps (with metadata) on grid" />
                      <List.Item text="Between board reps on profile" />
                    </List>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-400
                    </Heading>
                    <Text size="200">16px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Between content block and actions (e.g. banners)" />
                      <List.Item text="Between items in a list" />
                    </List>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      $space-200
                    </Heading>
                    <Text size="200">8px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Between Pin reps (without metadata) on grid" />
                      <List.Item text="Between elements/text within the same content block" />
                    </List>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Heading accessibilityLevel={3} size="300">
                      Token pending
                    </Heading>
                    <Text size="200">2px/dp</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item text="Between stacked modules (e.g. closeup)" />
                    </List>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Banners, Modals, Toasts and Text">
        <MainSection.Subsection
          description="Full-width minus space-200 (8px/dp) margins around banners, Toasts and Text"
          title="Phones in-line elements"
        >
          <Box
            borderStyle="sm"
            display="inlineBlock"
            justifyContent="center"
            marginBottom={3}
            marginTop={-4}
            maxHeight={386}
            overflow="hidden"
            rounding={2}
            width="100%"
          >
            <Image
              alt="A spec showing 8px spacing around banners and Toasts."
              naturalHeight={772}
              naturalWidth={1792}
              src="https://www.pinterest-assets.com/AssetLink/d5nf4r0d564mm3p0ve167f30s6nto2s5/phone-layout-spacing-png.png"
            />
          </Box>
        </MainSection.Subsection>

        <MainSection.Subsection
          description="64% of portrait and landscape screen width, based on 8 columns of an underlying 12-column grid"
          title="Tablet portrait and landscape"
        >
          <Box
            borderStyle="sm"
            display="inlineBlock"
            justifyContent="center"
            marginBottom={3}
            marginTop={-4}
            maxHeight={386}
            overflow="hidden"
            rounding={2}
            width="100%"
          >
            <Image
              alt="A spec showing a Toast on a tablet portrait screen with a note saying 64% of 720=461."
              naturalHeight={1158}
              naturalWidth={2688}
              src="https://www.pinterest-assets.com/AssetLink/nx0p18ele3pa6xc7e2x08c5wpxp5pwc2/Tablet-layout-spacing.png"
            />
          </Box>
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Spacing tokens](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Spacing)**
        Alll of our cross-platform spacing tokens
      `}
        />
        <MainSection.Subsection
          description={`
          **[Form structure and behavior](https://gestalt.pinterest.systems/foundations/forms/structure_and_behavior)**
          Guidelines for spacing and structuring forms on dense desktop screens
          `}
        />
        <MainSection.Subsection
          description={`
          **[Form layout example code](https://gestalt.pinterest.systems/foundations/forms/example_code)**
          Code that developers can copy and paste to layout a form quickly
          `}
        />
      </MainSection>
    </Page>
  );
}
