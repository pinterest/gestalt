// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Typeahead"
    description={`Use a \`Typeahead\` when you want to let the user filter a list when selecting.`}
  />
);
card(
  <PropTable
    props={[
      {
        name: 'options',
        type: 'Array<{ label: string, value: string }>',
        description:
          'The data must be an array with objects containing only label and value properties',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'value',
        type: 'string',
        description: 'The default value set in the Typeahead',
        href: 'defaultItemExample',
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
        name: 'noResultText',
        type: 'string',
        href: 'basicExample',
        required: true,
        description: 'The text shown when the input value returns no matches',
      },
      {
        name: 'onBlur',
        type:
          '({ event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement> , value: string }) => void',
        description: 'Callback when you focus outside the component ',
        href: 'basicExample',
      },

      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        description: 'Callback when user types into the control input field',
        href: 'basicExample',
      },

      {
        name: 'onFocus',
        type: '({ event: SyntheticFocusEvent<>, value: string }) => void',
        description: 'Callback when you focus on the component',
        href: 'basicExample',
      },
      {
        name: 'onKeyDown',
        type:
          '({ event: SyntheticKeyboardEvent<HTMLTextAreaElement>, value: string }) => void',
        description:
          'Callback for key stroke events. This callback is useful for tag management.',
        href: 'tagsExample',
      },
      {
        name: 'onSelect',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        description: 'Callback when you select an item ',
        href: 'basicExample',
      },
      {
        name: 'placeholder',
        type: 'string',
        href: 'basicExample',
      },
      {
        name: 'size',
        type: '"md" | "lg"',
        description: 'md: 40px, lg: 48px',
        defaultValue: 'md',
      },
      {
        name: 'tags',
        type: 'Array<Element<typeof Tag>>',
        description: 'List of tags to display in the component',
        href: 'tagsExample',
      },
      {
        name: 'ref',
        type: "React.Ref<'input'>",
        description:
          'Forward the ref to the underlying component container element',
        href: 'refExample',
      },
      {
        name: 'zIndex',
        type: 'interface Indexable { index(): number; }',
        description:
          'An object representing the z-index value of the Typeahead list. Only use when Typeahead is used within a parent component that has a z-index set.',
        href: 'zIndex',
      },
    ]}
  />
);

card(
  <Example
    id="basicExample"
    name="Example"
    defaultCode={`
function Example(props) {
  const [item, setItem] = React.useState("");
  const [selected, setSelected] = React.useState(null);

  const options = Array.from(Array(20).keys()).map((item) => ({
    value: "Value-" + (item + 1),
    label: "Label-" + (item + 1),
  }));

  const handleOnChange = ({ value }) => {
    setItem(value);
  };

  const handleSelect = ({item}) => {
    setSelected(item);
  };

  const label = "Selected Item: " + (selected && selected.label || '');

  return (
    <>
      <Box marginBottom={4}>
       <Text>Selected Item: {(selected && selected.label) || ""}</Text>
      </Box>

      <Typeahead
        label="Typeahead Example 1"
        id="Typeahead-example"
        noResultText="No Results"
        options={options}
        placeholder="Select a Label"
        onChange={handleOnChange}
        onSelect={handleSelect}
      />
    </>
  );
}`}
  />
);

card(
  <Example
    id="defaultItemExample"
    name="Default Item Example"
    defaultCode={`
function Example(props) {
  const options = Array.from(Array(20).keys()).map((item) => ({
    value: "Value-" + (item + 1),
    label: "Label-" + (item + 1),
  }));

  const defaultOption = options[3];
  const [item, setItem] = React.useState(defaultOption.label);
  const [selected, setSelected] = React.useState(defaultOption);

  const handleOnChange = ({ value }) => {
    setItem(value);
  };

  const handleSelect = ({item}) => {
    setSelected(item);
  };

  return (
    <>
      <Box marginBottom={4}>
       <Text>Selected Item: {(selected && selected.label) || ""}</Text>
      </Box>

      <Typeahead
        label="Typeahead Example 2"
        id="Typeahead-example-defaultItem"
        noResultText="No Results"
        options={options}
        value={defaultOption.value}
        placeholder="Select a Label"
        onChange={handleOnChange}
        onSelect={handleSelect}
      />
    </>
  );
}`}
  />
);

card(
  <Example
    id="with-subtext"
    name="With Subtext"
    defaultCode={`
function Example(props) {
  const [item, setItem] = React.useState('');
  const [selected, setSelected] = React.useState(null);

  const options = Array.from(Array(20).keys()).map((item) => ({
    value: "Value-" + (item + 1),
    label: "Label-" + (item + 1),
    subtext: "Subtext-" + (item + 1),
  }));

  const handleOnChange = ({ value }) => {
    setItem(value);
  };

  const handleSelect = ({item}) => {
    setSelected(item);
  };

  const label = "Selected Item: " + (selected && selected.label || '');

  return (
    <>
      <Box marginBottom={4}>
       <Text>{ label }</Text>
      </Box>

      <Typeahead
        label="Typeahead Example 3"
        id="Typeahead-example-subtext"
        noResultText="No Results"
        options={options}
        placeholder="Select a Label"
        onChange={handleOnChange}
        onSelect={handleSelect}
      />
    </>
  );
}`}
  />
);

card(
  <Example
    id="defaultItemExample2"
    name="With Ref"
    defaultCode={`
function TypeaheadExample() {
  const ref = React.useRef();
  const [option, setOption] = React.useState();
  return (
    <Flex gap={4}>
      <Typeahead
        label="Select your favorite shape"
        id="favorite-shape"
        noResultText="No Results"
        options={[{label:'square', value:'square'}, {label:'circle', value:'circle'}]}
        onSelect={p => ref.current.focus()}
        placeholder="Select a shape"
      />
      <Typeahead
        label="Select your favorite color"
        id="favorite-color"
        noResultText="No Results"
        options={[{label:'red', value:'red'}, {label:'blue', value:'blue'}]}
        placeholder="Select a color"
        ref={ref}
      />
    </Flex>
  );
}`}
  />
);

card(
  <Example
    id="tagsExample"
    name="With Tags"
    description={`
    You can include [Tag](/Tag) elements in the input using the \`tags\` prop.

    Note that the \`Typeahead\` component does not internally manage tags. That should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

    This example showcases the recommended behavior.`}
    defaultCode={`
function Example(props) {
  const colors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];
  const ref = React.useRef();
  const [selected, setSelected] = React.useState([]);

  const setFocus = () => {
    // Focus needs to happen after selection is complete
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };

  const onSelectTagManagement = ({ item: { value } }) => {
    if (!selected.includes(value)) {
      setSelected([...selected, value]);
    }
    setFocus();
  }

  const onRemoveTagManagement = (value) => {
    setSelected(selected.filter(color => color !== value));
    setFocus();
  }

  const onKeyDownTagManagement = ({ event: { keyCode, target: { selectionEnd } } }) => {
    if (keyCode === 8 /* Backspace */ && selectionEnd === 0) {
      // Remove tag on backspace if the cursor is at the beginning of the field
      setSelected([...selected.slice(0, -1)]);
      setFocus();
    }
  }

  const options = colors
    .filter(color => !selected.includes(color))
    .map(color => ({ label: color, value: color }));

  const renderedTags = selected.map(color => (
      <Tag
        key={color}
        onRemove={() => onRemoveTagManagement(color)}
        removeIconAccessibilityLabel={\`Remove \${color} tag\`}
        text={color}
      />
    ));

  return (
    <Typeahead
      key={JSON.stringify(selected) /* force update when the options change */}
      ref={ref}
      id="favorite-colors"
      label="Select your favorite colors"
      noResultText="No Results"
      onKeyDown={onKeyDownTagManagement}
      onSelect={onSelectTagManagement}
      options={options}
      placeholder={selected.length > 0 ? '' : 'Select colors'}
      tags={renderedTags}
    />
  );
}
`}
  />
);

card(
  <Example
    id="zIndex"
    name="With ZIndex"
    description={`
    When Typeahead is used within a parent component that has a z-index set, a z-index will also need to be set on the Typeahead. Otherwise the Typeahead will render behind the parent component in the stacking context.`}
    defaultCode={`
function Example(props) {
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState();

  const HEADER_ZINDEX = new FixedZIndex(10);
  const MODAL_ZINDEX = new CompositeZIndex([HEADER_ZINDEX]);
  const TYPEAHEAD_ZINDEX = new CompositeZIndex([MODAL_ZINDEX]);

  return (
    <>
      <Button
        inline
        text="Report a stolen account"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Layer zIndex={MODAL_ZINDEX}>
          <Modal
            accessibilityModalLabel="Select the account being reported"
            onDismiss={() => setOpen(false)}
            size="sm"
            heading="Report a stolen account"
            footer={
              <Button
                onClick={() => setOpen(false)}
                text="Submit"
                color="red"
                size="lg"
                type="submit"
              />
            }
          >
            <Box padding={8}>
              <Typeahead
                zIndex={TYPEAHEAD_ZINDEX}
                label="Select the account being reported"
                id="reported_account"
                noResultText="No Results"
                options={[
                  {
                    label: "basic_user@email.com",
                    value: "basic_user@email.com"
                  },
                  {
                    label: "business_user@email.com",
                    value: "business_user@email.com"
                  },
                ]}
                placeholder="Select an account"
              />
            </Box>
          </Modal>
        </Layer>
      )}
    </>
  );
}`}
  />
);

export default cards;
