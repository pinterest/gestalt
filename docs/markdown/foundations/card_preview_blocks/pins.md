---
title: Pins preview block
description: Pins PreviewBlock or “Pins PB” is used to present a collection of imagery to represent a landing experience of Pins (example&colon; feed, stream). There are two preview arrangements (fixed and scrolling), each with its own usage guidelines detailed below.  
fullwidth: true
---

<Hint>
These guidelines were created in collaboration with the Pinterest Browse Design team. 
</Hint>

## Fixed preview
Pins PreviewBlock with a fixed preview communicates that the entire preview area is a tap target. It is used when the goal is to direct Pinners to a single destination (ex: topical Pin feed) where they can scan a breadth of and/or compare related ideas. 

<ImgContainer padding="none" color="purple-mysticool-0" src="https://i.pinimg.com/originals/59/71/b1/5971b10d76fcabdd3b02817ae437a1a3.jpg" alt="Example of a fixed preview pins block in Card."/>

### Usage guidelines
<TwoCol>
  <Group>
    <Do title="When to use" />
      - To recommend a single landing experience containing related Pins (ex: topical Pin feed, more ideas for your board) to a user based on their engagement, interests, boards, demographic information, or other signals
  </Group>
  <Group>
  <Dont title="When not to use" />
    - To suggest Pins that are not related or within a defined grouping
    - When recommending more than one landing experience (ex: 2 or more topical Pin feeds)
    - When the goal is to direct Pinners to a specific place in a destination (ex: a slot position within a stream). 
  </Group>
</TwoCol>

### Best practices
<TwoCol>
  <Group>
    <Do title="Do" />
    All images whether 2up, 3up or 4up should be equal in size.
  </Group>
  <Group>
    <Do title="Do" />
    The entire Pins PreviewBlock is a single tap target that directs Pinners to a single destination.
  </Group>
  <Group>
    <Dont title="Don't" />
   Make each image its own tap target. The entire Pins PreviewBlock should be a single tap target.
  </Group>
</TwoCol>

### Accessibility

People use Apple and Android’s accessibility features, such as VoiceOver and TalkBack to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple and Android’s accessibility documentation for more information:

- [Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

- [Accessbile design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

### Anatomy
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76473%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>

### Variants

#### 3 up (default)
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76866%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>

#### 2 up
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19826%253A75261%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>

#### 4 up
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19826%253A75351%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>

### Dark mode 
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76589%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>

## Scrolling preview
Pins PreviewBlock with a scrolling preview communicates that each preview is an individual tap target that all lead to the same destination (ex: every preview takes you to a specific slot position within a stream). 

Use scrolling preview when the user goal is best supported by focusing them on one Pin at a time. 

<ImgContainer padding="none" color="purple-mysticool-0" src="https://i.pinimg.com/originals/1c/d6/d5/1cd6d59f83129699471438433f2c7a30.jpg" alt="Example of a boards block in Card."/>

### Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - To present multiple entry points into a single destination containing Pins (ex: stream)
      - When the user goal is best supported by focusing them on one Pin at a time (ex: watching videos in a related stream, evaluating Pins with a high intent mindset)
  </Group>
  <Group>
  <Dont title="When not to use" />
    - When each tap target leads to a different destination (ex: different streams)
    - When the goal is to direct Pinners to a landing experience that displays more than one Pin (ex: a topical Pin feed). 
  </Group>
</TwoCol>

### Best practices
<TwoCol>
  <Group>
    <Do title="Do" />
    Pin previews can flex to different common aspect ratios so that the best dimensions can be used to preview different media types
  </Group>
  <Group>
    <Do title="Do" />
    Pin previews can also flex to different sizes to support various levels of visual prominence. 
  </Group>
  <Group>
    <Do title="Do" />
    All images with the PreviewBlock should be equal in size.
  </Group>
  <Group>
    <Do title="Do" />
    Each preview within the PreviewBlock is a single tap target that all lead to the same destination.
  </Group>
  <Group>
    <Dont title="Don't" />
    Make the entire scrolling PreviewBlock a single tap target. Each Pin preview should be an individual tap target.
  </Group>
</TwoCol>

### Accessibility

People use Apple and Android’s accessibility features, such as VoiceOver and TalkBack to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple and Android’s accessibility documentation for more information:

- [Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

- [Accessbile design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

### Anatomy
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A79954%26t%3DWEMz4VEOS6WCU1tj-1" allowFullScreen></iframe>

### Variants
Pin previews can flex to different aspect ratios so that the best dimensions can be used to preview different media types. Pin previews can also flex to different sizes to support various levels of visual prominence. 

Below are some examples of how different aspect ratios and dimensions can be applied.

#### Aspect ratio=9:16, small previews 


#### Aspect ratio=2:3, large previews 


### Dark mode
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A80068%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>
