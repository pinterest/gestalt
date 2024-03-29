// @flow strict
import { type Node as ReactNode } from 'react';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import screenSizesIos from '../../examples/screenSizes/screenSizesIos';
import screenSizesWeb from '../../examples/screenSizes/screenSizesWeb';

export default function DocsPage(): ReactNode {
  return (
    <Page title="Screen sizes guidelines">
      <PageHeader
        description="There are a multitude of screen sizes that Pinterest operates on. Our design system is built to flex to any and all screen sizes across platforms, but for consistency and ease of handoff, we only design for a handful of screen sizes per platform. Our screen sizes are always at 1x."
        name="Screen sizes"
        type="guidelines"
      />
      <MainSection name="Web (px)">
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              code={screenSizesWeb}
              hideControls
              hideEditor
              name="Web screen sizes"
              previewHeight={350}
            />
          }
        />
      </MainSection>
      <MainSection name="iOS (pt)">
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              code={screenSizesIos}
              hideControls
              hideEditor
              name="iOS screen sizes"
              previewHeight={250}
            />
          }
        />
      </MainSection>
      <MainSection name="Android (dp)">
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              code={screenSizesIos}
              hideControls
              hideEditor
              name="Android screen sizes"
              previewHeight={250}
            />
          }
        />
      </MainSection>
    </Page>
  );
}
