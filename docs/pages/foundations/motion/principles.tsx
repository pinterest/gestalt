// @flow strict
import { Box, Flex, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import PrincipleItem from '../../../docs-components/PrincipleItem';

export default function AnimationPrinciples() {
  return (
    <Page title="Animation principles">
      <PageHeader
        description="Animations can be utilized to provide feedback, add delight, and educate users. When considering adding animations to a product, consider these guiding principles."
        name="Animation principles"
        type="guidelines"
      />

      <MainSection name="Principles">
        <MainSection.Subsection marginBottom="compact" title="Experience principles">
          <Flex alignContent="between" gap={8} wrap>
            <Flex.Item flex="grow" flexBasis={240}>
              <Box borderStyle="sm" height="100%" padding={4} rounding={2}>
                <PrincipleItem
                  heading="Helpful"
                  text={
                    <Text>
                      Animations are used sparingly, and only when there is a clear, intentional
                      reason for them.
                      <br />
                      <br />
                      They help a user complete a task or learn new information, and should not
                      distract the user for accomplishing a goal.
                      <br />
                      <br />
                      Every animation should serve a purpose and not be added simply for the sake of
                      having animation.
                    </Text>
                  }
                />
              </Box>
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Box borderStyle="sm" height="100%" padding={4} rounding={2}>
                <PrincipleItem
                  heading="Focused"
                  text={
                    <Text>
                      Animations only last as long as needed to help guide the user.
                      <br />
                      <br />
                      They are directed toward specific elements and follow a logical progression
                      based on the purpose or location of those elements.
                      <br />
                      <br />
                      They are perhaps even unnoticed because they feel natural and expected.
                    </Text>
                  }
                />
              </Box>
            </Flex.Item>
            <Flex.Item flex="grow" flexBasis={240}>
              <Box borderStyle="sm" height="100%" padding={4} rounding={2}>
                <PrincipleItem
                  heading="Accessible"
                  text={
                    <Text>
                      Animations must be designed and implemented to consider people with
                      disabilities, ensuring they do not cause the user any harm.
                      <br />
                      <br />
                      Most of the time this means respecting a user’s device motion settings and
                      disabling any animations when “use reduced motion” is turned on.
                    </Text>
                  }
                />
              </Box>
            </Flex.Item>
          </Flex>
        </MainSection.Subsection>

        <Box marginTop={8}>
          <MainSection.Subsection marginBottom="compact" title="Visual principles">
            <Flex alignContent="between" gap={8} wrap>
              <Flex.Item flex="grow" flexBasis={240}>
                <Box borderStyle="sm" height="100%" padding={4} rounding={2}>
                  <PrincipleItem
                    heading="Soft"
                    text={
                      <Text>
                        Transitions should be gentle and elegant, the appearance of elements and
                        modals convey a feeling of pillow tenderness
                      </Text>
                    }
                  />
                </Box>
              </Flex.Item>
              <Flex.Item flex="grow" flexBasis={240}>
                <Box borderStyle="sm" height="100%" padding={4} rounding={2}>
                  <PrincipleItem
                    heading="Bouncy"
                    text={
                      <Text>
                        Bouncy brings delightful touch and sparks almost childlike curiosity to dive
                        into exploring ideas right away.
                        <br />
                        <br />
                        Playful use of color, as in this case use of animated gradient not only
                        brings attention to the element but also can serve an educational purpose
                        for users to interact with new features.
                      </Text>
                    }
                  />
                </Box>
              </Flex.Item>
              <Flex.Item flex="grow" flexBasis={240}>
                <Box borderStyle="sm" height="100%" padding={4} rounding={2}>
                  <PrincipleItem
                    heading="Physical"
                    text={
                      <Text>
                        Real means authentic, real means inspired by nature, and in some cases real
                        means literal and that’s how real became physical in motion.
                        <br />
                        <br />
                        Slight change in size to bring tactile feeling to UI or digital slider to
                        keep score of pins on the board are our explorations around real attributes.
                      </Text>
                    }
                  />
                </Box>
              </Flex.Item>
            </Flex>
          </MainSection.Subsection>
        </Box>
      </MainSection>
    </Page>
  );
}
