// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Tag, TextArea } from 'gestalt';

type ChangeTagHandler = ({|
  event: SyntheticInputEvent<HTMLTextAreaElement>,
  value: string,
|}) => void;

type KeyDownHandler = ({|
  event: SyntheticKeyboardEvent<HTMLTextAreaElement>,
  value: string,
|}) => void;

const CITIES = ['San Francisco', 'New York'];

export default function Example(): Node {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState(CITIES);

  const ref = useRef<HTMLTextAreaElement | null>(null);

  const onChangeTagManagement: ChangeTagHandler = (e) => {
    // Create new tags around new lines
    const tagInput = e.value.split(/\\n+/);
    if (tagInput.length > 1) {
      setTags([
        ...tags,
        // Avoid creating a tag on content on the last line, and filter out
        // empty tags
        ...tagInput.splice(0, tagInput.length - 1).filter((val) => val !== ''),
      ]);
    }
    setValue(tagInput[tagInput.length - 1]);
  };

  const onKeyDownTagManagement: KeyDownHandler = ({
    event: {
      keyCode,
      currentTarget: { selectionEnd },
    },
  }) => {
    if (keyCode === 8 /* Backspace */ && selectionEnd === 0) {
      // Remove tag on backspace if the cursor is at the beginning of the field
      setTags([...tags.slice(0, -1)]);
    }
  };

  const renderedTags = tags.map((tag, idx) => (
    <Tag
      key={tag}
      onRemove={() => {
        const newTags = [...tags];
        newTags.splice(idx, 1);
        setTags([...newTags]);
        ref.current?.focus();
      }}
      accessibilityRemoveIconLabel={`Remove ${tag} tag`}
      text={tag}
    />
  ));

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%">
        <TextArea
          id="cities"
          label="Cities"
          ref={ref}
          onChange={onChangeTagManagement}
          onKeyDown={onKeyDownTagManagement}
          placeholder={value.length > 0 || tags.length > 0 ? '' : "Cities you've lived in"}
          tags={renderedTags}
          value={value}
        />
      </Box>
    </Box>
  );
}
