import { Flex, Image, Mask } from 'gestalt';

export default function Example() {
  const alt = 'Ayesha Avatar';
  const src = 'https://i.pinimg.com/originals/50/ce/c4/50cec4ca4c65131580c540c65548e0a3.jpg';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Mask height={150} rounding={3} width={150}>
        <Image alt={alt} color="#000" fit="contain" naturalHeight={1} naturalWidth={1} src={src} />
      </Mask>
    </Flex>
  );
}
