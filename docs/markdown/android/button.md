---
title: Button
description: Buttons allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](/web/dropdown) or [Popover](/web/popover).
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/a8/24/be/a824be59514046f5088ae0f56a135b55.png" alt="a red button that says Save" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Communicating an action that will occur.
    - Triggering or enabling an action, such as submitting requested information.
    - Progressing or regressing a user through a step in a flow.
  </Group>
  <Group>
  <Dont title="When not to use" />
    - Directing users to a new page or different part within the same page.
    - Limited space available. Consider using an IconButton instead.
  </Group>
</TwoCol>

## Best practices

For general Button best practices, refer to the [Button web documentation](/web/button).
- Place primary buttons to the right or top of other buttons when in a button group.
- Keep elements inside a button container grouped. Label text and icons should remain centered when the Button width increases.
- Avoid using multiple button sizes in the same experience.
- If necessary, adjust the button placement and size when scaling from large screens to small screens.

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens
<iframe style={{border:0}} width="100%" height="1500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19085%253A35145%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19085%253A34374%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Variants

### Size

Mobile buttons are available in 2 sizes. The Button text always use [$font-size-300 token](/foundations/design_tokens#Font-size) (16sp).

1. **lg (60dp)**
   Large should be primarily used on Pinner, business and internal surfaces.
2. **sm (44dp)**
   Small should be used sparingly and only in places where the UI is very dense.

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19085%253A34077%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

### Width

1. **Inline (default)**
   Inline is our default button width. The width of an inline Button is based on the length of its text. Use in most cases where you need a Button.
2. **Full-width (fullWidth)**
   Full-width Buttons can be used in narrower content areas when the text in the Button is close to full width in the content area.

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19158%253A36268%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19158%253A36413%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
</Group>
</TwoCol>

### Styling
For more information on color, icons, roles, and states, refer to the [web Button documentation](/web/button)
1. **Red (Primary)**
High emphasis, used for primary actions.
2. **Blue (Primary in shopping context)**
The blue Button is only intended for the shopping experience and is used for primary shopping actions.
3. **Gray (Secondary)**
Medium emphasis, used for secondary actions.
4. **Transparent (Tertiary)**
Low emphasis when placed on dark/image backgrounds, used for tertiary actions in that context. Note, this treatment should be used with caution as it has potential color contrast issues.
<br/>
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A45560%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

**Primary**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A45881%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

**Shopping**
</Group>
</TwoCol>

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A45667%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

**Secondary**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A45774%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

**Tertiary**
</Group>
</TwoCol>

### States
1. **Disabled**
Used to block user interaction such as hover, focus and click. Disabled Buttons are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled Buttons.
2. **Selected**
When Button is used to toggle a boolean state or control the visibility of other elements (e.g. Dropdown).
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A46095%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Disabled**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20457%253A45988%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Selected**
</Group>
</TwoCol>


## Color
<iframe style={{border:0}} width="100%" height="640" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D21497%253A48071%26t%3DH6iA4iyiJUHmCEcT-1" allowFullScreen></iframe>

## Writing

For writing best practices, refer to the [web Button documentation](/web/button).

## Localization

For RTL (right-to-left) languages, the layout of the button is mirrored.
