import { useState } from 'react';
import { Flex, Image, SearchGuide } from 'gestalt';

export default function Example() {
  const [design, setDesign] = useState(false);
  const [outfit, setOutfit] = useState(true);
  const [vintage, setVintage] = useState(false);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <SearchGuide
        accessibilityLabel="Designs"
        color="03"
        onClick={() => {
          setDesign((value) => !value);
          setOutfit(false);
          setVintage(false);
        }}
        selected={design}
        text="Designs"
        thumbnail={{
          image: (
            <Image
              alt="Image"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/3CT3Xnp/image.png"
            />
          ),
        }}
      />
      <SearchGuide
        accessibilityLabel="Outfit"
        color="04"
        onClick={() => {
          setDesign(false);
          setOutfit((value) => !value);
          setVintage(false);
        }}
        selected={outfit}
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
        onClick={() => {
          setDesign(false);
          setOutfit(false);
          setVintage((value) => !value);
        }}
        selected={vintage}
        text="Vintage"
        thumbnail={{
          image: (
            <Image
              alt="Image"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/dWQ7HHg/image.png"
            />
          ),
        }}
      />
    </Flex>
  );
}
