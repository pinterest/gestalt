// @flow strict
import React from 'react';
import { Switch } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Switch"
    description={`Use switches for single cell options that can be turned on and off only.
If you have a cell with multiple options that can activated, consider using check marks.
\`Switch\` component supports right-to-left(RTL) language locales layout
(auto flip on RTL locales like Arabic).`}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        href: 'switchCombinations',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'label',
        type: 'string',
      },
      {
        name: 'name',
        type: 'string',
        href: 'basicExample',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: boolean }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'ref',
        type: "React.Ref<'input'>",
        description: 'Forward the ref to the underlying input element',
        href: 'refExample',
      },
      {
        name: 'switched',
        type: 'boolean',
        defaultValue: false,
        href: 'switchCombinations',
      },
    ]}
  />
);

card(
  <Example
    id="Example"
    name="Example"
    defaultCode={`
function SwitchExample() {
  const [switched, setSwitched] = React.useState(false);

  return (
      <Switch
        id="emailNotifications"
        label='Turn on your notifications'
        onChange={() => setSwitched(!switched)}
        switched={switched}
      />
  );
}
`}
  />
);

card(
  <Example
    name="Example: Switch and Flyout"
    description={`
    A \`Switch\` with an anchor ref to a Flyout component.
  `}
    id="refExample"
    defaultCode={`
function SwitchFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const [switched, setSwitched] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <>
      <Switch
        id="emailNotifications"
        label="Turn on your notifications"
        onChange={() => {
            setOpen(!switched);
            setSwitched(!switched);
          }
        }
        switched={switched}
        ref={anchorRef}
      />
      {open &&
        <Layer>
          <Flyout
            anchor={anchorRef.current}
            color="red"
            idealDirection="up"
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
                  Your notifications are on!
              </Text>
            </Box>
          </Flyout>
        </Layer>
      }
    </>
  );
}
`}
  />
);

card(
  <Combination
    id="switchCombinations"
    disabled={[false, true]}
    switched={[false, true]}
    heading={false}
  >
    {(props, i) => (
      <Switch id={`example-${i}`} onChange={() => {}} {...props} />
    )}
  </Combination>
);

export default cards;
