---
title: SearchGuide
description: SearchGuide appends and refines a search query. They appear under [SearchField](/ios/searchfield) after user submits a search input.
fullwidth: true
---

<ImgContainer src="https://www.pinterest-assets.com/AssetLink/n75058ig5q71uy78ohiaa8d2n1n3u1qs/header-searchguide-ios-png.png" alt="An example of a default search guide stream."/>

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- To refine the original search query with more accurate and targeted keywords

</Group>
<Group>
<Dont title="When not to use" />
- To recommend related content or descriptions. Use [Tag](/web/tag) instead
- To switch between different, yet related views. Use [Tabs](/ios/tabs) instead
- To start a new search based solely on the content of the SearchGuide
</Group>
</TwoCol>

## Best practices

- SearchGuides are serial and appear in multiples. When a query doesn’t produce enough guides of sufficient quality, they shouldn’t be shown
- Limit the number of SearchGuides to 9 per search query. If there are fewer SearchGuides present for a given query, then by default we show that number. Limiting vertical scrolling helps to enhance the user experience by reducing the effort required to navigate and locate content

<TwoCol>
  <Group>
    <ImgContainer src="https://www.pinterest-assets.com/AssetLink/64atu6q510hpmp881w47070882mhx428/do-1-ios-png.png" alt="example of Search Guides placed correctly."/>
    <Do title="Do" />
    Place SearchGuides at the start of the screen, and scroll horizontally to reveal additional guides. **Note:** be aware that off-screen guides have significantly lower engagement.
  </Group>
  <Group>
    <ImgContainer src="https://www.pinterest-assets.com/AssetLink/7ccp33fiq8205hsi1dq43s0fg8tp3tjr/dont-1-ios-png.png" alt="example of Search Guides being truncated."/>
    <Dont title="Don't" />
    Truncate search queries to fit within a viewport.
  </Group>
</TwoCol>

## Accessibility

- Ensure that each SearchGuide uses the correct markup for lists. Typically screen readers announce the number of items in a list and announce each item.
- Limit the number of SearchGuides to 9 per search query. Horizontal scrolling can be challenging to users with mobility issues, or users of assistive devices such as screen readers.
- Include descriptive alt text for icons and labels that convey the purpose of each item.
- SearchGuide uses color tokens dynamically generated from the 300-value and below from the [extended color palette](/foundations/color/palette#Extended-palette). These values ensure SearchGuide has minimum contrast requirements met. 


People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:
- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Accessible development on iOS](https://developer.apple.com/accessibility/)

## Design tokens
<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D56632%253A229%26mode%3Ddesign%26t%3DIjvWLl82iPSTkkof-1" allowFullScreen></iframe>

## Anatomy

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D56632%253A1148%26mode%3Ddesign%26t%3DIjvWLl82iPSTkkof-1" allowFullScreen></iframe>
**Default:** 1. Container | 2. Text | 3. Trailing icon
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D56632%253A1149%26mode%3Ddesign%26t%3DIjvWLl82iPSTkkof-1" allowFullScreen></iframe>
**Guide with image:** 1. Pin image | 2. Text
</Group>
</TwoCol>

## Variants

### Default

<Group>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D56632%253A2350%26mode%3Ddesign%26t%3DIjvWLl82iPSTkkof-1" allowFullScreen></iframe>
The default SearchGuide item displays a label only.
</Group>

### With an image

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D56632%253A2379%26mode%3Ddesign%26t%3DIjvWLl82iPSTkkof-1" allowFullScreen></iframe>
When SearchGuide query is more precise, a Pin representation can be added to illustrate the results.
</Group>

### Expandable

<Group>
<iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D56632%253A1388%26mode%3Ddesign%26t%3DIjvWLl82iPSTkkof-1" allowFullScreen></iframe>
When a SearchGuide query is broad and can be further refined (example: Season), an **arrow-down** icon can be added at the end, to trigger a Sheet with a cluster of wrapped SearchGuides.
</Group>

## Writing 

- Use short, meaningful labels that succinctly describe the search queries
- Use the variants available as a guide to determine how specific the search query append should be
