import { type MutableRefObject, useRef, useState } from 'react';
import { AvatarGroup, Box, Flex, Icon, Image, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const [showSelected, setShowSelected] = useState<number | null>(null);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [ref, setRef] = useState<null | MutableRefObject<null>>(null);

  const ref0 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%" wrap>
      <SearchGuide
        ref={ref0}
        color={[
          'rgb(255, 223, 233)',
          'rgb(215, 237, 255)',
          'rgb(204, 246, 238)',
          'rgb(255, 228, 193)',
        ]}
        expandable
        onClick={() => {
          setRef(ref0);
          setShowSelected(0);
          setShowPopover(true);
        }}
        selected={showSelected === 0}
        text="Body type"
      />
      <SearchGuide
        color="03"
        onClick={() => setShowSelected(1)}
        selected={showSelected === 1}
        text="Save"
      />
      <SearchGuide
        ref={ref2}
        accessibilityLabel="Search"
        color="04"
        expandable
        onClick={() => {
          setRef(ref2);
          setShowSelected(2);
          setShowPopover(true);
        }}
        selected={showSelected === 2}
        text="Ideas"
        thumbnail={{
          icon: <Icon accessibilityLabel="ideas" icon="sparkle" />,
        }}
      />
      <SearchGuide
        ref={ref3}
        accessibilityLabel="Pins"
        color="01"
        expandable
        onClick={() => {
          setRef(ref3);
          setShowSelected(3);
          setShowPopover(true);
        }}
        selected={showSelected === 3}
        text="Pins"
        thumbnail={{
          avatarGroup: (
            <AvatarGroup
              accessibilityLabel="Fatima, Sora."
              collaborators={[
                {
                  name: 'Sora',
                  src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
                },
                {
                  name: 'Ayesha',
                  src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                },
              ]}
              size="md"
            />
          ),
        }}
      />
      <SearchGuide
        accessibilityLabel="Design"
        color="05"
        onClick={() => {
          setShowSelected(4);
        }}
        selected={showSelected === 4}
        text="Design"
        thumbnail={{
          image: (
            <Image
              alt="Design"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/3CT3Xnp/image.png"
            />
          ),
        }}
      />
      {ref && ref.current && showPopover && (
        <Popover
          anchor={ref && ref.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowPopover(false)}
          size="flexible"
        >
          <Box minHeight={100} minWidth={200} />
        </Popover>
      )}
    </Flex>
  );
}
