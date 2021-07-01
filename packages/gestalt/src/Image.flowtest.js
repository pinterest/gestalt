// @flow strict
import Image from './Image.js';

const Valid = <Image alt="foo" naturalHeight={50} naturalWidth={50} src="foo.png" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Image />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Image nonexisting={33} />;
