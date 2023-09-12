// @flow strict
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function IconPage(): Node {
  return (
    <Page title="Custom and brand icons">
      <PageHeader name="Custom and brand icons" folderName="icons" type="guidelines" />
      <MainSection name="Custom SVG icons">
        <MainSection.Subsection
          description={`
If you need a new icon for an experiment that is not listed on our [Icon](/web/icon) documentation, use the \`dangerouslySetSvgPath\` prop on [Icon](/web/icon), [IconButton](/web/iconbutton) or [Pog](/web/pog).

However, \`dangerouslySetSvgPath\` only works with one SVG path. For icons with multiple paths and groups, use [Box](/web/box) and \`dangerouslySetInlineStyle\` to pass the custom icon as \`backgroundImage\`.

Once your experiment ships to 100%, ask your designer to follow the directions in the [Icon kit](https://www.figma.com/file/N60WnDx9j6Moz3Dt1rNsq9/Icon-Kit). Once the asset is ready, we can add the icon to Gestalt.

Gestalt icon svg files follow a particular format and use automatic file validation testing.

\`
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
<path d="_______________"/>
</svg>
\`

We override the color in the Gestalt Icon component and Gestalt only uses the \`d\` attribute in the \`path\` tag and the basic attributes for visualizing the raw file in the \`svg\` tag . For consistency and for smaller bundle sizes, we don't include unnecessary attributes in the \`svg\` and \`path\` tags.

All Gestalt SVGs need to be exported from Figma using the [Icon Exporter plugin available in our Pinterest Design Figma plugin](/get_started/designers#Private-Figma-plugins)`}
        />
      </MainSection>
      <MainSection name="Brand icons">
        <MainSection.Subsection
          description={`
  All brand icons are trademarks of their respective owners. The inclusion of these trademarks does not indicate endorsement of the trademark holder by Pinterest, nor vice-versa. Please do not use brand logos for any purpose except to represent the company, product, or service to which they refer.
  `}
        />
      </MainSection>
    </Page>
  );
}
