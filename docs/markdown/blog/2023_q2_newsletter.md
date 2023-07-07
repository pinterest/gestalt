---
title: Gestalt 2023 Q2 newsletter
description: TBD
fullwidth: true
---

## Q2 highlight: Pinterest content standards
<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />
<br />
We wanted to kick off our Q2 newsletter with our H1 2023 Design and Web engineering survey results as they’re a window into our goals for the second half of the year. 

### Survey highlights

<TwoCol>
<Group>
#### Design sentiment: 

* Positive responses: 95.2% (-0.2%)  
* % of responses with highest score: 47.6% (+24.9%)
</Group>
<Group>
#### Engineering sentiment (core customers only): 

* Positive responses: 98.1% (+1.9%)
* % of responses with highest score: 53.9% (-15.9%)
</Group>
</TwoCol>
<TwoCol>
<Group>
#### Overall documentation sentiment:

* Positive responses: 93.3% (+8.1%)
* % of responses with highest score: 58.4% (+8.9%)
</Group>
<Group>
#### Figma library ease of use:

* Positive responses: 95.2% (+8.9%)
* % of responses with highest score: 42.9% (+29.3%)
</Group>
</TwoCol>
### Survey lowlights
<TwoCol>
<Group>
#### Engineering awareness of Gestalt updates

* Aware or very aware: 47.8% (+1.9%)
* % of responses with highest score: 2.9% (-4.5%)
</Group>
<Group>
#### Gestalt's impact on engineering velocity

* Positive responses: 96.1% (-3.9%)
* % of responses with highest score: 51.0% (-15.0%)
</Group>
</TwoCol>

### We've made extraordinary progress

It’s important to remember where we started when Gestalt kicked off. The progress we’ve seen in sentiment and usage are staggering—especially when it comes to our customers in Design. While these are laudable numbers, there’s still plenty of ceiling between where we currently are and what our aspirations are. Ideally, we’d see highest sentiment in the 60-70% range, if not higher.

<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />

<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />

One other notable win has been the the continual increase in usage of our documentation by designers. For context, in H1 2020, we had 5 times the number of designers respond that they never went to our documentation than visited weekly. Now, we have 100% of designers responding that they use our docs at least monthly and over 70% visiting weekly. Our goal remains 80% of designers visiting weekly — we hope to crest that milestone in H2 of this year.

<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />

### What this means
On the surface there appears to be a correlation between our drop in highest-score engineering sentiment and highest-scores related to how fast it is to build UIs. We’d like to validate if these two scores are in fact related and, if so, what’s causing that. More importantly though, we are aiming for significant gains in engineering awareness. The team is looking into ways we can refine our comms to ensure we’re communicating in the right ways, in the right places at the right cadence. 

## Components and tokens

### Featured components: Mobile components
<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />
<br />
The Gestalt team partnered with the iOS and Android platform engineering teams to support the buildout and certification of 6 new Android Gestalt components ButtonGroup, Icon,  IconButton, IconButtonFloating, SearchField, Text, TextArea and Toast and 1 new iOS component, Icon.

Gestalt has lagged behind on coverage for Android and iOS code components the progress we’ve made this quarter represents another big step towards full Gestalt support for mobile experience.

Gestalt Android components  Gestalt iOS components

<TwoCol>
<Group>
### SheetMobile
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Pinterest uses sheets extensively throughout its mobile experience. We are excited to now officially support this component in Gestalt Web. The component is still in its pilot phase, so expect more improvements and updates in the quarters to come.

This component represents a significant footprint in our mWeb experience and we expect it to dramatically speed up mWeb design/development moving forward.

Check out SheetMobile
</Group>

<Group>
### mWeb-adaptive Dropdown
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Related to SheetMobile is our new mWeb-adaptive Dropdown. This new feature enabled a mobile-centric view that displays its contents in SheetMobile on mobile devices and Popover on desktop devices.

Our mWeb-adaptive components (currently Modal and Dropdown) should make development much simpler as it removes the need to swap out components based on device type. This should simplify cross-device product development.

Go read about mWeb-adaptive Dropdown
</Group>
</TwoCol>

<TwoCol>
<Group>
### TileData & TagData
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
The Gestalt team is working hard to expand into data visualization support. In that spirit, we created two new components that will support data visualization experiences. 

TagData enables users to select multiple categories to compare with each other in a graph or chart while TileData allows users to select multiple categories to compare with each other in a graph or chart view.

These two components will besties with our upcoming data visualization components and should round out our offering in the space.

Go have a look at TagData and TileData
</Group>

<Group>
### Table enhancements
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Gestalt’s Table component needed some love. We made three notable updates to the component in this quarter.

* Table.Row and related subcomponents gained two new props, hoverStyle and selected.
* Headers and footers now have a border, and Table.RowExpanded can be used in a controlled manner using the expanded prop.
* We also shipped a visual refinement to Table's sticky footer to include a drop shadow for greater visual clarity.

These updates represent worthwhile quality-of-life improvements which should help improve the overall experience across business interfaces.

Visit Table
</Group>
</TwoCol>


## Documentation
### Documentation experience improvements
<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />
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
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Data visualizations are serious business and there are just so many ways to go astray. In the lead-up of our data visualization components, we’ve publishing guidelines that intend to provide guidance for everything you need to know to visualize data.

These guidelines represent the foundation we’ll build our actual components on. Once our data visualization components are shipped, designers and developers should have everything they need to visualize data!

Read Gestalt's data visualization guidelines
</Group>
<Group>
### Card / preview block guidelines
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
We wrapped up a big collaboration with the Browse team where we worked to unify the design and content of in-feed modules. This work resulted in finalized Card component/content designs along with Card component guidelines as well as guidelines for Boards and Pins preview blocks.

This work should enable a more unified and consistent experience when Pinners are presented with in-feed recommendations.

Card component and content guidelines
</Group>

</TwoCol>


## Figma updates
<TwoCol>
<Group>
### Simplified components
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Our Figma component libraries got some big upgrades through our integration of Figma’s new simplified component instances and exposed nested instances. We’ve activated these features on the majority of components across Android, iOS and Web libraries. 

The updates should mean less drilling in, less fiddling and less hassle when using Gestalt’s Figma components.
</Group>

<Group>
### New mobile components
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
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
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
In the run-up of our goal to deliver data visualization components for Web, we’ve published an initial version those very components in Figma. These components will help designers quickly mock up data viz experiences that will align with our code-backed components when they ship in H2. 
</Group>

<Group>
### Figma Pin component aspect ratios
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
As the Pinterest Pin continues to evolve, so does our Figma Pin component. We added new aspect ratios to the Pin image element. Pins can now have landscape aspect ratios (16:9, 4:3 and 3:2) to go along with our traditional square and portrait formats.
</Group>
</TwoCol>

## What’s coming in H2 
We have a lot of big goals for H2, but the main theme is refinement. We’re devoting a large portion of our focus on up-leveling what’s currently in the system to be easier to use and higher quality. Our goal is to see increases in comprehension of our guidelines, higher usage of our docs and most critically, greater engineering awareness of Gestalt updates.

### Even more mobile components
<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />
<br />
While refinement is our primary focus, we have one exception which are mobile components. We need to aggressively expand the number of mobile components in H2 with 6 certified Android components and [ARE WE ABSOLUTELY SURE WE’RE CERTIFYING 20 IOS COMPONENTS]?

### Data visualization components
<ImgHero width={1050} height={590} src="https://github.com/pinterest/gestalt/assets/50343812/2fc6d062-7f9f-446f-9939-a3f14e80e816" alt="TBD" />
<br />
We had a bit of a false start in H1, but H2 is the half of data visualization components! We plan to ship our initial offering that should cover the main use cases we’re aware of. 
<TwoCol>
<Group>
### Density themes
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Gestalt's historical focus has been on the consumer experience, but we have spent the past few years continuing to expand our support into every facet of the product. We've built out numerous components to better support business experiences and we plan to give them all an upgrade by supporting density themes. Density theming will enable our components to be light and airy or dense and compact. 

This will make our entire system more custom tailored to the kind of experience you're making&mdash;be it a new feature for Pinners, a new workflow for businesses or even new functionality in an internal tool. Density themes will have you covered.
</Group>
<Group>
### Documentation refinements
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Our docs site has been and will continue to be a core part of Gestalt. We continue to make big gains in sentiment / usage, but there's still plenty of room for improvement. We heard your feedback and so we'll be focusing on improving the discoverability of components/guidelines, finalizing our refactor of code examples and refine our content to make reading our docs as smooth and enjoyable as possible.
</Group>
</TwoCol>
<TwoCol>
<Group>
### Improved Figma component discoverability
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Designers, we heard your feedback and we know finding Gestalt Figma library components isn't always the easiest thing to do. We have big plans to improve this experience, if not fix it once and for all. We'll be making a major focus on improving our libraries' ease of use this upcoming half and we have high hopes for what we'll be able to deliver.
</Group>
<Group>
### Pinterest Design Figma plugin improvements 
<ImgHero width={525} height={350} src="https://github.com/pinterest/gestalt/assets/50343812/c807df8e-aec5-4858-9e79-42ec6972feeb" alt="TBD" />
<br />
Speaking of high hopes, we think our Pinterest Design Figma plugin can have a monumental impact on Pinterest's design _and engineering_ workflow. We will be shipping numerous improvements and new features to the plugin which should enable designers to work faster and remove much of the busywork from their day-to-day work. 
</Group>
</TwoCol>
