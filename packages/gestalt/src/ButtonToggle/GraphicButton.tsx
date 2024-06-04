import { Children, ReactElement } from 'react';
import Avatar from '../Avatar';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import {
  AvatarThumbnail,
  IconThumbnail,
  ImageThumbnail,
} from '../sharedSubcomponents/thumbnailSubcomponents';
import Text from '../Text';

type Props = {
  graphicIcon: {
    image?: ReactElement<typeof Image>;
    icon?: ReactElement<typeof Icon>;
    avatar?: ReactElement<typeof Avatar>;
  };
  text: string;
  textColor: 'subtle' | 'default' | 'inverse';
};

export default function CallToAction({ graphicIcon, text, textColor }: Props) {
  return (
    <Flex alignItems="center" direction="column" justifyContent="center">
      <Box
        alignItems="center"
        dangerouslySetInlineStyle={{ __style: {} }}
        display="flex"
        justifyContent="center"
      >
        {!!graphicIcon?.image &&
        // @ts-expect-error TS2339 - Property 'displayName' does not exist.
        Children.only<ReactElement>(graphicIcon.image).type.displayName === 'Image' ? (
          <ImageThumbnail thumbnail={graphicIcon.image} />
        ) : null}

        {!!graphicIcon?.icon &&
        // @ts-expect-error TS2339 - Property 'displayName' does not exist.
        Children.only<ReactElement>(graphicIcon.icon).type.displayName === 'Icon' ? (
          <IconThumbnail thumbnail={graphicIcon.icon} />
        ) : null}

        {!!graphicIcon?.avatar &&
        // @ts-expect-error TS2339 - Property 'displayName' does not exist.
        Children.only<ReactElement>(graphicIcon.avatar).type.displayName === 'Avatar' ? (
          <AvatarThumbnail thumbnail={graphicIcon.avatar} />
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
