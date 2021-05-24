// @flow strict
import type { Node } from 'react';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      description={`To showcase repetitive examples (colors, borders, etc.), use the \`CombinationNew\` component as a child of \`MainSection.Subsection\` to render cards in the new style. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      title="Variant using CombinationNew"
    >
      <MainSection.Card
        cardSize="lg"
        description={`
- Examples on what to do for writing
`}
        defaultCode={`
function Example(props) {
  const [givenValue, setGivenValue] = React.useState('Value-1');
  const [options, setOptions] = React.useState(Array.from(Array(20).keys()).map((item) => ({
    value: "Value-" + (item + 1),
    label: "Label-" + (item + 1),
  })));

 const newOptions = Array.from(Array(5).keys()).map((item) => ({
    value: "Value-" + (item + 1),
    label: "Label-" + (item + 1),
  }));

  return (
    <Box width={400}>
      <Flex gap={2}>
        <Button
          onClick={() => setGivenValue((prevValue) => prevValue === 'Value-5' ? 'Value-1' : 'Value-5')}
          text="Set value"
          inline
        />
        <Button
          onClick={() => setOptions(newOptions)}
          text="Set new options"
          inline
        />
      </Flex>
      <TypeaheadV2
        clearOptionsLabel="Clear options"
        showOptionsLabel="Show popup"
        label="Typeahead Example 1"
        id="Typeahead-example"
        noResultText="No Results"
        options={options}
        placeholder="Select a Label"
        size="lg"
        // value={givenValue}
      />
    </Box>
  );
}`}
      />
      <MainSection.Card
        cardSize="lg"
        description={`
- Examples on what to do for writing
`}
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
        removeIconAccessibilityLabel="Remove tag"
        text={color}
      />
    ));

  return (
    <Box width={300}>
      <TypeaheadV2
        clearOptionsLabel="Clear options"
        showOptionsLabel="Show popup"
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
    </Box>
  );
}`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
