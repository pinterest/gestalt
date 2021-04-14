// @flow strict
import ButtonGroup from './ButtonGroup.js';

const ButtonGroupValidNoChildren = <ButtonGroup />;

const ButtonGroupValidOneChild = (
  <ButtonGroup>
    <button type="button" />
  </ButtonGroup>
);

const ButtonGroupValidTwoChildren = (
  <ButtonGroup>
    <button type="button" />
    <button type="button" />
  </ButtonGroup>
);

// $FlowExpectedError[prop-missing]
const ButtonGroupIncompatibleProps = <ButtonGroup text="Next" />;
