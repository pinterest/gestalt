// @flow strict
import React, { type Node } from 'react';
// eslint-disable-next-line no-unused-vars
import { Box, Callout, Flex, Heading, Icon, Image, Mask, Table, Text } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts.js';
import MainSection from '../../../docs-components/MainSection.js';
import Markdown from '../../../docs-components/Markdown.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function FormsLayoutOverview(): Node {
  return (
    <Page title="Icons">
      <PageHeader
        name="Icons"
        type="guidelines"
        description={`
In addition to layout and alignment, it is also important to consider icons. When using icons for RTL web and native app development, consider factors such as icon direction and context. For example, you should use CSS transforms or SVG attributes to flip icons depending on the text direction. Additionally, it is important to make sure the icons are appropriate and relevant for the context and culture of your target audience.

Instead of going out to find your own icons, please leverage existing icons and components as they are consistent with our design language and can often handle RTL needs out-of-the-box.
        `}
      />
      <MainSection
        name="Leverage existing components and icons"
        description="Our Icon component handles CSS transforms and SVG attributes to mirror icons for RTL. Additionally, we have a robust icon library that should be used in all Pinterest products. If you find issues with icons, or need to adapt an icon, [submit a request](https://gestalt.pinterest.systems/team_support/component_request#Filling-a-request-form)"
      >
        <MainSection
          name="Icon types that need to be mirrored"
          description={`
          - Directional icons
          - Question marks
          - Sound
          - Icons with progress bars
        `}
        />

        <MainSection.Subsection
          title="Directional icons"
          description={`
*Icons that provide directional details or depict either movement or text direction should undergo **mirroring** to make sense of your new format*.

Back and forward buttons and arrows are mirrored:
  `}
        />
        <Box maxHeight={564} marginBottom={6} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="Two examples of a Pin close-up. One shows the nav bar Back button on the top-left corner for LTR, and the other in the top-right corner for RTL."
              naturalWidth={2688}
              naturalHeight={1692}
              src="https://i.pinimg.com/originals/21/97/aa/2197aac801d0540d233dc7d352731a91.png"
            />
          </Mask>
        </Box>
        <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={10}>
          <Heading size="200" accessibilityLevel={3}>
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
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">arrow-back</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon icon="arrow-back" accessibilityLabel="arrow back" color="default" />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="arrow-back"
                        accessibilityLabel="arrow back mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">arrow-forward</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon icon="arrow-forward" accessibilityLabel="arrow forward" color="default" />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="arrow-forward"
                        accessibilityLabel="arrow forward mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">arrow-circle-back</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      icon="arrow-circle-back"
                      accessibilityLabel="arrow circle back"
                      color="default"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="arrow-circle-back"
                        accessibilityLabel="arrow circle back mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">arrow-circle-forward</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      icon="arrow-circle-forward"
                      accessibilityLabel="arrow circle forward"
                      color="default"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="arrow-circle-forward"
                        accessibilityLabel="arrow circle forward mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">arrow-start</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon icon="arrow-start" accessibilityLabel="arrow start" color="default" />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="arrow-start"
                        accessibilityLabel="arrow start mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">arrow-end</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon icon="arrow-end" accessibilityLabel="arrow end" color="default" />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="arrow-end"
                        accessibilityLabel="arrow end mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">arrow-left-curved</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      icon="arrow-left-curved"
                      accessibilityLabel="arrow left curved"
                      color="default"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="arrow-left-curved"
                        accessibilityLabel="arrow left curved mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">directional-arrow-left</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      icon="directional-arrow-left"
                      accessibilityLabel="directional arrow left"
                      color="default"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="directional-arrow-left"
                        accessibilityLabel="directional arrow left mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">directional-arrow-right</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      icon="directional-arrow-right"
                      accessibilityLabel="directional arrow right"
                      color="default"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="directional-arrow-right"
                        accessibilityLabel="directional arrow right mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">move-pin</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon icon="move-pin" accessibilityLabel="move pin" color="default" />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="move-pin"
                        accessibilityLabel="move pin mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">reorder-images</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      icon="reorder-images"
                      accessibilityLabel="reorder images"
                      color="default"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon
                        icon="reorder-images"
                        accessibilityLabel="reorder images mirrored"
                        color="default"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">send</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon icon="send" accessibilityLabel="send" color="default" />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon icon="send" accessibilityLabel="send mirrored" color="default" />
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Text size="200">visit</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon icon="visit" accessibilityLabel="visit" color="default" />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="rotateIcon">
                      <Icon icon="visit" accessibilityLabel="visit mirrored" color="default" />
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Box>
        </Box>

        <MainSection.Subsection title="Question marks" description="Question marks are mirrored." />
        <Flex gap={6} alignContent="between" wrap direction="row">
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="A question mark icon shown in a LTR language. The curve begins from the left."
                naturalWidth={1107}
                naturalHeight={888}
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
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="A question mark icon shown in an RTL language. The curve begins from the right."
                naturalWidth={1107}
                naturalHeight={888}
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
          title="Sound and audio icons"
          description="Icons representing sound as well as sound control bars are mirrored."
        />
        <Flex gap={6} alignContent="between" wrap direction="row">
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="Volume and megaphone icons shown from left to right."
                naturalWidth={1107}
                naturalHeight={888}
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
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="Volume and megaphone icons flipped from right to left."
                naturalWidth={1107}
                naturalHeight={888}
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
          title="Icons with sliders and progress bars"
          description={`
Sliders and progress bars are mirrored—progression is displayed from right to left.

A volume icon with a slider at its right side should be mirrored. The slider should progress RTL, and the sound waves should emerge from the right.
`}
        />
        <Flex gap={6} alignContent="between" wrap direction="row">
          <Flex.Item flex="grow" flexBasis="0%" maxWidth="100%">
            <Box
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="A volume slider with the low volume icon on the left and the full-volume icon on the right."
                naturalWidth={1107}
                naturalHeight={888}
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
              width="100%"
              minHeight={164}
              overflow="hidden"
              color="light"
              rounding={2}
              borderStyle="sm"
              marginBottom={3}
              display="inlineBlock"
              justifyContent="center"
            >
              <Image
                alt="A volume slider with the low volume icon on the right and the full-volume icon on the left."
                naturalWidth={1107}
                naturalHeight={888}
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
            type="do"
            title="Do"
            description="Mirror linear representation of time. Linear time advances from right to left."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/f6/cd/b4/f6cdb44c6324319f4522d7c8e86f1701.png"
                naturalWidth={1107}
                naturalHeight={888}
                fit="contain"
                alt="A cancel button followed by a next button with an arrow pointing towards the right and following the word &#8220;Next&#8221; in an RTL language like English. The same order is flipped in Hebrew."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="Don't"
            description="Mirror circular representation of time. To align with international conventions, use clockwise when going forward in time and counter-clockwise when going back in time."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/a6/09/47/a60947083df6f5d06ea50e0e22b0d238.png"
                naturalWidth={1107}
                naturalHeight={888}
                fit="contain"
                alt="Buttons in Hebrew on Pins moved to the left corner where they are harder to reach for most users."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <Box marginTop={-6} marginBottom={10}>
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
          name="Icons that don’t need to be mirrored"
          description={`
- Media play buttons and media progress indicator bar
- Checkmarks
- Objects referring to physical objects that don’t depict movement
`}
        >
          <MainSection.Subsection
            title="Media play buttons"
            description="When in the context of music, audio and video players, media playback buttons and media progress indicators shouldn't be mirrored as they refer to the direction of the tape being played, not the direction of time."
          />
          <Box maxHeight={459} marginBottom={3} borderStyle="sm" rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="An image of a woman playing a guitar and a caption in Arabic below it. Below it is an audio player with the controls still going from left to right."
                naturalWidth={2688}
                naturalHeight={1377}
                src="https://i.pinimg.com/originals/55/94/db/5594dbb4c25fb638f542d2b5bca5a222.png"
              />
            </Mask>
          </Box>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={6}>
            <Text size="300">Icons in an audio player don’t need to be flipped.</Text>
          </Box>
          <MainSection.Subsection title="Checkmarks" description="Checkmarks aren't mirrored." />
          <Box maxHeight={200} marginBottom={3} borderStyle="sm" rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="A success toast in Hebrew with the checkmark icon to the right of the text. The checkmark isn't mirrored."
                naturalWidth={2688}
                naturalHeight={336}
                src="https://i.pinimg.com/originals/e1/53/05/e1530574dc9a4a100c0a77bc4f1e7539.png"
              />
            </Mask>
          </Box>
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginBottom={6}>
            <Text size="300">
              In a Toast, for example, the message text is flipped, but the checkmark icon stays the
              same.
            </Text>
          </Box>

          <MainSection.Subsection
            title="Icons referring to physical objects that don't depict movement"
            description="Physical icons that don’t indicate movement or a direction don’t need to be mirrored. Examples include filter, icons with slashes across them, key and link."
          />
          <Box maxHeight={200} marginBottom={12} borderStyle="sm" rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="Filter, music, key and link icons that don't need to be flipped."
                naturalWidth={2688}
                naturalHeight={426}
                src="https://i.pinimg.com/originals/c6/d0/4d/c6d04d246e603fd2c21971cf5b957ced.png"
              />
            </Mask>
          </Box>
        </MainSection>
        <MainSection
          name="Design considerations"
          description="When choosing and designing icons, consider picking symbols that work well across languages and cultures without having to create new icons to adapt to each localization."
        />
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="Do"
            description="Use an icon that can be universally understood. An example is showing bills to depict money without depicting a specific currency. Or a safe to depict wealth generation."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/81/14/37/8114374d1792dd36686d721da69138f0.png"
                naturalWidth={1107}
                naturalHeight={888}
                fit="contain"
                alt="A simple, one-color icon of a sparkly, generic currency bill."
              />
            </Box>
          </MainSection.Card>
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="Don't"
            description="Use an icon that depicts currency not used in other countries, or that may be offensive in other cultures. For example, while a piggy bank might appropriately signify wealth generation on an English site or app, it might not suit a culture where pigs have a negative connotation."
          >
            <Box width="100%" height="100%" overflow="hidden">
              <Image
                src="https://i.pinimg.com/originals/ec/59/ef/ec59efa6106579fab88f857f361d6a01.png"
                naturalWidth={1107}
                naturalHeight={888}
                fit="contain"
                alt="A one-color icon of a piggy bank with a dollar sign on it."
              />
            </Box>
          </MainSection.Card>
        </MainSection.Subsection>
        <MainSection
          name="Using letters and scripts in icons"
          description={`
In general, we avoid using text in icons so that we don’t have to adapt icons to every language. However, there are times when using a particular script is necessary in an icon. Examples are text-editing UIs that communicate a script-related concept, like font-size choice. Consider creating an adapted version of those icons that'd include a RTL script.

Some icons might need to be removed because they don’t apply to a RTL language (for example, icons representing capitalization don't apply to Arabic).
        `}
        />

        <MainSection
          name="Additional resources"
          description={`
For additional information on Gestalt iconography, see the following.
- [Icon library](../iconography/library)
- [Custom and brand icons](../iconography/custom_and_brand_icons)
- [Usage](../iconography/usage)
- [Creating icons](../iconography/creating_icons)
- [Icon component](../../web/icon)
- [Icon requests](../../team_support/component_request#Filling-a-request-form)
        `}
        />
      </MainSection>
    </Page>
  );
}
