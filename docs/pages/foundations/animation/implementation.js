// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex } from 'gestalt';
import { DOCS_COPY_MAX_WIDTH_PX } from '../../../docs-components/consts';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import useExample from '../../../examples/animation/useExample';

export default function AnimationImplementation(): ReactNode {
  return (
    <Page title="Implementing animations">
      <PageHeader
        description="There are multiple ways to implement animations in product."
        name="Implementing animations"
        type="guidelines"
      />
      <MainSection
        description="Many of our components come with animations baked in! If you are implementing a custom animation, be sure to utilize the [useReducedMotion hook](https://gestalt.pinterest.systems/web/utilities/usereducedmotion) to ensure an accessible experience. This hook will return a boolean for the user's reduced motion setting on their device, which should then be used to show or hide any animations."
        name="Gestalt on Web"
      />
      <MainSection
        description={`
        Animations can be implemented using CSS via the [InlineStyle component](http://pinch.pinadmin.com/inlinestyle-component). See [this file for an example](http://pinch.pinadmin.com/pinboard-animation-example).

        Please don’t create new SCSS/CSS files (or add to existing ones). Please don’t attempt to target and modify internals of Gestalt components, as the feature could break without warning in the future. And when possible, please use any relevant [design tokens](https://gestalt.pinterest.systems/foundations/design_tokens) (e.g. color tokens instead of hex values) to ensure that your feature automatically gets any future changes to those token values.
        `}
        name="CSS and InlineStyle on Web"
      />
      <MainSection
        description="Lottie has been implemented on mobile and web platforms, and is best used for illustration animations. For more details about using Lottie, view our [internal documentation](http://pinch.pinadmin.com/lottie-details)."
        name="Lottie"
      >
        <Flex direction="column" gap={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
          <SandpackExample
            code={useExample}
            hideControls
            hideEditor
            name="When to use Example"
            previewHeight={750}
          />
        </Flex>
      </MainSection>
    </Page>
  );
}
