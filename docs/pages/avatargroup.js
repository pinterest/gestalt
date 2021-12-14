// @flow strict
import React, { type Node } from 'react';
import { AvatarGroup } from 'gestalt';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import CombinationNew from '../components/CombinationNew.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Page from '../components/Page.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function AvatarGroupPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="AvatarGroup">
      <PageHeader
        name="AvatarGroup"
        description={generatedDocGen?.description}
        defaultCode={`
  <Box width={300} height={125}>
    <AvatarGroup size="fit" accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
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
  </Box>
  `}
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
            - For the general display of groups of people, companies and/or brands.
            - In cases where an affordance for adding collaborators is needed.
          `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
            - Displaying a group of people, companies and/or brands in a square format. Use [AvatarPair](/avatarpair) instead.
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
            defaultCode={`
              <Box width={150} height={125}>
                <AvatarGroup size="fit" accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
                  collaborators={[
                    {
                      name: 'Keerthi',
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
              </Box>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use alternative graphics or icons"
            defaultCode={`
              <Box width={150} height={125}>
                <AvatarGroup size="fit" accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
                  collaborators={[
                    {
                      name: 'Keerthi',
                    },
                    {
                      name: '🎉',
                    },
                      {
                      name: 'Shanice',
                      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
                    },
                  ]}
                />
              </Box>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use AvatarGroup to represent a group of people and/or organizations."
            defaultCode={`
              <Box width={150} height={125}>
                <AvatarGroup size="fit" accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
                  collaborators={[
                    {
                      name: 'PinAble',
                      src: 'https://i.pinimg.com/75x75_RS/93/ad/66/93ad660e38e4f4315869424ea90e7ea4.jpg',
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
              </Box>
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use AvatarGroup to represent metaphorical ideas, like multiple Boards or trends. Instead, consider an [Image](/image) or the appropriate interactive component."
            defaultCode={`
            <Box width={150} height={125}>
              <AvatarGroup size="fit" accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
                collaborators={[
                  {
                    name: 'Art 1',
                    src: 'https://i.ibb.co/d0pQsJz/stock3.jpg',
                  },
                  {
                    name: 'Art 2',
                    src: 'https://i.ibb.co/SB0pXgS/stock4.jpg',
                  },
                    {
                    name: 'Art 3',
                    src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
                  },
                ]}
              />
            </Box>
            `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
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
            defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const anchorRef = React.useRef();

  const SearchCollaboratorsField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search other users"
        id="searchField"
        onChange={() => {}}
        placeholder="Search by name or email"
        size="lg"
        ref={ref}
      />
    )
  }

  return (
    <React.Fragment>
      <AvatarGroup
        accessibilityLabel="Collaborators: Keerthi, Alberto, and 10 more. Add collaborators to this board."
        accessibilityExpanded={open}
        addCollaborators
        role="button"
        onClick={() => setOpen( open => !open)}
        ref={anchorRef}
        size="md"
        collaborators={[

          {
            name: 'Keerthi',
            src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
          },
          {
            name: 'Alberto',
            src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
          },
          ...new Array(10),
        ]}
        />
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xl"
          >
            <Box
              flex="grow"
              marginEnd={4}
              marginStart={4}
              marginTop={6}
              marginBottom={8}
              width={360}
            >
              <Flex direction="column" gap={6}>
                <Text align="center" color="darkGray" weight="bold">
                  Invite collaborators
                </Text>
                <SearchCollaboratorsField />
              </Flex>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
    `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Keyboard Interaction"
          description={`If AvatarGroup is acting as a button or link, the Tab key will focus the AvatarGroup.
          Hitting the Enter or Return key opens a dialog or redirects to a new page (depending on the role) and the user can then add or view collaborators.`}
        />
      </MainSection>
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
            defaultCode={`
<Box width={600} height={100}>
  <Flex>
    <Box column={5}>
      <AvatarGroup
        accessibilityLabel="Collaborators: Keerthi, Alberto, and Shanice."
        size="fit"
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
    </Box>
    <Box column={7} marginStart={2} height="100%">
      <Text inline >The </Text>
      <Text inline weight="bold">
        <Link inline href="https://www.pinterest.com/search/boards/?q=quick%20vegan%20recipes&rs=typed&term_meta[]=quick%7Ctyped&term_meta[]=vegan%7Ctyped&term_meta[]=recipes%7Ctyped">Quick Vegan Recipes </Link>
      </Text>
      <Text inline> board has 3 followers.</Text>
    </Box>
  </Flex>
</Box>
   `}
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
            defaultCode={`
function ButtonExample() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const anchorRef = React.useRef();
  const collaborators = [
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    }, {
      name: 'Alberto',
      src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
    }, {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    }
  ];

const List = () => (
  <Flex direction="column" gap={2}>
    {collaborators.map(({ name, src }, index) => (
      <Flex key={index} alignItems="center" gap={2}>
        <Avatar size="md" name={name} src={src} />
        <Text weight="bold">{name}</Text>
      </Flex>
    ))}
  </Flex>
);

  return (
    <React.Fragment>
      <AvatarGroup
        accessibilityLabel="Click to see group collaborators."
        role="button"
        onClick={() => setOpen( open => !open)}
        ref={anchorRef}
        size="md"
        collaborators={collaborators}
        />
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box
              flex="grow"
              marginEnd={4}
              marginStart={4}
              marginTop={6}
              marginBottom={8}
              width={360}
            >
              <Flex direction="column" gap={6}>
                <Text align="center" color="darkGray" weight="bold">
                  Collaborators
                </Text>
                <List />
              </Flex>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
    `}
          />
          <MainSection.Card
            title={'role="link"'}
            cardSize="md"
            defaultCode={`
function LinkExample() {
  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
  const collaborators = [
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    }, {
      name: 'Alberto',
      src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
    }, {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    }
  ];

  return (
    <AvatarGroup
      accessibilityLabel="Visit group activity board."
      role="link"
      onClick={() => setOpen( open => !open)}
      size="md"
      collaborators={collaborators}
      href="#Role"
      />
  );
}
    `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Avatar](/avatar)**
        Avatar is the ideal component in cases where only one person or brand needs to be displayed.

        **[AvatarPair](/avatarpair)**
        AvatarPair is the ideal solution when you wish to communicate a group of people/brands (ideally two) laid out in a square format.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'AvatarGroup' }) },
  };
}
