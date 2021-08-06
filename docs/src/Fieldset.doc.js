// @flow strict
import type { Node } from 'react';
import { Fieldset } from 'gestalt';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Fieldset"
    badge="pilot"
    description="Fieldset creates a fieldset and legend for a group of related form items, like RadioButtons or Checkboxes, in order to clearly indicate related form items."
    defaultCode={`
      function RadioButtonExample() {
        const [favorite, setFavorite] = React.useState(undefined);

        return (
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
              <RadioButton
                checked={favorite === 'peeves'}
                id="favoritePeeves"
                label="Peeves"
                name="favorite"
                onChange={() => setFavorite( 'peeves' )}
                value="peeves"
              />
            </Flex>
          </Fieldset>

        );
      }
`}
  />,
);

card(
  <PropTable
    Component={Fieldset}
    props={[
      {
        name: 'legend',
        type: 'string',
        required: true,
        description:
          'Caption that clearly and concisely describes the form elements grouped in the fieldset.',
      },
      {
        name: 'legendDisplay',
        type: "'visible' | 'hidden'",
        defaultValue: 'visible',
        description:
          'Whether the legend should be visible or not. If `hidden`, the legend is still available for screen reader users, but does not appear visually. See the [legend visibility variant](#Legend-visibility) for more info.',
      },
      {
        name: 'children',
        type: 'React.Node',
        required: true,
        description: `The content of Fieldset, typically [RadioButtons](/RadioButton), [Checkboxes](/Checkbox) or [TextFields](/TextField).`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description:
          'A unique identifier for this Fieldset. `id` must be specified when an errorMessage is added',
      },
      {
        name: 'errorMessage',
        type: 'React.Node',
        description:
          'For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in Link or TapArea.',
      },
    ]}
  />,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      description={`
      Wrapping form fields in Fieldset creates an accessible grouping that signals to users when certain form items are related. The \`legend\` should clearly describe what information is needed from the group of items, whether they're [RadioButtons](/RadioButton), [Checkboxes](/Checkbox) or [TextFields](/TextField).

      In the example below, the pet RadioButtons are surrounded by a fieldset and include a \`legend\` of "Favorite pet". Learn more about the [use of fieldset and legend](https://www.w3.org/WAI/tutorials/forms/grouping/#associating-related-controls-with-fieldset).`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function RadioButtonExample() {
  const [favorite, setFavorite] = React.useState(undefined);
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  return (
    <form>
      <Flex direction="column" gap={4}>
        <TextField
          id="name"
          onChange={({ value }) => setName(value)}
          placeholder="First and last name"
          label="Name"
          value={name}
          type="email"
        />
        <TextField
          id="email"
          onChange={({ value }) => setEmail(value)}
          placeholder="example@test.com"
          label="Email"
          value={email}
          type="email"
        />
        <Fieldset legend="Favorite pet">
          <Flex direction="column" gap={2}>
            <RadioButton
              checked={favorite === 'dogs'}
              id="favoriteDogA11y"
              label="Dogs"
              name="favorite"
              onChange={() => setFavorite( 'dogs' )}
              value="dogs"
            />
            <RadioButton
              checked={favorite === 'cats'}
              id="favoriteCatA11y"
              label="Cats"
              name="favorite"
              onChange={() => setFavorite( 'cats' )}
              value="cats"
            />
            <RadioButton
              checked={favorite === 'plants'}
              id="favoritePlantsA11y"
              label="Plants"
              name="favorite"
              onChange={() => setFavorite( 'plants' )}
              value="plants"
            />
          </Flex>
        </Fieldset>
      </Flex>
    </form>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(<MainSection name="Localization" description={`Be sure to localize the \`legend\` text.`} />);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      description={`
      By default, the \`legend\` is visible above the items in the Fieldset. However, if the form items are labelled by content elsewhere on the page, or a more complex legend is needed, the \`legendDisplay\` prop can be used to visually hide the legend. In this case, it is still available to screen reader users, but will not appear visually on the screen.

      In the example below, the "Company Account Goals" text is acting as a heading and a legend for the checkboxes, so instead of repeating another legend, we visually hide the Fieldset \`legend\`. When a user focuses on the first checkbox, a screen reader will announce "Sell more products, unchecked, checkbox, Choose up to 3 company account goals, group".
      `}
      title="Legend visibility"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function CheckboxExample() {
  const [checkedSell, setCheckedSell] = React.useState(false);
  const [checkedLeads, setCheckedLeads] = React.useState(false);
  const [checkedAudience, setCheckedAudience] = React.useState(false);
  const [checkedBrand, setCheckedBrand] = React.useState(false);
  const [checkedNotSure, setCheckedNotSure] = React.useState(false);

  return (
    <Flex direction="column" gap={4}>
      <Flex direction="column" gap={2}>
        <Heading size="sm">Company Account Goals</Heading>
        <Text size="md">
          Choose up to 3.
          <Text inline size="md" weight="bold">
            <Link inline target="blank" href="https://www.pinterest.com/">
              Additional information
            </Link>
          </Text>
        </Text>
      </Flex>
      <Fieldset legend="Choose up to 3 company account goals" legendDisplay="hidden">
        <Flex direction="column" gap={4}>
          <Checkbox
            checked={checkedSell}
            id="sell"
            label="Sell more products"
            name="account goals"
            onChange={({ checked }) => {
              setCheckedSell(checked);
            }}
          />
          <Checkbox
            checked={checkedLeads}
            id="leads"
            label="Generate more leads for the company"
            name="account goals"
            onChange={({ checked }) => {
              setCheckedLeads(checked);
            }}
          />
          <Checkbox
            checked={checkedAudience}
            id="audience"
            label="Create content on Pinterest to attract an audience"
            name="account goals"
            onChange={({ checked }) => {
              setCheckedAudience(checked);
            }}
          />
          <Checkbox
            checked={checkedBrand}
            id="brand"
            label="Increase brand awareness"
            name="account goals"
            onChange={({ checked }) => {
              setCheckedBrand(checked);
            }}
          />
          <Checkbox
            checked={checkedNotSure}
            id="notSure"
            label="Not sure yet"
            name="account goals"
            onChange={({ checked }) => {
              setCheckedNotSure(checked);
            }}
          />
        </Flex>
      </Fieldset>
    </Flex>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection title="Error message">
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function CheckboxExample() {
    const [checkedEn, setCheckedEn] = React.useState(false);
    const [checkedSp, setCheckedSp] = React.useState(false);
    const [checkedCh, setCheckedCh] = React.useState(false);

  return (
    <Fieldset legend="What languages would you like to learn?" id="fieldset-error-message" legendDisplay="hidden" errorMessage="Atleast 1 item must be selected">
      <Flex direction="column" gap={2}>
        <Checkbox
          checked={checkedEn}
          id="english-info"
          label="English"
          subtext="USA, India, and Pakistan have the top number of English speakers "
          name="languages"
          onChange={({ checked }) => {
            setCheckedEn(checked);
          }}
        />
        <Checkbox
          checked={checkedSp}
          id="spanish-info"
          label="Spanish"
          subtext="Mexico, Columbia, and Spain are the top three Spanish speaking countries"
          name="languages"
          onChange={({ checked }) => {
            setCheckedSp(checked);
          }}
        />
        <Checkbox
          checked={checkedCh}
          id="chinese-info"
          label="Chinese"
          subtext="Chinese has two varieties: Cantonese and Mandarin"
          name="languages"
          onChange={({ checked }) => {
            setCheckedCh(checked);
          }}
        />
      </Flex>
    </Fieldset>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
      **[Label](/Label)**
      If a label is needed for a single form item (instead of a group of items), use Label.
    `}
    />
  </MainSection>,
);

export default cards;
