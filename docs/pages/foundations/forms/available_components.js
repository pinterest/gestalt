// @flow strict
import { Text, Flex, Link } from 'gestalt';
import { type Node } from 'react';
import Example from '../../../docs-components/Example.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import main from '../../../examples/combobox/main.js';

const PREVIEW_HEIGHT = 320;

export default function FormComponentsPage(): Node {
  return (
    <Page title="Available form components">
      <PageHeader badge="pilot" name="Available form components" type="guidelines" />
      <MainSection name="TextField">
        <Example
          id="textfieldExample"
          name="TextField example"
          showCode={false}
          showHeading={false}
          defaultCode={` function Example(props) {
            const [value, setValue] = React.useState('');

            return (
              <Box width={500}>
                <TextField
                  autoComplete="username"
                  id="header-example"
                  label="Username"
                  onChange={({ value }) => {
                    setValue(value);
                  }}
                  placeholder="Please enter your username"
                  type="text"
                  value={value}
                />
              </Box>
            );
          }
        `}
        />
        <Flex direction="column" gap={4}>
          <Text>
            TextField is used for single lines of text. It also allows for other types of inputs
            like passwords and Tags.
          </Text>

          <Text>
            <Link href="/web/textfield" underline="always">
              Go to the TextField component
            </Link>
          </Text>
        </Flex>
      </MainSection>
      <MainSection name="TextArea">
        <Example
          id="textareaExample"
          name="TextArea example"
          showCode={false}
          showHeading={false}
          defaultCode={`function Example(props) {
            const [value, setValue] = React.useState('')
            return (
              <Box width="100%">
                <TextArea
                  id="headerExample"
                  onChange={({value}) => setValue(value)}
                  placeholder="Write something about yourself..."
                  label="About me"
                  value={value}
                />
              </Box>
            );
          }`}
        />
        <Flex direction="column" gap={4}>
          <Text>
            TextArea is used for inputting longer, paragraph-length text. An example is asking users
            to write out their opinion of a feature.
          </Text>

          <Text>
            <Link href="/web/textarea" underline="always">
              Go to the TextArea component
            </Link>
          </Text>
        </Flex>
      </MainSection>
      <MainSection name="Fieldset">
        <Example
          id="fieldsetExample"
          name="FieldSet example"
          showCode={false}
          showHeading={false}
          defaultCode={`function RadioButtonExample() {
            const [favorite, setFavorite] = React.useState(undefined);

            return (
              <Fieldset legend="What is your favorite pet?">
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
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
          }`}
        />
        <Flex direction="column" gap={4}>
          <Text>
            Fieldset creates a fieldset and legend for a group of related form items, like
            RadioButtons or CheckBoxes, in order to clearly indicate related form items.
          </Text>

          <Text>
            <Link href="/web/fieldset" underline="always">
              Go to the FieldSet component
            </Link>
          </Text>
        </Flex>
      </MainSection>
      <MainSection name="ComboBox">
        <SandpackExample
          code={main}
          name="Main Combobox example"
          hideEditor
          previewHeight={PREVIEW_HEIGHT}
        />
        <Flex direction="column" gap={4}>
          <Text>
            ComboBoxComboBox is the combination of a Textfield and an associated Dropdown that
            allows the user to filter a list when selecting an option.
          </Text>
          <Text>
            <Link href="/web/combobox" underline="always">
              Go to the ComboBox component
            </Link>
          </Text>
        </Flex>
      </MainSection>
      <MainSection name="SelectList">
        <Example
          id="selectlistExample"
          name="SelectList example"
          showCode={false}
          showHeading={false}
          defaultCode={`<SelectList
          id="selectlistexample1"
          label="Country"
          onChange={() => {}}
          size="lg"
        >
          {[
            { label: 'Algeria', value: 'algeria' },
            { label: 'Belgium', value: 'belgium' },
            { label: 'Canada', value: 'canada' },
            { label: 'Denmark', value: 'denmark' },
            { label: 'Egypt', value: 'egypt' },
            { label: 'France', value: 'france' },
          ].map(({ label, value }) =>
            <SelectList.Option key={label} label={label} value={value} />
          )}
        </SelectList>`}
        />
        <Flex direction="column" gap={4}>
          <Text>
            SelectList displays a list of actions or options using the browser’s native select.
          </Text>

          <Text>
            <Link href="/web/selectlist" underline="always">
              Go to the SelectList component
            </Link>
          </Text>
        </Flex>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Heading](/web/heading)**
To use as a main title, and for subsection titles in your form

**[Text](/web/text)**
To use as helper text or subtext underneath form titles

**[Checkbox](/web/checkbox)**
For multiple-choice selection

**[Radiogroup](/web/radiogroup)**
For single-choice selection
      `}
        />
      </MainSection>
    </Page>
  );
}
