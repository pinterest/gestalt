// @flow strict
import { type Node } from 'react';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import MainSection from '../../../docs-components/MainSection.js';

export default function AnimationImplementation(): Node {
  return (
    <Page title="Implementing animations">
      <PageHeader
        badge="pilot"
        name="Implementing animations"
        type="guidelines"
        description="There are multiple ways to implement animations in product."
      />
      <MainSection
        name="Gestalt"
        description="Many of our components come with animations baked in! If you are implementing a custom animation, be sure to wrap the animation in the [useReducedMotion hook](https://gestalt.pinterest.systems/web/utilities/usereducedmotion) to ensure an accessible experience. This hook will automatically disabled any contained animations when the user enables the Reduced Motion setting on their device."
      />
      <MainSection
        name="CSS and InlineStyle"
        description={`
        Animations can be implemented using CSS via the InlineStyle package. See [this diff for an example](https://sourcegraph.pinadmin.com/phabricator.pinadmin.com/diffusion/P/pinboard/-/blob/webapp/app/common/react/components/WebMentorship/mentees/annisa/Profile.js?L24:5).

        Please don’t create new SCSS/CSS files (or add to existing ones). Please don’t attempt to target and modify internals of Gestalt components, as the feature could break without warning in the future. And when possible, please use any relevant [design tokens](https://gestalt.pinterest.systems/foundations/design_tokens) (e.g. color tokens instead of hex values) to ensure that your feature automatically gets any future changes to those token values.
        `}
      />
      <MainSection
        name="Lottie"
        description="Lottie has been implemented on mobile and web platforms, and is best used for illustration animations. For more details about using Lottie, view our [internal documentation](https://coda.io/d/Lottie-Pinterest_daMxB3E_zkB/For-design_su4Je)."
      />
    </Page>
  );
}
