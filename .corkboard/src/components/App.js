import React, { PropTypes } from 'react';
import Navigation from './Navigation';
import Box from '../../../src/Box/Box';
import Column from '../../../src/Column/Column';
import Container from '../../../src/Container/Container';

export default function App(props) {
  const { cards, children } = props;
  return (
    <Box mdDisplay="flex" direction="row" minHeight="100vh">
      <Column span={12} mdSpan={2}>
        <Box padding={4}>
          <Navigation cards={cards} />
        </Box>
      </Column>
      <Column span={12} mdSpan={10}>
        <Box padding={4}>
          <Container>{children}</Container>
        </Box>
      </Column>
    </Box>
  );
}
