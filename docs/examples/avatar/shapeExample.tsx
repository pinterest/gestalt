import { Flex, Image, Mask, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const alt = isInVRExperiment ? 'Ayesha Avatar' : 'Keerthi Avatar';
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/originals/50/ce/c4/50cec4ca4c65131580c540c65548e0a3.jpg'
    : 'https://i.ibb.co/ZfCZrY8/keerthi.jpg';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Mask height={150} rounding={3} width={150}>
        <Image alt={alt} color="#000" fit="contain" naturalHeight={1} naturalWidth={1} src={src} />
      </Mask>
    </Flex>
  );
}
