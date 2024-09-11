import { useRef, useState } from 'react';
import { Box, Tag, TextArea } from 'gestalt';

type ChangeTagHandler = (arg1: {
  event: React.ChangeEvent<HTMLTextAreaElement>;
  value: string;
}) => void;

type KeyDownHandler = (arg1: {
  event: React.KeyboardEvent<HTMLTextAreaElement>;
  value: string;
}) => void;

const CITIES = ['San Francisco', 'New York'];

export default function Example() {
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
    setValue(tagInput[tagInput.length - 1]!);
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
      accessibilityRemoveIconLabel={`Remove ${tag} tag`}
      onRemove={() => {
        const newTags = [...tags];
        newTags.splice(idx, 1);
        setTags([...newTags]);
        ref.current?.focus();
      }}
      text={tag}
    />
  ));

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width="100%">
        <TextArea
          ref={ref}
          id="cities"
          label="Cities"
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
