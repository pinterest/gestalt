---
title: Card
description: The Card is a semi-modular container used to house a header and a variant of the available preview blocks. Every card must have at least a title and a variant of a preview block.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/fb/df/a0/fbdfa01750ca4951fde9da763052c9de.png" alt="Example of a card container with an area to show where images are placed." noPadding color="background-secondary-base"/>


## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- Previewing information about recommended content (ex: pin feed, boards, profiles, topics, etc) that also serves as an entry point to a destination containing the content

</Group>
<Group>
<Dont title="When not to use" />
- The card does not link to a destination
- The information and content contained within the Card are not related
- The contents of the Card are not the approved subcomponents (i.e. CardHeader and PreviewBlock(s))
</Group>
</TwoCol>

## Best practices

<TwoCol>
<Group>
<Do title="Do"/>
Keep Card content clear and concise. Cards are designed to focus on the imagery. Any content should be short and easily digestible.

</Group>
<Group>
<Dont title="Don't" />
Use too much content and overload the Card. Consider if the content should live on the page instead.
</Group>

<Group>
<Do title="Do"/>
Use the built-in Card dimensions and appropriate spacing between Cards. This ensures consistency and a visual rhythm.

</Group>
<Group>
<Dont title="Don't" />
Resize the Card. It is designed to adapt to the full width of a mobile screen.
</Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

- When creating a tab order the Card, the header always comes before the preview block so screen-reader users get context before proceeding to the preview block alt tags.
- If the Card itself is selectable, do not put other links inside the Card.
- Avoid wrapping an entire Card in an anchor tag as this can be a difficult experience for a screen reader user. Instead, have a single anchor tag inside the Card, and have the tappable area of this anchor tag wrap the Card.

## Design tokens

Use these tokens for applying size and color styles to a Card.

<br/>

<iframe style={{border:0}} width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A74778%26t%3DpdcqbCwrqHzeYjtv-1" allowFullScreen></iframe>

## Anatomy

<iframe style={{border:0}} width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A74406%26t%3DpdcqbCwrqHzeYjtv-1" allowFullScreen></iframe>

### 1. Card
The Card is a container that holds the header and preview blocks by creating a consistent background and padding. The container uses the default background color and includes 8px padding on the left and right.

### 2. Header (subcomponent)
The header sits at the top, inside of the Card container. It is a required subcomponent that includes pre-text, a title and navigational elements. The header should always, at the very least, include a title.

### 3. Preview block (subcomponent)
The preview block is a container that sits below the Card’s header. It holds a number of visual preview variations of Pinterest content. As they are designed and unified, more preview block content types will become available. 

The current preview block content types are:
- Pin Feed (Montage)
- Scrolling Pins
- Boards

## Variants
The Card is a container that holds the header and preview blocks. The Card itself does not have any variants. However, the specs and dark mode are illustrated below.

<iframe style={{border:0}} width="100%" height="360" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A74630%26t%3DpdcqbCwrqHzeYjtv-1" allowFullScreen></iframe>

#### Dark mode

<iframe style={{border:0}} width="100%" height="360" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A74704%26t%3DpdcqbCwrqHzeYjtv-1" allowFullScreen></iframe>

## Writing

<TwoCol>
<Group>
<Do title="Do" />
- Keep the content concise. Convey the most important information about the card in a few words.
- Provide context to the user. The user should know what they can expect to find within the card by reading the header and pretext.

</Group>

<Group>
<Dont title="Don't" />
- Use jargon or technical terms that may not be familiar to users. 
- Use pre-text as helper text. It should give additional context, but should not be an in-depth explanation of the Card's context.

</Group>
</TwoCol>

## Localization
Be sure to localize text. Note that localization can lengthen text by 20 to 30 percent. 

When in RTL mode, the Card layout will be arranged from right to left. This means that navigation, menus and content will be mirrored to maintain consistency.
<br/>

<ImgContainer src="https://i.pinimg.com/originals/72/5b/a2/725ba2ed0fb57e5b7ae9aded6a4c4bf7.png" alt="A card with header, menus and image conntent flipped for RTL languages." noPadding color="background-secondary-base" />
