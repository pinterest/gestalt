import { Box, ButtonLink, Flex, Heading, Text } from 'gestalt';
import {
  TOKEN_COLOR_BLUE_SKYCICLE_450,
  TOKEN_COLOR_TEAL_SPABATTICAL_450,
} from 'gestalt-design-tokens';
import IllustrationCard from '../docs-components/IllustrationCard';
import IllustrationSection from '../docs-components/IllustrationSection';
import Page from '../docs-components/Page';
import Color from '../graphics/home-page/color.svg';
import Components from '../graphics/home-page/components.svg';
import Design from '../graphics/home-page/design.svg';
import Development from '../graphics/home-page/development.svg';
import HeroGraphic from '../graphics/home-page/HeroGraphic';
import HowToWork from '../graphics/home-page/how-to-work-with-us.svg';

export default function HomePage() {
  return (
    <Page hideEditLink hideSideNav title="Welcome to Gestalt">
      <Box width="100%">
        <Flex direction="column">
          {/* Hero */}
          <IllustrationSection>
            {/* Cannot be Flex due to display none and minWidth needed on child */}
            <Box alignItems="center" display="flex" justifyContent="between">
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 6,
                }}
              >
                <Heading>Gestalt is Pinterest&rsquo;s design system</Heading>
                <Text size="300">
                  We’re here to help you build experiences that inspire people to create the life
                  they love
                </Text>

                <ButtonLink href="/whats_new" text="See what's new" />
              </Flex>
              <Box
                alignItems="center"
                display="none"
                justifyContent="end"
                marginStart={8}
                mdDisplay="flex"
                minWidth="60%"
              >
                <HeroGraphic />
              </Box>
            </Box>
          </IllustrationSection>
          {/* Get started */}
          <IllustrationSection title="Get started">
            <IllustrationCard
              backgroundColor={TOKEN_COLOR_BLUE_SKYCICLE_450}
              description="Our brand-new guide for designers to get started using Gestalt"
              headingLevel={3}
              href="/get_started/designers"
              image={<Design />}
              title="Designer onboarding and tooling"
            />
            <IllustrationCard
              backgroundColor={TOKEN_COLOR_BLUE_SKYCICLE_450}
              description="How to set up for development and create pull requests"
              headingLevel={3}
              href="/get_started/developers/contributing/development_process"
              image={<Development />}
              title="Developer onboarding and tooling"
            />
            <IllustrationCard
              backgroundColor={TOKEN_COLOR_BLUE_SKYCICLE_450}
              description="Guidelines on how to engage the Gestalt team, when to work with us and how to contribute"
              headingLevel={3}
              href="/team_support/contributions"
              image={<HowToWork />}
              title="How to work with us"
            />
          </IllustrationSection>
          {/* Guidelines */}
          <IllustrationSection title="Build">
            <IllustrationCard
              backgroundColor={TOKEN_COLOR_TEAL_SPABATTICAL_450}
              description="An extensive set of UI controls and utilities to help you build great experiences"
              headingLevel={3}
              href="/web/overview"
              image={<Components />}
              title="Components"
            />

            <IllustrationCard
              backgroundColor={TOKEN_COLOR_TEAL_SPABATTICAL_450}
              description="Guidelines around color palettes, typography, icons and more"
              headingLevel={3}
              href="/foundations/overview"
              image={<Color />}
              title="Foundations"
            />
          </IllustrationSection>
        </Flex>
      </Box>
    </Page>
  );
}
