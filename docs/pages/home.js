// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex, Heading, Text } from 'gestalt';
import IllustrationCard from '../docs-components/IllustrationCard.js';
import IllustrationSection from '../docs-components/IllustrationSection.js';
import Page from '../docs-components/Page.js';
import Color from '../graphics/home-page/color.svg';
import Components from '../graphics/home-page/components.svg';
import Design from '../graphics/home-page/design.svg';
import Development from '../graphics/home-page/development.svg';
import HeroGraphic from '../graphics/home-page/HeroGraphic.js';
import HowToWork from '../graphics/home-page/how-to-work-with-us.svg';
import Roadmap from '../graphics/home-page/roadmap.svg';

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

                <Button text="View road map" role="link" href="/roadmap" />
              </Flex>
              <Box
                minWidth="60%"
                display="none"
                mdDisplay="flex"
                alignItems="center"
                justifyContent="end"
                marginStart={8}
              >
                <HeroGraphic />
              </Box>
            </Box>
          </IllustrationSection>
          {/* Get started */}
          <IllustrationSection title="Get started">
            <IllustrationCard
              headingLevel={3}
              title="Designer onboarding and tooling"
              href="/get_started/designers"
              description="Our brand-new guide for designers to get started using Gestalt"
              color="blue-skycicle-450"
              image={<Design />}
            />
            <IllustrationCard
              headingLevel={3}
              href="/get_started/developers/contributing/development_process"
              title="Developer onboarding and tooling"
              description="How to set up for development and create pull requests"
              color="blue-skycicle-450"
              image={<Development />}
            />
            <IllustrationCard
              headingLevel={3}
              href="/team_support/contributions"
              title="How to work with us"
              description="Guidelines on how to engage the Gestalt team, when to work with us and how to contribute"
              color="blue-skycicle-450"
              image={<HowToWork />}
            />
          </IllustrationSection>
          {/* Guidelines */}
          <IllustrationSection title="Build">
            <IllustrationCard
              href="/web/overview"
              headingLevel={3}
              title="Components"
              description="An extensive set of UI controls and utilities to help you build great experiences"
              color="teal-spabattical-450"
              image={<Components />}
            />

            <IllustrationCard
              headingLevel={3}
              href="/foundations/overview"
              title="Foundations"
              description="Guidelines around color palettes, typography, icons and more"
              color="teal-spabattical-450"
              image={<Color />}
            />

            <IllustrationCard
              headingLevel={3}
              title="Road map"
              href="/roadmap"
              description="What we plan to build and update in the short and long term"
              color="teal-spabattical-450"
              image={<Roadmap />}
            />
          </IllustrationSection>
        </Flex>
      </Box>
    </Page>
  );
}
