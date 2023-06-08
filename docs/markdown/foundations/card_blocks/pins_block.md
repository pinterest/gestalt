---
title: Pins block
description: Pins PreviewBlock with a scrolling preview communicates that each preview is an individual tap target that all lead to the same destination (example&colon; every preview takes you to a specific slot position within a stream). Use scrolling preview when the user goal is best supported by focusing them on one Pin at a time. 
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
      - To present multiple entry points into a single destination containing Pins (ex: stream)
      - When the user goal is best supported by focusing them on one Pin at a time (ex: watching videos in a related stream, evaluating Pins with a high intent mindset)
  </Group>
  <Group>
  <Dont title="When not to use" />
    - When each tap target leads to a different destination (ex: different streams)
    - When the goal is to direct Pinners to a landing experience that displays more than one Pin (ex: a topical Pin feed). 
  </Group>
</TwoCol>

## Best practices
- Always show two boards or sections per card. More or less than two will display inconsistently within the card. 
- Use any variations of the Board & Section component besides CTAs. Board CTAs can interfere with the selection of the card itself. 
For general [Component] best practices, refer to the [Board & Section documentation]().

## Accessibility

People use Apple and Android’s accessibility features, such as VoiceOver and TalkBack to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple and Android’s accessibility documentation for more information:

- [Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

- [Accessbile design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Anatomy
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A78454%26t%3DWEMz4VEOS6WCU1tj-1" allowFullScreen></iframe>

## Variants
The boards preview block utilizes the Gestalt Board & Section Figma component. The board preview block accepts all of Board & Sections variants except for CTAs. Optional elements include: lock icon, plus icon, pretext, board name, collaborators, and subtext.

## Dark mode
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A78570%26t%3DWEMz4VEOS6WCU1tj-1" allowFullScreen></iframe>

## Scrolling
The Board Preview Block is able to be scrolled. The default view is two boards with an indicator and directional arrows.
<iframe style={{border:0}} width="100%" height="400" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D22128%253A76406%26t%3DkdLCWeBuZmXBXYXe-1" allowFullScreen></iframe>
