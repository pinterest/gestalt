- Start Date: May 2023
- RFC PR: https://github.com/pinterest/gestalt/pull/2918
- Authors: Alberto Carreras, acarreras

# (RFC title goes here)

## Summary

EffectsProvider is a React.Context provider intended to share React effects (useEffect logic) with consuming components.

## Motivation

Gestalt SheetMobile's current custom implementation in Pinterest codebase contains and executes additional logic to pause/resume Pin impressions duration. Impressions are paused when the bottom sheet is rendered (useEffect first run) and the impressions are resumed by the return in the useEffect (useEffect clean/unmounting run).

This custom logic is only required in Pinboard, Pinterest' web repository.

Gestalt SheetMobile should be able to execute this same logic when used in Pinboard.

## Detailed Design

EffectsProvider is a React.Context provider to share useEffect logic with components consuming from it.

EffectsProvider has props for each specific Gestalt component consuming from it.

```javascript
<EffectsProvider sheetMobile={logic}>
  {children}
<EffectsProvider >
```

In order to pass a useEffect to EffectsProvider, we must implement React.useEffect inside a [React custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks). If we see the example in the documentation, the usecase presented for a React custom hook (useOnlineStatus) is to reuse the logic inside of it, reusing "useEffect". Instead of repeating over and over the same logic, this solution simplifies the code and removes duplications.

This is a hypothetical implementation of EffectsProvider passing down to SheetMobile a custom hook named "useSheetMobileEffects"

```javascript

  const useSheetMobileEffects = () => {

    React.useEffect(() => {
      pausePinImpressions();
      return () => {
        resumePinImpressions();
      };
    }, [pausePinImpressions]);

  };

  <EffectsProvider sheetMobile={useSheetMobileEffects}>
  {children}
<EffectsProvider >

```

Inside of SheetMobile, we access the custom hook that was passed to the EffectsProvider via the "sheetMobile" prop from the associated "useEffectsContext" hook and we execute it.

```javascript
const { sheetMobile: sheetMobileEffects } = useEffectsContext() ?? {
  sheetMobile: () => {},
};

sheetMobileEffects();
```

If there are any dependencies inside the custom hook those are synced. For example, if we are consuming from "useReducedMotion" and there are changes in "useReducedMotion" those are detected as well and "useEffect" runs again as it's listed as a depencency in the dependency array. In the case below, our component will always console.log the current state of the reduce motion setting upon changes in the OS configuration.

```javascript

  const useSheetMobileEffects = () => {

    const reducedMotion = useReducedMotion();

    React.useEffect(() => {

        console.log(`Reduced motion is ${reducedMotion ? 'on' : 'off'}`);

      return () => {
        // logic
      };
    }, [reducedMotion, pausePinImpressions]);

  };

  <EffectsProvider sheetMobile={useSheetMobileEffects}>
  {children}
<EffectsProvider >

```

Usually, we would export the custom hook (let's imagine, a custom name with "useReusableEffects") and execute it inside a component.

We must have in consideration that:

- SheetMobile is also built in other components: Dropdown/Popover are adaptive components and, in mobile devices, they replace Popover with SheetMobile. SheetMobile is not accessible/exposed in these cases.

## Documentation

This component will be documented in the [Gestalt Docs under the utilities category](https://deploy-preview-2918--gestalt.netlify.app/web/utilities/effectsprovider)

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

The same way, effects from EffectsProvider in a Gestalt component could be documented and inspected. In the case of OnLinkNavigationProvider, there are several use cases where the logic should be disabled so the engineer can implement alternative navigation logic.

However, EffectsProvider should only contain effects that should apply to all components with no need for a regular engineer to know about them or disable them. The same way most engineers don't currently know the particular logic inside MobileModal in Pinboard (as it is so complex and full of tech debt that it's almost imposible to immediately track down to get a quick sense of what is doing). An engineer interested in that logic would follow the steps below to identify and understand them.

## Backwards Compatibility Analysis

Because this is a React context provider, if the provider is not implemented, there should be any breaking change or change in existing implementations.

## Alternatives

Main consideration to have in mind.

- SheetMobile is also built in components: Dropdown/Popover is an adaptive component and, in mobile devices, replaces Popover with SheetMobile. SheetMobile is not accessible in this case.

Alternative 1: Wrapper in Pinboard

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


return <SheetMobile props={...}>
          {children}
        <SheetMobile >
}
```

or more abstracted

```javascript
const SheetMobileWrapper = () => {

const { sheetMobileEffects } = useReusableEffects() ?? {
  sheetMobileEffects: () => {},
};

sheetMobileEffects();

return <SheetMobile props={...}>
          {children}
        <SheetMobile >
}
```

and one wrapper for each Gestalt component using SheetMobile in mobile devices

```javascript
const MobileDropdownWrapper = () => {

const { mobileDropdownEffects } = useReusableEffects() ?? {
  mobileDropdownEffects: () => {},
};

mobileDropdownEffects();

return <Dropdown props={...}>
          {children}
        <Dropdown >
}
```

```javascript
const MobilePopoverWrapper = () => {

const { mobilePopoverEffects } = useReusableEffects() ?? {
  mobilePopoverEffects: () => {},
};

mobilePopoverEffects();

return <Popover props={...}>
          {children}
        <Popover >
}
```

Same for OverlayPanel and Modal, in both web and mobile web.

However, this solution has one main problem: Not all Popovers in mobile should convert to SheetMobile. Therefore, we would need to have a secondary Popover that doesn't execute the custom hook. This itself adds a enourmous amount of complexity that needs to be documented and that most engineers would never get to know.

Alternative 2: WrapperProvider

Instead of passing down useEffect, we could consider passng down a wrapper component

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



 <WrapperProvider SheetMobileWrapper={SheetMobileWrapper}>
  {children}
<WrapperProvider >

```

Then SheetMobile would get wrapped if the provider was implemented.

```javascript

const SheetMobile = (children) => {

const { SheetMobileWrapper } = useWrapperProvider() ?? {
  SheetMobileWrapper: null,
};


return !!SheetMobileWrapper ? <SheetMobileWrapper>{logic}<SheetMobileWrapper> : logic

```

This is a similar flavor for EffectsProvider but makes the underlying logic more redundant. It would also affect snapshots and probably some integration tests.

Alternative 3: Gestalt component with new "effects" prop that takes a custom hook.

On each instance or implementation

```javascript
const Example = () => {

const { sheetMobileEffects } = useReusableEffects() ?? {
  sheetMobileEffects: () => {},
};

return <SheetMobile effects={sheetMobileEffects}>
          {children}
        <SheetMobile >
}
```

In the case of Popover, we would only need this effects to be passed to SheetMobile, we would need to specify that is a mobile prop prefixing mobileEffects

```javascript
const Example = () => {

const { popoverMobileEffects } = useReusableEffects() ?? {
  popoverMobileEffects: () => {},
};

return <Popover mobileEffects={popoverMobileEffects}>
          {children}
        <Popover >
}
```

This approach makes it more explicit the additional behavior. But it has several problems.

- It's not a dry solution. AN engineer would eventually create a wrapper for this getting to the same problems stated before.

- The prop would be optional and the only way to make it required in Pinboard would be with an Eslint rule. This ESLint rule could be disabled. We could not enforce a particular custom hook to be passed to "effects" prop and engineers could just pass any noop function to silence it () => {}. But the problem would led to situation one where some engineer would create a wrapper eventually to prevent the repetitive code.

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

@liuyenwei: his abstraction definitely feels strange to me. this is basically saying "add any code you want to run whenever FullPage is rendered in here" which I don't think is something we should be enabling. at the very least, if we continue down this path, we should wrap this in a useEffect so at least the thing defined in the context is confined to just being run in a useEffect hook. that being said, it still doesn't feel great since it exposes the underlying use of effects to the consumer

my preference in this case would still be to just use a wrapper component:

its the most composable solution
its clear from a developer perspective what is happening
it limits the scope of changes to just pinboard
a few other options if we really really don't want to use wrapper components:

very specific context provider (i.e. only providing a hook into onModalOpen or something)
emitting a custom event that components can listen to. This is flexible but imo feels like an antipattern in React

@dangerismycat: +1 to Yen's comments.

Yen might be thinking of something even more specific, but a "HandlerProvider" could work — something that would provide additional logic to allowlisted handlers on certain components. That would also solve the SterlingTheme issue. Basically something like DefaultLabelProvider, but instead of providing strings for specific props, the dev would provide a function that would be called for specific handler props (onClick, onModalOpen, etc). Ideally there would be a way of opting out of the additional logic at the callsite, perhaps by wrapping the opted-out component in another instance of the provider.

## Action

Downsetting proposal. Refactoring into GlobalEventsHandlerProvider. See new RFC.
