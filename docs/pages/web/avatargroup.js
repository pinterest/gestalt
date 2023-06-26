// @flow strict
import { type Node } from 'react';
import { AvatarGroup } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibility from '../../examples/avatarGroup/accessibility.js';
import ideas from '../../examples/avatarGroup/ideas.js';
import main from '../../examples/avatarGroup/main.js';
import noEmoji from '../../examples/avatarGroup/noEmoji.js';
import noImageSource from '../../examples/avatarGroup/noImageSource.js';
import person from '../../examples/avatarGroup/person.js';
import roleButton from '../../examples/avatarGroup/roleButton.js';
import roleLink from '../../examples/avatarGroup/roleLink.js';
import sizing from '../../examples/avatarGroup/sizing.js';

export default function AvatarGroupPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="No image source" hideEditor previewHeight={200} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
            - For the general display of groups of people, companies and/or brands.
            - In cases where an affordance for adding collaborators is needed.
          `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the default alternative if no image source is available. This should be the first character of the provided name."
            sandpackExample={
              <SandpackExample
                code={noImageSource}
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
                code={noEmoji}
                name="No emoji"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use AvatarGroup to represent a group of people and/or organizations."
            sandpackExample={
              <SandpackExample
                code={person}
                name="Person"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use AvatarGroup to represent metaphorical ideas, like multiple Boards or trends. Instead, consider an [Image](/web/image) or the appropriate interactive component."
            sandpackExample={
              <SandpackExample
                code={ideas}
                name="Ideas"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
AvatarGroup requires \`accessibilityLabel\`. AvatarGroup is a group of elements that require a parent label describing both the data presented and the call to action in the case of button and link roles. As seen in the example below, the screen-reader reads: "Collaborators: Keerthi, Alberto, and 10 more. Add collaborators to this board."


If AvatarGroup is used as a control button to show/hide Popover-component, we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that AvatarGroup controls the display of an anchored Popover-component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-component attached to AvatarGroup. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether an anchored Popover-component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
  `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={accessibility} name="ARIA" previewHeight={250} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Keyboard Interaction"
          description={`If AvatarGroup is acting as a button or link, the Tab key will focus the AvatarGroup.
          Hitting the Enter or Return key opens a dialog or redirects to a new page (depending on the role) and the user can then add or view collaborators.`}
        />
      </AccessibilitySection>
      <MainSection name="Localization" description="Be sure to localize  `accessibilityLabel`." />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Fixed sizes"
          description="AvatarGroup is available in 3 fixed height sizes: `xs` (24px), `sm` (32px), and `md` (48px)."
        >
          <CombinationNew size={['xs', 'sm', 'md']}>
            {({ size }) => (
              <AvatarGroup
                accessibilityLabel="Collaborators: Keerthi, Alberto, and Shanice."
                size={size}
                collaborators={[
                  {
                    name: 'Keerthi',
                    src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                  },
                  {
                    name: 'Alberto',
                    src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                  },
                  {
                    name: 'Shanice',
                    src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
                  },
                ]}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Responsive sizing"
          description="AvatarGroup is a responsive component. Avatar Groups that are not given a size prop or use size `fit` will expand to fit to the width of their parent container. A common use case is to achieve column-based sizing.

        Resize the width or number of avatars to see the AvatarGroup change to match the width of the Column it's been placed in.
  "
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={sizing} name="Responsive sizing" previewHeight={200} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Collaborators display"
          description="AvatarGroup displays up to three user avatars. More users, if present, will be displayed as a numerical count for the `md` and `fit` sizes."
        >
          <CombinationNew
            hideTitle
            addCollaborators={[false, true]}
            collaborators={[
              [
                {
                  name: 'Keerthi',
                  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                },
              ],
              [
                {
                  name: 'Keerthi',
                  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                },
                {
                  name: 'Alberto',
                  src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                },
              ],
              [
                {
                  name: 'Keerthi',
                  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                },
                {
                  name: 'Alberto',
                  src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                },
                {
                  name: 'Shanice',
                  src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
                },
              ],
              [
                {
                  name: 'Keerthi',
                  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                },
                {
                  name: 'Alberto',
                  src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                },
                {
                  name: 'Shanice',
                  src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
                },
                ...new Array(10),
              ],
              [
                {
                  name: 'Keerthi',
                  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                },
                {
                  name: 'Alberto',
                  src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                },
                {
                  name: 'Shanice',
                  src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
                },
                ...new Array(100),
              ],
            ]}
          >
            {({ addCollaborators, collaborators }) => {
              const accessibilityLabel =
                collaborators.length <= 3
                  ? `Collaborators: ${collaborators.map((x) => x?.name).join(', and ')}.`
                  : `Collaborators: ${collaborators
                      .slice(0, 2)
                      .map((x) => x?.name)
                      .join(', ')} ${
                      collaborators.length > 3 ? `and ${collaborators.length - 2} more.` : '.'
                    }`;
              return addCollaborators ? (
                <AvatarGroup
                  accessibilityLabel={`${accessibilityLabel} Add collaborators to this board.`}
                  size="md"
                  collaborators={collaborators}
                  addCollaborators
                  onClick={() => {}}
                  role="button"
                />
              ) : (
                <AvatarGroup
                  accessibilityLabel={accessibilityLabel}
                  size="md"
                  collaborators={collaborators}
                />
              );
            }}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          title="Role"
          description="AvatarGroup can be display only, but can also act as a button or link. It will only be clickable if role is set to `button` or `link`. For button role, `onClick` is required. For link role, `href` is required."
        >
          <MainSection.Card
            title={'role="button"'}
            cardSize="md"
            sandpackExample={
              <SandpackExample code={roleButton} name="Role button" previewHeight={200} />
            }
          />
          <MainSection.Card
            title={'role="link"'}
            cardSize="md"
            sandpackExample={
              <SandpackExample code={roleLink} name="Role Link" previewHeight={200} />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Avatar](/web/avatar)**
        Avatar is the ideal component in cases where only one person or brand needs to be displayed.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('AvatarGroup') },
  };
}
