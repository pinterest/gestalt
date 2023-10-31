---
title: Experimentation
fullwidth: true
---

There's no blanket solution to experimenting with Gestalt components - each change is a potentially different situation. If you're unsure about what to do, please feel free to ask in <PrivateLink display="inlineBlock" href="http://pinch.pinadmin.com/gestalt-web-slack">Slack</PrivateLink>. 

## One-by-one strategies

The following experimentation strategies can be applied in single instances of a component.

### Pinboard first

Create a new component in Pinterest's web app main repository -Pinboard-, experiment with your features there. After the experimentation phase, we work to add it to the Gestalt component library.

The experimental component should always be discussed with Gestalt design and engineering. The experimental component should temporarily live in a Gestalt-owned folder <PrivateLink display="inlineBlock" href="https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions">gestaltExtensions</PrivateLink>.

```js
// Your file in Pinboard
import { DatePicker } from 'gestalt-datepicker';
import BetterDatePicker from 'packages/gestaltExtensions/BetterDatePicker';
 
amIinThisExperiment('better_datepicker') ? BetterDatePicker : DatePicker;

```

### Duplicated exported component

Create a duplicate component in Gestalt and export it. We've done this successfully in the past with large changes to Masonry.

```js
// Your file in Pinboard
import { Masonry, ExperimentalMasonry } from 'gestalt';
 
amIinThisExperiment('better_box') ? ExperimentalMasonry : Masonry;

```
### Experimental prop values

Parameterize your change as an optional prop value then set up the experiment in Pinboard.

```js
// Your file in Pinboard
import { Button } from 'gestalt';
 
export default <Button color={amIinThisExperiment('fancy_buttons') ? 'fancyRed' : 'red'} />

```

### Experimental prop

Create an optional prop prefixed with `_experimental____` then set up the experiment in Pinboard.

```js
// Your file in Pinboard
import { Popover } from 'gestalt';
 
export default <Popover _experimentalPopover={amIinThisExperiment('replace_experimental_popover') ? 'newPopover' : 'default'} />

```

## All-in-one strategies

The following experimentation strategies allow to apply experimental changes to all instances of a component.

### Pinboard wrapper 

Create a wrapper of a Gestalt component in Pinboard. This wrapper components uses one of the one-by-one experimental strategies and manages the activation of the experiment. Replace all instances of the direct import from Gestalt with this new  wrapper component. Once the experiment ends, remove the wrapper components and import from Gestalt directly again where the changes are now merged. It's recomended to ESLint agains direct Gestalt importing for that particupar components and redirect to the wrapper during the experiment.


```js
// Your file in Pinboard
import { Masonry } from 'gestalt';

export default <Masonry _experimentalChange={amIinThisExperiment('experimental_masonry_change') ? 'experimentalChange' : 'default'} />

```

### ExperimentProvider 

Gestalt provides an undocumented ExperimentProvider that uses [React Context](https://react.dev/reference/react/createContext).

First, set the experiment logic in your Gestalt component. Create two experiments, for both desktop and mobile treatments so we can measure measure mobile and desktop web treatments separately. Make sure your changes are only applied based on device (“desktop” vs “mobile”) using  `useInExperiment`. Use the existing hook [useInExperiment](https://github.com/pinterest/gestalt/blob/e58352d456a61fa23361f0ea9f2a66b9659a7c35/packages/gestalt/src/useInExperiment.js#L5).


Then conditionally implement changes based on device type. Merge and update Gestalt dependency in your app. 

For more context, see this reference [PR](https://github.com/pinterest/gestalt/pull/2171/files).

```js
// Gestalt file

const inSemiBoldExp = useInExperiment({
    webExperimentName: 'web_gestalt_semibold_weight',
    mwebExperimentName: 'mweb_gestalt_semibold_weight',
  });


const fontWeightStyle = inSemiBoldExp ? typography.fontWeightSemiBold : typography.fontWeightBold;

export default <div className={[fontWeightStyle, ...]} />

```

Finally, import ExperimentProvider from Gestalt and implement it in your app. Implement the experiment in Pinboard.

```js
// Your file in Pinboard
import { ExperimentProvider } from 'gestalt';

// activate the experiments
useActivateExperiment('mweb_gestalt_semibold_weight');
useActivateExperiment('web_gestalt_semibold_weight');

const activeGestaltExperiments = [
  'web_gestalt_semibold_weight',
  'mweb_gestalt_semibold_weight',
];

export default <ExperimentProvider value={activeGestaltExperiments}>{children}</ExperimentProvider>;

```

Experiments are broadly triggered. For more details, check this <PrivateLink display="inlineBlock" href="https://docs.google.com/document/d/10Sy2l04mONqx4s_PrrmuHxZp5kOMfYtty0sB8KzkkaA/edit?usp=sharing">Internal Technical Guide</PrivateLink>




 
