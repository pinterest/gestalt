import React from 'react';
import { Box, Flex, Heading, Icon, Image, Mask, Table, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../../docs-components/consts';
import MainSection from '../../../../docs-components/MainSection';
import Markdown from '../../../../docs-components/Markdown';
import Page from '../../../../docs-components/Page';
import PageHeader from '../../../../docs-components/PageHeader';

type IconName = React.ComponentProps<typeof Icon>['icon'];
export default function FormsLayoutOverview() {
  const RTLIcons: IconName[] = [
    'arrow-back',
    'arrow-forward',
    'arrow-circle-back',
    'arrow-circle-forward',
    'arrow-start',
    'arrow-end',
    'arrow-left-curved',
    'chevron-down-circle',
    'chevron-left-circle',
    'chevron-small-left',
    'chevron-small-right',
    'directional-arrow-left',
    'directional-arrow-right',
    'move-pin',
    'reorder-images',
    'send',
    'visit',
  ];

  const generateIconRow = (iconName: IconName) => {
    if (!iconName) return null;
    return (
      <Table.Row>
        <Table.Cell>
          <Text size="200">{iconName}</Text>
        </Table.Cell>
        <Table.Cell>
          <Icon
            accessibilityLabel={`${iconName.split('-').join(' ')}`}
            color="default"
            icon={iconName}
          />
        </Table.Cell>
        <Table.Cell>
          <div className="rotateIcon">
            <Icon
              accessibilityLabel={`${iconName.split('-').join(' ')} mirrored`}
              color="default"
              icon={iconName}
            />
          </div>
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <Page title="Iconography">
      <PageHeader
        description={`
In addition to layout and alignment, it is also important to consider icons. When using icons for RTL web and native app development, consider factors such as icon direction and context. For example, you should use CSS transforms or SVG attributes to flip icons depending on the text direction. Additionally, it is important to make sure the icons are appropriate and relevant for the context and culture of your target audience.

Instead of going out to find your own icons, please leverage existing icons and components as they are consistent with our design language and can often handle RTL needs out-of-the-box.
        `}
        name="Iconography"
        type="guidelines"
      />
      <MainSection
        description="Our Icon component handles CSS transforms and SVG attributes to mirror icons for RTL. Additionally, we have a robust icon library that should be used in all Pinterest products. If you find issues with icons, or need to adapt an icon, [submit a request](https://slack.com/shortcuts/Ft070W7W96D7/bff22ece5368dcd9c083079577b0c2ba)"
        name="Leverage existing components and icons"
      >
        <MainSection
          description={`
          - Directional icons
          - Question marks
          - Sound
          - Icons with progress bars
        `}
          name="Icon types that need to be mirrored"
        />

        <MainSection.Subsection
          description={`
*Icons that provide directional details or depict either movement or text direction should undergo **mirroring** to make sense of your new format*.

Back and forward buttons and arrows are mirrored:
  `}
          title="Directional icons"
        />
        <Box borderStyle="sm" marginBottom={6} maxHeight={564} rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Two examples of a Pin close-up. One shows the nav bar Back button on the top-left corner for LTR, and the other in the top-right corner for RTL."
              naturalHeight={1692}
              naturalWidth={2688}
              src="https://i.pinimg.com/originals/21/97/aa/2197aac801d0540d233dc7d352731a91.png"
            />
          </Mask>
        </Box>
        <Box marginTop={10} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <Heading accessibilityLevel={3} size="200">
            Directional icons that need to be mirrored
          </Heading>
          <Box marginTop={3} maxWidth="65%">
            <Table accessibilityLabel="Directional icons that need to be mirrored">
              <Table.Header>
                <Table.Row>
                  {['Icon', 'LTR', 'RTL'].map((item) => (
                    <Table.HeaderCell key={item}>
                      <Text align={item === 'RTL' ? 'end' : 'start'} size="200" weight="bold">
                        {item}
                      </Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>{RTLIcons.map((iconName) => generateIconRow(iconName))}</Table.Body>
            </Table>
          </Box>
        </Box>

        <MainSection.Subsection description="Question marks are mirrored." title="Question marks" />
        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              minHeight={164}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A question mark icon shown in a LTR language. The curve begins from the left."
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/b2/06/65/b20665d98330d6f2d9057f92eea17936.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Text>LTR question mark</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              minHeight={164}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A question mark icon shown in an RTL language. The curve begins from the right."
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/d1/aa/6d/d1aa6d22965bd06b2b3056bdbf52a2d1.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Text>RTL question mark</Text>
              </Box>
            </Flex>
          </Flex.Item>
        </Flex>

        <MainSection.Subsection
          description="Icons representing sound as well as sound control bars are mirrored."
          title="Sound and audio icons"
        />
        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              minHeight={164}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="Volume and megaphone icons shown from left to right."
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/71/5c/2f/715c2fc9807f68a4ec3bbd5b022b11de.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Text>LTR sound/audio icons</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              minHeight={164}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="Volume and megaphone icons flipped from right to left."
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/ca/70/4d/ca704d1c41a573e4ff1fc2a9eed5699c.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Text>RTL sound/audio icons</Text>
              </Box>
            </Flex>
          </Flex.Item>
        </Flex>
        <MainSection.Subsection
          description={`
Sliders and progress bars are mirrored—progression is displayed from right to left.

A volume icon with a slider at its right side should be mirrored. The slider should progress RTL, and the sound waves should emerge from the right.
`}
          title="Icons with sliders and progress bars"
        />
        <Flex alignContent="between" direction="row" gap={6} wrap>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              minHeight={164}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A volume slider with the low volume icon on the left and the full-volume icon on the right."
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/bc/69/e3/bc69e3fbe95ccdf9186f18da59846e48.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Text>LTR volume slider</Text>
              </Box>
            </Flex>
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              borderStyle="sm"
              color="light"
              display="inlineBlock"
              justifyContent="center"
              marginBottom={3}
              minHeight={164}
              overflow="hidden"
              rounding={2}
              width="100%"
            >
              <Image
                alt="A volume slider with the low volume icon on the right and the full-volume icon on the left."
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/2f/5b/6e/2f5b6e601b336aa57e4f98c131b4fd23.png"
              />
            </Box>
            <Flex direction="column" gap={2}>
              <Box marginBottom={6}>
                <Text>RTL volume slider</Text>
              </Box>
            </Flex>
          </Flex.Item>
        </Flex>

        <MainSection.Subsection title="Representation of time" />
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Mirror linear representation of time. Linear time advances from right to left."
            title="Do"
            type="do"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="A cancel button followed by a next button with an arrow pointing towards the right and following the word &#8220;Next&#8221; in an RTL language like English. The same order is flipped in Hebrew."
                fit="contain"
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/f6/cd/b4/f6cdb44c6324319f4522d7c8e86f1701.png"
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            description="Mirror circular representation of time. To align with international conventions, use clockwise when going forward in time and counter-clockwise when going back in time."
            title="Don't"
            type="don't"
          >
            <Box height="100%" overflow="hidden" width="100%">
              <Image
                alt="Buttons in Hebrew on Pins moved to the left corner where they are harder to reach for most users."
                fit="contain"
                naturalHeight={888}
                naturalWidth={1107}
                src="https://i.pinimg.com/originals/a6/09/47/a60947083df6f5d06ea50e0e22b0d238.png"
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <Box marginBottom={10} marginTop={-6}>
          <Markdown
            text={`
Sometimes, both the horizontal and circular direction of time are implied in an icon.

For example, the redo and undo buttons have both a horizontal direction and a circular
direction. In LTR, these point to the same direction in both circular and horizontal
representations of time. In RTL, decide whether to show circular or horizontal direction.
`}
          />
        </Box>

        <MainSection
          description={`
- Media play buttons and media progress indicator bar
- Checkmarks
- Icons referring to physical objects that don’t depict movement
`}
          name="Icons that don’t need to be mirrored"
        >
          <MainSection.Subsection
            description="When in the context of music, audio and video players, media playback buttons and media progress indicators shouldn't be mirrored as they refer to the direction of the tape being played, not the direction of time."
            title="Media play buttons"
          />
          <Box borderStyle="sm" marginBottom={3} maxHeight={459} rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="An image of a woman playing a guitar and a caption in Arabic below it. Below it is an audio player with the controls still going from left to right."
                naturalHeight={1377}
                naturalWidth={2688}
                src="https://i.pinimg.com/originals/4b/63/75/4b637516535859edd459ac1ccec91631.png"
              />
            </Mask>
          </Box>
          <Box marginBottom={6} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Text size="300">Icons in an audio player don’t need to be flipped.</Text>
          </Box>
          <MainSection.Subsection description="Checkmarks aren't mirrored." title="Checkmarks" />
          <Box borderStyle="sm" marginBottom={3} maxHeight={200} rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="A success toast in Hebrew with the checkmark icon to the right of the text. The checkmark isn't mirrored."
                naturalHeight={336}
                naturalWidth={2688}
                src="https://i.pinimg.com/originals/e1/53/05/e1530574dc9a4a100c0a77bc4f1e7539.png"
              />
            </Mask>
          </Box>
          <Box marginBottom={6} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
            <Text size="300">
              In a Toast, for example, the message text is flipped, but the checkmark icon stays the
              same.
            </Text>
          </Box>

          <MainSection.Subsection
            description="Physical icons that don’t indicate movement or a direction don’t need to be mirrored. Examples include filter, icons with slashes across them, key and link."
            title="Icons referring to physical objects that don't depict movement"
          />
          <Box borderStyle="sm" marginBottom={12} maxHeight={200} rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="Filter, music, key and link icons that don't need to be flipped."
                naturalHeight={426}
                naturalWidth={2688}
                src="https://i.pinimg.com/originals/c6/d0/4d/c6d04d246e603fd2c21971cf5b957ced.png"
              />
            </Mask>
          </Box>
        </MainSection>
        <MainSection name="Related">
          <MainSection.Subsection
            description={`
        **[Icon localization](../icon_localization)**
        Desing considerations for design icons with cross-cultural and linguistic differences in mind.
      `}
          />
          <MainSection.Subsection
            description={`
          **[Iconography guidelines](https://gestalt.pinterest.systems/foundations/iconography/library)**
          Usage guidelines and best practices for our product icon library
          `}
          />
          <MainSection.Subsection
            description={`
          **[Icon component](https://gestalt.pinterest.systems/web/icon)**
          A component for using icons in product interfaces
          `}
          />
          <MainSection.Subsection
            description={`
          **[Icon requests](https://slack.com/shortcuts/Ft070W7W96D7/bff22ece5368dcd9c083079577b0c2ba)**
          How to request an icon if it doesn't exist in our library
          `}
          />
        </MainSection>
      </MainSection>
    </Page>
  );
}
