// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex } from 'gestalt';
import foundationsTiles from '../../docs-components/data/foundations';
import IllustrationCard from '../../docs-components/IllustrationCard';
import IllustrationContainer from '../../docs-components/IllustrationContainer';
import IllustrationSection from '../../docs-components/IllustrationSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

export default function FoundationsOverview(): ReactNode {
  return (
    <Page title="Foundations overview" hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name="Foundations overview"
            description="Use this as a guide for styling and structuring inclusive interfaces while leveraging common interaction patterns for all Pinterest products."
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationSection title="" grid="auto-fill" min={312}>
          {foundationsTiles.map(({ description, path, svg, title }) => (
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
