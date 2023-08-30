---
title: Checkbox
description: Checkbox is used for multiple choice selection.
fullwidth: true
---

<ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/66828b69-1e1b-4c67-86b4-f62a64a0f6f2"  alt="Primary example of Checkbox component" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - In a list, form or [Table](https://gestalt.pinterest.systems/web/table), to present users with multiple, related options where more than one option can be selected. Users must be able to select all, none or some of the presented options.
    - In a Form, along with a [TextField](https://gestalt.pinterest.systems/ios/textfield), or other spaces that are too small for a [Switch](https://gestalt.pinterest.systems/ios/switch).
    - When selection doesn’t take immediate effect and requires form submission.
  </Group>

  <Group>
    <Dont title="When not to use" />
    - Situations where users can only choose one out of multiple, related options. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
    - When a selection takes immediate effect, especially on mobile. Use [Switch](https://gestalt.pinterest.systems/ios/switch) instead.
    - When visually, it’s hard to tell that a checkbox turns something on or off. Use [Switch](https://gestalt.pinterest.systems/ios/switch) instead.
  </Group>
  </TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/0fe0c895-5939-42ca-a215-3d404b3203c1"  alt="Example of correct multi-select use" />
    <Do title="Do" />
    Use checkboxes for multi-selection of related list items
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/a1965e39-13c9-4a27-9038-c66bf16d1f3d"  alt="Example of incorrect single-select use" />
    <Dont title="Don't" />
    Use checkboxes for one selection. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/c262c872-9f8f-4684-b430-099c2bc62bdb"  alt="Example of correct single checkbox use" />
    <Do title="Do" />
    Use a single Checkbox in forms where the selection only takes effect after submitting the form
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/21ccdc50-30c1-4f0e-9c9f-b7c1c0e37622"  alt="Example of incorrect immediate effect use" />
    <Dont title="Don't" />
    Use a Checkbox to turn a state on and off with immediate effect. Use [Switch](https://gestalt.pinterest.systems/ios/switch) instead.
  </Group>
</TwoCol>

## Accessibility

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
    - Be clear and brief with checkbox labels so they are easily scanned
  </Group>

  <Group>
    <Dont title="Don't" />
    - Include lengthy text labels that make it hard for a user to scan a list of choices
  </Group>
</TwoCol>

## Variants

### State

1. **Unchecked [Default]**
1. **Checked**
1. **Error**
1. **Indeterminate**
1. **Disabled**

<ThreeCol spacing="expanded">
  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/28f2f493-926f-4129-8fc9-ebea9f4d99ac"  alt="Example of unchecked checkbox" />
    **Unchecked**
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/1e7937fc-8030-443a-bcd8-ef6ce5fceda5"  alt="Example of checked checkbox" />
    **Checked**
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/255076ef-aea0-4f53-b9b8-c3cf2e27e0df"  alt="Example of checkbox with an error" />
    **Error**
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/3454c729-397e-4f0c-8abe-436b1577a51a"  alt="Example of checkbox with an indeterminate state" />
    **Indeterminate**
  </Group>

  <Group>
    <ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/267a3fad-123e-4bd6-8bdf-d273d794611f"  alt="Example of checkbox with a disabled state" />
    **Disabled**
  </Group>
</ThreeCol>

**With helper text**
Checkbox supports helper text to provide more details about an option.

<ImgContainer src="https://github.com/pinterest/gestalt/assets/63257116/f84e29bc-5c8c-4d31-98b9-8ed4a755a858"  alt="Example of checkbox with helper text" />

## Related

- [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup)
  Use when presenting a user with a list of choices for which there can only be one selection.
- [Switch](https://gestalt.pinterest.systems/ios/switch)
  Use for single-cell options that can be turned on or off. Examples include a list of settings that take effect immediately without having to confirm Form submission.
- [Fieldset](https://gestalt.pinterest.systems/web/fieldset)
  Use to group a list of related Checkboxes with a legend that describes the list.
