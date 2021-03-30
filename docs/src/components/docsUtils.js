// @flow strict
export const customNavigationDescription = (cmp: string): string => `
This example illustrates two custom navigation implementations to externally control the link navigation behavior of ${cmp}: setting a default logic with [Provider](/Provider) and a custom component logic with the \`onClick\` prop.

If \`onNavigation\` prop is passed to Provider, it's passed down to all children links and sets a custom default link navigation behavior. \`onNavigation\` is a higher-order function: it takes named arguments (\`href\` and \`target\`) and returns an event handler function. In the component's \`onClick\` event handler, the \`onClick\` prop gets called first, followed by the function passed down by the Provider.

${cmp}'s \`onClick\` prop is an event handler function. This callback takes 2 named parameters: 'event', the 'onClick' event, and \`disableOnNavigation\`, a callback function that disables any default custom navigation logic set by [Provider](/Provider). \`disableOnNavigation\` is only accessible in Provider's link-role children components.

In this example, ${cmp} has a parent Provider setting a default custom navigation logic. We can compare three navigation behaviors: (a) the default ${cmp} behavior (by disabling the Provider's inherited logic), (b) the default custom behavior set by Provider and (c) a custom behavior set on ${cmp}.

\`onClick\` is used to disable the default custom logic set in Provider and implement custom behavior at the component level. \`disableOnNavigation\` and \`customOnNavigation\` are both called first during the 'onClick' event.

If \`onNavigation\` is a [custom hook function](https://reactjs.org/docs/hooks-custom.html), it can contain complex logic, including [React hooks](https://reactjs.org/docs/hooks-reference.html), to perform side effects.

In this example, both \`onNavigation\` and \`customOnNavigation\` functions execute the following actions:
- Disable the default link behavior
- Show an alert message
- Open a different URL in a new window

Both \`onNavigationClick\`, inside \`onNavigation\`, and \`onClick\` have event access to [preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault). It could also be used to [stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).
      `;

export default undefined;
