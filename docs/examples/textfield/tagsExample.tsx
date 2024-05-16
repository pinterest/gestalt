import { ReactNode, useRef, useState } from 'react';
import { Box, Tag, TextField } from 'gestalt';

type ChangeTagHandler = (arg1: {
  event: React.ChangeEvent<HTMLInputElement>;
  value: string;
}) => void;

type KeyDownHandler = (arg1: {
  event: React.KeyboardEvent<HTMLInputElement>;
  value: string;
}) => void;

export default function Example() {
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
      accessibilityRemoveIconLabel={`Remove ${tag} tag`}
      onRemove={() => {
        const newTags = [...tags];
        newTags.splice(idx, 1);
        setTags([...newTags]);
        if (ref.current) {
          ref.current.focus();
        }
      }}
      text={tag}
    />
  ));

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="light" padding={2}>
        <TextField
// @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLInputElement> | undefined'.
          ref={ref}
          autoComplete="off"
          id="variants-tags"
          label="Emails"
// @ts-expect-error - TS2322 - Type 'ChangeTagHandler' is not assignable to type 'AbstractEventHandler<SyntheticEvent<HTMLInputElement, Event>, { value: string; }>'.
          onChange={onChangeTagManagement}
          onKeyDown={onKeyDownTagManagement}
          tags={renderedTags}
          value={value}
        />
      </Box>
    </Box>
  );
}
