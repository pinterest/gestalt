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

- Wrappers mask adoption for Gestalt components. We understand wrappers are inevitable. SterlingCurrencyTextfield for example. For those base building blocks, this will prevent duplicates for simple clicking built in logic.

- Changes in Gestalt componts are harder to propagate to each wrapper API. Wrappers increase maintenance for the Gestalt team and with time wrappers' API can end up being substantially different from the Gestalt component they are extending.

- For each wrapper, we need an Eslint rules to avoid direct Gestalt usage. Despite Eslint rules, engineers still use them increasing the amount of disabled comments in imports.

See previous [onInteraction proposal](https://paper.dropbox.com/doc/Proposal-New-onInteraction-functionality-in-Gestalt-components--B416h3YCf4BRIgvCtDUTVrKLAg-rOblYZwoXPm1MzHeLbVyx)

### Impact

Enabling external logic (such as logging) on interaction event handlers in Gestalt components via GlobalEventsHandlerProvider allows to:

- increase adoption of Gestalt components

- reduce lines of code and increase code quality, we don't need wrappers

- consistent and documented APIs

- reduce maintenance work, p.e Gestalt codemods can’t rename id prop in SterlingButton but they can in Button

- prevent issues like divergent APIs like in SterlingIconButton or SterlignLink where event handlers lost access to events

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

### Benchmark

- Atlassian analyticsContext https://atlassian.design/components/button/code
- Slack https://slack.engineering/creating-a-react-analytics-logging-library-2/
- Slack https://slack.engineering/creating-a-react-analytics-logging-library/

## Help Needed

- Any other alternative?

- Any blind spot in the current implementation?

## Frequently Asked Questions

--

## Related Discussions

- Jack Hsu
  - Gestalt were internal, we could do as we pleased. As standalone library, it should be small building block. Remove any Pinterest specific logic.
  - What’s providerAuxData prop? How to communicate this props?
  - Wrappers is not necessarily a problem.
  - Event handler doing much taking from flexibility. Engineering owning all behavior in component
  - Sterling wrappers seem to not only add default logic but can sometimes add more restrictions adding default logic can be done by moving to Gestalt, but adding more restriction isn't example: https://github.com/pinternal/pinboard/blob/8e8e7eba6d96f289c5219f4d94b11875e43e09e9/webapp/app/sterling/react/components/elements/FormControls/GestaltTheme/SterlingButton.js#L24
  - The flow types restrict the what props can be passed in so if we convert to Gestalt button, the restrictions are lost
  - What types of logging?
    - logging component impression
      - tracking adoption + the impact of components independently from instances in code
    - logging ads usage
      - insights for user behavior and debugging flows
  - Is this goig to reduce wrappers?
    - Yes.
  - How many components are we targeting to reduce?
    - can we quantify components that wouldn’t not need a wrapper?
      - be specific / document?
  - What happens if AuxData not passed?
    - Default values are logging
- Yen Wei
  - Biggest code smell. Button now needs a providerAuxData, implementation bleeding into public API
  - Button doesn’t need it, just to support this use case
  - This opens the door to more of this patterns
  - Don’t sacrifice public API to support Gestalt tracking usage
  - React was built to allow composability so wrappers are natural to the framework
  - Don’t sacrifice composability to track adoption
  - For Masonry, we fork in Pinboard. We consume from Pinboard.
    - Performance tracking is logic lives in Pinboard
  - Native browser events
    - benefit is convenience but not sure where things are handled.
    - POPSUB issue
- Ravi
  - New component >> creation of a fork by default
    - cleanup code, all organized in single provider
    - what’s the benefit of the wrapper?
    - What’s auxData?
      - componentType
      - elementType
      - viewType
      - viewParameter
      - id
      - name

* Jack

## Feedback

## Action

After 3 years pushing for enabling logging on interactions within Gestalt components, and after long discussions with Yen, Jack and Ravi, these are the conclusions.

We are burying the project for enabling logging on interactions with Gestalt components. I'm going to re-strategize this project so we can still get adoption gains. More details below

We are going to implement logging functionality in Gestalt to measure component impressions on component mount

Re 1. I couldn't sell to YenWei and Jack my proposal for removing sterling wrappers on Gestalt components. Main concerns: breaking modularity from React and having to add an auxData prop in the API of components to communicate with the logic from the GlobalEventsHandlerProvider for customized logging (extending the default login).

Despite the wins we could bring with this: removal of wrappers, direct consumption of Gestalt components, direct adoption gains, standardize behavior for logic, easier maintenance, etc. I couldn't build a strong case for YenWei and Jack to give me the thumbs up. They consider wrappers are ok and that there are workaround solutions to these problems. They also think they might open the gate to future different needs and we could end up creating monster APIs because we want our components to meet all needs.

Re 2. I'm going to do is to move all sterling wrappers to a new gestaltExtensions/adsLogging/ folder. I'll move all the logging logic to custom hooks and have these wrappers be thin layers on Gestalt components that we own for shake of API consistency (meaning, these wrappers will have the exact same API as our components plus the auxData or loggingProps prop). Then, I'll add this folder to our metrics script. We are going to include these wrappers in our adoption metrics so we still meet the increase in adoption. These folder will become a forked library of Gestalt. I'll be properly Flow typed and documented in PDocs.

See proposals/docs for more contexts:

Re 3. We are going to start testing component impression logging for our gestalt-datepicker components. Limitation. In my proposal, auxData prop could have being use to also communicate with the impression logic and we could have passed ids to leverage measurements of impact of specific components instances. It was more like a long term exploration but we are shutting that down if we don't move forward with the auxData prop.

Here's the PR GlobalEventsHandlerProvider, DatePicker, DateRange, DateField: add onMount handlers #3122
