// @flow strict
import { Row } from 'gestalt';

export default function TestComp() {
  return (
    <div>
      <Row>
        <div/>
      </Row>

      <Row gap={2}>
        <div/>
        <div/>
      </Row>

      <Row alignItems="end">
        <div/>
      </Row>

      <Row justifyContent="between">
        <div/>
      </Row>
    </div>
  );
}
