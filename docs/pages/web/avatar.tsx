import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import colorExample from '../../examples/avatar/colorExample';
import ideasExample from '../../examples/avatar/ideasExample';
import mainExample from '../../examples/avatar/mainExample';
import nameExample from '../../examples/avatar/nameExample';
import noEmojiExample from '../../examples/avatar/noEmojiExample';
import noImageSourceExample from '../../examples/avatar/noImageSourceExample';
import overExample from '../../examples/avatar/overExample';
import personExample from '../../examples/avatar/personExample';
import shapeExample from '../../examples/avatar/shapeExample';
import sizingExample from '../../examples/avatar/sizingExample';
import verifiedExample from '../../examples/avatar/verifiedExample';

export default function AvatarPage({ generatedDocGen }: { generatedDocGen: DocGen }) {

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample
          code={mainExample}
          hideEditor
          name="Main Avatar example"
          previewHeight={150}
        />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - To reflect a person, company or brand within the product.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - To represent a group of people, companies and/or brands. Use [AvatarGroup](/web/avatargroup) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use the default alternative if no image source is available. This will be the first character of the provided name."
            sandpackExample={
              <SandpackExample
                code={noImageSourceExample}
                hideEditor
                name="No image source"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use alternative graphics or icons"
            sandpackExample={
              <SandpackExample
                code={noEmojiExample}
                hideControls
                hideEditor
                name="No emoji"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use round Avatars in the appropriate size for your need. Learn more about [avatar sizing](/web/avatar#Fixed-Sizes)."
            sandpackExample={
              <SandpackExample code={sizingExample} hideEditor name="Sizing" previewHeight={200} />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Scale or change the shape of Avatar. Instead use the designated Avatar sizes and style."
            sandpackExample={
              <SandpackExample
                code={shapeExample}
                hideControls
                hideEditor
                name="Shape"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use Avatar to represent a person, organization or group ([Avatar Group](/web/avatargroup))."
            sandpackExample={
              <SandpackExample code={personExample} hideEditor name="People" previewHeight={200} />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Avatar to represent metaphorical ideas, like a Board. Instead, consider an icon or the appropriate interactive component."
            sandpackExample={
              <SandpackExample
                code={ideasExample}
                hideControls
                hideEditor
                name="Ideas"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use the collaborator’s name nearby or in an alternative view if possible."
            sandpackExample={
              <SandpackExample code={nameExample} hideEditor name="Name" previewHeight={200} />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place elements like washes, text or icons over Avatars."
            sandpackExample={
              <SandpackExample
                code={overExample}
                hideControls
                hideEditor
                name="Over"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        description={`
          The avatar should have a text equivalent. Use the \`accessibilityLabel\` prop to ensure there is a text description for the image. The VoiceOver description will default to the \`name\` prop if \`accessibilityLabel\` is not provided.

          Make sure that the alternative text properly describes the information and function of the avatar image(s). Depending on the situation, it may be helpful to state the collaborator or company name and/or their verification status.
        `}
        name={generatedDocGen?.displayName}
      />

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description="There are 12 available colors for Avatar."
          title="Colors"
        >
          <MainSection.Card
            cardSize="md"
            description={`
          - To reflect a person, company or brand within the product.
        `}
            sandpackExample={
              <SandpackExample
                code={colorExample}
                hideEditor
                name="Color Examples"
                previewHeight={200}
              />
            }
            title="When to use"
            type="do"
          />
        </MainSection.Subsection>
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

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#avatar',
            text: 'Avatar extension',
          },
        ]}
      />

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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Avatar') },
  };
}
