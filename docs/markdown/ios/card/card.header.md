---
title: Card.Header
description: Card.Header sits at the top, inside of the Card container. It is a required subcomponent that includes pre-text, a title, and navigational elements. The Card.Header should always, at the very least, include a title.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/11/90/6b/11906b1575ba50e08d48b8a0bf20e805.png" alt="Example of a Card.Header with a highlighted area to show how it is placed and arranged in a Card." noPadding color="background-elevation-accent"/>


## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
Show a navigational arrow or more menu within the Card.Header to direct the user to the appropriate additional content.

</Group>
<Group>
<Dont title="When not to use" />
Center Card.Header text. Card.Header content should always be start-aligned.
</Group>
</TwoCol>

## Best practices

<TwoCol>
<Group>
<Do title="Do"/>
- Keep Card content clear and concise. Cards are designed to focus on the imagery. Any content should be short and easily digestible.
- Include a “follow” button if the Card content pertains to a Pinner, company or brand within the product.
- Keep pre-text and Card.Header text to the defined font size.
</Group>

<Group>
<Dont title="Don't" />
- Use too much content and overload the Card. Consider if the content should live on the page instead.
- Truncate pre-text. Instead edit the content to be concise enough to fit on one line.
- Change the defined size of the pre-text or Card.Header text. These set sizes help users understand the content hierarchy within the Card.
</Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens

Use these tokens for applying size and color styles to Card.Header.

<br/>

<iframe style={{border:0}} width="100%" height="1178" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76057%26t%3D1Ezi4cadgSUNk2Ls-1" allowFullScreen></iframe>

## Anatomy

<iframe style={{border:0}} width="100%" height="312" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A75047%26t%3D1Ezi4cadgSUNk2Ls-1" allowFullScreen></iframe>

## Variants
### Default
The default Card.Header includes a Card.Header copy, optional pre-text and an optional timestamp.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/d1/3b/58/d13b580b43ae794af2b4e3fb2c2b364a.png" noPadding color="background-elevation-accent"alt="Example of a default Card.Header with pre-text, and heading."/>
<br/>
### Editorial
The editorial Card.Header is the same as the default Card.Header, the difference being that the Card.Header typography size is increased to draw greater focus.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/4a/6e/49/4a6e493e6dcf5ab5bc0098e316607432.png" noPadding color="background-elevation-accent" alt="Example of an editorial Card.Header with a large headline."/>/>
<br/>

### With image
The image variant of the Card.Header can contain a variety of image representations. The image can represent a Pin, a Product, an avatar & follow button or a topic.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/0c/f7/05/0cf7052f0f442094909beeefc6e80474.png" noPadding color="background-elevation-accent" alt="Example of a Card.Header with an image next to the pre-text and heading."/>
<br/>

## Dark mode
<iframe style={{border:0}} width="100%" height="312" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76366%26t%3DaliDwdC0C3b2VkAb-1" allowfullscreen></iframe>

## Writing

<TwoCol>
<Group>
<Do title="Do" />
Keep Card content clear and concise. Cards are designed to focus on the imagery. Any content in the Card.Header should be short and easily digestible.

</Group>

<Group>
<Dont title="Don't" />
Use too much content and overload Card.Header. Consider if the content should live on the page instead.

</Group>
</TwoCol>

For writing best practices, refer to the [Content standards](/foundations/content_standards/voice). 
