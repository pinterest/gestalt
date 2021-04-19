// @flow strict
import { Heading } from 'gestalt';

export default function BoldHeading() {
  return (
    <Heading size="xl" weight={"bold".length > 10 ? 'bold' : 'semibold'}>
      Bold
    </Heading>
  );
}
