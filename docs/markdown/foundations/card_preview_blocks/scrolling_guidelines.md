---
title: Scrolling guidelines
description: The Scrolling preview block or “Scrolling PB” presents images in a linear sequence that can be navigated by swiping or through a navigational arrow indicator. Scrolling preview blocks allow users to see a variety of content in a compact space.  
fullwidth: true
---

<ImgContainer padding="none" color="purple-mysticool-0" src="https://i.pinimg.com/originals/1c/d6/d5/1cd6d59f83129699471438433f2c7a30.jpg" alt="Example of a boards block in Card."/>

<Hint>
These guidelines were created in collaboration with the Pinterest Browse Design team. 
</Hint>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - When using a PreviewBlock that allows for scrolling functionality (ex: Pins, Boards)
      - To allow the user to move horizontally through more content than is typically allowed within a PreviewBlock’s fixed preview arrangement (ex: Pins PreviewBlock has a fixed preview and scrolling preview)
      - Use scrolling PreviewBlock as a last resort (i.e., when the fixed preview arrangement does not achieve the desired result)
  </Group>
  <Group>
  <Dont title="When not to use" />
    - When the same goal can be achieved with the PreviewBlock’s fixed preview arrangement
  </Group>
</TwoCol>

## Best practices
<TwoCol>
  <Group>
    <Do title="Do" />
    Use only Pins or images as content in the Scrolling PB. The Scrolling PB should not be used for grouping text content.
  </Group>
  <Group>
    <Do title="Don't" />
    Use the Scrolling PB to display critical information. This information will not always be visible and could lead to users missing something important. 
  </Group>
  <Group>
    <Do title="Do" />
    Always show the Scrolling PB controls. This includes the navigational arrows and carousel pagination in additional to scrolling functionality. This assures better access to the content. 
  </Group>
  <Group>
    <Dont title="Don't" />
    Use the Scrolling PB to navigate between destinations on the app (ex: primary destinations such as Home and Profile, secondary destinations within a primary destination). Scrolling interfaces can be difficult for those with motor or visual impairments. Instead rely on traditional Pinterest navigation. 
  </Group>
</TwoCol>

## Accessibility

People use Apple and Android’s accessibility features, such as VoiceOver and TalkBack to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple and Android’s accessibility documentation for more information:

- [Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

- [Accessbile design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

### Navigation
Keep in mind, carousels or scrolling experiences can be difficult for users, especially those with motor or visual impairments. They also tend to have a significant drop off in regards to interaction. Consider if this experience is necessary or if the goal can be achieved in a more accessible manner. 

### Screen Readers
The scrolling preview block should be labeled correctly, and given the correct attributes as to allow screen readers to provide additional context to the user about the components structure and behavior.

### Auto Advance
The scrolling preview block should never auto advance. The user should be in control of the content and how they view it.

## Anatomy
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A79954%26t%3DWEMz4VEOS6WCU1tj-1" allowFullScreen></iframe>

## Variants

### Default
The default scrolling preview block will be initially scrolled to start. The start aligned navigational icon button will be disabled to indicate there is no further content. The content is overflowed at the end to align with the screen. This indicates that there is more content.

At the end of the content, the opposite will be true. The end icon button will be disabled and the content will overflow to the start edge of the screen. 
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A80193%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>

### Scrolled
The scrolled view will overflow on both sides, being cut off by the edges of the screen. This indicates there is more content in both directions. Both navigational icon buttons will be active and the carousel pagination will not which segment of the content is being viewed.
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19801%253A76289%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>

## Dark mode
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A80068%26t%3DWEMz4VEOS6WCU1tj-1" allowFullScreen></iframe>
