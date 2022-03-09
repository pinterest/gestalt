// @flow strict
import { type Node } from 'react';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function NumberFieldPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="NumberField">
      <PageHeader
        name="NumberField"
        description={generatedDocGen?.description}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <Box width={500}>
      <NumberField
        id="header-example"
        label="ZIP Code"
        onChange={({ value }) => setValue(value)}
        placeholder="Please enter your ZIP Code"
        value={value}
      />
    </Box>
  );
}
`}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Any time succinct numerical data needs to be entered by a user.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When accepting telephone numbers. Use [TextField](/textfield) with \`type="tel"\` instead.
          - Situations where text needs to be entered. Use [TextField](/textfield) or [TextArea](/textarea) instead.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use helper text for important information. Helper text helps users understand how to complete the number field or to indicate any needed input."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <Box padding={2} color="white">
      <NumberField
        helperText="Code was texted to you"
        id="best-practices-do-helper-text"
        label="Confirmation code"
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Put essential information in the placeholder text, since it disappears when the user types. The placeholder text is not a replacement for the label."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <Box padding={2} color="white">
      <NumberField
        id="best-practices-dont-placeholder"
        label=""
        onChange={({ value }) => setValue(value)}
        placeholder="Code was texted to you"
        value={value}
      />
    </Box>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Always ensure the number field has a visible label. The label provides context and supports users when filling in information."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <Box padding={2} color="white">
      <NumberField
        id="best-practices-do-label"
        label="Your age"
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Remove the label, as this creates accessibility and usability issues."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <div className="cypress-skip-a11y">
      <Box padding={2} color="white">
        <NumberField
          id="best-practice-dont-label"
          label=""
          onChange={({ value }) => setValue(value)}
          value={value}
        />
      </Box>
    </div>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Only place related fields on the same line."
            defaultCode={`
function Example(props) {
  const [firstValue, setFirstValue] = React.useState();
  const [secondValue, setSecondValue] = React.useState();

  return (
    <Flex gap={4}>
      <NumberField
        id="best-practices-do-related-first"
        label="First value"
        onChange={({ value }) => setFirstValue(value)}
        value={firstValue}
      />
      <NumberField
        id="best-practices-do-related-second"
        label="Second value"
        onChange={({ value }) => setSecondValue(value)}
        value={secondValue}
      />
    </Flex>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Place unrelated number fields on the same line, as this can create comprehension issues."
            defaultCode={`
function Example(props) {
  const [ageValue, setAgeValue] = React.useState();
  const [zipCodeValue, setZipCodeValue] = React.useState();

  return (
    <Flex gap={4}>
      <NumberField
        id="best-practices-dont-related-age"
        label="Age"
        onChange={({ value }) => setAgeValue(value)}
        value={ageValue}
      />
      <NumberField
        id="best-practices-dont-related-zip-code"
        label="ZIP Code"
        onChange={({ value }) => setZipCodeValue(value)}
        value={zipCodeValue}
      />
    </Flex>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Provide clear and useful error messages that help the user fix the issue. Error messages should be displayed in a timely manner — typically once the field loses focus or when the form is submitted."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <Box padding={2} color="white">
      <NumberField
        errorMessage="Please enter a value of at least $5"
        helperText="Minimum is $5"
        id="best-practices-do-error-message"
        label="Monthly ad spend"
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description={`Display generic error messages, such as "There is an error".`}
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <Box padding={2} color="white">
      <NumberField
        errorMessage="There is an error"
        helperText="Minimum is $5"
        id="best-practices-dont-error-message"
        label="Monthy ad spend"
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Box>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Consider all text fields as required, unless explicitly noted as optional."
            defaultCode={`
function Example(props) {
  const [name, setName] = React.useState({
    first: undefined,
    second: undefined,
    third: undefined,
  });

  return (
    <Flex direction="column" gap={3}>
      <NumberField
        id="best-practices-do-required-first"
        label="First number"
        onChange={({ value }) => setName((name) => ({ ...name, first: value }))}
        value={name.first}
      />
      <NumberField
        id="best-practices-do-required-second"
        label="Second number"
        onChange={({ value }) => setName((name) => ({ ...name, second: value }))}
        value={name.second}
      />
      <NumberField
        id="best-practices-do-required-third"
        label="Third number (optional)"
        onChange={({ value }) => setName((name) => ({ ...name, third: value }))}
        value={name.third}
      />
    </Flex>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mark fields as required."
            defaultCode={`
function Example(props) {
  const [name, setName] = React.useState({
    first: undefined,
    second: undefined,
    third: undefined,
  });

  return (
    <Flex direction="column" gap={3}>
      <NumberField
        helperText="* This field is required."
        id="best-practices-dont-required-first"
        label="First number"
        onChange={({ value }) => setName((name) => ({ ...name, first: value }))}
        value={name.first}
      />
      <NumberField
        helperText="* This field is required."
        id="best-practices-dont-required-second"
        label="Second number"
        onChange={({ value }) => setName((name) => ({ ...name, second: value }))}
        value={name.second}
      />
      <NumberField
        id="best-practices-dont-required-third"
        label="Third number"
        onChange={({ value }) => setName((name) => ({ ...name, third: value }))}
        value={name.third}
      />
    </Flex>
  );
}
            `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection
          title="Comprehension"
          description="Be sure to [provide instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) to help users understand how to complete the form and use individual form controls."
        />
        <MainSection.Subsection
          title="Labels"
          description="Ensure the labels are precise and concise. Labels should only describe the number field they are associated with, and they must be visible."
        />
        <MainSection.Subsection
          title="Validation"
          description={`
    When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Value must be greater than 20". In addition, use the helper text to provide instructions to help users understand how to complete the number field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.
    These practices give screen readers and users of assistive technologies more information about the form, helping them to fill it out.
    `}
        />
        <MainSection.Subsection
          title="Keyboard navigation"
          description={`
    NumberField has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each NumberField by using the tab key or shift+tab when moving backwards
    - Users can press the up and down arrow keys to adjust the field value
    - Setting \`disabled\` will prevent NumberField from receiving keyboard focus or input
    `}
        />
        <MainSection.Subsection
          title="Autofocus"
          description={`
    NumberField intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
        />
        <MainSection.Subsection
          title="onSubmit"
          description={`
    NumberField is commonly used as an input in forms alongside submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, NumberField doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap NumberField
    in a \`<form>\` and attach an \`onSubmit\` handler to that \`<form>\`.
  `}
        />
      </MainSection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`errorMessage\`, \`helperText\`, \`label\`, and \`placeholder\`.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Disabled"
          description="Disabled NumberFields cannot be interacted with using the mouse or keyboard."
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <NumberField
      disabled
      id="variant-disabled"
      label="Disabled"
      onChange={({ value }) => setValue(value)}
      placeholder="This input is disabled"
      value={value}
    />
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Helper text"
          description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <Box padding={2} color="white">
      <NumberField
        id="variant-helperText"
        helperText="Round up to the nearest whole number"
        label="Average value"
        onChange={({ value }) => setValue(value)}
        value={value}
      />
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Error message"
          description={`
    NumberField can display an error message.
    Simply pass in an \`errorMessage\` when there is an error present and we will handle the rest.`}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState();

  return (
    <NumberField
      id="variant-errorMessage"
      errorMessage={value === null || value === undefined ? "You must enter a number" : null}
      onChange={({ value }) => setValue(value)}
      label="With an error message"
      value={value}
    />
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Min/max/step"
          description={`
    NumberField provides additional props specific to numerical input.

    \`min\` and \`max\` can be used to define the acceptable bounds of the input (see the [ref example](#ref%20example) for more about using these for validation).

    \`step\` determines the amount incremented or decremented when using the input's arrow buttons. Set this as a float to allow decimal input.
  `}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState();

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
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Refs"
          description={`
    Set a ref on NumberField to use the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation) or to anchor a Popover-based element.

    Note that while the arrow buttons will not exceed the min/max (if set), the user is free to enter any number using the keyboard. Validation should be performed explicitly using the Constraint Validation API to ensure the value is within the specified range.
  `}
        >
          <MainSection.Card
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
      step={2}
      value={value}
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
      **[TextField](/textfield)**
      For text input, use TextField. (For telephone numbers, use \`<TextField type="tel" />\`.)
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'NumberField' }) },
  };
}
