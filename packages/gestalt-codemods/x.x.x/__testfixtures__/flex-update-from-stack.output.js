// @flow strict
import React from 'react';
import { Flex } from "gestalt";

export default function TestComp() {
  return (
    <div>
      <Flex alignItems="start" justifyContent="center">
        <div/>
      </Flex>

      <Flex alignItems="start" gap={6} justifyContent="center">
        <div/>
        <div/>
      </Flex>

      <Flex alignItems="end" justifyContent="center">
        <div/>
      </Flex>

      <Flex alignItems="start" justifyContent="between">
        <div/>
      </Flex>
    </div>
  );
}
