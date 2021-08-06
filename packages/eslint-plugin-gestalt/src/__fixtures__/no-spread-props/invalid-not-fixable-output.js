import { Box, Box as RenamedBox } from 'gestalt';

export default function TestElement(props) {
  const selectedWrapperProps = {
    color: 'red',
    onBlur: props.onBlur,
    onClick: () => {},
    onMouseEnter: onMouseEnterHandler,
    onMouseLeave,
    rounding: 2,
  };

  return (
    <Box {...(true ? selectedWrapperProps : {})} width={20}>
      <RenamedBox {...props} width={20} />
    </Box>
  );
}
