---
title: Switch
description: Use Switch for single-cell options that can be turned on and off only. If you have a cell with multiple options that can activated, consider using [Checkbox](https://gestalt.pinterest.systems/ios/checkbox).
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/d3/90/ad/d390ad2e3fa4c1c8319d7baa7508cb0a.jpg" noPadding alt="Primary example of Switch component" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - For a binary option that can be either active or inactive (on or off).
  </Group>

  <Group>
    <Dont title="When not to use" />
    - Choosing between related options. Each Switch should be considered a solitary, standalone option. For multiple, related choices, use [Checkboxes](https://gestalt.pinterest.systems/ios/checkbox) or [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
  </Group>
</TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/2c/19/f6/2c19f61a4901d6f77069c3ed9f266de4.jpg" noPadding alt="Example of Switch with label and subtext" />
    <Do title="Do" />
    Use a label and subtext to give Switch context when possible.
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d4/ea/4d/d4ea4d12eb9ec8235bd773b363cddc97.jpg" noPadding alt="Example of Switch with truncated text" />
    <Dont title="Don't" />
    Truncate label text. Instead, allow it to wrap to form another line.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/da/30/95/da309504c6a99dc3b989099a2bfde060.jpg" noPadding alt="Example of disabled Switch" />
    <Do title="Do" />
    Communicate why a switch is disabled and how to enable it if possible.
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/66/ef/07/66ef0701a9d3d0927c1198d0d8bc9651.jpg" noPadding alt="Example of incorrect switch usage" />
    <Dont title="Don't" />
    Use checkboxes or radio buttons to replace the functionality of a switch. If the functionality is a binary on or off, use Switch instead.
  </Group>
</TwoCol>

## Accessibility

Switches should have [Labels](https://gestalt.pinterest.systems/web/label) that can be read by screen readers, and that can be tapped to make it easier for users to select and deselect.
People use Apple and Android’s accessibility features, such as VoiceOver and TalkBack to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple and Android’s accessibility documentation for more information:
<TwoCol>
  <Group>
    [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
    [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)
  </Group>

  <Group>
    [Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
    [Accessible development on Android](https://developer.ios.com/guide/topics/ui/accessibility)
  </Group>
</TwoCol>

## Writing

<TwoCol>
  <Group>
    <Do title="Do" />
    - Be clear and brief with Switch labels so they can be easily understood.
    - When possible, use verbs to clarify the action. Something like “set…” or “show…”.
    - If possible, be clear whether the setting is activated or deactivated.
    - Use sentence case for labels.
  </Group>

  <Group>
    <Dont title="Don't" />
    - Use vague language out of context, like “turn on” or “turn off” repeating the state of the switch is redundant and can clutter the interface.
    - Don’t use “you,” “your,” or “my” to describe an action. Instead of “turn on your notifications,” say “turn on notifications.”
  </Group>
</TwoCol>

## Variants

### Disabled and active states

1. **Default | Inactive state**
  Switch is “off” and is not disabled
1. **Default | Active state**
  Switch is “on” and is not disabled
1. **Disabled | Inactive state**
  Switch is “off” and is disabled
1. **Disabled | Active state**
  Switch is “on” and is disabled

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/7f/6b/5a/7f6b5a6438b9331f9172d346715cdd0c.jpg" noPadding alt="Example of default inactive state of Switch" />
    **Default | Inactive state**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/80/29/45/802945dd6c7a4dcf2eb43bc4d1cc9f3f.jpg" noPadding alt="Example of default active state of Switch" />
    **Default | Active state**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/c0/4c/97/c04c970f0d926842cf4ef89ad42b9347.jpg" noPadding alt="Example of disabled inactive state of Switch" />
    **Disabled | Inactive state**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/e2/12/af/e212aff2d4ff881e3246bdbe2396a058.jpg" noPadding alt="Example of disabled active state of Switch" />
    **Disabled | Active state**
  </Group>
</TwoCol>

## Related

- [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup)
  Use when presenting a user with a list of choices for which there can only be one selection.
- [Checkbox](https://gestalt.pinterest.systems/ios/checkbox)
  Used when presenting a user with a list of choices for which there can be multiple selections.
- [Fieldset](https://gestalt.pinterest.systems/web/fieldset)
  Used to group a list of related Switches with a legend that describes the list.
