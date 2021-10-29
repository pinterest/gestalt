// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import Card from '../components/Card.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function NumberFieldPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="NumberField">
      <PageHeader name="NumberField" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Any time succinct numerical data needs to be entered by a user.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Situations where text needs to be entered. Use [TextField](/textfield) or [TextArea](/textarea) instead.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        id="basicExample"
        name="Example"
        description={`
    NumberField will expand to fill the width of the parent container.
  `}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')

  return (
    <NumberField
      id="basicExampleNumberField"
      label="Enter your favorite number"
      onChange={({ value }) => {
        setValue(value);
      }}
      placeholder="We recommend 42"
      value={value}
    />
  );
}
`}
      />

      <Example
        id="disabledExample"
        name="Example: Disabled"
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')

  return (
    <NumberField
      disabled
      id="disabledNumberField"
      label="Disabled"
      onChange={({ value }) => setValue(value)}
      placeholder="This input is disabled"
      value={value}
    />
  );
}
`}
      />

      <Example
        id="helperText"
        name="Example: Helper Text"
        description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')

  return (
    <Box padding={2} color="white">
      <NumberField
        id="helperTextNumberField"
        helperText="Digits only please, e.g. 8675309"
        label="Phone number"
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Box>
  );
}
`}
      />

      <Example
        id="errorMessageExample"
        name="Example: Error message"
        description={`
    NumberField can display an error message.
    Simply pass in an \`errorMessage\` when there is an error present and we will handle the rest.`}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')

  return (
    <NumberField
      id="errorMessageNumberField"
      errorMessage={!value ? "This field can't be blank!" : null}
      onChange={({ value }) => setValue(value)}
      label="With an error message"
      value={value}
    />
  );
}
`}
      />

      <Example
        id="min-max-step example"
        name="Example: min/max/step"
        description={`
    NumberField provides additional props specific to numerical input.

    \`min\` and \`max\` can be used to define the acceptable bounds of the input (see the [ref example](#ref%20example) for more about using these for validation).

    \`step\` determines the amount incremented or decremented when using the input's arrow buttons. Set this as a float to allow decimal input.
  `}
        defaultCode={`
function Example(props) {
  const [value1, setValue1] = React.useState('');
  const [value2, setValue2] = React.useState('');

  return (
    <Flex direction="column" gap={2}>
      <NumberField
        id="minMaxStepExampleNumberField1"
        label="Stepping in intervals of 5"
        max={25}
        min={5}
        onChange={({ value }) => {
          setValue1(value);
        }}
        placeholder="Use the arrow buttons to increase/decrease the input value"
        step={5}
        value={value1}
      />
      <NumberField
        id="minMaxStepExampleNumberField2"
        label="Stepping in intervals of 0.1"
        max={2}
        min={-2}
        onChange={({ value }) => {
          setValue2(value);
        }}
        placeholder="Use the arrow buttons to increase/decrease the input value"
        step={0.1}
        value={value2}
      />
    </Flex>
  );
}
`}
      />

      <Example
        id="ref example"
        name="Example: ref"
        description={`
    Set a ref on NumberField to use the [Constraint validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation) or to anchor a Popover-based element.
  `}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current && ref.current.checkValidity() === false) {
      setErrorMessage("That episode doesn't exist (yet)!");
    } else {
      setErrorMessage(undefined);
    }
  }, [value]);

  return (
    <NumberField
      errorMessage={errorMessage}
      id="refExampleNumberField"
      label="Enter a Star Wars episode number"
      max={9}
      min={1}
      onChange={({ value }) => {
        setValue(value);
      }}
      placeholder="Enter a number from 1–9"
      ref={ref}
      value={value}
    />
  );
}
`}
      />

      <Card
        description={`
    NumberField intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
        name="Autofocus"
      />

      <Card
        description={`
    NumberField is commonly used as an input in forms alongside submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, NumberField doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap NumberField
    in a \`<form>\` and attach an \`onSubmit\` handler to that \`<form>\`.
  `}
        name="onSubmit"
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('NumberField') },
  };
}
