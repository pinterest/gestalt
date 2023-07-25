- Start Date: July 2023
- RFC PR: https://github.com/pinterest/gestalt/pull/3094
- Authors: Alberto Carreras, acarreras

# GlobalEventsHandlerProvider and providerAuxData

## Summary

GlobalEventsHandlerProvider was built in Gestalt to share external handlers with consuming components. It's versatile API that can support external logic on each interactive event handlers (onClick, onBlur, onFocus, and so forth).

## Motivation

Monetization teams at Pinterest (https://ads.pinterest.com/) log and track user interaction in specific interactive components and events. For instance, Button, Checkbox, Dropdown, IconButton, Link, NumberField, RadioButton, SearchField, SelectList, Switch, TapArea, TextArea, and TextField. One of the use cases for these logs is to extend the insights on experimentation allowing the monetization team to track user flows and increase campaigns optimizations.

For developer velocity, reusability, and consistency, there's a suite of Gestalt components wrapped in additional logic and re-exported with an extended API.

These wrapped Gestalt components are under an Eslint rule that prevent direct consumption of those Gestalt components.

### Problem

Gestalt wrappers have a set of problems:

- The wrappers' API extend Gestalt component API. Engineers should be able to go to Gestalt documentation to consult component API and have it match with the code they are working with. There's no way to enforce a matching API between Gestalt and their wrappers.

- Wrappers reduce adoption of other high level components. For example, PageHeader has primary actions. These primary action buttons cannot be replaced with wrappers. Therefore, PageHeader won't be adopted because their buttons cannot use the wrapper with additional logic. We would have to create a wrapper on PageHeader to add logic to the onClick.

- Wrappers mask adoption for Gestalt components.

- Changes in Gestalt componts are harder to propagate to each wrapper API. Wrappers increase maintenance for the Gestalt team and with time wrappers' API can end up being substantially different from the Gestalt component they are extending.

- For each wrapper, we need an Eslint rules to avoid direct Gestalt usage. Despite Eslint rules, engineers still use them increasing the amount of disabled comments in imports.

See previous [onInteraction proposal](https://paper.dropbox.com/doc/Proposal-New-onInteraction-functionality-in-Gestalt-components--B416h3YCf4BRIgvCtDUTVrKLAg-rOblYZwoXPm1MzHeLbVyx)

### Impact

Enabling external logic (such as logging) on interaction event handlers in Gestalt components via GlobalEventsHandlerProvider allows to:

- increase adoption of Gestalt components

- reduce lines of code and increase code quality, we don't need wrappers

- consistent and documented APIs

- reduce maintenance work

- centralize and document logic passed to the GlobalEventsHandlerProvider via PDocs

- enforce external logic when needed

- escale faster the addition of logic to other composed components: from Buttons to PageHeaders, SideNavigation, etc rather than additional wrappers for each new component and adding more ESLint rules.

- prevent bugs: wrappers with time tend to accumulate bugs and bad practices as they become not owned and engineers keep adding code patches

- less ESLint rules to prevent direct import from Gestalt

## Detailed Design

GlobalEventsHandlerProvider is already a Gestast utility. The API is flexible and can reach any component.

```javascript
<GlobalEventsHandlerProvider componentHandler={{ handlerOne: () => {}, handlerTwo: () => {} }}>
  {children}
<GlobalEventsHandlerProvider >
```

This is a hypothetical implementation of GlobalEventsHandlerProvider passing down to Button logging logic to interaction event handlers

```javascript
<GlobalEventsHandlerProvider
  buttonHandlers={{ onClick: ({ name, surface }) => log("button", "campaign_form", name, surface)}}
>
  {children}
<GlobalEventsHandlerProvider >

```

GlobalEventsHandlerProvider shares default logic across components, unidirectionally: parent to child. To make more versatile this API and be able to provide some custom data to the logic, for instance, to be able to log specific data about the component being interacted with, we are adding a new prop `providerAuxData`. Interactive events handlers exposed in GlobalEventsHandlerProvider have access to the `providerAuxData` object.

```javascript
<Button providerAuxData={{ name: "apply-button", surface: "advertiser-tools"}}>
```

## Documentation

This component will be documented in the [Gestalt Docs under the utilities category, GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider) and in [PDocs](https://pdocs.pinadmin.com/docs/webapp/gestalt-providers)

We'll create an ESLint rule to enforce the usage of `providerAuxData` within sections of the site. The ESLint will communicate the PDocs link and how to use the prop.

## Drawbacks

- A limitation to this implementation is that we cannot enforce a specific Flow type shared between `providerAuxData` and the event types in GlobalEventsHandlerProvider. To minimize this, it's encouraged to create an Eslint rule linking to documentation if components need to share `providerAuxData` with GlobalEventsHandlerProvider. If the logic doesn't need to be customized, this can be skipped.

- React Providers overwrite Providers from the same Context that are above in the app tree. GlobalEventsHandlerProvider can be used in differents sections of the code to apply different logic in different site sections. Some of the logic might be global to the whole app.

To prevent duplication of code or overriding logic, we recommend keeping the logic passed to GlobalEventsHandlerProvider in a single custom React hook so it can be reimplemented on each level where GlobalEventsHandlerProvider is implemented easily and consistently.

A custom hook can also be build to receive arguments and provide custom returns.

```javascript

const { sheetMobileHandlers, linkHandlers, buttonHandlers } = useGlobalEventsHandlerProvider()

<GlobalEventsHandlerProvider
  buttonHandlers={buttonHandlers} sheetMobileHandlers={sheetMobileHandlers} linkHandlers={linkHandlers}
>
  {children}
<GlobalEventsHandlerProvider >

```

See the existing implementation on this [PR](https://github.com/pinternal/pinboard/pull/12301/files)

## Backwards Compatibility Analysis

No. New props in API. It is not a breaking change

## Alternatives

Previous implementation approaches are on the following [onInteraction proposal document](https://paper.dropbox.com/doc/Proposal-New-onInteraction-functionality-in-Gestalt-components--B416h3YCf4BRIgvCtDUTVrKLAg-rOblYZwoXPm1MzHeLbVyx)

## Open Questions

Any other alternative?

## Help Needed

- Any other alternative?

- Any blind spot in the current implementation?

## Frequently Asked Questions

--

## Related Discussions

--

## Feedback

## Action
