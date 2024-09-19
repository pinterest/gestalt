import { Flex, Image, Mask, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

<<<<<<< HEAD
<<<<<<< HEAD
  const alt = isInVRExperiment ? 'Ayesha Avatar' : 'Keerthi Avatar';
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/originals/50/ce/c4/50cec4ca4c65131580c540c65548e0a3.jpg'
    : 'https://i.ibb.co/ZfCZrY8/keerthi.jpg';
=======
  const alt = isInVRExperiment ? 'Sora Avatar' : 'Keerthi Avatar';
<<<<<<< HEAD
  const src = isInVRExperiment ? 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg' : 'https://i.ibb.co/ZfCZrY8/keerthi.jpg';
>>>>>>> 2003c2dd8 (examples fixed)
=======
=======
  const alt = isInVRExperiment ? 'Ayesha Avatar' : 'Keerthi Avatar';
>>>>>>> 6b25f9ea8 (small fixes)
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/originals/50/ce/c4/50cec4ca4c65131580c540c65548e0a3.jpg'
    : 'https://i.ibb.co/ZfCZrY8/keerthi.jpg';
>>>>>>> e3b5eac32 (prettier)

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Mask height={150} rounding={3} width={150}>
<<<<<<< HEAD
<<<<<<< HEAD
        <Image alt={alt} color="#000" fit="contain" naturalHeight={1} naturalWidth={1} src={src} />
=======
        <Image
          alt={alt}
          color="#000"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          src={src}
        />
>>>>>>> 2003c2dd8 (examples fixed)
=======
        <Image alt={alt} color="#000" fit="contain" naturalHeight={1} naturalWidth={1} src={src} />
>>>>>>> e3b5eac32 (prettier)
      </Mask>
    </Flex>
  );
}
