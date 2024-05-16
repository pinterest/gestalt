import { Fragment, ReactElement, useState } from 'react';
import { Box, Button, Flex, Tag } from 'gestalt';

export default function Example() {
  // eslint-disable-next-line no-use-before-define
  const [tags, setTags] = useState<ReadonlyArray<ReactElement>>([generateTag()]);

  function generateTag() {
    return (
      <Tag
        onRemove={() => {
          setTags((currTags) => currTags.slice(0, currTags.length - 1));
        }}
        text="Tag"
      />
    );
  }

  return (
    <Box padding={2}>
      <Flex direction="column" gap={3}>
        <Button
          onClick={() => {
            setTags((currTags) => [...currTags, generateTag()]);
          }}
          text="Add tag"
        />

        <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%" wrap>
          {tags.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>{item}</Fragment>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
