---
title: Button
description: Buttons allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](/web/dropdown) or [Popover](/web/popover).
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/a8/24/be/a824be59514046f5088ae0f56a135b55.png" alt="a red button that says Save" />

## Mobile best practices

- Place primary buttons to the right or top of other buttons when in a button group.
- Keep elements inside a button container grouped. Label text and icons should remain centered when the Button width increases.
- Avoid using multiple button sizes in the same experience.
- If necessary, adjust the button placement and size when scaling from large screens to small screens.

For general Button best practices, refer to the [Button web documentation](/web/button).

## Variants

### Size

Mobile buttons are available in 2 sizes. The Button text always use [$font-size-300 token](/foundations/design_tokens#Font-size) (16dp).

1. **lg (60dp)**
   Large should be primarily used on Pinner, business and internal surfaces.
2. **sm (44dp)**
   Small should be used sparingly and only in places where the UI is very dense.

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
size = “sm”
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>
size = "lg"
</Group>
</TwoCol>

### Width

1. **Inline (default)**
   Inline is our default button width. The width of an inline Button is based on the length of its text. Use in most cases where you need a Button.
2. **Full-width (fullWidth)**
   Full-width Buttons can be used in narrower content areas when the text in the Button is close to full width in the content area.

<TwoCol>
<Group>
<ImgContainer src="https://i.pinimg.com/originals/ef/87/89/ef878985da4fe1eb9a18471ec0506aca.png" alt="a default button that says Save and is the length of its text"/>
default
</Group>

<Group>
<ImgContainer src="https://i.pinimg.com/originals/41/aa/cd/41aacd4f33058566574f283498a3612c.png" alt="a fullwidth button that says Save and is the full width of the content area"/>
fullWidth
</Group>
</TwoCol>

### Styling

For information on color, icons, roles, and states, refer to the [web Button documentation](/web/button).

### Writing

For writing best practices, refer to the [web Button documentation](/web/button).

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://material.io/design/usability/accessibility.html#understanding-accessibility)
- [Accessible development on iOS](https://developer.android.com/guide/topics/ui/accessibility)

## Internationalization

For RTL (right-to-left) languages, the layout of the button is mirrored. The icon is placed on the right side of the text.
