---
title: SearchGuide
description: SearchGuide appends and refines a search query. They appear under [SearchField](/android/searchfield) after user submits a search input.
fullwidth: true
---

<ImgContainer src="https://www.pinterest-assets.com/AssetLink/6cqbx311pg433xk57bo866233s36gn13/header-searchguide-and-png.png" alt="An example of a default search guide stream."/>

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use" />
- To refine the original search query with more accurate and targeted keywords

</Group>
<Group>
<Dont title="When not to use" />
- To recommend related content or descriptions. Use [Tag](/web/tag) instead
- To switch between different, yet related views. Use [Tabs](/android/tabs) instead
- To start a new search based solely on the content of the SearchGuide
</Group>
</TwoCol>

## Best practices

- SearchGuides are serial and appear in multiples. When a query doesn’t produce enough guides of sufficient quality, they shouldn’t be shown
- Limit the number of SearchGuides to 9 per search query. If there are fewer SearchGuides present for a given query, then by default we show that number. Limiting vertical scrolling helps to enhance the user experience by reducing the effort required to navigate and locate content

<TwoCol>
  <Group>
    <ImgContainer src="https://www.pinterest-assets.com/AssetLink/p46o0t3c13c602jmda1218lv28sys6x7/do-1-and-png.png" alt="example of Search Guides placed correctly."/>
    <Do title="Do" />
    Place SearchGuides at the start of the screen, and scroll horizontally to reveal additional guides. **Note:** be aware that off-screen guides have significantly lower engagement.
  </Group>
  <Group>
    <ImgContainer src="https://www.pinterest-assets.com/AssetLink/m78qu55yf6c557j47y26047u730nq40x/dont-1-and-png.png" alt="example of Search Guides being truncated."/>
    <Dont title="Don't" />
    Truncate search queries to fit within a viewport.
  </Group>
</TwoCol>

## Accessibility

- Ensure that each SearchGuide uses the correct markup for lists. Typically screen readers announce the number of items in a list and announce each item.
- Limit the number of SearchGuides to 9 per search query. Horizontal scrolling can be challenging to users with mobility issues, or users of assistive devices such as screen readers.
- Include descriptive alt text for icons and labels that convey the purpose of each item.
- SearchGuide uses color tokens dynamically generated from the 300-value and below from the [extended color palette](/foundations/color/palette#Extended-palette). These values ensure SearchGuide has minimum contrast requirements met. 

People use Android's accessibility features, such as TalkBack and dynamic text sizing, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:
- [Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility/)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens
<iframe style={{border:0}} width="100%" height="692" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D67823%253A245%26mode%3Ddesign%26t%3DqIclde6IgavzyBJ0-1" allowFullScreen></iframe>

## Anatomy

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D68089%253A419%26mode%3Ddesign%26t%3DYy6uGJnYxG1cVxAv-1" allowFullScreen></iframe>
**Default:** 1. Container | 2. Text | 3. Trailing icon
</Group>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D68089%253A420%26mode%3Ddesign%26t%3DYy6uGJnYxG1cVxAv-1" allowFullScreen></iframe>
**Guide with image:** 1. Pin image | 2. Text
</Group>
</TwoCol>

## Variants

### Default

<Group>

<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D68089%253A417%26mode%3Ddesign%26t%3DYy6uGJnYxG1cVxAv-1" allowFullScreen></iframe>
The default SearchGuide item displays a label only.
</Group>

### With an image

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D68089%253A416%26mode%3Ddesign%26t%3DYy6uGJnYxG1cVxAv-1" allowFullScreen></iframe>
When SearchGuide query is more precise, a Pin representation can be added to illustrate the results.
</Group>

### Expandable

<Group>
<iframe style={{border:0}} width="100%" height="350" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D74445%253A2614%26mode%3Ddesign%26t%3DHpnrn5EmkNNP29pU-1" allowFullScreen></iframe>
When a SearchGuide query is broad and can be further refined (example: Season), an **arrow-down** icon can be added at the end, to trigger a Sheet with a cluster of wrapped SearchGuides.
</Group>

## Writing 

- Use short, meaningful labels that succinctly describe the search queries
- Use the variants available as a guide to determine how specific the search query append should be
