---
title: Gestalt 2023 Q2 newsletter
description: It was another big quarter for the Gestalt team with some big releases shipped and big milestones hit. Here are the major achievements for the quarter.
fullwidth: true
---

## Q2 highlight: H1 Gestalt survey results 
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/b1/ef/71/b1ef71194af84a86f9e16ffffabdcbef.jpg" alt="Illustration of a filled-out survey." />
<br />
We wanted to kick off our Q2 newsletter with our H1 2023 Design and Web engineering survey results as they’re a window into our goals for the second half of the year. 

### Overall sentiment
It was another good half for sentiment. We saw some healthy gains from design. We saw a noticeable drop in highest sentiment scores from engineers, but still maintained a pretty eye-popping 98% overall approval. 
<TwoCol>
<Group>
#### Design sentiment: 
<Datapoint size="lg" title="Positive responses" value="95.2%" trendValue={-0.2} trendAccessibilityLabel="Trending down" />
<Datapoint size="lg" title="Responses with highest score" value="47.6%" trendValue={24.9} trendAccessibilityLabel="Trending up" />
</Group>
<Group>
#### Engineering sentiment (core customers only): 
<Datapoint size="lg" title="Positive responses" value="98.1%" trendValue={1.9} trendAccessibilityLabel="Trending up" />
<Datapoint size="lg" title="Responses with highest score" value="53.9%" trendValue={-15.9} trendAccessibilityLabel="Trending down" />
</Group>
</TwoCol>

### Survey highlights
Documentation sentiment and Figma library ease of use were two big wins from this half. These touchpoints remain critical for us and we believe there's ample room for continued improvement.
<TwoCol>
<Group>
#### Overall documentation sentiment:
<Datapoint size="lg" title="Positive responses" value="93.3%" trendValue={8.1} trendAccessibilityLabel="Trending up" />
<Datapoint size="lg" title="Responses with highest score" value="58.4%" trendValue={8.9} trendAccessibilityLabel="Trending up" />
</Group>
<Group>
#### Figma library ease of use:
<Datapoint size="lg" title="Positive responses" value="95.2%" trendValue={8.9} trendAccessibilityLabel="Trending up" />
<Datapoint size="lg" title="Responses with highest score" value="42.9%" trendValue={29.3} trendAccessibilityLabel="Trending up" />
</Group>
</TwoCol>
### Survey lowlights
Engineering awareness of Gestalt updates is an area where we need to see significant improvement. Our goal for this year is 60% of engineers being aware of very aware of our updates. We plan to hit this hard in Q3. Velocity was another area that dipped a bit this half. We hit 100% of our core customers giving us a positive velocity score in H2 2022, so we could only go down from there. That said, a 15% drop of highest scores is something we'd like to resolve in the second half of the year.
<TwoCol>
<Group>
#### Engineering awareness of Gestalt updates
<Datapoint size="lg" title="Aware or very aware" value="47.8%" trendValue={1.9} trendAccessibilityLabel="Trending up" />
<Datapoint size="lg" title="Responses with highest score" value="2.9%" trendValue={-4.5} trendAccessibilityLabel="Trending down" />
</Group>
<Group>
#### Gestalt's impact on engineering velocity
<Datapoint size="lg" title="Positive responses" value="96.1%" trendValue={-3.9} trendAccessibilityLabel="Trending down" />
<Datapoint size="lg" title="Responses with highest score" value="51.0%" trendValue={-15.0} trendAccessibilityLabel="Trending down" />
</Group>
</TwoCol>

### We've made extraordinary progress

It’s important to remember where we started when Gestalt kicked off. The progress we’ve seen in sentiment and usage are staggering—especially when it comes to our customers in Design. While these are laudable numbers, there’s still plenty of ceiling between where we currently are and what our aspirations are. Ideally, we’d see highest sentiment in the 60-70% range, if not higher.

#### Overall engineering sentiment of Gestalt, 2020-2023
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/11/7a/27/117a279423b05654027a4fd1db09f0e4.jpg" alt="A graph of overall engineering sentiment of Gestalt from 2020 to 2023." />

#### Overall design sentiment of Gestalt, 2020-2023
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/58/ed/1e/58ed1e77b63962675f52649dd678526c.jpg" alt="A graph of overall design sentiment of Gestalt from 2020 to 2023." />

One other notable win has been the the continual increase in usage of our documentation by designers. For context, in H1 2020, we had 5 times the number of designers respond that they never went to our documentation than visited weekly. Now, we have 100% of designers responding that they use our docs at least monthly and over 70% visiting weekly. Our goal remains 80% of designers visiting weekly — we hope to crest that milestone in H2 of this year.

#### Designers' usage of Gestalt documentation, 2020-2023
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/a1/4e/c5/a14ec55ba4936a6d64e3fc9c2bb637c6.jpg" alt="A graph of designer usage of Gestalt documentation from 2020 to 2023." />

### What this means
On the surface there appears to be a correlation between our drop in highest-score engineering sentiment and highest-scores related to how fast it is to build UIs. We’d like to validate if these two scores are in fact related and, if so, what’s causing that. More importantly though, we are aiming for significant gains in engineering awareness. The team is looking into ways we can refine our comms to ensure we’re communicating in the right ways, in the right places at the right cadence. 

## Components and tokens

### Featured components: Mobile components
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/4b/9e/c1/4b9ec16874d4bff7900cbca64643cd11.jpg" alt="Illustration of mobile design system components." />
<br />
The Gestalt team partnered with the iOS and Android platform engineering teams to support the buildout and certification of 6 new Android Gestalt components [ButtonGroup](https://gestalt.pinterest.systems/android/buttongroup), [Icon](https://gestalt.pinterest.systems/android/icon), [IconButton](https://gestalt.pinterest.systems/android/iconbutton), [IconButtonFloating](https://gestalt.pinterest.systems/android/iconbuttonfloating), [SearchField](https://gestalt.pinterest.systems/android/searchfield), [Text](https://gestalt.pinterest.systems/android/text), [TextArea](https://gestalt.pinterest.systems/android/textarea) and [Toast](https://gestalt.pinterest.systems/android/toast) and 1 new iOS component, [Icon](https://gestalt.pinterest.systems/ios/icon).

Gestalt has lagged behind on coverage for Android and iOS code components the progress we’ve made this quarter represents another big step towards full Gestalt support for mobile experience.

Check out Gestalt's **[Android](https://gestalt.pinterest.systems/android/overview)** and **[iOS](https://gestalt.pinterest.systems/ios/overview)** components

<TwoCol>
<Group>
### SheetMobile
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/a7/20/99/a72099f4b0c0a017c39160de26c3c671.jpg" alt="An illustration of the SheetMobile component." />
<br />
Pinterest uses sheets extensively throughout its mobile experience. We are excited to now officially support this component in Gestalt Web. The component is still in its pilot phase, so expect more improvements and updates in the quarters to come.

This component represents a significant footprint in our mWeb experience and we expect it to dramatically speed up mWeb design/development moving forward.

**[Check out SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile)**
</Group>

<Group>
### mWeb-adaptive Dropdown
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/ee/7d/29/ee7d29c6b3b6064aed4d49df9e414f7b.jpg" alt="An illusteation of the Dropdown component in desktop and mobile versions." />
<br />
Related to SheetMobile is our new mWeb-adaptive Dropdown. This new feature enabled a mobile-centric view that displays its contents in [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile) on mobile devices and [Popover](https://gestalt.pinterest.systems/web/popover) on desktop devices.

Our mWeb-adaptive components (currently Modal and Dropdown) should make development much simpler as it removes the need to swap out components based on device type. This should simplify cross-device product development.

**[Read about Gestalt's mWeb-adaptive Dropdown](https://gestalt.pinterest.systems/web/dropdown#Mobile)**
</Group>
</TwoCol>

<TwoCol>
<Group>
### TileData & TagData
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/c7/3f/0f/c73f0f68c89528534a86c3206dc9a5b5.jpg" alt="An illustration of TileData and TagData Gestalt components." />
<br />
The Gestalt team is working hard to expand into data visualization support. In that spirit, we created two new components that will support data visualization experiences. 

TagData enables users to select multiple categories to compare with each other in a graph or chart while TileData allows users to select multiple categories to compare with each other in a graph or chart view.

These two components will besties with our upcoming data visualization components and should round out our offering in the space.

Go have a look at **[TagData](https://gestalt.pinterest.systems/web/tagdata)** and **[TileData](https://gestalt.pinterest.systems/web/tiledata)**
</Group>

<Group>
### Table enhancements
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/f2/78/b8/f278b85f28dc508d2b29b169d5465b28.jpg" alt="An illustration of Gestalt's Table component." />
<br />
Gestalt’s Table component needed some love. We made three notable updates to the component in this quarter.

* [Table.Row](https://gestalt.pinterest.systems/web/table#Table.Row) and related subcomponents gained two new props, hoverStyle and selected.
* Headers and footers now have a border, and Table.RowExpanded can be used in a controlled manner using the expanded prop.
* We also shipped a visual refinement to [Table's sticky footer](https://gestalt.pinterest.systems/web/table#Sticky-header-and-footer) to include a drop shadow for greater visual clarity.

These updates represent worthwhile quality-of-life improvements which should help improve the overall experience across business interfaces.

**[Visit Table](https://gestalt.pinterest.systems/web/table)**
</Group>
</TwoCol>
<TwoCol>
<Group>
### Official TypeScript support
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/e2/43/54/e243545276d26e3ecfd3682ffc013f9a.jpg" alt="An illustration of a browser window displaying the TypeScript logo." />
<br />
Gestalt now includes TypeScript declarations for `gestalt` and `gestalt-datepicker`! We added a types field to our package.json files, so that TypeScript projects can automatically find the declarations. While we don't have specific plans to migrate to TypeScript yet, this is a big step towards making TypeScript a first-class citizen in Gestalt.
</Group>
<Group></Group>
</TwoCol>


## Documentation
### Documentation experience improvements
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/f5/d0/39/f5d039508babbdbc9c9238c8246260a2.jpg" alt="An illustration of arrows pointing up and to the right along with a disco ball." />
<br />
We aim for Gestalt’s documentation to be world class. It’s getting there...

There have been some long-running experiential issues that we had been wanting to fix since forever. And Q3 was the quarter it happened. 

* First and foremost, we dramatically improved the relevancy of our docs search results. We’ve seen a 27% increase in total queries and 9% increase in total users performing a search. We plan to continue to refine our docs’ search to make it as easy as possible to find what you’re looking for.
* Our old code examples have been problematic—especially when it came to selecting text. We’ve been moving to a new solution for rendering code examples since 2022. We’re happy to announce that we’ve completed the migration for roughly 2/3 of all pages and plan to finish up the rest in Q3.
* Lastly, on the topic of code examples, our new code examples now support dark mode and RTL! So, come Q3, any example you look at in our docs will be viewable in dark mode and RTL languages. Huzzah!

These updates are critical as we aim to make Gestalt’s docs the go to destination for anyone developing an experience at Pinterest. As Gestalt usage continues to grow, we need our docs to carry an increasing load of questions and guidance. We’re confident that improving the docs experience plays a critical role in making that happen.
<TwoCol>
<Group>
### Data visualization guidelines
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/42/03/c5/4203c54eb682f8401458a5d8e189bc6e.jpg" alt="An illustration of a bar chart." />
<br />
Data visualizations are serious business and there are just so many ways to go astray. In the lead-up of our data visualization components, we’ve publishing guidelines that intend to provide guidance for everything you need to know to visualize data.

These guidelines represent the foundation we’ll build our actual components on. Once our data visualization components are shipped, designers and developers should have everything they need to visualize data!

**[Read Gestalt's data visualization guidelines](https://gestalt.pinterest.systems/foundations/data_visualization/overview)**
</Group>
<Group>
### Card / preview block guidelines
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/3a/45/d9/3a45d917d3591a7c9aed51120365a501.jpg" alt="An illustration of Gestalt's Card component." />
<br />
We wrapped up a big collaboration with the Browse team where we worked to unify the design and content of in-feed modules. This work resulted in finalized Card component/content designs along with [Card component guidelines](https://gestalt.pinterest.systems/ios/card/card) as well as guidelines for [Boards](https://gestalt.pinterest.systems/ios/card/card.boards) and [Pins](https://gestalt.pinterest.systems/ios/card/card.pins) preview blocks.

This work should enable a more unified and consistent experience when Pinners are presented with in-feed recommendations.

**[Read our Card component and content guidelines](https://gestalt.pinterest.systems/ios/card/card)**
</Group>
</TwoCol>


## Figma updates
<TwoCol>
<Group>
### Simplified components
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/c5/98/ea/c598ea9a28d03f18bc8ebc8d05e624f3.jpg" alt="An illustration of various boxes representing Figma layers pointing to an orderly Figma component." />
<br />
Our Figma component libraries got some big upgrades through our integration of Figma’s new simplified component instances and exposed nested instances. We’ve activated these features on the majority of components across Android, iOS and Web libraries. 

The updates should mean less drilling in, less fiddling and less hassle when using Gestalt’s Figma components.
</Group>

<Group>
### New mobile components
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/dc/ac/62/dcac6297f67155974b8ebbf0efa49fcf.jpg" alt="An illustration of our Card and ActionBar Figma components." />
<br />
We shipped three major mobile-specific components to our Figma libraries in Q2:

* ActionBar displays primary actions for content, such as a Pin in closeup view. It’s available for Android, iOS and Web Figma libraries.
* FeedCard is a specialized Pin created for marketing purposes within Masonry.
* UpsellOverlay displays short messages to encourage followup actions, such as a related pin tap or idea pin swipe. 

These components cover core elements of the Pinterest experience (e.g. ActionBar) as well as patterns to encourage engagement (e.g., FeedCard and UpsellOverlay). 
</Group>
</TwoCol>
<TwoCol>
<Group>
### Data visualization Figma components
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/64/54/1f/64541f9753925918f87c78a2afacbce3.jpg" alt="Illustrations of Gestalt's line and bar chart Figma components." />
<br />
In the run-up of our goal to deliver data visualization components for Web, we’ve published an initial version those very components in Figma. These components will help designers quickly mock up data viz experiences that will align with our code-backed components when they ship in H2. 
</Group>

<Group>
### Figma Pin component aspect ratios
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/cc/86/25/cc8625a784a6f8ceee7d0825ec350b41.jpg" alt="An illustration of various pins in a masonry layout." />
<br />
As the Pinterest Pin continues to evolve, so does our Figma Pin component. We added new aspect ratios to the Pin image element. Pins can now have landscape aspect ratios (16:9, 4:3 and 3:2) to go along with our traditional square and portrait formats.
</Group>
</TwoCol>

## What’s coming in H2 
We have a lot of big goals for H2, but the main theme is refinement. We’re devoting a large portion of our focus on up-leveling what’s currently in the system to be easier to use and higher quality. Our goal is to see increases in comprehension of our guidelines, higher usage of our docs and most critically, greater engineering awareness of Gestalt updates.

### Even more mobile components
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/0e/f2/68/0ef268316ce06da1db9d53fbcb86846f.jpg" alt="An illustration of various mobile UI components." />
<br />
While refinement is our primary focus, we have one exception which are mobile components. We need to aggressively expand the number of mobile components in H2 with 6 certified Android components and 15 iOS components!

### Data visualization components
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/a0/a8/3f/a0a83fd5dde78c5e3c1f40bdcde663f6.jpg" alt="An illustration of Gestalt's family of data visualization components." />
<br />
We had a bit of a false start in H1, but H2 is the half of data visualization components! We plan to ship our initial offering that should cover the main use cases we’re aware of. 
<TwoCol>
<Group>
### Density themes
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/2f/b8/f0/2fb8f0468bc6f74c50624a90bd18d52f.jpg" alt="An illustration of a component with different density themes applied." />
<br />
Gestalt's historical focus has been on the consumer experience, but we have spent the past few years continuing to expand our support into every facet of the product. We've built out numerous components to better support business experiences and we plan to give them all an upgrade by supporting density themes. Density theming will enable our components to be light and airy or dense and compact. 

This will make our entire system more custom tailored to the kind of experience you're making&mdash;be it a new feature for Pinners, a new workflow for businesses or even new functionality in an internal tool. Density themes will have you covered.
</Group>
<Group>
### Documentation refinements
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/f8/95/1e/f8951e4bd114ea64500a9079d8ef3dd1.jpg" alt="An illustration of a signpost." />
<br />
Our docs site has been and will continue to be a core part of Gestalt. We continue to make big gains in sentiment / usage, but there's still plenty of room for improvement. We heard your feedback and so we'll be focusing on improving the discoverability of components/guidelines, finalizing our refactor of code examples and refine our content to make reading our docs as smooth and enjoyable as possible.
</Group>
</TwoCol>
<TwoCol>
<Group>
### Improved Figma component discoverability
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/0c/64/66/0c64663d321165b530574b9fbb7ea7e5.jpg" alt="An illustration of a magnifying glass looking at a Figma component symbol." />
<br />
Designers, we heard your feedback and we know finding Gestalt Figma library components isn't always the easiest thing to do. We have big plans to improve this experience, if not fix it once and for all. We'll be making a major focus on improving our libraries' ease of use this upcoming half and we have high hopes for what we'll be able to deliver.
</Group>
<Group>
### Pinterest Figma plugin improvements 
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/1b/26/f4/1b26f4bddb0ae7d7d3b53a546399c233.jpg" alt="The logo of the Pinterest Design Figma plugin." />
<br />
Speaking of high hopes, we think our Pinterest Design Figma plugin can have a monumental impact on Pinterest's design _and engineering_ workflow. We will be shipping numerous improvements and new features to the plugin which should enable designers to work faster and remove much of the busywork from their day-to-day work. 
</Group>
</TwoCol>
