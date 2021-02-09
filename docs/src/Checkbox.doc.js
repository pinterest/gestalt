// @flow strict
import React, { type Node } from 'react';
import { Checkbox } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Checkbox"
    description="We recommending using a Checkbox over a Switch when you have a long list (>3) of toggles."
  />,
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
        name: 'image',
        type: 'React.Node',
        href: 'images',
        description:
          'An optional <Image/> component can be supplied to add an image to each checkbox. Spacing is already accounted for, simply specify the width and height.',
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
      {
        name: 'subtext',
        type: 'string',
        href: 'subtext',
        description:
          'Optional description for the checkbox, used to provide more detail about an option',
      },
    ]}
  />,
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
  />,
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
  />,
);

card(
  <Example
    id="subtext"
    description="Here is an example of a group of checkboxes with additional subtext applied."
    name="Example: With Subtext"
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
          id="english-info"
          label="English"
          subtext="USA, India, and Pakistan have the top number of English speakers "
          name="languages"
          onChange={({ checked }) => {
            setCheckedEn(checked);
          }}
        />
      </Box>
      <Box padding={2}>
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
      </Box>
      <Box padding={2}>
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
      </Box>
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="images"
    description="Here is an example of a group of checkboxes with images included. When including images, you can use the subtext property to clearly describe the information being presented by the image, or use the image's alt text to provide more context."
    name="Example: With Images"
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
          id="coral"
          label="Coral"
          subtext="Botanical art in coral and green"
          image={<Box height={100} width={80}><Image alt="Botanical art in coral and green" src="https://i.ibb.co/7bQQYkX/stock2.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
          name="favorite art"
          onChange={({ checked }) => {
            setCheckedEn(checked);
          }}
        />
      </Box>
      <Box padding={2}>
        <Checkbox
          checked={checkedSp}
          id="blue"
          label="Blue"
          subtext="Typography and shoe in blue"
          image={<Box height={100} width={80}><Image alt="Typography and shoe in blue" src="https://i.ibb.co/jVR29XV/stock5.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
          name="favorite art"
          onChange={({ checked }) => {
            setCheckedSp(checked);
          }}
        />
      </Box>
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    description="Here is an example of a checkbox showing an error message."
    id="hasError"
    name="Example: Error state"
    skipContrastCheck
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
  />,
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
    <Flex gap={4}>
      <Label htmlFor="emailNotifications">
        <Flex gap={2}>
          <Switch
            onChange={() => {
              setSize(size === "sm" ? "md" : "sm")
              setSwitched(!switched)}
            }
            id="emailNotifications"
            switched={switched}
          />
          <Text>Toggle Checkbox to small size</Text>
        </Flex>
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
    </Flex>
  );
}`}
  />,
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
  />,
);

card(
  <Combination
    checked={[false, true]}
    disabled={[false, true]}
    hasCheckerboard={false}
    hasError={[false, true]}
    id="combinations"
    indeterminate={[false, true]}
    size={['sm', 'md']}
    labelPrefix="checkbox-combinations"
  >
    {(props, i) => <Checkbox id={`checkbox-combinations-${i}`} onChange={() => {}} {...props} />}
  </Combination>,
);

export default cards;
