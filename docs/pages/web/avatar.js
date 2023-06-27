// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import containerExample from '../../examples/avatar/containerExample.js';
import ideasExample from '../../examples/avatar/ideasExample.js';
import mainExample from '../../examples/avatar/mainExample.js';
import nameExample from '../../examples/avatar/nameExample.js';
import noEmojiExample from '../../examples/avatar/noEmojiExample.js';
import noImageSourceExample from '../../examples/avatar/noImageSourceExample.js';
import overExample from '../../examples/avatar/overExample.js';
import personExample from '../../examples/avatar/personExample.js';
import shapeExample from '../../examples/avatar/shapeExample.js';
import sizingExample from '../../examples/avatar/sizingExample.js';
import verifiedExample from '../../examples/avatar/verifiedExample.js';

export default function AvatarPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={mainExample}
          name="Main Avatar example"
          hideEditor
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - To reflect a person, company or brand within the product.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To represent a group of people, companies and/or brands. Use [AvatarGroup](/web/avatargroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the default alternative if no image source is available. This will be the first character of the provided name."
            sandpackExample={
              <SandpackExample
                code={noImageSourceExample}
                name="No image source"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use alternative graphics or icons"
            sandpackExample={
              <SandpackExample
                code={noEmojiExample}
                name="No emoji"
                hideEditor
                previewHeight={200}
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use round Avatars in the appropriate size for your need. Learn more about [avatar sizing](/web/avatar#Fixed-Sizes)."
            sandpackExample={
              <SandpackExample code={sizingExample} name="Sizing" hideEditor previewHeight={200} />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Scale or change the shape of Avatar. Instead use the designated Avatar sizes and style."
            sandpackExample={
              <SandpackExample
                code={shapeExample}
                name="Shape"
                hideControls
                hideEditor
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Avatar to represent a person, organization or group ([Avatar Group](/web/avatargroup))."
            sandpackExample={
              <SandpackExample code={personExample} name="People" hideEditor previewHeight={200} />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Avatar to represent metaphorical ideas, like a Board. Instead, consider an icon or the appropriate interactive component."
            sandpackExample={
              <SandpackExample
                code={ideasExample}
                name="Ideas"
                hideEditor
                previewHeight={200}
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the collaborator’s name nearby or in an alternative view if possible."
            sandpackExample={
              <SandpackExample code={nameExample} name="Name" hideEditor previewHeight={200} />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Place elements like washes, text or icons over Avatars."
            sandpackExample={
              <SandpackExample
                code={overExample}
                name="Over"
                hideEditor
                previewHeight={200}
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`
          The avatar should have a text equivalent. Use the \`accessibilityLabel\` prop to ensure there is a text description for the image. The VoiceOver description will default to the \`name\` prop if \`accessibilityLabel\` is not provided.

          Make sure that the alternative text properly describes the information and function of the avatar image(s). Depending on the situation, it may be helpful to state the collaborator or company name and/or their verification status.
        `}
      />
      <MainSection
        name="Localization"
        description={`Be sure to localize any content in the \`accessibilityLabel\` that isn’t a name.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
          There are 5 sizes available for Avatar. For certain designs you may need a [container-based size](#Container-Based-Sizes).
        `}
          title="Fixed sizes"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={sizingExample} name="Sizing variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    Avatars without a \`size\` prop will expand to fit the width of their parent container. A common use case is to achieve column-based sizing.

    Resize the browser to see these Avatar change to match the width of the \`Column\` they have been placed in.
  `}
          title="Container-based sizes"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={containerExample} name="Container-based variant" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    If there is no image source provided to the Avatar, the first character of
    the name provided will be used as a placeholder.
  `}
          title="Without an image"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={noImageSourceExample} name="No image variant" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    For users with verified accounts, use the \`verified\` prop to add a checkmark. Be sure to update the \`accessibilityLabel\` to include this information as well.
  `}
          title="Verified"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={verifiedExample} name="Verified variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[AvatarGroup](/web/avatargroup)**
        AvatarGroup is the ideal component in cases where multiple people/brands need to be displayed.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Avatar') },
  };
}
