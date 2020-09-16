// @flow strict
import React, { type Node } from 'react';
import { Checkbox } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Checkbox"
    description="We recommending using a Checkbox over a Switch when you have a long list (>3) of toggles."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'checked',
        type: 'boolean',
        defaultValue: false,
        href: 'combinations',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        href: 'combinations',
      },
      {
        name: 'errorMessage',
        type: 'string',
      },
      {
        name: 'hasError',
        type: 'boolean',
        defaultValue: false,
        href: 'hasError',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        defaultValue: false,
        description: `Indeterminism is
purely presentational - the value of
a checkbox and its indeterminism are independent.`,
        href: 'combinations',
      },
      {
        name: 'label',
        type: 'string',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onChange',
        type: `({ event: SyntheticInputEvent<>, checked: boolean }) => void`,
        required: true,
      },
      {
        name: 'onClick',
        type: `({ event: SyntheticInputEvent<HTMLInputElement>, checked: boolean }) => void`,
      },
      {
        name: 'ref',
        type: "React.Ref<'input'>",
        description: 'Forward the ref to the underlying input element',
        href: 'refExample',
      },
      {
        name: 'size',
        type: `"sm" | "md"`,
        defaultValue: 'md',
        description: `"sm" is 16px & "md" is 24px`,
        href: 'combinations',
      },
    ]}
  />
);

card(
  <Example
    id="single"
    name="Example"
    defaultCode={`
function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);

  return (
      <Checkbox
        checked={checked}
        id="usa"
        label="United States of America"
        name="usa"
        onChange={({ checked }) => {
          setChecked(checked);
        }}
      />
  );
}
`}
  />
);

card(
  <Example
    id="group"
    description="Here is an example of an accessible group of checkboxes."
    name="Example: Group"
    defaultCode={`
function CheckboxExample() {
    const [checkedEn, setCheckedEn] = React.useState(false);
    const [checkedSp, setCheckedSp] = React.useState(false);
    const [checkedCh, setCheckedCh] = React.useState(false);

  return (
    <Box margin={-2}>
      <Box padding={2}>
        <Checkbox
          checked={checkedEn}
          id="english"
          label="English"
          name="english"
          onChange={({ checked }) => {
            setCheckedEn(checked);
          }}
        />
      </Box>
      <Box padding={2}>
        <Checkbox
          checked={checkedSp}
          id="spanish"
          label="Spanish"
          name="spanish"
          onChange={({ checked }) => {
            setCheckedSp(checked);
          }}
        />
      </Box>
      <Box padding={2}>
        <Checkbox
          checked={checkedCh}
          id="chinese"
          label="Chinese"
          name="chinese"
          onChange={({ checked }) => {
            setCheckedCh(checked);
          }}
        />
      </Box>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    description="Here is an example of a checkbox showing an error message."
    id="hasError"
    name="Example: Error state"
    defaultCode={`
function CheckboxExample() {
  return (
      <Checkbox
        id="error"
        errorMessage="This checkbox has an error"
        label="Email"
        name="error"
        onChange={() => {}}
      />
  );
}
`}
  />
);

card(
  <Example
    id="refExample"
    name="Example: ref"
    description={`The innermost \`Checkbox\` element can be accessed via \`ref\``}
    defaultCode={`
function CheckboxExample() {
  const ref = React.useRef();
  const [label, setLabel] = React.useState("24px Checkbox");
  const [size, setSize] = React.useState('md');
  const [switched, setSwitched] = React.useState(false);

  React.useEffect(() => {
      setLabel(ref.current && ref.current.offsetHeight)
  }, [size]);

  return (
    <Row gap={4}>
      <Label>
        <Row gap={2}>
          <Switch
            onChange={() => {
              setSize(size === "sm" ? "md" : "sm")
              setSwitched(!switched)}
            }
            id="emailNotifications"
            switched={switched}
          />
          <Text>Toggle Checkbox to small size</Text>
        </Row>
      </Label>
        <Checkbox
          id="sizing"
          checked={true}
          label={label + 'px Checkbox'}
          onChange={() => {} }
          value="value"
          ref={ref}
          size={size}
        />
    </Row>
  );
}`}
  />
);

card(
  <Example
    name="Example: Checkbox and Flyout"
    description={`
    A \`Checkbox\` with an anchor ref to a Flyout component doesn't pass the correct positioning to the Flyout. Instead set the anchor ref to the parent container.
  `}
    defaultCode={`

function CheckboxFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const termsA = React.useRef();

  return (
    <Box>
        <Box display="inlineBlock" ref={termsA}>
          <Checkbox
            id="a"
            checked={checked}
            label="Email me a notification"
            onChange={() => {
              setOpen(!checked)
              setChecked(!checked)
              }
            }
            value="A"
          />
        </Box>
      {open &&
        <Layer>
          <Flyout
            anchor={termsA.current}
            color="red"
            idealDirection="right"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            shouldFocus={false}
            size="md"
          >
            <Box padding={3}>
              <Text
                color="white"
                weight="bold"
              >
                  Change your primary email in Settings
              </Text>
            </Box>
          </Flyout>
        </Layer>
      }
    </Box>
  );
}
`}
  />
);

card(
  <Combination
    id="combinations"
    checked={[false, true]}
    hasError={[false, true]}
    disabled={[false, true]}
    indeterminate={[false, true]}
    size={['sm', 'md']}
  >
    {(props, i) => (
      <Checkbox id={`example-${i}`} onChange={() => {}} {...props} />
    )}
  </Combination>
);

export default cards;
