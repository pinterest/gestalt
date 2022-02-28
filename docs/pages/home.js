// @flow strict
import { Box, Button, Flex, Heading, Text } from 'gestalt';
import { type Node } from 'react';
import HomePageCard from '../components/HomePageCard.js';
import HomePageSection from '../components/HomePageSection.js';
import Page from '../components/Page.js';
import {
  HowToWork,
  Development,
  Design,
  A11Y,
  Color,
  DesignTokens,
  Hero,
} from '../graphics/HomePageIcons.js';

export default function HomePage(): Node {
  return (
    <Page title="Welcome to Gestalt" isFullWidth>
      <Box width="100%">
        <Flex direction="column">
          {/* Hero */}
          <HomePageSection>
            <Flex gap={8} alignItems="center">
              <Flex gap={6} direction="column">
                <Heading>Gestalt is Pinterest&apos;s design system</Heading>
                <Text size="lg">
                  We’re here to help you build experiences that inspire people to create the life
                  they love
                </Text>
                <Button text={"What's new"} role="link" rel="nofollow" href="/whats_new" />
              </Flex>
              <Flex.Item minWidth="60%">
                <Flex alignItems="center" justifyContent="end">
                  <Hero />
                </Flex>
              </Flex.Item>
            </Flex>
          </HomePageSection>
          {/* Getting Started */}
          <HomePageSection title="Getting started">
            <HomePageCard
              title="Design"
              href="/design"
              isNew
              description="Our brand new guide for designers to get started using Gestalt"
              color="blue-skycicle"
              image={<Design />}
            />
            <HomePageCard
              href="/development"
              title="Development"
              description="How to set up for development and create pull requests"
              color="blue-skycicle"
              image={<Development />}
            />
            <HomePageCard
              href="/how_to_work_with_us"
              title="How to Work with Us"
              description="Guidelines on how to engage the Gestalt team, when to work with us and how to contribute"
              color="blue-skycicle"
              image={<HowToWork />}
            />
          </HomePageSection>
          {/* Guidelines */}
          <HomePageSection title="Guidelines">
            <HomePageCard
              href="/accessibility"
              title="Accessibility"
              description="How to create an inclusive product that brings inspiration to everyone"
              color="teal-spabattical"
              image={<A11Y />}
            />

            <HomePageCard
              href="/color_palette"
              title="Color"
              description="A full range of options based on Pinterest’s brand color palette"
              color="teal-spabattical"
              image={<Color />}
            />

            <HomePageCard
              title="Design Tokens"
              href="/design_tokens"
              description="Values used to construct layouts and components, such as spacing and color"
              color="teal-spabattical"
              image={<DesignTokens />}
            />
          </HomePageSection>
        </Flex>
      </Box>
    </Page>
  );
}
