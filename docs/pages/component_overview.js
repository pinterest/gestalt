// @flow strict
import { useState, type Node } from 'react';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import { Box, Fieldset, RadioButton, Flex, Text } from 'gestalt';
import HomePageCard from '../components/HomePageCard.js';
import A11Y from '../graphics/accessibility.svg';
import Color from '../graphics/color.svg';
import DesignTokens from '../graphics/design-tokens.svg';

import HomePageSection from '../components/HomePageSection.js';

export default function DocsPage(): Node {
  const [order, setOrder] = useState(undefined);

  return (
    <Page title="Component overview" hideSideNav hideEditLink>
      <PageHeader
        name="Component overview"
        description="Not sure which component you need? Take a look below or set up time with the Gestalt team!"
        showSourceLink={false}
      />
      <Box width="100%">
        <Flex direction="column">
          <Flex gap={2}>
            <Box aria-hidden={true}>
              <Text>Sort by:</Text>
            </Box>
            <Fieldset
              legend="Sort Gestalt components alphabetically or categorically"
              legendDisplay="hidden"
            >
              <Flex gap={2}>
                <RadioButton
                  checked={order === 'category'}
                  id="category"
                  label="Category"
                  name="category"
                  onChange={() => setOrder('category')}
                  value="category"
                />
                <RadioButton
                  checked={order === 'alphabetical'}
                  id="alphabetical"
                  label="Alphabetical"
                  name="alphabetical"
                  onChange={() => setOrder('alphabetical')}
                  value="alphabetical"
                />
              </Flex>
            </Fieldset>
          </Flex>
          <HomePageSection title="Getting started">
            <HomePageCard
              href="/accessibility"
              title="Accessibility"
              description="How to create an inclusive product that brings inspiration to everyone"
              color="teal-spabattical"
              image={<A11Y />}
            />
            <HomePageCard
              href="/accessibility"
              title="Accessibility"
              description="How to create an inclusive product that brings inspiration to everyone"
              color="teal-spabattical"
              image={<A11Y />}
            />
            <HomePageCard
              href="/accessibility"
              title="Accessibility"
              description="How to create an inclusive product that brings inspiration to everyone"
              color="teal-spabattical"
              image={<A11Y />}
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
              title="Design tokens"
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
