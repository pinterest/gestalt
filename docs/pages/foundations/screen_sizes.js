// @flow strict
import { type Node } from 'react';
import MainSection from '../../docs-components/MainSection.js';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';
import screenSizesWeb from '../../examples/screenSizes/screenSizesWeb.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import screenSizesIos from '../../examples/screenSizes/screenSizesIos.js';

export default function DocsPage(): Node {
  return (
    <Page title="Screen sizes guidelines">
      <PageHeader
        name="Screen sizes"
        description="There are a multitude of screen sizes that Pinterest operates on. Our design system is built to flex to any and all screen sizes across platforms, but for consistency and ease of handoff, we only design for a handful of screen sizes per platform. Our screen sizes are always at 1x."
        type="guidelines"
      />
      <MainSection name="Web (px)">
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              code={screenSizesWeb}
              name="Web screen sizes"
              previewHeight={350}
              hideControls
              hideEditor
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
              name="iOS screen sizes"
              previewHeight={250}
              hideControls
              hideEditor
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
              name="Android screen sizes"
              previewHeight={250}
              hideControls
              hideEditor
            />
          }
        />
      </MainSection>
    </Page>
  );
}
