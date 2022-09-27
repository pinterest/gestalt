// @flow strict
import { Text, Flex } from 'gestalt';
import { type Node } from 'react';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import MainSection from '../../../docs-components/MainSection.js';
import PrincipleItem from '../../../docs-components/PrincipleItem.js';

export default function AnimationPrinciples(): Node {
  return (
    <Page title="Animation principles">
      <PageHeader
        badge="pilot"
        name="Animation principles"
        type="guidelines"
        description="Animations can be utilized to provide feedback, add delight, and educate users. When considering adding animations to a product, consider these guiding principles."
      />
      <MainSection name="Principles">
        <Flex gap={12} alignContent="between" wrap>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              color="yellow-caramellow-450"
              heading="Purposeful"
              text={
                <Text>
                  Animations are used sparingly, and only when there is a clear, intentional reason
                  for them. Every animation should serve a purpose and not be added simply for the
                  sake of having animation.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              color="blue-skycicle-450"
              heading="Helpful"
              text={
                <Text>
                  Animations help a user complete a task or learn new information. They should be
                  logical and not distract the user for accomplishing a goal.
                </Text>
              }
            />
          </Flex.Item>
          <Flex.Item flex="grow" flexBasis="0%" minWidth={275} maxWidth="45%">
            <PrincipleItem
              color="teal-spabattical-450"
              heading="Accessible"
              text={
                <Text>
                  Animations must be implemented in a way that maintains accessibility. Most of the
                  time this means respecting a user’s device motion settings and disabling any
                  animations when “use reduced motion” is turned on.
                </Text>
              }
            />
          </Flex.Item>
        </Flex>
      </MainSection>
    </Page>
  );
}
