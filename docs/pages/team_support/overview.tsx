import { ReactNode } from 'react';
import { Flex } from 'gestalt';
import { TOKEN_COLOR_TEAL_SPABATTICAL_50 } from 'gestalt-design-tokens';
import teamSupportTiles from '../../docs-components/data/teamSupport';
import IllustrationCard from '../../docs-components/IllustrationCard';
import IllustrationContainer from '../../docs-components/IllustrationContainer';
import IllustrationSection from '../../docs-components/IllustrationSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

export default function TeamSupportOverview() {
  return (
    <Page hideEditLink hideSideNav title="Team support overview">
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            description="A set of resources and guidelines to provide you with the help you need to build consistent product surfaces and to collaborate with the Gestalt Design System Team."
            name="Team support overview"
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationSection grid="auto-fill" min={312} title="">
          {teamSupportTiles.map(({ description, path, svg, title }) => (
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
