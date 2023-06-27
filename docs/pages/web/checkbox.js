// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/checkbox/main.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- In a list, form or a [Table](/web/table), to present users with multiple, related options where more than one option can be selected. Users must be able to select all, none or some of the presented options.
- In a Form, along with a [TextField](/web/textfield), or other spaces that are too small for a [Switch](/web/switch)
- When selection doesn’t take immediate effect and requires form submission
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- Situations where users can only choose one out of multiple, related options. Use [RadioGroup](/web/radiogroup) instead.
- When a selection takes immediate effect, especially on mobile. Use [Switch](/web/switch) instead.
- When visually, it’s hard to tell that a checkbox turns something on or off. Use [Switch](/web/switch) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use checkboxes for multi-selection of related list items"
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
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use checkboxes for one selection. Use [RadioGroup](/web/radiogroup) instead."
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);

  return (
    <Fieldset legend="Pick one topic from the list">
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Checkbox
          checked={checked1}
          id="Fashion2"
          label="Fashion"
          onChange={({ checked }) => setChecked1(checked)}
        />
        <Checkbox
          checked={checked2}
          id="Beauty2"
          label="Beauty"
          onChange={({ checked }) => setChecked2(checked)}
        />
        <Checkbox
          checked={checked3}
          id="Interior_design_3"
          label="Interior design"
          onChange={({ checked }) => setChecked3(checked)}
        />
        <Checkbox
          checked={checked4}
          id="Other4"
          label="Other"
          onChange={({ checked }) => setChecked4(checked)}
        />
      </Flex>
    </Fieldset>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a single Checkbox in forms where the selection only takes effect after submitting the form"
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);

  return (
    <Flex direction="column" gap={{ column: 6, row: 0 }}>
      <TextField
        id="name"
        label="Name"
        onChange={() => {}}
        value=""
      />
      <TextField
        id="email"
        label="Email"
        onChange={() => {}}
        value=""
      />
      <Checkbox
        checked={checked1}
        id="terms"
        label="I agree to the Terms and Conditions"
        onChange={({ checked }) => setChecked1(checked)}
      />
      <Button
        accessibilityLabel='Submit'
        color="red"
        text="Submit"
        size="lg"
      />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use a Checkbox to turn a state on and off with immediate effect. Use [Switch](/web/switch) instead."
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);

  return (
    <Checkbox
      checked={checked1}
      id="location"
      label="Turn location tracking off"
      helperText="Change will auto-save"
      onChange={({ checked }) => setChecked1(checked)}
    />

  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep labels and legends clear and brief to avoid too many lines of text that are hard to scan and slow the user down. If clarification is needed, use info [Tooltips](/web/tooltip) or helperText."
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  return (
    <Flex direction="column" gap={{ column: 4, row: 0 }}>
      <Text size={400} weight="bold">How do you like your eggs?</Text>
      <Text>Select all the options that apply</Text>
      <Fieldset legendDisplay="hidden" legend="How do you like your eggs? Select all the options that apply">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Checkbox
            checked={checked1}
            id="Overeasy"
            label="Overeasy"
            onChange={({ checked }) => setChecked1(checked)}
          />
          <Checkbox
            checked={checked2}
            id="Sunny"
            label="Sunny side up"
            onChange={({ checked }) => setChecked2(checked)}
          />
          <Flex gap={{ row: 2, column: 0 }} alignItems="center">
            <Checkbox
              checked={checked3}
              id="Scramboiled"
              label="Scramboiled"
              onChange={({ checked }) => setChecked3(checked)}
            />
            <Tooltip text="A hardboiled egg that is then scrambled" idealDirection="up">
              <Icon icon="info-circle" accessibilityLabel="" size={14} color="default"/>
            </Tooltip>
          </Flex>
        </Flex>
      </Fieldset>
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use lengthy text that truncates and doesn’t offer clear instructions for what you are expected to select"
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  return (
    <Flex direction="column" gap={{ column: 4, row: 0 }}>
      <Text size={400} weight="bold">Which one?</Text>
      <Fieldset legendDisplay="hidden" legend="Which one?">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Checkbox
            checked={checked1}
            id="Overeasy2"
            label="Overeasy with a touch of salt and maybe a slice of bacon on top that isn't fully cooked and has no pepper."
            onChange={({ checked }) => setChecked1(checked)}
          />
          <Checkbox
            checked={checked2}
            id="Sunny2"
            label="Sunny side up"
            onChange={({ checked }) => setChecked2(checked)}
          />
          <Checkbox
            checked={checked3}
            id="Scramboiled3"
            label="Scramboiled--this is when you boil an egg, then you scrambled it in the pan along with the shells."
            onChange={({ checked }) => setChecked3(checked)}
          />
        </Flex>
      </Fieldset>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Checkbox at the start of a table row to make it clear which rows are multi-selectable"
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  return (
    <Table accessibilityLabel="Campaign selection" maxHeight={200}>
      <Table.Header sticky>
        <Table.Row>
          <Table.HeaderCell/>
          <Table.HeaderCell>
            <Text weight="bold">Name</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked1}
                id="1"
                onChange={({ checked }) => setChecked1(checked)}
                size="sm"
                label="Select Summertime picnic row"
                labelDisplay="hidden"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Text>Summertime picnic</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked2}
                id="2"
                onChange={({ checked }) => setChecked2(checked)}
                size="sm"
                label="Select Summer 1950 row"
                labelDisplay="hidden"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Text>Summer 1950</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked3}
                id="3"
                onChange={({ checked }) => setChecked3(checked)}
                size="sm"
                label="Select Back to school row"
                labelDisplay="hidden"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Text>Back to school</Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use numerous checkboxes in table rows that make it hard to tell what items apply to multi-select actions"
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  return (
    <Table accessibilityLabel="Campaign selection" maxHeight={200}>
      <Table.Header sticky>
        <Table.Row>
          <Table.HeaderCell/>
          <Table.HeaderCell>
            <Text weight="bold">Active</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text weight="bold">Name</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked1}
                id="4"
                onChange={({ checked }) => setChecked1(checked)}
                size="sm"
                label="Select Summertime picnic row"
                labelDisplay="hidden"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Checkbox
              id="5"
              onChange={() => {}}
              size="sm"
              label="off"
            />
          </Table.Cell>
          <Table.Cell>
            <Text>Summertime picnic</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked2}
                id="6"
                onChange={({ checked }) => setChecked2(checked)}
                size="sm"
                label="Select Summer 1950 row"
                labelDisplay="hidden"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Checkbox
              checked
              id="7"
              onChange={() => {}}
              size="sm"
              label="on"
            />
          </Table.Cell>
          <Table.Cell>
            <Text>Summer 1950</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked3}
                id="8"
                onChange={({ checked }) => setChecked3(checked)}
                size="sm"
                label="Select Back to school row"
                labelDisplay="hidden"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Checkbox
              id="9"
              onChange={() => {}}
              size="sm"
              label="off"
            />
          </Table.Cell>
          <Table.Cell>
            <Text>Back to school</Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use vertical alignment of multi-line labels so that the first line is vertically centered with the checkbox input"
            defaultCode={`
            function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  return (
    <Fieldset legend="Data personalization">
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Checkbox
          checked={checked1}
          id="sites"
          label="Use sites you visit to improve which recommendations and ads you see on Pinterest"
          onChange={({ checked }) => setChecked1(checked)}
        />
        <Checkbox
          checked={checked2}
          id="partner"
          label="Use partner info to improve which recommendations and ads you see on Pinterest"
          onChange={({ checked }) => setChecked2(checked)}
        />
        <Checkbox
          checked={checked3}
          id="activity"
          label="Use your activity to improve ads you see about Pinterest on other sites or apps you may visit"
          onChange={({ checked }) => setChecked3(checked)}
        />
      </Flex>
    </Fieldset>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Vertically center checkbox inputs with their respective custom labels"
            defaultCode={`
            function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

  return (
    <Fieldset legend="Data personalization">
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Flex gap={2} alignItems="center">
          <Checkbox
            checked={checked1}
            id="sites2"
            onChange={({ checked }) => setChecked1(checked)}
          />
          <Text inline>
            <Label htmlFor="sites2">
              Use sites you visit to improve which recommendations and ads you see on Pinterest.
            </Label>
            <Link href="#" display="inline">
              Learn more
            </Link>
          </Text>
        </Flex>

        <Flex gap={2} alignItems="center">
          <Checkbox
            checked={checked2}
            id="partner2"
            onChange={({ checked }) => setChecked2(checked)}
          />
          <Text inline>
            <Label htmlFor="partner2">
              Use partner info to improve which recommendations and ads you see on Pinterest.
            </Label>
            <Link href="#" display="inline">
              Learn more
            </Link>
          </Text>
        </Flex>

        <Flex gap={2} alignItems="center">
          <Checkbox
            checked={checked3}
            id="activity2"
            onChange={({ checked }) => setChecked3(checked)}
          />
          <Text inline>
            <Label htmlFor="activity2">
              Use your activity to improve ads you see about Pinterest on other sites or apps you
              may visit.
            </Label>
            <Link href="#" display="inline">
              Learn more
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Fieldset>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`Checkboxes should have labels that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect options. Therefore, make sure to supply the \`label\` prop. If that’s not possible, make sure your standalone Label has an \`htmlFor\` prop that matches the \`id\` of the checkbox. Test that a checkbox and label are properly connected by clicking or tapping on the label and confirming that it activates the checkbox next to it.

If Checkbox is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen. See the [Label visibility example](/web/checkbox#Label-visibility) for more detail.
`}
        />
        <MainSection.Subsection
          title="Legends"
          description={`All groups of related Checkboxes should have a legend, which is provided by wrapping them in [Fieldset](/web/fieldset) component.
`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
    const [checkedEn, setCheckedEn] = React.useState(false);
    const [checkedSp, setCheckedSp] = React.useState(false);
    const [checkedCh, setCheckedCh] = React.useState(false);

  return (
    <Fieldset legend="What languages would you like to learn?">
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Checkbox
          checked={checkedEn}
          id="english"
          label="English"
          name="english"
          onChange={({ checked }) => setCheckedEn(checked)}
        />
        <Checkbox
          checked={checkedSp}
          id="spanish"
          label="Spanish"
          name="spanish"
          onChange={({ checked }) => setCheckedSp(checked)}
        />
        <Checkbox
          checked={checkedCh}
          id="chinese"
          label="Chinese"
          name="chinese"
          onChange={({ checked }) => setCheckedCh(checked)}
        />
      </Flex>
    </Fieldset>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Keyboard navigation"
          description={`
    Checkbox has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each Checkbox by using the tab key or shift+tab when moving backwards
    - Setting \`disabled\` will prevent Checkbox from receiving keyboard focus or input

    In order to ensure proper tab order, wrap a group of related Checkboxes in [Fieldset](/web/fieldset).
    `}
        />
        <MainSection.Subsection
          title="Error message"
          description={`Checkbox’s error state displays an error-themed color border. Checkbox must always show an error message to indicate error status to ensure color is not the only indicator of status or information. Use \`errorMessage\` prop to display the appropriate error message that helps the user resolve the problem. Error messages should be clear, direct and conversational. For an example, see [Writing](#Writing).`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function CheckboxExample() {
  return (
      <Checkbox
        id="error"
        errorMessage="You must agree to the Terms and Conditions"
        label="I agree to the Terms and Conditions"
        name="error"
        onChange={() => {}}
      />
  );
}
`}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`label\` and any \`helperText\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Size"
          description={`Checkbox has \`size="sm"\` (16px) and \`size='md'\` (24px).`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

  return (
    <Flex gap={{ column: 0, row: 6 }}>
      <Checkbox
        checked={checked1}
        id="sm"
        label="Small size"
        onChange={({ checked }) => setChecked1(checked)}
        size="sm"
      />
      <Checkbox
        checked={checked2}
        id="md"
        label="Medium size"
        onChange={({ checked }) => setChecked2(checked)}
      />
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="State"
          description={`Checkbox has unchecked, checked, error, indeterminate and disabled states.

Indeterminate is a state that is neither checked nor unchecked — e.g. a "Select all" checkbox when not all items are selected or unselected. Indeterminism is purely presentational - the value of a checkbox and its indeterminism are independent.
   `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(true);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [checked5, setChecked5] = React.useState(false);

  return (
    <Flex gap={6} wrap>
      <Checkbox
        checked={false}
        id="Unchecked"
        label="Unchecked"
        onChange={() => setChecked1(false)}
      />
      <Checkbox
        checked={checked2}
        id="Checked"
        label="Checked"
        onChange={() => setChecked2(true)}
      />
      <Checkbox
        checked={checked4}
        id="ErrorState"
        label="Error"
        errorMessage="error message"
        onChange={({ checked }) => setChecked4(checked)}
      />
      <Checkbox
        checked={checked3}
        id="Indeterminate"
        label="Indeterminate"
        indeterminate
        onChange={({ checked }) => setChecked3(checked)}
      />
      <Checkbox
        checked={checked4}
        id="Disabled"

        label="Disabled"
        disabled
        onChange={({ checked }) => setChecked4(checked)}
      />

    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="With helperText" description="Checkbox supports helperText">
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
    const [checkedEn, setCheckedEn] = React.useState(false);
    const [checkedSp, setCheckedSp] = React.useState(false);
    const [checkedCh, setCheckedCh] = React.useState(false);

  return (
    <Fieldset legend="What languages would you like to learn?">
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Checkbox
          checked={checkedEn}
          id="english-info"
          label="English"
          helperText="USA, India, and Pakistan have the top number of English speakers "
          name="languages"
          onChange={({ checked }) => {
            setCheckedEn(checked);
          }}
        />
        <Checkbox
          checked={checkedSp}
          id="spanish-info"
          label="Spanish"
          helperText="Mexico, Colombia, and Spain are the top three Spanish-speaking countries"
          name="languages"
          onChange={({ checked }) => {
            setCheckedSp(checked);
          }}
        />
        <Checkbox
          checked={checkedCh}
          id="chinese-info"
          label="Chinese"
          helperText="Chinese has many varieties, including Cantonese and Mandarin"
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

        <MainSection.Subsection
          title="With Image"
          description={`Checkbox supports images. When including images, you can use the helperText property to clearly describe the information being presented by the image, or use the image's alt text to provide more context.

Spacing is already accounted for; simply specify the width and height.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function CheckboxExample() {
    const [checkedCoral, setCheckedCoral] = React.useState(false);
    const [checkedBlue, setCheckedBlue] = React.useState(false);

  return (
    <Fieldset legend="Which backgrounds would you like to use?" legendDisplay="hidden">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Checkbox
          checked={checkedCoral}
          id="coral"
          label="Coral"
          helperText="Botanical art in coral and green"
          image={<Box height={100} width={80}><Image alt="Botanical art in coral and green" src="https://i.ibb.co/7bQQYkX/stock2.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
          name="favorite art"
          onChange={({ checked }) => {
            setCheckedCoral(checked);
          }}
        />
        <Checkbox
          checked={checkedBlue}
          id="blue"
          label="Blue"
          helperText="Typography and shoe in blue"
          image={<Box height={100} width={80}><Image alt="Typography and shoe in blue" src="https://i.ibb.co/jVR29XV/stock5.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
          name="favorite art"
          onChange={({ checked }) => {
            setCheckedBlue(checked);
          }}
        />
      </Flex>
    </Fieldset>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Label visibility"
          description={`In some cases, the label for a Checkbox is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure Checkbox is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);

  return (
    <Table accessibilityLabel="Campaign selection" maxHeight={200}>
      <Table.Header sticky>
        <Table.Row>
          <Table.HeaderCell/>
          <Table.HeaderCell>
            <Text weight="bold">Name</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked1}
                id="label-visibility-example-checkbox-1"
                onChange={({ checked }) => setChecked1(checked)}
                label="Select Summertime picnic row"
                labelDisplay="hidden"
                size="sm"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Text>Summertime picnic</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked2}
                id="label-visibility-example-checkbox-2"
                onChange={({ checked }) => setChecked2(checked)}
                label="Select Summer 1950 row"
                labelDisplay="hidden"
                size="sm"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Text>Summer 1950</Text>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Box width={20}>
              <Checkbox
                checked={checked3}
                id="label-visibility-example-checkbox-3"
                onChange={({ checked }) => setChecked3(checked)}
                label="Select Back to school row"
                labelDisplay="hidden"
                size="sm"
              />
            </Box>
          </Table.Cell>
          <Table.Cell>
            <Text>Back to school</Text>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
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
- Be clear and brief with checkbox labels so they are easily scanned`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Include lengthy text labels that make it hard for a user to scan a list of choices`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[RadioGroup](/web/radiogroup)**
      Use when presenting a user with a list of choices for which there can only be one selection.
`}
        />
        <MainSection.Subsection
          description={`
      **[Switch](/web/switch)**
      Use for single-cell options that can be turned on or off. Examples include a list of settings that take effect immediately without having to confirm Form submission.
`}
        />
        <MainSection.Subsection
          description={`
      **[Fieldset](/web/fieldset)**
      Use to group a list of related Checkboxes with a legend that describes the list.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Checkbox') },
  };
}
