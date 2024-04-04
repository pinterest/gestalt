// @flow strict
import { Fragment, type Node as ReactNode } from 'react';
import { Box, Text } from 'gestalt';
import ColorTile from './ColorTile';

type Props = {
  name: string,
  tokenId: string,
  tokenData: $ReadOnlyArray<string>,
};

function ColorPalette({ name, tokenId, tokenData }: Props): ReactNode {
  if (tokenData) {
    const tiles = tokenData.map((token) => {
      const regex = /\d+(?=\D*$)/;
      const grade = (token.match(regex) || [])[0];
      const isTransparent = tokenId === 'transparent';
      const textColor = Number(grade) <= 400 || isTransparent ? 'dark' : 'light';

      if (!Number.isNaN(Number(grade)) || isTransparent) {
        return (
          <ColorTile
            key={token}
            description={grade || 'transparent'}
            number={Number(grade) || 0}
            textColor={textColor}
            token={token}
          />
        );
      }

      return null;
    });

    return (
      <Fragment>
        <Box marginBottom={8} marginTop={8}>
          <Text weight="bold">
            {name} ({tokenId})
          </Text>
        </Box>
        {tiles}
      </Fragment>
    );
  }
}
export default ColorPalette;
