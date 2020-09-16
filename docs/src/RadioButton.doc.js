// @flow strict
import React, { type Node } from 'react';
import { RadioButton } from 'gestalt';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="RadioButton"
    description="Use radio buttons when you have a few options that a user can choose from. Never use
radio buttons if the user can select more than one option from a list.
"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'checked',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'label',
        type: 'string',
      },
      {
        name: 'name',
        type: 'string',
        description: 'The name given for all radio buttons in a single group',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, checked: boolean }) => void',
        required: true,
      },
      {
        name: 'value',
        type: 'string',
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
        description: `sm: 16px, md: 24px`,
        defaultValue: 'md',
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
<RadioButton
  id="usa"
  checked
  label="United States of America"
  onChange={() => {}}
  value="usa"
/>`}
  />
);

card(
  <Example
    description="
    Here is an example of an accessible group of radio buttons.
  "
    name="Example: Group"
    defaultCode={`
function RadioButtonExample() {
  const [gender, setGender] = React.useState(undefined);

  return (
    <Box
      role="list"
      display="flex"
      direction="column"
    >
      <Box paddingY={1}>
        <RadioButton
          checked={gender === 'male'}
          id="genderMale"
          label="Male"
          name="gender"
          onChange={() => setGender( 'male' )}
          value="male"
        />
      </Box>
      <Box paddingY={1}>
        <RadioButton
          checked={gender === 'female'}
          id="genderFemale"
          label="Female"
          name="gender"
          onChange={() => setGender( 'female' )}
          value="female"
        />
      </Box>
      <Box paddingY={1}>
        <RadioButton
          checked={gender === 'other'}
          id="genderOther"
          label="Other"
          name="gender"
          onChange={() => setGender( 'other' )}
          value="other"
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
    id="ref"
    name="Example: ref"
    description={`The innermost \`RadioButton\` element can be accessed via \`ref\``}
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
          <Text>Toggle RadioButton to small size</Text>
        </Row>
      </Label>
        <RadioButton
          id="sizing"
          checked={false}
          label={label + 'px RadioButton'}
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
    name="Example: RadioButton and Flyout"
    description={`
    A \`RadioButton\` with an anchor ref to a Flyout component doesn't pass the correct positioning to the Flyout. Instead set the anchor ref to the parent container.
  `}
    defaultCode={`

function RadioButtonFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState(false);
  const anchorCatRef = React.useRef();
  const anchorDogRef = React.useRef();

  return (
    <Box>
      <Stack gap={4}>
        <Box display="inlineBlock" ref={anchorCatRef}>
          <RadioButton
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
          <RadioButton
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
      </Stack>
      {open &&
        <Layer>
          <Flyout
            anchor={option === "cat" ? anchorCatRef.current  : anchorDogRef.current}
            color="red"
            idealDirection="right"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            shouldFocus={false}
            size="md"
          >
            <Link
              href={
                option === "cat"
                  ? "https://www.pinterest.com/search/pins/?q=cats"
                  : "https://www.pinterest.com/search/pins/?q=dogs"
              }
              target='blank'
            >
              <Box padding={3}>
                <Text
                  color="white"
                  weight="bold"
                >
                { option === "cat"
                    ? "Check cats on Pinterest!"
                    : "Check dogs on Pinterest!"
                }
                </Text>
              </Box>
            </Link>
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
    checked={[false, true]}
    disabled={[false, true]}
    size={['sm', 'md']}
  >
    {(props, i) => (
      <RadioButton
        id={`example-${i}`}
        onChange={() => {}}
        value=""
        {...props}
      />
    )}
  </Combination>
);

export default cards;
