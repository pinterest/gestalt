// @flow strict
import type { Node } from 'react';
import { RadioButton } from 'gestalt';
import Example from '../components/Example.js';
import PropTable from '../components/PropTable.js';
import Combination from '../components/Combination.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="RadioButton">
      <PageHeader name="RadioButton" description={generatedDocGen?.description} />
      <PropTable
        props={[
          {
            name: 'checked',
            type: 'boolean',
            defaultValue: false,
            href: 'radio-button-combos',
          },
          {
            name: 'disabled',
            type: 'boolean',
            defaultValue: false,
            href: 'radio-button-combos',
          },
          {
            name: 'id',
            type: 'string',
            required: true,
          },
          {
            name: 'image',
            type: 'React.Node',
            href: 'images',
            description:
              'An optional `<Image/>` component can be supplied to add an image to each radio button. Spacing is already accounted for, simply specify the width and height.',
          },
          {
            name: 'label',
            type: 'string',
          },
          {
            name: 'name',
            type: 'string',
            description: 'The name given for all radio buttons in a single group',
          },
          {
            name: 'onChange',
            type: '({ event: SyntheticInputEvent<>, checked: boolean }) => void',
            required: true,
          },
          {
            name: 'value',
            type: 'string',
          },
          {
            name: 'ref',
            type: "React.Ref<'input'>",
            description: 'Forward the ref to the underlying input element',
            href: 'ref',
          },
          {
            name: 'size',
            type: `"sm" | "md"`,
            description: `sm: 16px, md: 24px`,
            defaultValue: 'md',
            href: 'ref',
          },
          {
            name: 'subtext',
            type: 'string',
            href: 'subtext',
            description:
              'Optional description for the radio button, used to provide more detail about an option',
          },
        ]}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Situations where users can only choose one out of multiple, related options.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Any time users can choose more than one option. Use [Checkboxes](/checkbox) instead.
          - As a solitary option. RadioButtons should always appear in groups of 2 or more. Consider a [Checkbox](/checkbox) or [Switch](/switch) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <Example
        description="
    Here is an example of an accessible group of radio buttons. All radio buttons should be wrapped in a [Fieldset](/fieldset).
  "
        name="RadioButton Group"
        defaultCode={`
function RadioButtonExample() {
  const [favorite, setFavorite] = React.useState(undefined);
  const [favoriteFood, setFavoriteFood] = React.useState(undefined);

  return (
    <Flex gap={4}>
      <Fieldset legend="What is your favorite pet?">
        <Flex direction="column" gap={2}>
          <RadioButton
            checked={favorite === 'dogs'}
            id="favoriteDog"
            label="Dogs"
            name="favorite"
            onChange={() => setFavorite( 'dogs' )}
            value="dogs"
          />
          <RadioButton
            checked={favorite === 'cats'}
            id="favoriteCat"
            label="Cats"
            name="favorite"
            onChange={() => setFavorite( 'cats' )}
            value="cats"
          />
          <RadioButton
            checked={favorite === 'plants'}
            id="favoritePlants"
            label="Plants"
            name="favorite"
            onChange={() => setFavorite( 'plants' )}
            value="plants"
          />
        </Flex>
      </Fieldset>
      <Fieldset legend="What is your favorite food?">
        <Flex gap={2}>
          <RadioButton
            checked={favoriteFood === 'pizza'}
            id="favoritePizza"
            label="Pizza"
            name="favoriteFood"
            onChange={() => setFavoriteFood( 'pizza' )}
            value="pizza"
          />
          <RadioButton
            checked={favoriteFood === 'curry'}
            id="favoriteCurry"
            label="Curry"
            name="favoriteFood"
            onChange={() => setFavoriteFood( 'curry' )}
            value="curry"
          />
          <RadioButton
            checked={favoriteFood === 'sushi'}
            id="favoriteSushi"
            label="Sushi"
            name="favoriteFood"
            onChange={() => setFavoriteFood( 'sushi' )}
            value="sushi"
          />
        </Flex>
      </Fieldset>
    </Flex>
  );
}
`}
      />
      <Example
        id="subtext"
        description="
    Here is an example of a group of radio buttons with subtext.
  "
        name="Example: With Subtext"
        defaultCode={`
function RadioButtonExample() {
  const [availability, setAvailability] = React.useState(undefined);

  return (
    <Fieldset legend="Which time slot works best for you?">
      <Flex direction="column" gap={2}>
        <RadioButton
          checked={availability === 'monday'}
          id="monday"
          label="Monday"
          subtext="Morning and afternoon"
          name="Availability"
          onChange={() => setAvailability( 'monday' )}
          value="monday"
        />
        <RadioButton
          checked={availability === 'tuesday'}
          id="tuesday"
          label="Tuesday"
          subtext="Morning, afternoon, and evening"
          name="Availability"
          onChange={() => setAvailability( 'tuesday' )}
          value="tuesday"
        />
        <RadioButton
          checked={availability === 'wednesday'}
          id="Wednesday"
          label="Wednesday"
          subtext="Evening only"
          name="Availability"
          onChange={() => setAvailability( 'wednesday' )}
          value="wednesday"
        />
      </Flex>
    </Fieldset>
  );
}
`}
      />
      <Example
        id="images"
        description="
    Here is an example of a group of radio buttons with images. When including images, you can use the subtext property to clearly describe the information being presented by the image, or use the image's alt text to provide more context.
  "
        name="Example: With Images"
        defaultCode={`
function RadioButtonExample() {
  const [artPreference, setArtPreference] = React.useState(undefined);

  return (
    <Fieldset legend="Which illustration is you favorite?">
      <Flex direction="column" gap={2}>
        <RadioButton
          checked={artPreference === 'coral'}
          id="coral"
          label="Coral"
          subtext="Botanical art in coral and green"
          image={<Box height={100} width={80}><Image alt="Botanical art in coral and green" src="https://i.ibb.co/7bQQYkX/stock2.jpg" fit="cover" naturalWidth={1} naturalHeight={1}/></Box>}

          name="Art Preference"
          onChange={() => setArtPreference( 'coral' )}
          value="coral"
        />
        <RadioButton
          checked={artPreference === 'blue'}
          id="blue"
          label="Blue"
          subtext="Typography and shoe in blue"
          image={<Box height={100} width={80}><Image alt="Typography and shoe in blue" src="https://i.ibb.co/jVR29XV/stock5.jpg" fit="cover" naturalWidth={1} naturalHeight={1}/></Box>}
          name="Art Preference"
          onChange={() => setArtPreference( 'blue' )}
          value="blue"
        />
        <RadioButton
          checked={artPreference === 'green'}
          id="green"
          label="Green"
          subtext="Abstract art in green"
          image={<Box height={100} width={80}><Image alt="Abstract art in green" src="https://i.ibb.co/FY2MKr5/stock6.jpg" fit="cover" naturalWidth={1} naturalHeight={1}/></Box>}
          name="Art Preference"
          onChange={() => setArtPreference( 'green' )}
          value="green"
        />
      </Flex>
    </Fieldset>
  );
}
`}
      />
      <Example
        id="ref"
        name="Example: ref"
        description={`The innermost \`RadioButton\` element can be accessed via \`ref\``}
        defaultCode={`
function RadioButtonExample() {
  const ref = React.useRef();
  const [label, setLabel] = React.useState("24 px RadioButton");
  const [size, setSize] = React.useState('md');
  const [switched, setSwitched] = React.useState(false);

  React.useEffect(() => {
      setLabel(ref.current && ref.current.offsetHeight)
  }, [size]);

  return (
    <Flex gap={4}>
      <Label>
        <Flex gap={2}>
          <Switch
            onChange={() => {
              setSize(size === "sm" ? "md" : "sm")
              setSwitched(!switched)}
            }
            id="emailNotifications"
            switched={switched}
          />
          <Text>Toggle RadioButton to small size</Text>
        </Flex>
      </Label>
        <RadioButton
          id="sizing"
          checked={false}
          label={label + 'px RadioButton'}
          onChange={() => {} }
          value="value"
          ref={ref}
          size={size}
        />
    </Flex>
  );
}`}
      />
      <Example
        name="Example: RadioButton and Popover"
        description={`
    A \`RadioButton\` with an anchor ref to a Popover component doesn't pass the correct positioning to the Popover. Instead set the anchor ref to the parent container.
  `}
        skipContrastCheck
        defaultCode={`

function RadioButtonPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState(false);
  const anchorCatRef = React.useRef();
  const anchorDogRef = React.useRef();

  return (
    <Fieldset legend="Tell us about yourself" legendDisplay="hidden">
      <Flex alignItems="start" direction="column" gap={4}>
        <Box display="inlineBlock" ref={anchorCatRef}>
          <RadioButton
            id="cat"
            checked={option === "cat"}
            label="I'm a cat person"
            onChange={() => {
              setOpen(true)
              setOption("cat")}
            }
            value="cat"
          />
        </Box>
        <Box display="inlineBlock" ref={anchorDogRef}>
          <RadioButton
            id="dog"
            checked={option === "dog"}
            label="I'm a dog person"
            onChange={() => {
              setOpen(true)
              setOption('dog')}
            }
            value="dog"
          />
        </Box>
      </Flex>
      {open &&
        <Layer>
          <Popover
            anchor={option === "cat" ? anchorCatRef.current  : anchorDogRef.current}
            color="red"
            idealDirection="right"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            shouldFocus={false}
            size="md"
          >
            <Link
              href={
                option === "cat"
                  ? "https://www.pinterest.com/search/pins/?q=cats"
                  : "https://www.pinterest.com/search/pins/?q=dogs"
              }
              target='blank'
            >
              <Box padding={3}>
                <Text
                  color="white"
                  weight="bold"
                >
                { option === "cat"
                    ? "Check cats on Pinterest!"
                    : "Check dogs on Pinterest!"
                }
                </Text>
              </Box>
            </Link>
          </Popover>
        </Layer>
      }
    </Fieldset>
  );
}
`}
      />
      <Combination
        checked={[false, true]}
        disabled={[false, true]}
        size={['sm', 'md']}
        id="radio-state-combos"
        hasCheckerboard={false}
        labelPrefix="radio-state-combos"
      >
        {(props, i) => (
          <RadioButton id={`radio-state-combos-${i}`} onChange={() => {}} value="" {...props} />
        )}
      </Combination>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'RadioButton' }) },
  };
}
