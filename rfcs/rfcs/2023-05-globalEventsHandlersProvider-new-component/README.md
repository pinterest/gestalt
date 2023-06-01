- Start Date: May 2023
- RFC PR: https://github.com/pinterest/gestalt/pull/2956
- Authors: Alberto Carreras, acarreras

# GlobalEventsHandlerProvider: new utility provider

## Summary

GlobalEventsHandlerProvider is a React.Context provider intended to share external handlers with consuming components.

## Motivation

1. Gestalt SheetMobile's current custom implementation in Pinterest codebase contains and executes additional logic to pause/resume Pin impressions duration. Impressions are paused when the bottom sheet is rendered (useEffect first run) and the impressions are resumed by the return in the useEffect (useEffect clean/unmounting run).

This custom logic is only required in Pinboard, Pinterest' web repository.

Gestalt SheetMobile should be able to execute this same logic when used in Pinboard.

2. Most interactive components in Pinboard used in https://ads.pinterest.com/ require logging and tracking logic. Some of them are Gestalt components (Button, Checkbox, Dropdown, IconButton, Link, NumberField, RadioButton, SearchField, SelectList, Switch, TapArea, TextArea, TextField)

To facilitate and enforce the reusability of the logging logic, the Ads team created a GestaltTheme folder (app/sterling/react/components/elements/FormControls/GestaltTheme) where several Gestalt components are wrapped and re-exported with an extended API which includes new props to build the logging-data object being logged.

The logging logic is executed on the onClick or onChange events. Some other additional logic might be included in the new components such as testing wrappers. Some components also use helper hooks like useHandleEvent or useReportingContext.

These wrapped Gestalt components in Ads are under an Eslint rule that enforces the GestaltTheme replacements.

Most components have default tracking data but custom tracking is also allowed to track the usage/click of specific components.

These logs are used to extend the insights on experimentation allowing the Ads team to track user flows and increase Ads/campaigns optimizations.

See previous [onInteraction proposal](https://paper.dropbox.com/doc/Proposal-New-onInteraction-functionality-in-Gestalt-components--B416h3YCf4BRIgvCtDUTVrKLAg-rOblYZwoXPm1MzHeLbVyx)

## Detailed Design

GlobalEventsHandlerProvider is a React.Context provider to share gloal event handlers with consuming components.

GlobalEventsHandlerProvider has props for each specific Gestalt component consuming from it.

```javascript
<GlobalEventsHandlerProvider componentName={{ handlerOne: () => {}, handlerTwo: () => {} }}>
  {children}
<GlobalEventsHandlerProvider >
```

This is a hypothetical implementation of EffectsProvider passing down to SheetMobile custom event handlers

```javascript
<GlobalEventsHandlerProvider sheetMobile={{ onOpen: () => {}, onClose: () => {} }}>
  {children}
<GlobalEventsHandlerProvider >

```

Inside of SheetMobile, we access the event handlers that were passed to the GlobalEventsHandlerProvider via the "sheetMobile" prop and we execute it.

```javascript
const {
  sheetMobile: { onOpen, onClose },
} = useGlobalEventsHandlerContext() ?? {
  sheetMobile: { onOpen: () => {}, onClose: () => {} },
};

// within useEffect
onOpen();
onClose();
```

Considerations:

- SheetMobile is built into other components: Dropdown/Popover are adaptive components and, in mobile devices, they replace Popover with SheetMobile. SheetMobile is not accessible/exposed in these cases.
- Button and other interactive components are built into other components in many case, they not accessible/exposed in these cases.

## Documentation

This component will be documented in the [Gestalt Docs under the utilities category](https://deploy-preview-2918--gestalt.netlify.app/web/utilities/globaleventshandlerprovider)

Also, each component will have a external handlers variant section will details of where each handler is executed within the component.

## Drawbacks

We have a similar provider in Gestalt: [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider). OnLinkNavigationProvider is a React context provider to externally control the link behavior of components further down the tree. In other words, it allows to use routers (React's router, Next's router) for navigating to URLs rather than the default <a> HTML element.

Since it's implementation, a major drawback is the opacity of the side effects. In other terms, Gestalt components are designed to reduce engineering efforts and engineers trust them without understanding, in many cases, the undelying logic in the component.

When an engineer is using a Gestalt component in Pinboard might not necessarily know they are consuming from a Gestalt Provider implemented in the web app; they might be unaware of this additional logic that the component is executing under the hood.

The only way of figuring out is knowing that the component is consuming from a provider and find the provider in the app to see the external logic passed down.

There's no drawback if we assume that:

- ALL engineers know that the Pinboard repository has ALL Gestalt providers implemented: ColorSchemeProvider (mobile web), DefaultLabelProvider (mobile and desktop web), DeviceTypeProvider (mobile and desktop web), OnLinkNavigationProvider (mobile and desktop web).

However, we know most engineers don't know that and it's not properly documented via PyDocs or other webapp documentation.

For that reason, for a regular engineer, this additional logic must be hard to locate. It's hard to link a Gestalt component with a Gestalt Provider.

A senior experienced engineer would:

- Read the Gestalt documentation
- Search for the providers in the app and track the logic as it would do we any other logic in the code
- Use React Developer Tools to inspect behaviors
  ![Inspecting Link in React Developer Tools to detect OnLinkNavigationProvider logic](https://raw.githubusercontent.com/pinterest/gestalt/c339a3fa0e1c230515429294c14c6e22edbac1b2/rfcs/rfcs/2023-05-effectsProvider-new-component/onLinkNavigation.png)

The same way, effects from GlobalEventsHandlerProvider in a Gestalt component could be documented and inspected. In the case of OnLinkNavigationProvider, there are several use cases where the logic should be disabled so the engineer can implement alternative navigation logic.

Most engineers don't currently know the particular logic inside MobileModal in Pinboard (as it is so complex and full of tech debt that it's almost imposible to immediately track down to get a quick sense of what is doing). An engineer interested in that logic would follow the steps below to identify and understand them.

## Backwards Compatibility Analysis

Because this is a React context provider, if the provider is not implemented, there should be any breaking change or change in existing implementations.

## Alternatives

Main consideration to have in mind.

- SheetMobile is also built in components: Dropdown/Popover is an adaptive component and, in mobile devices, replaces Popover with SheetMobile. SheetMobile is not accessible in this case.
- Button and other interactive components are built into other components in many case, they not accessible/exposed in these cases.

Alternative 1: Wrappers in Pinboard

- SheetMobile is a components inside Gestalt, which is a dependency of Pinboard. In order to implement external logic from Pinboard into SheetMobile we would have to:
  - Wrap SheetMobile, Dropdown, and Popover in Pinboard and execute this hypothethical "useReusableEffects" custom hook within the wrapper
  - Create an ESLint rule now allow the direct import from Gestalt of SheetMobile, Dropdown, and Popover.
  - Redirect via ESLint message that the user has to use a wrapped version of SheetMobile, Dropdown, and Popover contained within the "gestaltExtensions/" folder in Pinboard.

A wrapper would look like this:

```javascript
const SheetMobileWrapper = () => {

  React.useEffect(() => {
    pausePinImpressions();
    return () => {
      resumePinImpressions();
    };
  }, [pausePinImpressions]);


  return <SheetMobile props={...}>{children}<SheetMobile >
}
```

or more abstracted

```javascript
const SheetMobileWrapper = () => {

  usePinImpressionManager()

  return <SheetMobile props={...}>{children}<SheetMobile >
}
```

and one wrapper for each Gestalt component using SheetMobile in mobile devices

```javascript
const MobileDropdownWrapper = () => {

  usePinImpressionManager()

  return <Dropdown props={...}> {children} <Dropdown >
}
```

```javascript
const MobilePopoverWrapper = () => {

  usePinImpressionManager()

  return <Popover props={...}>{children}<Popover >
}
```

Same for OverlayPanel and Modal, in both web and mobile web.

However, this solution has one main problem: Not all Popovers in mobile should convert to SheetMobile. Therefore, we would need to have a secondary Popover that doesn't execute the custom hook. This itself adds a enourmous amount of complexity that needs to be documented and that most engineers would never get to know.

Alternative 2: WrapperProvider

Instead of passing down useEffect, we could consider passing down a wrapper component

```javascript

const SheetMobileWrapper = (children) => {

  React.useEffect(() => {
      pausePinImpressions();
      return () => {
        resumePinImpressions();
      };
    }, [pausePinImpressions]);

  return children
}

 <WrapperProvider SheetMobileWrapper={SheetMobileWrapper}>{children}<WrapperProvider >

```

Then SheetMobile would get wrapped if the provider was implemented.

```javascript

const SheetMobile = (children) => {

const { SheetMobileWrapper } = useWrapperProvider() ?? {
  SheetMobileWrapper: null,
};


return !!SheetMobileWrapper ? <SheetMobileWrapper>{logic}<SheetMobileWrapper> : logic

```

This is a similar flavor for EffectsProvider (rfcs/rfcs/2023-05-effectsProvider-new-component) but makes the underlying logic more redundant. It would also affect snapshots and probably some integration tests.

Alternative 3: Gestalt component with new "effects" prop that takes a custom hook.

On each instance or implementation

```javascript
const Example = () => {

  const { sheetMobileHandler } = useGlobalHandler() ?? {
    sheetMobileHandler: () => {},
  };

  return <SheetMobile effects={sheetMobileHandler}>{children}<SheetMobile >}
```

In the case of Popover, we would only need this to be passed to SheetMobile, we would need to specify that is a mobile prop prefixing mobile

```javascript
const Example = () => {

  const { popoverMobileHandler } = useGlobalHandler() ?? {
    popoverMobileHandler: () => {},
  };

  return <Popover mobileHandler={popoverMobileHandler}> {children}<Popover >
}
```

This approach makes it more explicit the additional behavior. But it has several problems.

- It's not a dry solution. An engineer would eventually create a wrapper for this getting to the same problems stated before.

- The prop would be optional and the only way to make it required in Pinboard would be with an Eslint rule. This ESLint rule could be disabled. We could not enforce a particular custom hook to be passed to "effects" prop and engineers could just pass any noop function to silence it () => {}. But the problem would led to situation one where some engineer would create a wrapper eventually to prevent the repetitive code.

Alternative 3: EffectsProvider (rfcs/rfcs/2023-05-effectsProvider-new-component) DISCARDED ALTERNATIVE

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
