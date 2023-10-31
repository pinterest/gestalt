---
title: Badge
description: A badge is a label that indicates status or importance. Badges should provide quick recognition and are available in different styles for different use cases.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/a1/be/c0/a1bec0cacf9a06eb857fd0577b866ba4.png" alt="an example of badge with text on a mobile screen" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Labeling and bringing awareness to a specific element or feature (for example, noting when something is new or required)
  </Group>
  <Group>
  <Dont title="When not to use" />
    - Providing feedback at the element level (for example, displaying error messages). Use inline text instead.
    - Requiring interaction from users, since Badges are always static and non-interactive
  </Group>
</TwoCol>

## Best practices

For general Badge best practices, refer to the [Badge web documentation](/web/badge).
- Use only one or two words to describe Badge status
- Badge must always be paired with the element that they're associated with
- Avoid displaying multiple Badges in the same experience, since they label a state to an element

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/foundations/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/)

### Color
Badge text must be clear so that users can understand the status without relying only on Badge color.

## Design tokens
<iframe style={{border:0}} width="100%" height="1500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D38436%253A599%26mode%3Ddesign%26t%3D85TPebyA6PdlqLTx-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D38436%253A492%26mode%3Ddesign%26t%3D85TPebyA6PdlqLTx-1" allowFullScreen></iframe>

## Variants

### Type
The badge is available in six styles. Each type has a semantic meaning and represents a sentiment.
1. **Info (default)**
   Communicates helpful information or an important attribute. For example, 'New' or 'Help'.
2. **Success**
   Indicates a constructive or successful state. For example, 'Available', 'Completed', 'Approved' or 'Added'.
3. **Warning**
   Communicates cautionary or time-sensitive information to the user. For example, 'Busy', 'Missing' or 'Warning'.
4. **Error**
   Informs the user of problems or errors that require potential action to correct. For example, 'Deleted' or 'Cancelled'.
5. **Neutral**
   Indicates a general, non-critical status update. For example, 'Unavailable' or 'Not started'.
6. **Recommendation**
   Highlights suggestions that'll improve the experience and achieve better results. For example, 'Recommended for you'.

<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D38436%253A894%26mode%3Ddesign%26t%3D85TPebyA6PdlqLTx-1" allowFullScreen></iframe>

### Light wash / Dark wash
   Badge with wash style may be used over media.
1. **Light wash**
  The light wash badge should be used over media that's dark or uses a dark gradient overlay.
2. **Dark wash**
  The dark wash badge should be used over media that's light or uses a light gradient overlay.

<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D38436%253A972%26mode%3Ddesign%26t%3D85TPebyA6PdlqLTx-1" allowFullScreen></iframe>

### Dark mode
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D38436%253A933%26mode%3Ddesign%26t%3D85TPebyA6PdlqLTx-1" allowFullScreen></iframe>

## Writing
For writing best practices, refer to the [Content standards](foundations/content_standards/voice). 
<TwoCol>
  <Group>
    <Do title="Do" />
    - Use a single word to describe the status of an element. For example, "New" not "New post"
    - Where applicable, describe the status in past tense. For example, "archived" not "archive"
  </Group>
  <Group>
  <Dont title="Don't" />
    - Use conflicting language with defined type sentiments. For example, the error badge shouldn't say "Complete"
  </Group>
</TwoCol>
