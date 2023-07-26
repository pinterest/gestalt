---
title: Switch
description: Use Switch for single-cell options that can be turned on and off only. If you have a cell with multiple options that can activated, consider using [Checkbox](https://gestalt.pinterest.systems/android/checkbox).
fullwidth: true
---

<ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/686889de-4b10-48cd-b616-5c0ed0dea123"  alt="Primary example of Switch component" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - For a binary option that can be either active or inactive (on or off).
  </Group>

  <Group>
    <Dont title="When not to use" />
    - Choosing between related options. Each Switch should be considered a solitary, standalone option. For multiple, related choices, use [Checkboxes](https://gestalt.pinterest.systems/android/checkbox) or [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
  </Group>
</TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/5efcffe0-41c9-4c9c-931b-2b434a67fd20"  alt="Example of Switch with label and subtext" />
    <Do title="Do" />
    Use a label and subtext to give Switch context when possible.
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/43668891-f8ca-432e-9057-f10f2539cad5"  alt="Example of Switch with truncated text" />
    <Dont title="Don't" />
    Truncate label text. Instead, allow it to wrap to form another line.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/bee36706-7151-49d3-a150-8e97e839ec33"  alt="Example of disabled Switch" />
    <Do title="Do" />
    Communicate why a switch is disabled and how to enable it if possible.
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/def96af9-e47f-44f1-ac36-f214713e7c94"  alt="Example of incorrect switch usage" />
    <Dont title="Don't" />
    Use checkboxes or radio buttons to replace the functionality of a switch. If the functionality is a binary on or off, use Switch instead.
  </Group>
</TwoCol>

## Accessibility

Switches should have [Labels](https://gestalt.pinterest.systems/web/label) that can be read by screen readers, and that can be tapped to make it easier for users to select and deselect.
People use Apple and Android’s accessibility features, such as VoiceOver and TalkBack to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple and Android’s accessibility documentation for more information:
<TwoCol>
  <Group>
    [Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
    [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)
  </Group>
</TwoCol>

## Design tokens
<iframe style={{border:0}} width="100%" height="800" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19372%253A35341%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19372%253A35107%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

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
    <ImgContainer src="https://i.pinimg.com/originals/7f/6b/5a/7f6b5a6438b9331f9172d346715cdd0c.jpg"  alt="Example of default inactive state of Switch" />
    **Default | Inactive state**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/80/29/45/802945dd6c7a4dcf2eb43bc4d1cc9f3f.jpg"  alt="Example of default active state of Switch" />
    **Default | Active state**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/c0/4c/97/c04c970f0d926842cf4ef89ad42b9347.jpg"  alt="Example of disabled inactive state of Switch" />
    **Disabled | Inactive state**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/e2/12/af/e212aff2d4ff881e3246bdbe2396a058.jpg"  alt="Example of disabled active state of Switch" />
    **Disabled | Active state**
  </Group>
</TwoCol>

### With label

1. **Label left**
Label sits to the left of the switch
1. **Label right**
Label sits to the right of the switch

<TwoCol>
  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20083%253A35488%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
    **Label left**
  </Group>

  <Group>
    <iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20083%253A35651%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
    **Label right**
  </Group>
</TwoCol>

### With subtext
Subtext sits below the Switch label and aligns in the direction of the label.
<br/>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D23552%253A35771%26mode%3Ddesign%26t%3D7DILxmTXufpjBBtl-1" allowFullScreen></iframe>

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

## Related

- [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup)
  Use when presenting a user with a list of choices for which there can only be one selection.
- [Checkbox](https://gestalt.pinterest.systems/ios/checkbox)
  Used when presenting a user with a list of choices for which there can be multiple selections.
- [Fieldset](https://gestalt.pinterest.systems/web/fieldset)
  Used to group a list of related Switches with a legend that describes the list.
