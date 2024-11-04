import { Fragment, useRef, useState } from 'react';
import { Avatar, AvatarGroup, Box, Flex, Icon, Image, Layer, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const [showDefault, setShowDefault] = useState(false);
  const [showTextless, setShowTextless] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showAvatarGroup, setShowAvatarGroup] = useState(false);
  const defaultRef = useRef<HTMLElement | null>(null);
  const textlessRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLElement | null>(null);
  const avatarRef = useRef<HTMLElement | null>(null);
  const avatarGroupRef = useRef<HTMLElement | null>(null);

  return (
    <Fragment>
      <Flex alignContent="stretch" alignItems="center" gap={2} justifyContent="center" width="100%">
        <SearchGuide
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={defaultRef}
          accessibilityControls="popover"
          accessibilityExpanded={showDefault}
          accessibilityLabel="SearchGuide with text"
          color="01"
          expandable
          onClick={() => setShowDefault((showing) => !showing)}
          selected={showDefault}
          text="Text"
        />

        <SearchGuide
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={textlessRef}
          accessibilityControls="popover"
          accessibilityExpanded={showTextless}
          accessibilityLabel="SearchGuide with Icon"
          color="02"
          expandable
          onClick={() => setShowTextless((showing) => !showing)}
          selected={showTextless}
          text="Icon"
          thumbnail={{ icon: <Icon accessibilityLabel="Icon" icon="sparkle" /> }}
        />

        <SearchGuide
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={imageRef}
          accessibilityControls="popover"
          accessibilityExpanded={showImage}
          accessibilityLabel="SearchGuide with Image"
          color="03"
          expandable
          onClick={() => setShowImage((showing) => !showing)}
          selected={showImage}
          text="Image"
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
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={avatarRef}
          accessibilityControls="popover"
          accessibilityExpanded={showAvatar}
          accessibilityLabel="SearchGuide with Avatar"
          color="04"
          expandable
          onClick={() => setShowAvatar((showing) => !showing)}
          selected={showAvatar}
          text="Avatar"
          thumbnail={{
            avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
          }}
        />
        <SearchGuide
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={avatarGroupRef}
          accessibilityControls="popover"
          accessibilityExpanded={showAvatarGroup}
          accessibilityLabel="SearchGuide with AvatarGroup"
          color="05"
          expandable
          onClick={() => setShowAvatarGroup((showing) => !showing)}
          selected={showAvatarGroup}
          text="AvatarGroup"
          thumbnail={{
            avatarGroup: (
              <AvatarGroup
                accessibilityLabel="Collaborators: Keerthi, Alberto, Enio."
                collaborators={[
                  {
                    name: 'Keerthi',
                    src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                  },
                  {
                    name: 'Alberto',
                    src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                  },
                  {
                    name: 'Enio',
                  },
                ]}
                size="md"
              />
            ),
          }}
        />
      </Flex>
      <Layer>
        {showDefault && (
          <Popover
            anchor={defaultRef.current}
            id="popover"
            idealDirection="down"
            onDismiss={() => setShowDefault(false)}
            size="flexible"
          >
            <Box height={120} overflow="scrollX" padding={4}>
              <Flex direction="row" gap={2} wrap>
                <SearchGuide color="01" text="Default 1" />
                <SearchGuide color="02" text="Default 2" />
                <SearchGuide color="03" text="Default 3" />
              </Flex>
            </Box>
          </Popover>
        )}
        {showTextless && (
          <Popover
            anchor={textlessRef.current}
            id="popover"
            idealDirection="down"
            onDismiss={() => setShowTextless(false)}
            size="flexible"
          >
            <Box height={120} overflow="scrollX" padding={4}>
              <Flex direction="row" gap={2} wrap>
                <SearchGuide color="01" text="Textless 1" />
                <SearchGuide color="02" text="Textless 2" />
                <SearchGuide color="03" text="Textless 3" />
              </Flex>
            </Box>
          </Popover>
        )}
        {showImage && (
          <Popover
            anchor={imageRef.current}
            id="popover"
            idealDirection="down"
            onDismiss={() => setShowImage(false)}
            size="flexible"
          >
            <Box height={120} overflow="scrollX" padding={4}>
              <Flex direction="row" gap={2} wrap>
                <SearchGuide color="01" text="Image 1" />
                <SearchGuide color="02" text="Image 2" />
                <SearchGuide color="03" text="Image 3" />
              </Flex>
            </Box>
          </Popover>
        )}
        {showAvatar && (
          <Popover
            anchor={avatarRef.current}
            id="popover"
            idealDirection="down"
            onDismiss={() => setShowAvatar(false)}
            size="flexible"
          >
            <Box height={120} overflow="scrollX" padding={4}>
              <Flex direction="row" gap={2} wrap>
                <SearchGuide color="01" text="Avatar 1" />
                <SearchGuide color="02" text="Avatar 2" />
                <SearchGuide color="03" text="Avatar 3" />
              </Flex>
            </Box>
          </Popover>
        )}
        {showAvatarGroup && (
          <Popover
            anchor={avatarGroupRef.current}
            id="popover"
            idealDirection="down"
            onDismiss={() => setShowAvatarGroup(false)}
            size="flexible"
          >
            <Box height={120} overflow="scrollX" padding={4}>
              <Flex direction="row" gap={2} wrap>
                <SearchGuide color="01" text="AvatarGroup 1" />
                <SearchGuide color="02" text="AvatarGroup 2" />
                <SearchGuide color="03" text="AvatarGroup 3" />
              </Flex>
            </Box>
          </Popover>
        )}
      </Layer>
    </Fragment>
  );
}
