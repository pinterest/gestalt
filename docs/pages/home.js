// @flow strict
import { Box, Button, Flex, Heading, Text } from 'gestalt';
import { type Node } from 'react';
import HomePageCard from '../components/HomePageCard.js';
import HomePageSection from '../components/HomePageSection.js';
import Page from '../components/Page.js';
import Hero from '../graphics/HeroGraphic.js';
import Design from '../graphics/design.svg';
import Development from '../graphics/development.svg';
import HowToWork from '../graphics/how-to-work-with-us.svg';
import A11Y from '../graphics/accessibility.svg';
import Color from '../graphics/color.svg';
import DesignTokens from '../graphics/design-tokens.svg';

export default function HomePage(): Node {
  return (
    <Page title="Welcome to Gestalt" hideSideNav hideEditLink>
      <Box width="100%">
        <Flex direction="column">
          {/* Hero */}
          <HomePageSection>
            {/* Cannot be Flex due to display none and minWidth needed on child */}
            <Box display="flex" alignItems="center" justifyContent="between">
              <Flex gap={6} direction="column">
                <Heading>Gestalt is Pinterest&rsquo;s design system</Heading>
                <Text size="lg">
                  We’re here to help you build experiences that inspire people to create the life
                  they love
                </Text>

                <Button text="See what’s new" role="link" rel="nofollow" href="/whats_new" />
              </Flex>
              <Box
                minWidth="60%"
                display="none"
                mdDisplay="flex"
                alignItems="center"
                justifyContent="end"
                marginStart={8}
              >
                <Hero />
              </Box>
            </Box>
          </HomePageSection>
          {/* Getting Started */}
          <HomePageSection title="Getting started">
            <HomePageCard
              title="Design"
              href="/design"
              isNew
              description="Our brand-new guide for designers to get started using Gestalt"
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
