import { useState } from 'react';
import {
  AvatarGroup,
  Box,
  Flex,
  SelectList,
  Text,
  useDangerouslyInGestaltExperiment,
} from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import accessibility from '../../examples/avatarGroup/accessibility';
import accessibilityVR from '../../examples/avatarGroup/accessibilityVR';
import ideas from '../../examples/avatarGroup/ideas';
import main from '../../examples/avatarGroup/main';
import noEmoji from '../../examples/avatarGroup/noEmoji';
import noImageSource from '../../examples/avatarGroup/noImageSource';
import person from '../../examples/avatarGroup/person';
import roleButton from '../../examples/avatarGroup/roleButton';
import roleLink from '../../examples/avatarGroup/roleLink';
import sizing from '../../examples/avatarGroup/sizing';

export default function AvatarGroupPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const [avatarsize, setAvatarsize] = useState<'md' | 'xs' | 'sm'>('md');

  const sizeExamples = (
    <div>
      <Box display="flex">
        <SelectList
          id="sizeExamples"
          label="Size"
          onChange={({ value }) => {
            if (value === 'md' || value === 'xs' || value === 'sm') {
              setAvatarsize(value);
            }
          }}
          size="md"
          value={avatarsize}
        >
          {[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Box>
      <CombinationNew
        // @ts-expect-error - TS2322 - Type '{ children: ({ addCollaborators, collaborators }: { [key: string]: any; }) => Element; addCollaborators: boolean[]; collaborators: any[][]; hideTitle: true; }' is not assignable to type 'IntrinsicAttributes & Props'.
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
        hideTitle
      >
        {({ addCollaborators, collaborators }) => {
          const accessibilityLabel =
            collaborators.length <= 3
              ? // @ts-expect-error - TS7006 - Parameter 'x' implicitly has an 'any' type.
                `Collaborators: ${collaborators.map((x) => x?.name).join(', and ')}.`
              : `Collaborators: ${collaborators
                  .slice(0, 2)
                  // @ts-expect-error - TS7006 - Parameter 'x' implicitly has an 'any' type.
                  .map((x) => x?.name)
                  .join(', ')} ${
                  collaborators.length > 3 ? `and ${collaborators.length - 2} more.` : '.'
                }`;
          return addCollaborators ? (
            <AvatarGroup
              accessibilityLabel={`${accessibilityLabel} Add collaborators to this board.`}
              addCollaborators
              collaborators={collaborators}
              onClick={() => {}}
              role="button"
              size={avatarsize}
            />
          ) : (
            <AvatarGroup
              accessibilityLabel={accessibilityLabel}
              collaborators={collaborators}
              size={avatarsize}
            />
          );
        }}
      </CombinationNew>
    </div>
  );

  const staticCollaborators = [
    [
      {
        name: 'Sora',
        src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
      },
    ],
    [
      {
        name: 'Fatima',
        src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
      },
      {
        name: 'Sora',
        src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
      },
      {
        name: 'Ayesha',
        src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
      },
    ],
    [
      {
        name: 'Fatima',
        src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
      },
      {
        color: '08',
        name: 'Zola',
      },
      {
        name: 'Ayesha',
        src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
      },
    ],
  ];

  const interactiveCollaborators = [
    [
      {
        name: 'Fatima',
        src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
      },
    ],
    [
      {
        color: '10',
        name: 'Benito',
      },
      {
        name: 'Ayesha',
        src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
      },
      ...new Array(10),
    ],
    [
      {
        color: '04',
        name: 'Alanna',
      },
      {
        color: '06',
        name: 'Elliot',
      },
      {
        color: '08',
        name: 'Ricardo',
      },
      {
        color: '10',
        name: 'Ricardo',
      },
      ...new Array(10),
    ],
    [
      {
        name: 'Fatima',
        src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
      },
      {
        name: 'Sora',
        src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
      },
      {
        name: 'Ayesha',
        src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
      },
      ...new Array(100),
    ],
  ];

  const staticExamples = (
    <CombinationNew
      // @ts-expect-error - TS2322 - Type '{ children: ({ addCollaborators, collaborators }: { [key: string]: any; }) => Element; addCollaborators: boolean[]; collaborators: any[][]; hideTitle: true; }' is not assignable to type 'IntrinsicAttributes & Props'.
      addCollaborators={[false]}
      collaborators={staticCollaborators}
      hideTitle
    >
      {({ collaborators }) => {
        const accessibilityLabel =
          collaborators.length <= 3
            ? // @ts-expect-error - TS7006 - Parameter 'x' implicitly has an 'any' type.
              `Collaborators: ${collaborators.map((x) => x?.name).join(', and ')}.`
            : `Collaborators: ${collaborators
                .slice(0, 2)
                // @ts-expect-error - TS7006 - Parameter 'x' implicitly has an 'any' type.
                .map((x) => x?.name)
                .join(', ')} ${
                collaborators.length > 3 ? `and ${collaborators.length - 2} more.` : '.'
              }`;

        return (
          <Flex alignItems="center" direction="column" gap={2}>
            <AvatarGroup
              accessibilityLabel={accessibilityLabel}
              collaborators={collaborators}
              size={avatarsize}
            />
            <Text overflow="normal" size="200" weight="bold">
              Display Only
            </Text>
          </Flex>
        );
      }}
    </CombinationNew>
  );

  const interactiveExamples = (
    <CombinationNew
      // @ts-expect-error - TS2322 - Type '{ children: ({ addCollaborators, collaborators }: { [key: string]: any; }) => Element; addCollaborators: boolean[]; collaborators: any[][]; hideTitle: true; }' is not assignable to type 'IntrinsicAttributes & Props'.
      addCollaborators={[true]}
      collaborators={interactiveCollaborators}
      hideTitle
    >
      {({ addCollaborators, collaborators }) => {
        const accessibilityLabel =
          collaborators.length <= 3
            ? // @ts-expect-error - TS7006 - Parameter 'x' implicitly has an 'any' type.
              `Collaborators: ${collaborators.map((x) => x?.name).join(', and ')}.`
            : `Collaborators: ${collaborators
                .slice(0, 2)
                // @ts-expect-error - TS7006 - Parameter 'x' implicitly has an 'any' type.
                .map((x) => x?.name)
                .join(', ')} ${
                collaborators.length > 3 ? `and ${collaborators.length - 2} more.` : '.'
              }`;

        return addCollaborators && collaborators.length > 12 ? (
          <Flex alignItems="center" direction="column" gap={2}>
            <AvatarGroup
              accessibilityLabel={`${accessibilityLabel} Add collaborators to this board.`}
              addCollaborators
              collaborators={collaborators}
              onClick={() => {}}
              role="button"
              size={avatarsize}
            />
            <Text overflow="normal" size="200" weight="bold">
              Interactive
            </Text>
          </Flex>
        ) : (
          <Flex alignItems="center" direction="column" gap={2}>
            <AvatarGroup
              accessibilityLabel={accessibilityLabel}
              collaborators={collaborators}
              onClick={() => {}}
              role="button"
              size={avatarsize}
            />
            <Text overflow="normal" size="200" weight="bold">
              Interactive
            </Text>
          </Flex>
        );
      }}
    </CombinationNew>
  );

  const sizeExamplesVR = (
    <Flex alignContent="center" direction="column" gap={3}>
      <Box display="flex">
        <SelectList
          id="sizeExamples"
          label="Size"
          onChange={({ value }) => {
            if (value === 'md' || value === 'xs' || value === 'sm') {
              setAvatarsize(value);
            }
          }}
          size="md"
          value={avatarsize}
        >
          {[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Box>
      {staticExamples}
      {interactiveExamples}
    </Flex>
  );

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="No image source" previewHeight={200} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - For the general display of groups of people, companies and/or brands.
            - In cases where an affordance for adding collaborators is needed.
          `}
            title="When to use"
            type="do"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use the default alternative if no image source is available. This should be the first character of the provided name."
            sandpackExample={
              <SandpackExample
                code={noImageSource}
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
                code={noEmoji}
                hideControls
                hideEditor
                name="No emoji"
                previewHeight={200}
              />
            }
            type="don't"
          />
          <MainSection.Card
            cardSize="md"
            description="Use AvatarGroup to represent a group of people and/or organizations."
            sandpackExample={
              <SandpackExample
                code={person}
                hideControls
                hideEditor
                name="Person"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use AvatarGroup to represent metaphorical ideas, like multiple Boards or trends. Instead, consider an [Image](/web/image) or the appropriate interactive component."
            sandpackExample={
              <SandpackExample
                code={ideas}
                hideControls
                hideEditor
                name="Ideas"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
AvatarGroup requires \`accessibilityLabel\`. AvatarGroup is a group of elements that require a parent label describing both the data presented and the call to action in the case of button and link roles. As seen in the example below, the screen-reader reads: "Collaborators: Keerthi, Alberto, and 10 more. Add collaborators to this board."


If AvatarGroup is used as a control button to show/hide Popover-component, we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that AvatarGroup controls the display of an anchored Popover-component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-component attached to AvatarGroup. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether an anchored Popover-component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
  `}
          title="ARIA attributes"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={isInVRExperiment ? accessibilityVR : accessibility} name="ARIA" previewHeight={250} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`If AvatarGroup is acting as a button or link, the Tab key will focus the AvatarGroup.
          Hitting the Enter or Return key opens a dialog or redirects to a new page (depending on the role) and the user can then add or view collaborators.`}
          title="Keyboard Interaction"
        />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="AvatarGroup is available in 3 fixed height sizes: `xs` (24px), `sm` (32px), and `md` (48px)."
          title="Fixed sizes"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ size }: { [key: string]: any; }) => Element; size: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew size={['xs', 'sm', 'md']}>
            {({ size }) => (
              <AvatarGroup
                accessibilityLabel={
                  isInVRExperiment
                    ? 'Collaborators: Fatima, Sora, Ayesha.'
                    : 'Collaborators: Keerthi, Alberto, and Shanice.'
                }
                collaborators={
                  isInVRExperiment
                    ? [
                        {
                          name: 'Fatima',
                          src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
                        },
                        {
                          name: 'Sora',
                          src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
                        },
                        {
                          name: 'Ayesha',
                          src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                        },
                      ]
                    : [
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
                      ]
                }
                size={size}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        {!isInVRExperiment && (
          <MainSection.Subsection
            description="AvatarGroup is a responsive component. Avatar Groups that are not given a size prop or use size `fit` will expand to fit to the width of their parent container. A common use case is to achieve column-based sizing.

                    Resize the width or number of avatars to see the AvatarGroup change to match the width of the Column it's been placed in.
              "
            title="Responsive sizing"
          >
            <MainSection.Card
              cardSize="lg"
              sandpackExample={
                <SandpackExample code={sizing} name="Responsive sizing" previewHeight={200} />
              }
            />
          </MainSection.Subsection>
        )}
        <MainSection.Subsection
          description="AvatarGroup displays up to three user avatars. More users, if present, will be displayed as a numerical count. Not available for 'xs' size."
          title="Collaborators display"
        >
          {isInVRExperiment ? sizeExamplesVR : sizeExamples}
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description="AvatarGroup can be display only, but can also act as a button or link. It will only be clickable if role is set to `button` or `link`. For button role, `onClick` is required. For link role, `href` is required."
          title="Role"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={roleButton}
                layout="column"
                name="Role button"
                previewHeight={200}
              />
            }
            title={'role="button"'}
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={roleLink}
                layout="column"
                name="Role Link"
                previewHeight={200}
              />
            }
            title={'role="link"'}
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('AvatarGroup') },
  };
}
