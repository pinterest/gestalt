import { Children, ReactElement } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import { ImageThumbnail } from '../sharedSubcomponents/thumbnailSubcomponents';
import Text from '../Text';

type Props = {
  thumbnail: {
    image?: ReactElement<typeof Image>;
  };
  text: string;
  textColor: 'subtle' | 'default' | 'inverse';
};

export default function ThumbnailButton({ thumbnail: graphicIcon, text, textColor }: Props) {
  return (
    <Flex alignItems="center" direction="column" justifyContent="center">
      <Box alignItems="center" display="flex" justifyContent="center">
        {!!graphicIcon?.image &&
        // @ts-expect-error TS2339 - Property 'displayName' does not exist.
        Children.only<ReactElement>(graphicIcon.image).type.displayName === 'Image' ? (
          <ImageThumbnail thumbnail={graphicIcon.image} />
        ) : null}
      </Box>
      <Flex alignSelf="end" direction="row" justifyContent="center">
        <Text align="center" color={textColor} overflow="breakWord" size="200" weight="bold">
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
