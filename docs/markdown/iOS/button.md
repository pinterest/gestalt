---
title: Button
description: Buttons allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](/web/dropdown) or [Popover](/web/popover).
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/28/1a/d1/281ad184c9d118598c3617c87f444b11.png" />

## Mobile best practices

- Place primary buttons to the right or top of other buttons when in a button group.
- Keep elements inside a button container grouped. Label text and icons should remain centered when the Button width increases.
- Avoid using multiple button sizes in the same experience.
- If necessary, adjust the button placement and size when scaling from large screens to small screens.

For general Button best practices, refer to the [Button web documentation](/web/button).

## Variants

### Size

Mobile buttons are available in 2 sizes. The Button text always use [[$font-size-300 token](/foundations/design_tokens#Font-size)] (16pt).

1. **lg (60pt)**
   Large should be primarily used on Pinner, business and internal surfaces.
2. **sm (44pt)**
   Small should be used sparingly and only in places where the UI is very dense.

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/8f/99/d6/8f99d65f75cba0385e181bdfe160d236.png" />
**size = “sm”**
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/32/a5/bf/32a5bfd6e4b12b80d8d5cc855e9bc50c.png" />
**size = "lg"**
</Group>
</TwoCol>

### Width

1. **Inline (default)**
   Inline is our default button width. The width of an inline Button is based on the length of its text. Use in most cases where you need a Button.
2. **Full-width (fullWidth)**
   Full-width Buttons can be used in narrower content areas when the text in the Button is close to full width in the content area.

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/8f/99/d6/8f99d65f75cba0385e181bdfe160d236.png" />
**default**
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/fd/d2/c9/fdd2c938bb74b486333cc77de3a6d001.png" />
**fullWidth**
</Group>
</TwoCol>

### Styling

For information on color, icons, roles, and states, refer to the [web Button documentation](/web/button).

### Writing

For writing best practices, refer to the [web Button documentation](/web/button).

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/)

## Internationalization

For RTL (right-to-left) languages, the layout of the button is mirrored. The icon is placed on the right side of the text.

{/* ## Related

<ThreeCol>

<IllustrationCard
              title="ButtonGroup"
              description="When displaying multiple Buttons in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior."
              color="green-matchacado-50"
              image="avatar-group"
            />

<IllustrationCard
              title="IconButton"
              description="Use IconButton when only an icon is needed instead of text."
              color="green-matchacado-50"
              image="avatar-group"
            />

<IllustrationCard
              title="Tabs"
              description="Tabs are intended for page-level navigation between multiple URLs."
              color="green-matchacado-50"
              image="avatar-group"
            />

</ThreeCol> */}
