import Box from '../Box';
import Flex from '../Flex';
import Image from '../Image';
import { ImageThumbnail } from '../sharedSubcomponents/thumbnailSubcomponents';
import Text from '../Text';

type Props = {
  graphicSrc: string;
  text: string;
  textColor: 'subtle' | 'default' | 'inverse';
};

export default function ThumbnailButton({ graphicSrc, text, textColor }: Props) {
  return (
    <Flex alignItems="center" direction="column" justifyContent="center">
      <Box alignItems="center" display="flex" justifyContent="center">
        {/* This image has a white background to guarantee contrast on disabled and dark mode buttons */}
        <ImageThumbnail
          thumbnail={
            <Image alt={text} color="white" naturalHeight={1} naturalWidth={1} src={graphicSrc} />
          }
        />
      </Box>
      <Flex alignSelf="end" direction="row" justifyContent="center">
        <Text align="center" color={textColor} overflow="breakWord" size="200" weight="bold">
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
