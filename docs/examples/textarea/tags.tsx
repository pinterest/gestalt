import { useRef, useState } from 'react';
import { Box, Flex, Tag, TextArea } from 'gestalt';

type ChangeTagHandler = (arg1: {
  event: React.ChangeEvent<HTMLTextAreaElement>;
  value: string;
}) => void;

type KeyDownHandler = (arg1: {
  event: React.KeyboardEvent<HTMLTextAreaElement>;
  value: string;
}) => void;

export default function Example() {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState(['a@pinterest.com', 'b@pinterest.com']);
  const ref = useRef<HTMLTextAreaElement | null>(null);

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
    <Box padding={8} width="100%">
      <Flex direction="column" gap={4}>
        <TextArea
          ref={ref}
          id="variants-tags"
          label="Emails"
          onChange={onChangeTagManagement}
          onKeyDown={onKeyDownTagManagement}
          tags={renderedTags}
          value={value}
        />
        <TextArea
          ref={ref}
          disabled
          id="variants-tags"
          label="Emails"
          onChange={onChangeTagManagement}
          onKeyDown={onKeyDownTagManagement}
          tags={renderedTags}
          value={value}
        />
        <TextArea
          ref={ref}
          id="variants-tags"
          label="Emails"
          onChange={onChangeTagManagement}
          onKeyDown={onKeyDownTagManagement}
          readOnly
          tags={renderedTags}
          value={value}
        />
        <TextArea
          ref={ref}
          errorMessage="Select minimum of five"
          id="variants-tags"
          label="Emails"
          onChange={onChangeTagManagement}
          onKeyDown={onKeyDownTagManagement}
          tags={renderedTags}
          value={value}
        />
      </Flex>
    </Box>
  );
}
