// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex } from 'gestalt';
import teamSupportTiles from '../../docs-components/data/teamSupport';
import IllustrationCard from '../../docs-components/IllustrationCard';
import IllustrationContainer from '../../docs-components/IllustrationContainer';
import IllustrationSection from '../../docs-components/IllustrationSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

export default function TeamSupportOverview(): ReactNode {
  return (
    <Page title="Team support overview" hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name="Team support"
            description="A set of resources and guidelines to provide you with the help you need to build consistent product surfaces and to collaborate with the Gestalt design system team."
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationSection title="" grid="auto-fill" min={312}>
          {teamSupportTiles.map(({ description, path, svg, title }) => (
            <IllustrationCard
              color="teal-spabattical-50"
              description={description}
              headingLevel={2}
              href={path}
              image={svg}
              key={title}
              title={title}
            />
          ))}
        </IllustrationSection>
      </Flex>
    </Page>
  );
}
