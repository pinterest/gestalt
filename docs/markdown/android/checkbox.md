---
title: Checkbox
description: Checkbox is used for multiple choice selection.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/d3/66/fb/d366fb0a6b4bc150779c149aea472a24.jpg" noPadding alt="Primary example of Checkbox component" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - In a list, form or [Table](https://gestalt.pinterest.systems/web/table), to present users with multiple, related options where more than one option can be selected. Users must be able to select all, none or some of the presented options.
    - In a Form, along with a [TextField](https://gestalt.pinterest.systems/android/textfield), or other spaces that are too small for a [Switch](https://gestalt.pinterest.systems/android/switch).
    - When selection doesn’t take immediate effect and requires form submission.
  </Group>

  <Group>
    <Dont title="When not to use" />
    - Situations where users can only choose one out of multiple, related options. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
    - When a selection takes immediate effect, especially on mobile. Use [Switch](https://gestalt.pinterest.systems/android/switch) instead.
    - When visually, it’s hard to tell that a checkbox turns something on or off. Use [Switch](https://gestalt.pinterest.systems/android/switch) instead.
  </Group>
  </TwoCol>

## Best practices

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/32/33/bb/3233bb3a92c57dd29f2b5f2fd2a417f7.jpg" noPadding alt="Example of correct multi-select use" />
    <Do title="Do" />
    Use checkboxes for multi-selection of related list items
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/1e/14/24/1e14245a26f12cf014028d24b00a6317.jpg" noPadding alt="Example of incorrect single-select use" />
    <Dont title="Don't" />
    Use checkboxes for one selection. Use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) instead.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/b2/20/93/b2209377241895d0471bde7340ee85c2.jpg" noPadding alt="Example of correct single checkbox use" />
    <Do title="Do" />
    Use a single Checkbox in forms where the selection only takes effect after submitting the form
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/e7/07/02/e70702e40416c5f4f89e92eca2bbb490.jpg" noPadding alt="Example of incorrect immediate effect use" />
    <Dont title="Don't" />
    Use a Checkbox to turn a state on and off with immediate effect. Use [Switch](https://gestalt.pinterest.systems/android/switch) instead.
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
    [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)
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
    <ImgContainer src="https://i.pinimg.com/originals/45/01/9f/45019f108f27c0d3aa9480fcf001b115.jpg" noPadding alt="Example of unchecked checkbox" />
    **Unchecked**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/fd/06/05/fd06051095a0d1c76122ec282ec54bea.jpg" noPadding alt="Example of checked checkbox" />
    **Checked**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/60/60/48/60604885afd2ee2e8b9cad4c1efdbb0a.jpg" noPadding alt="Example of checkbox with an error" />
    **Error**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/e0/ab/e1/e0abe172b2dfe56166d33b5d8a8175f2.jpg" noPadding alt="Example of checkbox with an indeterminate state" />
    **Indeterminate**
  </Group>

  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/82/50/5c/82505c5eb557f3b85049965ccbe14435.jpg" noPadding alt="Example of checkbox with a disabled state" />
    **Disabled**
  </Group>
</ThreeCol>

**With helper text**
Checkbox supports helper text to provide more detail about an option.

<ImgContainer src="https://i.pinimg.com/originals/dd/12/5a/dd125a30d6fb4cdd8c44c002f363dd56.jpg" noPadding alt="Example of checkbox with helper text" />

## Related

- [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup)
  Use when presenting a user with a list of choices for which there can only be one selection.
- [Switch](https://gestalt.pinterest.systems/android/switch)
  Use for single-cell options that can be turned on or off. Examples include a list of settings that take effect immediately without having to confirm Form submission.
- [Fieldset](https://gestalt.pinterest.systems/web/fieldset)
  Use to group a list of related Checkboxes with a legend that describes the list.
