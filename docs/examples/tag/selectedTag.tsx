import { useState } from 'react';
import { Flex, Tag  } from 'gestalt';

export default function Example() {
   
  const [tags, setTags] = useState(true)

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tag 
        onClick={()=>{
        setTags(!tags)
      }}
      onRemove={()=>{}} selected={tags} text={tags? 'Selected tag':'Non selected tag'}/>
    </Flex>
  );
}
