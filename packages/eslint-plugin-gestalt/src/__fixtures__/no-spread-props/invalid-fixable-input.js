import { Box, Box as RenamedBox } from 'gestalt';

export default function TestElement(props) {
  const onMouseEnterHandler = () => {};
  const onMouseLeave = () => {};

  const selectedWrapperProps = {
    color: 'red',
    onBlur: props.onBlur,
    onClick: () => {},
    onMouseEnter: onMouseEnterHandler,
    onMouseLeave,
    rounding: 2,
  };

  return (
    <Box {...selectedWrapperProps} width={20}>
      <RenamedBox {...selectedWrapperProps} width={20} />
    </Box>
  );
}
