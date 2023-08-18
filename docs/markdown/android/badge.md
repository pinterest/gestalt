---
title: Badge
description: Badge is a label that indicates status or importance. Badges should provide quick recognition and are available in different styles for different use cases.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/a1/be/c0/a1bec0cacf9a06eb857fd0577b866ba4.png" alt="an example of badge with text on a mobile screen" />

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
    - Labeling and bringing awareness to a specific element or feature (e.g., something is new or required)
  </Group>
  <Group>
  <Dont title="When not to use" />
    - Providing feedback at the element level (e.g., displaying error messages). Use inline text instead.
    - Requiring interaction from users, since Badges are always static and non-interactive
  </Group>
</TwoCol>

## Best practices

For general Badge best practices, refer to the [Badge web documentation](/web/badge).
- Use only one or two words to describe Badge status
- Badge must always be paired with the element that they’re associated with
- Avoid displaying multiples Badges in the same experience, since they label a state to an element

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

### Color
Badge text must be clear so that users can understand the status without relying only on Badge color. 

## Design tokens
<iframe style={{border:0}} width="100%" height="1500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D26401%253A37969%26mode%3Ddesign%26t%3DsuyatDgaHD9xfkom-1" allowFullScreen></iframe>

## Anatomy
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D26400%253A36566%26mode%3Ddesign%26t%3DsuyatDgaHD9xfkom-1" allowFullScreen></iframe>

## Variants

### Type
Badge is available in six styles. Each type has a semantic meaning and represents a sentiment.
1. **Info (default)**
   Communicates helpful information or an important attribute. For example, ‘New’ or ‘Help’.
2. **Success**
   Indicates a constructive or successful state. For example, 'Available', 'Completed', 'Approved' or 'Added'.
3. **Warning**
   Communicates cautionary or time-sensitive information to the user. For example, 'Busy', 'Missing' or 'Warning'.
4. **Error**
   Informs the user of problems or errors that require potential action to correct. For example, 'Deleted' or 'Cancelled'.
5. **Neutral**
   Indicates a general, non-critical status update. For example, 'Unavailable' or 'Not started'.
6. **Recommendation**
   Highlights a suggestion that will improve the experience and achieve better results. For example, 'Recommended for you'.

<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D26411%253A39652%26mode%3Ddesign%26t%3DsuyatDgaHD9xfkom-1" allowFullScreen></iframe>

### Light wash / Dark wash
   Badge with wash style may be used over media.
1. **Light wash**
  The light wash badge should be used over media that is dark or utilizes a dark gradient overlay.
2. **Dark wash**
  The dark wash badge should be used over media that is light or utilizes a light gradient overlay.

<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D27075%253A36805%26mode%3Ddesign%26t%3DsuyatDgaHD9xfkom-1" allowFullScreen></iframe>

### Dark mode
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D26843%253A36727%26mode%3Ddesign%26t%3DsuyatDgaHD9xfkom-1" allowFullScreen></iframe>

## Writing
For writing best practices, refer to the [Content standards](foundations/content_standards/voice). 
<TwoCol>
  <Group>
    <Do title="Do" />
    - Use a single word to describe the status of an element. For example, “New” not “New post”
    - Where applicable, describe the status in past tense. For example, “Archived” not “Archive”
  </Group>
  <Group>
  <Dont title="Don't" />
    - Use conflicting language with defined type sentiments. For example, the error badge should not say “Complete”
  </Group>
</TwoCol>
