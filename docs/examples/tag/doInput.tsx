import { useState } from 'react';
import { Box, Flex, Tag, TextField } from 'gestalt';

export default function Example() {
  const [tags, setTags] = useState<ReadonlyArray<string>>(['Design systems', 'Color', 'Tokens']);
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleChange = ({
    value,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    value: string;
  }) => {
    setCurrentValue(value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
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
            // @ts-expect-error - TS2322 - Type '({ value, }: { event: React.ChangeEvent<HTMLInputElement>; value: string; }) => void' is not assignable to type 'AbstractEventHandler<SyntheticEvent<HTMLInputElement, Event>, { value: string; }>'.
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
