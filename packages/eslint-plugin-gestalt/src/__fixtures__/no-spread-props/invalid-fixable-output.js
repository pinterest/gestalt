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
    <Box color="red" onBlur={props.onBlur} onClick={() => {}} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeave} rounding={2} width={20}>
      <RenamedBox color="red" onBlur={props.onBlur} onClick={() => {}} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeave} rounding={2} width={20} />
    </Box>
  );
}
