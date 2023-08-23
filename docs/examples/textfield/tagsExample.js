// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Tag, TextField } from 'gestalt';

type ChangeTagHandler = ({|
  event: SyntheticInputEvent<HTMLInputElement>,
  value: string,
|}) => void;

type KeyDownHandler = ({|
  event: SyntheticKeyboardEvent<HTMLInputElement>,
  value: string,
|}) => void;

export default function Example(): Node {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState(['a@pinterest.com', 'b@pinterest.com']);
  const ref = useRef<HTMLElement | null>(null);

  const onChangeTagManagement: ChangeTagHandler = (e) => {
    // Create new tags around spaces, commas, and semicolons.
    const tagInput = e.value.split(/[\\s,;]+/);
    if (tagInput.length > 1) {
      setTags([
        ...tags,
        // Avoid creating a tag on content after the separators, and filter out
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
    } else if (keyCode === 13 /* Enter */ && value.trim() !== '') {
      // Create a new tag on enter
      setTags([...tags, value.trim()]);
      setValue('');
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
      <Box padding={2} color="light">
        <TextField
          autoComplete="off"
          id="variants-tags"
          label="Emails"
          ref={ref}
          onChange={onChangeTagManagement}
          onKeyDown={onKeyDownTagManagement}
          tags={renderedTags}
          value={value}
        />
      </Box>
    </Box>
  );
}
