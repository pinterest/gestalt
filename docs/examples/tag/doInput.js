// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Tag, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [tags, setTags] = useState<$ReadOnlyArray<string>>(['Design systems', 'Color', 'Tokens']);
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleChange = ({
    value,
  }: {
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  }) => {
    setCurrentValue(value);
  };

  const handleSubmit = (event: SyntheticInputEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTags((currTags) => [...currTags, currentValue]);
    setCurrentValue('');
  };

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="do-topics"
            label="Topics"
            onChange={handleChange}
            tags={tags.map((item, index) => (
              <Tag
                key={item}
                onRemove={() => {
                  setTags((currTags) => currTags.filter((_, i) => i !== index));
                }}
                text={item}
              />
            ))}
            value={currentValue}
          />
        </form>
      </Box>
    </Flex>
  );
}
