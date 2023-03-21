// @flow strict
import {  Module, Text} from 'gestalt';

export default function Test() {
  return (
    <Module
      badgeText="Try it out!"
      id="ModuleExample - badge"
      title="Title"
    >
      <Text size="200">This is example content.</Text>
    </Module>
  );
}
