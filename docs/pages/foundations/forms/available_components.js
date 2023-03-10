// @flow strict
import { Text, Flex, Link } from 'gestalt';
import { type Node } from 'react';

import Example from '../../../docs-components/Example.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import main from '../../../examples/combobox/main.js';
import ref from '../../../examples/numberfield/main.js';

const PREVIEW_HEIGHT = 320;
const previewHeightPx = 235;

export default function FormComponentsPage(): Node {
  return (
    <Page title="Available form components">
      <PageHeader name="Available form components" type="guidelines" />
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

      <MainSection name="NumberField">
        <SandpackExample
          code={ref}
          hideEditor
          name="Main NumberField Example"
          previewHeight={previewHeightPx}
        />
        <Flex direction="column" gap={4}>
          <Text>NumberField allows for numerical input only.</Text>

          <Text>
            <Link href="/web/numberfield" underline="always">
              Go to the NumberField component
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
            ComboBox is the combination of a Textfield and an associated Dropdown that allows the
            user to filter a list when selecting an option.
          </Text>
          <Text>
            <Link href="/web/combobox" underline="always">
              Go to the ComboBox component
            </Link>
          </Text>
        </Flex>
      </MainSection>
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
      <MainSection name="DatePicker">
        <Example
          id="datepickerExample"
          name="DatePicker example"
          showCode={false}
          showHeading={false}
          defaultCode={`function DatePickerExample() {
            const handleChange = (value) => value;

            return (
              <DatePicker
                id="example-page-header"
                label="Select a date"
                onChange={({ value }) => handleChange(value)}
              />
            )
          }`}
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
      <MainSection name="Checkbox">
        <Example
          id="checkboxExample"
          name="Checkbox example"
          showCode={false}
          showHeading={false}
          defaultCode={`
          function Example() {
            const [checked1, setChecked1] = React.useState(false);
            const [checked2, setChecked2] = React.useState(false);
            const [checked3, setChecked3] = React.useState(false);
            const [checked4, setChecked4] = React.useState(false);

            return (
              <Fieldset legend="Select what you enjoy">
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  <Checkbox
                    checked={checked1}
                    id="Fashion"
                    label="Fashion"
                    onChange={({ checked }) => setChecked1(checked)}
                  />
                  <Checkbox
                    checked={checked2}
                    id="Beauty"
                    label="Beauty"
                    onChange={({ checked }) => setChecked2(checked)}
                  />
                  <Checkbox
                    checked={checked3}
                    id="Interior_design"
                    label="Interior design"
                    onChange={({ checked }) => setChecked3(checked)}
                  />
                  <Checkbox
                    checked={checked4}
                    id="Other"
                    label="Other"
                    onChange={({ checked }) => setChecked4(checked)}
                  />
                </Flex>
              </Fieldset>
            );
          }
          `}
        />
        <Flex direction="column" gap={4}>
          <Text>Checkbox is used for multi-select.</Text>

          <Text>
            <Link href="/web/checkbox" underline="always">
              Go to the Checkbox component
            </Link>
          </Text>
        </Flex>
      </MainSection>
      <MainSection name="RadioGroup">
        <Example
          id="radiogroupExample"
          name="RadioGroup example"
          showCode={false}
          showHeading={false}
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
        <Flex direction="column" gap={4}>
          <Text>RadioGroup is used for single-select.</Text>

          <Text>
            <Link href="/web/radiogroup" underline="always">
              Go to the RadioGroup component
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
          defaultCode={`
          function CheckboxExample() {
            const [checkedSell, setCheckedSell] = React.useState(false);
            const [checkedLeads, setCheckedLeads] = React.useState(false);
            const [checkedAudience, setCheckedAudience] = React.useState(false);
            const [checkedBrand, setCheckedBrand] = React.useState(false);
            const [checkedNotSure, setCheckedNotSure] = React.useState(false);

            return (
              <Flex direction="column" gap={{ column: 4, row: 0 }}>
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  <Heading size="400">Company Account Goals</Heading>
                  <Text size="200">
                    Choose up to 3.
                    <Text inline size="200" weight="bold">
                      <Link display="inline" target="blank" href="https://www.pinterest.com/">
                        Additional information
                      </Link>
                    </Text>
                  </Text>
                </Flex>
                <Fieldset legend="Choose up to 3 company account goals" legendDisplay="hidden">
                  <Flex direction="column" gap={{ column: 4, row: 0 }}>
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

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Heading](/web/heading)**
To use as a main title, and for subsection titles in your form

**[Text](/web/text)**
To use as helper text or subtext underneath form titles

**[Button](/web/button)**
For submitting a form or performing other actions to the form
      `}
        />
      </MainSection>
    </Page>
  );
}
