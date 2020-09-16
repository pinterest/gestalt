// @flow strict
import React from 'react';
import Row from './Row.js';

const ValidSingle = (
  <Row gap={1}>
    <div />
  </Row>
);

const ValidMultiple = (
  <Row gap={1}>
    <div />
    <div />
    <div />
    <div />
  </Row>
);

const test = true;
const Testing = <Row>{test ? <div /> : null}</Row>;

// $FlowExpectedError[incompatible-type]
const MissingProp = <Row gap={1}>test</Row>;
