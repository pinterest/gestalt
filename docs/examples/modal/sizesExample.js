// @flow strict
import React, { type Node } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Layer, Modal, Heading } from 'gestalt';

export default function SizesExample(): Node {
  function reducer(state, action) {
    switch (action.type) {
      case 'small':
        return { modal: 'small' };
      case 'medium':
        return { modal: 'medium' };
      case 'large':
        return { modal: 'large' };
      case 'none':
        return { modal: 'none' };
      default:
        throw new Error();
    }
  }

  const initialState = { modal: 'none' };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box marginStart={-1} marginEnd={-1} padding={8}>
      <Box padding={1}>
        <Button
          text="Small Modal"
          onClick={() => {
            dispatch({ type: 'small' });
          }}
        />
        {state.modal === 'small' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Small modal"
              onDismiss={() => {
                dispatch({ type: 'none' });
              }}
              footer={<Heading size="500">Footer</Heading>}
              size="sm"
            >
              <Box padding={8}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          text="Medium Modal"
          onClick={() => {
            dispatch({ type: 'medium' });
          }}
        />
        {state.modal === 'medium' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Medium modal"
              onDismiss={() => {
                dispatch({ type: 'none' });
              }}
              footer={<Heading size="500">Footer</Heading>}
              size="md"
            >
              <Box padding={8}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          text="Large Modal"
          onClick={() => {
            dispatch({ type: 'large' });
          }}
        />
        {state.modal === 'large' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Large modal"
              onDismiss={() => {
                dispatch({ type: 'none' });
              }}
              footer={<Heading size="500">Footer</Heading>}
              size="lg"
            >
              <Box padding={8}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}
