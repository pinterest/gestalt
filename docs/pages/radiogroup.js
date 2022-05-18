// @flow strict
import { type Node } from 'react';
import { RadioGroup } from 'gestalt';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import { multipledocgen, type DocGen } from '../components/docgen.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.RadioGroup.displayName}>
      <PageHeader
        name={generatedDocGen.RadioGroup.displayName}
        description={generatedDocGen.RadioGroup?.description}
        defaultCode={`
      function RadioButtonExample() {
        const [favorite, setFavorite] = React.useState();

        return (
          <RadioGroup legend="Gender" id="header-example">
            <RadioGroup.RadioButton
              checked={favorite === 'Female'}
              id="genderFemale"
              label="Female"
              name="gender-pref"
              onChange={() => setFavorite('Female')}
              value="Female"
            />
            <RadioGroup.RadioButton
              checked={favorite === 'Male'}
              id="genderMale"
              label="Male"
              name="gender-pref"
              onChange={() => setFavorite('Male')}
              value="Male"
            />
            <RadioGroup.RadioButton
              checked={favorite === 'Non-binary'}
              id="genderNon-binary"
              label="Non-binary"
              name="gender-pref"
              onChange={() => setFavorite('Non-binary')}
              value="Non-binary"
            />
            <RadioGroup.RadioButton
              checked={favorite === 'Prefer not to state'}
              id="genderPrefer not to state"
              label="Prefer not to state"
              name="gender-pref"
              onChange={() => setFavorite('Prefer not to state')}
              value="Prefer not to state"
            />
          </RadioGroup>
        );
      }
      `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen.RadioGroup} />
      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.RadioGroupButton.displayName}
          description={generatedDocGen?.RadioGroupButton.description}
        >
          <GeneratedPropTable
            Component={RadioGroup?.RadioButton}
            name="RadioGroup.RadioButton"
            id="RadioGroup.RadioButton"
            generatedDocGen={generatedDocGen.RadioGroupButton}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - In a list, form or table, to present users with multiple, related options where only one option can be selected.
          - When selection doesn’t take immediate effect and requires form submission.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Situations where users can select multiple options. Use [Checkbox](/checkbox) instead.
          - When there is only one item to select or deselect. Use Checkbox instead.
          - When a selection takes immediate effect, especially on mobile. Use [Switch](/switch) instead.
          - When it is visually difficult to observe that RadioGroup turns something on or off. Use Switch instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best Practices" />
      <MainSection name="Accessibility">
        <MainSection.Subsection
          title="Labels"
          description="Each RadioButton in a RadioGroup should have a label that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect options. Therefore, make sure to supply the label prop. If that’s not possible, make sure your stand-alone Label has an `htmlFor` prop that matches the `id` of the RadioButton. Test that a RadioButton and label are properly connected by clicking or tapping on the label and confirming that it activates the RadioButton next to it."
        />
        <MainSection.Subsection
          title="Legends"
          description={`Each RadioGroup should have a \`legend\` that clearly delineates what is being chosen. If you cannot use the provided legend styling, \`legendDisplay\` can be set to \`hidden\`, and an alternative legend can be displayed. See the [legend visibility](#Legend-visibility) variant for an example.`}
        />
        <MainSection.Subsection
          title="Keyboard interaction"
          description={`After focus has been set on the first RadioButton inside a RadioGroup, the arrow keys are used to cycle focus between the various options. Clicking or tapping the label of RadioButton should also focus that particular RadioButton. `}
        />
        <MainSection.Subsection
          title="Error message"
          description={`If RadioGroup has an \`errorMessage\`, the \`id\` on RadioGroup must also be set to properly link the error message to RadioGroup.
    `}
        />
      </MainSection>
      <MainSection
        name="Localization"
        description={`Be sure to localize \`errorMessage\`, \`subtext\`, \`label\`, and \`legend\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Direction"
          description="RadioGroups can be shown in a column or row by specifying the `direction` property."
        >
          <MainSection.Card
            defaultCode={`
function RadioButtonExample() {
  const [favorite, setFavorite] = React.useState();
  const [favoriteFood, setFavoriteFood] = React.useState();

  return (
    <Flex gap={8}>
      <RadioGroup legend="What is your favorite pet?" id="directionExample-1">
        <RadioGroup.RadioButton
          checked={favorite === 'dogs'}
          id="favoriteDog"
          label="Dogs"
          name="favorite"
          onChange={() => setFavorite('dogs')}
          value="dogs"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'cats'}
          id="favoriteCat"
          label="Cats"
          name="favorite"
          onChange={() => setFavorite('cats')}
          value="cats"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'plants'}
          id="favoritePlants"
          label="Plants"
          name="favorite"
          onChange={() => setFavorite('plants')}
          value="plants"
        />
      </RadioGroup>

      <RadioGroup legend="What is your favorite snack?" errorMessage="Please select one" direction="row" id="directionExample">
        <RadioGroup.RadioButton
          checked={favoriteFood === 'pizza'}
          id="favoritePizza"
          label="Pizza"
          name="favoriteFood"
          onChange={() => setFavoriteFood('pizza')}
          value="pizza"
        />
        <RadioGroup.RadioButton
          checked={favoriteFood === 'curry'}
          id="favoriteCurry"
          label="Curry"
          name="favoriteFood"
          onChange={() => setFavoriteFood('curry')}
          value="curry"
        />
        <RadioGroup.RadioButton
          checked={favoriteFood === 'sushi'}
          id="favoriteSushi"
          label="Sushi"
          name="favoriteFood"
          onChange={() => setFavoriteFood('sushi')}
          value="sushi"
        />
      </RadioGroup>
    </Flex>
  );
}
          `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Size"
          description="RadioButtons can be either `sm` (16px) or `md` (24px), which is the default."
        >
          <MainSection.Card
            defaultCode={`
function RadioButtonExample() {
  const [favorite, setFavorite] = React.useState();
  const [favoriteFood, setFavoriteFood] = React.useState();

  return (
    <Flex gap={8}>
      <RadioGroup legend="What is your favorite snack?" errorMessage="Please select one" id="sizeExample">
        <RadioGroup.RadioButton
          checked={favorite === 'pizza'}
          id="favoriteSizePizzaSm"
          label="Pizza"
          name="favoriteFoodSm"
          onChange={() => setFavorite('pizza')}
          value="pizza"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'curry'}
          id="favoriteSizeCurrySm"
          label="Curry"
          name="favoriteFoodSm"
          onChange={() => setFavorite('curry')}
          value="curry"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={favorite === 'sushi'}
          id="favoriteSizeSushiSm"
          label="Sushi"
          name="favoriteFoodSm"
          onChange={() => setFavorite('sushi')}
          value="sushi"
          size="sm"
        />
      </RadioGroup>

      <RadioGroup legend="What is your favorite snack?" errorMessage="Please select one" id="sizeExampleMd">
        <RadioGroup.RadioButton
          checked={favoriteFood === 'pizza'}
          id="favoriteSizePizza"
          label="Pizza"
          name="favoriteFood"
          onChange={() => setFavoriteFood('pizza')}
          value="pizza"
        />
        <RadioGroup.RadioButton
          checked={favoriteFood === 'curry'}
          id="favoriteSizeCurry"
          label="Curry"
          name="favoriteFood"
          onChange={() => setFavoriteFood('curry')}
          value="curry"
        />
        <RadioGroup.RadioButton
          checked={favoriteFood === 'sushi'}
          id="favoriteSizeSushi"
          label="Sushi"
          name="favoriteFood"
          onChange={() => setFavoriteFood('sushi')}
          value="sushi"
        />
      </RadioGroup>
    </Flex>
  );
}
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="States"
          description="Remember that disabled RadioButtons cannot be accessed by the keyboard and therefore should not contain any necessary info to complete the choice presented."
        >
          <MainSection.Card
            defaultCode={`
function RadioButtonExample() {
  const [favorite, setFavorite] = React.useState();

  return (
      <RadioGroup legend="Which state is your favorite?" direction="row" id="rowExample">
        <RadioGroup.RadioButton
          checked={false}
          id="unchecked"
          label="Unchecked"
          name="stateExample"
          onChange={() => setFavorite('unchecked')}
          value="unchecked"
        />
        <RadioGroup.RadioButton
          checked={true}
          id="checked"
          label="Checked"
          name="stateExample"
          onChange={() => setFavorite('checked')}
          value="checked"
        />
        <RadioGroup.RadioButton
          checked={false}
          id="uncheckedDisabled"
          label="Unchecked and disabled"
          name="stateExample"
          onChange={() => setFavorite('uncheckedDisabled')}
          value="uncheckedDisabled"
          disabled
        />
        <RadioGroup.RadioButton
          checked={true}
          id="checkedDisabled"
          label="Checked and disabled"
          name="stateExample"
          onChange={() => setFavorite('checkedDisabled')}
          value="checkedDisabled"
          disabled
        />
      </RadioGroup>
  );
}
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With subtext"
          description="Use `subtext` to provide extra context or information for each option."
        >
          <MainSection.Card
            defaultCode={`
function RadioButtonExample() {
  const [availability, setAvailability] = React.useState();

  return (
    <RadioGroup legend="Which time slot works best for you?" id="subtextExample">
        <RadioGroup.RadioButton
          checked={availability === 'monday'}
          id="monday"
          label="Monday"
          subtext="Morning and afternoon"
          name="Availability"
          onChange={() => setAvailability('monday')}
          value="monday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'tuesday'}
          id="tuesday"
          label="Tuesday"
          subtext="Morning, afternoon, and evening"
          name="Availability"
          onChange={() => setAvailability('tuesday')}
          value="tuesday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'wednesday'}
          id="Wednesday"
          label="Wednesday"
          subtext="Evening only"
          name="Availability"
          onChange={() => setAvailability('wednesday')}
          value="wednesday"
        />
    </RadioGroup>
  );
}
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With Image"
          description="When including images, you can use the `subtext` property to clearly describe the information being presented by the image, or use the image's `alt` text to provide more context."
        >
          <MainSection.Card
            defaultCode={`
function RadioButtonExample() {
  const [artPreference, setArtPreference] = React.useState();

  return (
    <RadioGroup legend="Pick a placeholder image" id="imageExample">
      <RadioGroup.RadioButton
        checked={artPreference === 'coral'}
        id="coral"
        label="Coral"
        subtext="Botanical art in coral and green"
        image={<Box height={100} width={80}><Image alt="Botanical art in coral and green" src="https://i.ibb.co/7bQQYkX/stock2.jpg" fit="cover" naturalWidth={1} naturalHeight={1}/></Box>}

        name="Art Preference"
        onChange={() => setArtPreference('coral')}
        value="coral"
      />
      <RadioGroup.RadioButton
        checked={artPreference === 'blue'}
        id="blue"
        label="Blue"
        subtext="Typography and shoe in blue"
        image={<Box height={100} width={80}><Image alt="Typography and shoe in blue" src="https://i.ibb.co/jVR29XV/stock5.jpg" fit="cover" naturalWidth={1} naturalHeight={1}/></Box>}
        name="Art Preference"
        onChange={() => setArtPreference('blue')}
        value="blue"
      />
      <RadioGroup.RadioButton
        checked={artPreference === 'green'}
        id="green"
        label="Green"
        subtext="Abstract art in green"
        image={<Box height={100} width={80}><Image alt="Abstract art in green" src="https://i.ibb.co/FY2MKr5/stock6.jpg" fit="cover" naturalWidth={1} naturalHeight={1}/></Box>}
        name="Art Preference"
        onChange={() => setArtPreference('green')}
        value="green"
      />
    </RadioGroup>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With an error"
          description="Use `errorMessage` to show an error message below the radio options."
        >
          <MainSection.Card
            defaultCode={`
function RadioButtonExample() {
  const [availability, setAvailability] = React.useState();

  return (
    <RadioGroup legend="Which time slot works best for you?" errorMessage="Please select one" id="VariantWithErrorMessage">
        <RadioGroup.RadioButton
          checked={availability === 'monday'}
          id="mondayError"
          label="Monday"
          subtext="Morning and afternoon"
          name="Availability with error"
          onChange={() => setAvailability('monday')}
          value="monday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'tuesday'}
          id="tuesdayError"
          label="Tuesday"
          subtext="Morning, afternoon, and evening"
          name="Availability with error"
          onChange={() => setAvailability('tuesday')}
          value="tuesday"
        />
        <RadioGroup.RadioButton
          checked={availability === 'wednesday'}
          id="WednesdayError"
          label="Wednesday"
          subtext="Evening only"
          name="Availability with error"
          onChange={() => setAvailability('wednesday')}
          value="wednesday"
        />
    </RadioGroup>
  );
}
          `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Legend visibility"
          description={`
            By default, the \`legend\` is visible above the items in the RadioGroup. However, if the form items are labeled by content elsewhere on the page, or a more complex legend is needed, the \`legendDisplay\` prop can be used to visually hide the \`legend\`. In this case, it is still available to screen reader users, but will not appear visually on the screen.

            In the example below, the "Primary company account goal" text is acting as a heading and a legend for the radio buttons, so instead of repeating another legend, we visually hide the RadioGroup \`legend\`. When a user focuses on the first radio, a screen reader will announce "Sell more products, radio button, 1 of 3, Primary company account goal, group".
        `}
        >
          <MainSection.Card
            defaultCode={`
function RadioButtonExample() {
  const [goal, setGoal] = React.useState();

  return (
    <Flex direction="column" gap={4}>
      <Flex direction="column" gap={2}>
        <Heading size="400">Primary company account goal</Heading>
        <Text size="200">
          Choose your primary goal for this account to help us better understand your needs
          <Text inline size="200" weight="bold">
            <Link inline target="blank" href="https://www.pinterest.com/">
              Additional information
            </Link>
          </Text>
        </Text>
      </Flex>
      <RadioGroup legend="Primary company account goal" legendDisplay="hidden" id="legendExample">
        <RadioGroup.RadioButton
          checked={goal === "sell"}
          id="sell"
          label="Sell more products"
          name="account goals"
          onChange={() => setGoal('sell')}
          value="sell"
        />
        <RadioGroup.RadioButton
          checked={goal === "leads"}
          id="leads"
          label="Generate more leads for the company"
          name="account goals"
          onChange={() => setGoal('leads')}
          value="leads"
        />
        <RadioGroup.RadioButton
          checked={goal === "interest"}
          id="interest"
          label="Create content on Pinterest to attract an audience"
          name="account goals"
          onChange={() => setGoal('interest')}
          value="interest"
        />
      </RadioGroup>
    </Flex>
  );
}
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Using ref"
          description={`The actual \`<input/>\` within the \`RadioButton\` element can be accessed via \`ref\`.`}
        >
          <MainSection.Card
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
      <RadioGroup legend="Ref example" legendDisplay="hidden" id="refExample">
        <RadioGroup.RadioButton
          id="sizing"
          checked={false}
          label={label + 'px RadioButton'}
          onChange={() => {} }
          value="value"
          ref={ref}
          size={size}
        />
      </RadioGroup>
    </Flex>
  );
}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Adding a Popover"
          description={`
    \`RadioButton\` with an anchor ref to a Popover component doesn't pass the correct positioning to the Popover. Instead set the anchor ref to the parent container.
  `}
        >
          <MainSection.Card
            defaultCode={`

function RadioButtonPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState(false);
  const anchorCatRef = React.useRef();
  const anchorDogRef = React.useRef();

  return (
    <RadioGroup legend="Tell us about yourself" id="popoverExample">
      <Box display="inlineBlock" ref={anchorCatRef}>
        <RadioGroup.RadioButton
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
        <RadioGroup.RadioButton
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
      {open &&
        <Layer>
          <Popover
            anchor={option === "cat" ? anchorCatRef.current  : anchorDogRef.current}
            idealDirection="right"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            shouldFocus={false}
            size="md"
          >
            <Box padding={3}>
              <Text
                color="default"
                weight="bold"
              >
                <Link
                  href={
                    option === "cat"
                      ? "https://www.pinterest.com/search/pins/?q=cats"
                      : "https://www.pinterest.com/search/pins/?q=dogs"
                  }
                  target='blank'
                  underline="always"
                >
                  { option === "cat"
                      ? "Check out cats on Pinterest!"
                      : "Check out dogs on Pinterest!"
                  }
                </Link>
              </Text>
            </Box>
          </Popover>
        </Layer>
      }
    </RadioGroup>
  );
}
          `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
            - Be brief with RadioGroup button labels so they are easily scanned.
            - Error messages should be simple, clear and direct without negative, overly clever and technical language.
            - A good error message: “To continue you must select one item from this list.”`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
            - Include lengthy text labels that make it hard for a user to scan a list of choices.
            - Write error messages that are overly-technical, long, negative, and too clever.
            - A not-so-great error message: “Hey there, nice try, but not selecting something is baaaad. Bad as in bad. Per error code i-five, you must select a choice from this boolean”.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
    **[CheckBox](/checkbox)**
    Use when presenting a user with a list of choices where multiple options can be selected.
    `}
        />
        <MainSection.Subsection
          description={`
    **[Switch](/Switch)**
    Use for single-cell options that can be turned on or off. Examples include a list of settings that take effect immediately without having to confirm form submission.
`}
        />
        <MainSection.Subsection
          description={`
    **[Fieldset](/fieldset)**
    Fieldset is used under the hood of RadioGroup to ensure accessible groups of radio buttons.
  `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipledocgen({
    componentName: ['RadioGroup', 'RadioGroupButton'],
  });

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
