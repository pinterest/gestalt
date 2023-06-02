// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading } from 'gestalt';
import MainSection from '../../docs-components/MainSection.js';
import Markdown from '../../docs-components/Markdown.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import HarmoniousVisual from '../../graphics/about_us/harmonious.svg';
import InclusiveVisual from '../../graphics/about_us/inclusive.svg';
import VelocityVisual from '../../graphics/about_us/velocity.svg';

export default function DocsPage(): Node {
  return (
    <Page title="About us" hideSideNav>
      <PageHeader name="About us" type="guidelines" />

      <MainSection
        name="Pinterest’s experience is guided and built by Gestalt"
        description={`
        Pinterest’s design system includes foundational standards, component documentation and guidelines to enable high-quality experiences for millions of people.
`}
      >
        <Flex direction="column" gap={10}>
          <Box
            display="flex"
            alignItems="start"
            direction="column"
            lgDirection="row"
            maxWidth={816}
          >
            <Box
              column={12}
              lgColumn={6}
              marginEnd={0}
              lgMarginEnd={8}
              marginBottom={8}
              lgMarginBottom={0}
              minWidth={340}
            >
              <InclusiveVisual style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Flex direction="column" gap={2}>
              <Heading size="400" accessibilityLevel={3}>
                Gestalt powers intuitive, inclusive and accessible interfaces
              </Heading>

              <Markdown text="Gestalt ensures everyone can enjoy Pinterest. Our system streamlines localization, right-to-left text and light/dark color schemes. Accessibility is at the heart of our components. It follows [WCAG 2.1 AA guidelines](https://www.w3.org/TR/WCAG21/), to guarantee they are not only compliant but accessible to as many people as possible." />
            </Flex>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            direction="column"
            lgDirection="row"
            maxWidth={816}
          >
            <Box
              column={12}
              lgColumn={6}
              marginEnd={0}
              lgMarginEnd={8}
              marginBottom={8}
              lgMarginBottom={0}
              minWidth={340}
            >
              <HarmoniousVisual style={{ width: '100%', height: 'auto' }} />
            </Box>

            <Flex direction="column" gap={2}>
              <Heading size="400" accessibilityLevel={3}>
                It creates harmonious experiences
              </Heading>

              <Markdown text="Gestalt’s components and patterns enable predictability throughout the product. The component family aims to connect every element in the interface to deliver a coordinated and intuitive end result." />
            </Flex>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            direction="column"
            lgDirection="row"
            maxWidth={816}
          >
            <Box
              column={12}
              lgColumn={6}
              marginEnd={0}
              lgMarginEnd={8}
              marginBottom={8}
              lgMarginBottom={0}
              minWidth={340}
            >
              <VelocityVisual style={{ width: '100%', height: 'auto' }} />
            </Box>

            <Flex direction="column" gap={2}>
              <Heading size="400" accessibilityLevel={3}>
                It objectively improves product development velocity
              </Heading>
              <Markdown text="Gestalt enables a better product experience in less time. Designers and engineers agree nearly unanimously that Gestalt speeds up their workflow. And the magnitude is dramatic—an estimated 33% efficiency gain (and climbing)." />
            </Flex>
          </Box>
        </Flex>
      </MainSection>
      <MainSection name="Gestalt is for everyone making Pinterest’s product" showHeading={false}>
        <Flex direction="column" gap={2}>
          <Heading size="500" accessibilityLevel={2}>
            Gestalt is for everyone making Pinterest’s product
          </Heading>
          <Box maxWidth={816}>
            <Markdown
              text={`The system is built for every cross-functional team member, such as designers, engineers and product managers. It fuels every part of Pinterest’s product experience. Our system provides Pinterest with a shared language and reusable code. It facilitates cross-functional collaboration, avoids duplication of efforts and establishes design cohesion.\n\nWe work closely with the Brand team to maintain Pinterest’s identity and aesthetic; however, Gestalt and Brand are different areas within our organization. For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/).`}
            />
          </Box>
        </Flex>
      </MainSection>
      <MainSection name="We’re available in Slack, office hours and events" showHeading={false}>
        <Flex direction="column" gap={2}>
          <Heading size="500" accessibilityLevel={2}>
            We’re ready to help in Slack, office hours and events
          </Heading>
          <Box maxWidth={816}>
            <Markdown
              text={`[Our team](http://pinch.pinadmin.com/gestaltOnboarding) is made up of designers, engineers, producers, writers, and so much more! We love to show our work, debate, and challenge each other, but ultimately we trust and empower each other to create great work, and we’re always open to feedback.\n\nWe’re available in so many ways. Visit our [team support page](https://gestalt.pinterest.systems/team_support/contributions) for support and collaboration.`}
            />
          </Box>
        </Flex>
      </MainSection>
    </Page>
  );
}
