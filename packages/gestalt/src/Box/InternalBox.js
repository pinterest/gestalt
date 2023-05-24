
import { forwardRef, type Node, type AbstractComponent, type Element } from 'react';
import styles from '../Box.css';
import {blocklistProps} from '../Box.js';
import { buildStyles } from '../boxTransforms.js';
import { type As } from '../boxTypes.js';
import { type Indexable } from '../zIndex.js';

type OutputType = Element<As>;

/**
 * It's like Box, with all the conveniences, but also with custom styles allowed. A magic div with some utlities
 */
const InternalBoxWithForwardRef: AbstractComponent<Props, HTMLElement> = forwardRef<Props, HTMLElement>(
    function Box({ as, ...props }: Props, ref): OutputType {
      const { passthroughProps, propsStyles } = buildStyles<$Diff<Props, {| as?: As |}>>({
        baseStyles: styles.box,
        props,
        blocklistProps: disallowedProps,
      });
  
      const BoxElement: As = as ?? 'div';
  
      // And... magic!
      return <BoxElement {...passthroughProps} {...propsStyles} ref={ref} />;
    },
  );
  
  InternalBoxWithForwardRef.displayName = 'InternalBox';
  
  export default InternalBoxWithForwardRef;
  
