import { useState } from 'react';
import { Flex, Image, SearchGuide } from 'gestalt';

export default function Example() {
  const [selected, setSelected] = useState('outfit');

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <SearchGuide
        accessibilityLabel="Designs"
        color="03"
        onClick={() => setSelected((value) => (value === 'design' ? '' : 'design'))}
        selected={selected === 'design'}
        text="Designs"
      />
      <SearchGuide
        accessibilityLabel="Outfit"
        color="04"
        onClick={() => setSelected((value) => (value === 'outfit' ? '' : 'outfit'))}
        selected={selected === 'outfit'}
        text="Outfit"
        thumbnail={{
          image: (
            <Image
              alt="Image"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/bBXC23j/fashion.jpg"
            />
          ),
        }}
      />
      <SearchGuide
        accessibilityLabel="Vintage"
        color="05"
        onClick={() => setSelected((value) => (value === 'vintage' ? '' : 'vintage'))}
        selected={selected === 'vintage'}
        text="Vintage"
      />
    </Flex>
  );
}
