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
    description="Creates an accessible fieldset and legend for a group of related form items"
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
          "Content for this fieldset's legend that clearly and concisely describes the question being asked.",
      },
      {
        name: 'legendDisplay',
        type: "'visible' | 'hidden'",
        defaultValue: 'visible',
        description:
          'Whether the legend should be visible or not. If `hidden`, the legend is still available for screen reader users, but does not appear visually.',
      },
      {
        name: 'children',
        type: 'React.Node',
        required: true,
        description: `The content of Fieldset, typically [RadioButtons](/RadioButton), [Checkboxes](/Checkbox) or [TextFields](/TextField).`,
      },
    ]}
  />,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="When to use Fieldset"
      description={`Wrapping form fields in a fieldset creates an accessible grouping that signals to users when certain form items are related. The \`legend\` should clearly describe what information is needed from the group of items, whether they're [RadioButtons](/RadioButton), [Checkboxes](/Checkbox) or [TextFields](/TextField). Learn more about the [use of fieldset and legend](https://www.w3.org/WAI/tutorials/forms/grouping/#associating-related-controls-with-fieldset).`}
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
              <Text>Profile Details</Text>
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
              <Fieldset legend="What is your favorite pet?">
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
      description={`Be default, the \`legend\` is visible above the items in the Fieldset. However, if the form items are labelled by content elsewhere on the page, or a more complex legend is needed, the \`legendDisplay\` prop can be used to visually hide the legend. In this case, it is still available to screen reader users, but will not appear visually on the screen.`}
      title="Legend visibility"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function CheckboxExample() {
  const [checkedBotanical, setCheckedBotanical] = React.useState(false);
  const [checkedTypo, setCheckedTypo] = React.useState(false);

  return (
    <Flex direction="column" gap={4}>
      <Box>
        <Text weight="bold">Design options</Text>
        <Text size="md">Choose which backgrounds to use as placeholders when creating content</Text>
      </Box>
      <Fieldset legend="Which backgrounds would you like to use?" legendDisplay="hidden">
        <Flex direction="column" gap={4}>
          <Checkbox
            checked={checkedBotanical}
            id="coral"
            label="Coral"
            subtext="Botanical art in coral and green"
            image={<Box height={100} width={80}><Image alt="Botanical art in coral and green" src="https://i.ibb.co/7bQQYkX/stock2.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
            name="favorite art"
            onChange={({ checked }) => {
              setCheckedBotanical(checked);
            }}
          />
          <Checkbox
            checked={checkedTypo}
            id="blue"
            label="Blue"
            subtext="Typography and shoe in blue"
            image={<Box height={100} width={80}><Image alt="Typography and shoe in blue" src="https://i.ibb.co/jVR29XV/stock5.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
            name="favorite art"
            onChange={({ checked }) => {
              setCheckedTypo(checked);
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
