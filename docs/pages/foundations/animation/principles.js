// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import PrincipleItem from '../../../docs-components/PrincipleItem.js';

export default function AnimationPrinciples(): Node {
  return (
    <Page title="Animation principles">
      <PageHeader
        name="Animation principles"
        type="guidelines"
        description="Animations can be utilized to provide feedback, add delight, and educate users. When considering adding animations to a product, consider these guiding principles."
      />
      <MainSection name="Principles">
        <Flex gap={12} alignContent="between" wrap>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              heading="Helpful"
              text={
                <Text>
                  Animations are used sparingly, and only when there is a clear, intentional reason
                  for them. They help a user complete a task or learn new information, and should
                  not distract the user for accomplishing a goal. Every animation should serve a
                  purpose and not be added simply for the sake of having animation.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              heading="Direct"
              text={
                <Text>
                  Animations only last as long as needed to help guide the user. They are directed
                  toward specific elements and follow a logical progression based on purpose or
                  location of those elements. They are intuitive and perhaps even unnoticed because
                  they feel natural and expected.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              heading="Accessible"
              text={
                <Text>
                  Animations must be implemented in a way that maintains accessibility, ensuring
                  they do not cause the user any harm. Most of the time this means respecting a
                  user’s device motion settings and disabling any animations when “use reduced
                  motion” is turned on.
                </Text>
              }
            />
          </Flex.Item>
        </Flex>
      </MainSection>
    </Page>
  );
}
