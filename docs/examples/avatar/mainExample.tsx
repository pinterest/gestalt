<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Avatar, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return isInVRExperiment ? (
    <Flex
      alignContent="center"
      gap={{ row: 4, column: 0 }}
      height="100%"
      justifyContent="center"
      wrap
    >
      <Avatar
        name="Fatima"
        size="xs"
        src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg"
      />
      <Avatar avatarColor="01" name="Jamie" size="sm" />
      <Avatar
        name="Sora"
        size="md"
        src="https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg"
        verified
      />
      <Avatar avatarColor="07" name="Ayesha" size="lg" />
      <Avatar
        name="Ayesha"
        size="xl"
        src="https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg"
      />
    </Flex>
  ) : (
=======
// import { Avatar, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

// export default function Example() {
//   const isInVRExperiment = useDangerouslyInGestaltExperiment({
//     webExperimentName: 'web_gestalt_visualRefresh',
//     mwebExperimentName: 'web_gestalt_visualRefresh',
//   });

//   return isInVRExperiment ? (
//     <Flex
//       alignContent="center"
//       gap={{ row: 4, column: 0 }}
//       height="100%"
//       justifyContent="center"
//       wrap
//     >
//       <Avatar name="Sonnie" size="xs" src="https://i.pinimg.com/originals/7e/9d/12/7e9d12be6861c5918ad286a368ed5928.jpg" />
//       <Avatar avatarColorIndex="02" name="Jamie" size="sm" />
//       <Avatar name="Lupita" size="md" src="https://i.pinimg.com/originals/67/65/2d/67652d75420ad830da5c1e7042238c73.jpg" verified />
//       <Avatar avatarColorIndex="05" name="Ayesha" size="lg" />
//       <Avatar name="Mariska" size="xl" src="https://i.pinimg.com/originals/34/90/0e/34900ea0dba6408d8514874224e47c59.jpg" />
//     </Flex>
//   ) : (
//     <Flex
//       alignContent="center"
//       gap={{ row: 4, column: 0 }}
//       height="100%"
//       justifyContent="center"
//       wrap
//     >
//       <Avatar name="Keerthi" size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
//       <Avatar name="Keerthi" size="sm" />
//       <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
//       <Avatar name="Ayesha" size="lg" />
//       <Avatar name="Keerthi" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
//     </Flex>
//   );
// }


=======
>>>>>>> 88a4a9048 (added more VR examples)
import { Avatar, Flex } from 'gestalt';
=======
import { Avatar, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';
>>>>>>> 2003c2dd8 (examples fixed)

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

<<<<<<< HEAD
  return (
>>>>>>> e205634e9 (fixing docs)
=======
  return isInVRExperiment ? (
    <Flex
      alignContent="center"
      gap={{ row: 4, column: 0 }}
      height="100%"
      justifyContent="center"
      wrap
    >
      <Avatar
        name="Fatima"
        size="xs"
        src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg"
      />
      <Avatar avatarColor="01" name="Jamie" size="sm" />
      <Avatar
        name="Sora"
        size="md"
        src="https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg"
        verified
      />
      <Avatar avatarColor="07" name="Ayesha" size="lg" />
      <Avatar
        name="Ayesha"
        size="xl"
        src="https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg"
      />
    </Flex>
  ) : (
>>>>>>> 2003c2dd8 (examples fixed)
    <Flex
      alignContent="center"
      gap={{ row: 4, column: 0 }}
      height="100%"
      justifyContent="center"
      wrap
    >
      <Avatar name="Keerthi" size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <Avatar name="Alberto" size="sm" />
      <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
      <Avatar name="Alberto" size="lg" />
=======
      <Avatar avatarColorIndex="02" name="Keerthi" size="sm" />
      <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
      <Avatar avatarColorIndex="05" name="Ayesha" size="lg" />
>>>>>>> e205634e9 (fixing docs)
=======
      <Avatar avatarColor="02" name="Keerthi" size="sm" />
      <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
      <Avatar avatarColor="05" name="Ayesha" size="lg" />
>>>>>>> 80cd4e984 (working on docs)
=======
      <Avatar name="Alberto" size="sm" />
      <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
      <Avatar name="Alberto" size="lg" />
>>>>>>> 2003c2dd8 (examples fixed)
      <Avatar name="Keerthi" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
    </Flex>
  );
}
