import { Flex } from 'gestalt';
import { TOKEN_COLOR_TEAL_SPABATTICAL_50 } from 'gestalt-design-tokens';
import foundationsTiles from '../../docs-components/data/foundations';
import IllustrationCard from '../../docs-components/IllustrationCard';
import IllustrationContainer from '../../docs-components/IllustrationContainer';
import IllustrationSection from '../../docs-components/IllustrationSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

export default function FoundationsOverview() {
  return (
    <Page hideEditLink hideSideNav title="Foundations overview">
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            description="Use this as a guide for styling and structuring inclusive interfaces while leveraging common interaction patterns for all Pinterest products."
            name="Foundations overview"
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationSection grid="auto-fill" min={312} title="">
          {foundationsTiles.map(({ description, path, svg, title }) => (
            <IllustrationCard
              key={title}
              backgroundColor={TOKEN_COLOR_TEAL_SPABATTICAL_50}
              description={description}
              headingLevel={2}
              href={path}
              image={svg}
              title={title}
            />
          ))}
        </IllustrationSection>
      </Flex>
    </Page>
  );
}
