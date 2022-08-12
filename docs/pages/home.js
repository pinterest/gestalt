// @flow strict
import { Box, Button, Flex, Heading, Text } from 'gestalt';
import { type Node } from 'react';
import IllustrationCard from '../docs-components/IllustrationCard.js';
import IllustrationSection from '../docs-components/IllustrationSection.js';
import Page from '../docs-components/Page.js';
import Hero from '../graphics/home-page/HeroGraphic.js';
import Design from '../graphics/home-page/design.svg';
import Development from '../graphics/home-page/development.svg';
import HowToWork from '../graphics/home-page/how-to-work-with-us.svg';
import A11Y from '../graphics/home-page/accessibility.svg';
import Color from '../graphics/home-page/color.svg';
import DesignTokens from '../graphics/home-page/design-tokens.svg';

export default function HomePage(): Node {
  return (
    <Page title="Welcome to Gestalt" hideSideNav hideEditLink>
      <Box width="100%">
        <Flex direction="column">
          {/* Hero */}
          <IllustrationSection>
            {/* Cannot be Flex due to display none and minWidth needed on child */}
            <Box display="flex" alignItems="center" justifyContent="between">
              <Flex
                gap={{
                  row: 0,
                  column: 6,
                }}
                direction="column"
              >
                <Heading>Gestalt is Pinterest&rsquo;s design system</Heading>
                <Text size="300">
                  We’re here to help you build experiences that inspire people to create the life
                  they love
                </Text>

                <Button
                  text="See what’s new"
                  role="link"
                  rel="nofollow"
                  href="/roadmap/whats_new"
                />
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
          </IllustrationSection>
          {/* Get started */}
          <IllustrationSection title="Get started">
            <IllustrationCard
              title="Design"
              href="/get_started/design"
              isNew
              description="Our brand-new guide for designers to get started using Gestalt"
              color="blue-skycicle-450"
              image={<Design />}
            />
            <IllustrationCard
              href="/get_started/developers/installation"
              title="Development"
              description="How to set up for development and create pull requests"
              color="blue-skycicle-450"
              image={<Development />}
            />
            <IllustrationCard
              href="/get_started//how_to_work_with_us"
              title="How to work with us"
              description="Guidelines on how to engage the Gestalt team, when to work with us and how to contribute"
              color="blue-skycicle-450"
              image={<HowToWork />}
            />
          </IllustrationSection>
          {/* Guidelines */}
          <IllustrationSection title="Build">
            <IllustrationCard
              href="/foundations/accessibility"
              title="Accessibility"
              description="How to create an inclusive product that brings inspiration to everyone"
              color="teal-spabattical-450"
              image={<A11Y />}
            />

            <IllustrationCard
              href="/foundations/accessibility"
              title="Foundations"
              description="Guidelines around color palettes, typography, icons and more"
              color="teal-spabattical-450"
              image={<Color />}
            />

            <IllustrationCard
              title="Design tokens"
              href="/foundations/design_tokens"
              description="Values used to construct layouts and components, such as spacing and color"
              color="teal-spabattical-450"
              image={<DesignTokens />}
            />
          </IllustrationSection>
        </Flex>
      </Box>
    </Page>
  );
}
