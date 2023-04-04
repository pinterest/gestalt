// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import { DateField } from 'gestalt';

export default function Example(): Node {
  // https://codesandbox.io/s/determined-ully-ckq0t4?file=/src/App.tsx
  return <DateField format='yyyy-MM-dd'/>
}
