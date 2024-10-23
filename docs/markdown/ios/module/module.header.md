---
title: Module.Header
description: Module.Header sits at the top, inside of the Module container. It is a required subcomponent that includes pre-text, a title, and navigational elements. Module.Header should always, at the very least, include a title.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/11/90/6b/11906b1575ba50e08d48b8a0bf20e805.png" alt="Example of Module.Header with a highlighted area to show how it is placed and arranged in Module." noPadding color="background-elevation-accent"/>

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- As a required element at the top of Module, to display context, actions and sometimes navigation.

</Group>
<Group>
<Dont title="When not to use" />
- Should not be used on its own without a preview block.
- Should not be used below a preview block. Module.Header should always sit at the top of Module.
</Group>
</TwoCol>

## Best practices

<TwoCol>
<Group>
<Do title="Do"/>
- Show a navigational arrow or more menu within Module.Header to direct the user to the appropriate additional content
- Include a “follow” button if Module content pertains to a Pinner, company or brand within the product
</Group>

<Group>
<Dont title="Don't" />
- Center Module.Header text. Module.Header content should always be start-aligned.
- Use too much content and overload Module. Consider if the content should live on the page instead.
- Truncate pre-text. Instead edit the content to be concise enough to fit on one line.
- Change the defined size of the pre-text or Module.Header text. These set sizes help users understand the content hierarchy within Module.
</Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens

Use these tokens for applying size and color styles to Module.Header.

<br/>

<iframe style={{border:0}} width="100%" height="1178" src="https://embed.figma.com/design/8fiEKQVsofnGjzhxteLOyL/Module.iOS-docs-embeds?node-id=1-4275&embed-host=share" allowFullScreen></iframe>

## Anatomy

<iframe style={{border:0}} width="100%" height="312" src="https://embed.figma.com/design/8fiEKQVsofnGjzhxteLOyL/Module.iOS-docs-embeds?node-id=1-3451&embed-host=share" allowFullScreen></iframe>

## Variants

### Default

The default Module.Header includes copy, optional pre-text and an optional timestamp.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/d1/3b/58/d13b580b43ae794af2b4e3fb2c2b364a.png" noPadding color="background-elevation-accent"alt="Example of default Module.Header with pre-text, and heading."/>
<br/>

### Editorial

Editorial Module.Header is similar to the default Module.Header. The difference is that editorial Module.Header typography size is increased to draw greater focus.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/4a/6e/49/4a6e493e6dcf5ab5bc0098e316607432.png" noPadding color="background-elevation-accent" alt="Example of editorial Module.Header with a large headline."/>
<br/>

### With image

The image variant of Module.Header can contain a variety of image representations. The image can represent a Pin, a product, an avatar & follow button or a topic.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/0c/f7/05/0cf7052f0f442094909beeefc6e80474.png" noPadding color="background-elevation-accent" alt="Example of Module.Header with an image next to the pre-text and heading."/>
<br/>

## Dark mode

<iframe style={{border:0}} width="100%" height="312" src="https://embed.figma.com/design/8fiEKQVsofnGjzhxteLOyL/Module.iOS-docs-embeds?node-id=1-4051&embed-host=share" allowFullScreen></iframe>

## Writing

<TwoCol>
<Group>
<Do title="Do" />
Keep Module content clear and concise. Modules are designed to focus on the imagery. Any content in Module.Header should be short and easily digestible.

</Group>

<Group>
<Dont title="Don't" />
Use too much content and overload Module.Header. Consider if the content should live on the page instead.

</Group>
</TwoCol>

For writing best practices, refer to the [Content standards](/foundations/content_standards/voice).
