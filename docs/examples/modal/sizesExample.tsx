import { ReactNode, useReducer } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Heading, Layer, Modal } from 'gestalt';

type Size = 'small' | 'medium' | 'large' | 'none';

export default function SizesExample() {
  function reducer(
    state: {
      modal: Size;
    },
    action: {
      type: Size;
    },
  ) {
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

  const initialState = { modal: 'none' } as const;
  const [state, dispatch] = useReducer(reducer, initialState);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box marginEnd={-1} marginStart={-1} padding={8}>
      <Box padding={1}>
        <Button
          onClick={() => {
            dispatch({ type: 'small' });
          }}
          text="Small Modal"
        />
        {state.modal === 'small' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              footer={<Heading size="500">Footer</Heading>}
              heading="Small modal"
              onDismiss={() => {
                dispatch({ type: 'none' });
              }}
              size="sm"
            >
              <Heading size="500">Children</Heading>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          onClick={() => {
            dispatch({ type: 'medium' });
          }}
          text="Medium Modal"
        />
        {state.modal === 'medium' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              footer={<Heading size="500">Footer</Heading>}
              heading="Medium modal"
              onDismiss={() => {
                dispatch({ type: 'none' });
              }}
              size="md"
            >
              <Box padding={6}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          onClick={() => {
            dispatch({ type: 'large' });
          }}
          text="Large Modal"
        />
        {state.modal === 'large' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              footer={<Heading size="500">Footer</Heading>}
              heading="Large modal"
              onDismiss={() => {
                dispatch({ type: 'none' });
              }}
              size="lg"
            >
              <Box padding={6}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}
