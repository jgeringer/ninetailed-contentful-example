# Ninetailed Demo

## What is Ninetailed?
It allows dynamic personalization and experimentation content across the site. For personalized content, you can show personal content to the user based on criteria like location, past behavior and other traits. For experimentations, you can create A/B Testing to optimize user journeys.


### Ninetailed Setup
To use it, you have to…
1. Create a Ninetailed account: https://app.ninetailed.io/joegeringer/main/content-sources
2. Point to your Contentful space. 
3. Install their Contentful App
4. Enable any models you want it to work with in their App 
5. Apply code updates:
    1. Install ninetailed packages
    2. Add ninetailed provider wrapper component. Wrap each component (ex: Hero) in a Ninetailed Experience component.

After this is setup, there should really be no work that needs to be done if new components are added, except for enabling them in the Nintailed app.


After installing the Ninetailed app, it creates three new content types:
1. Ninetailed Audience
    A group of people identified by a set of rules. Ex: European users. You can apply audiences to personalizations and experiments.
2. Ninetailed Experience
    Where you create a personalization or experiment.
3. Ninetailed Merge Tag
    Dynamic placeholder content. For example, you would use a merge tag for inserting a users name, country, etc inside of a piece of content.


## Demo:

Source code taken from
https://github.com/ninetailed-inc/ninetailed-examples/tree/main


### Demo:
- Open the home page: http://localhost:3000/
- Open the preview pane
- Open "New Visitors", toggle variants.
- Open "North America" users.

### Show it in Contentful
- Inspect the "New Visitors" Experiment.
- Go to home page in Contentful
- Click on the banner
- Go to the New Visitors AB one at the bottom.
- Can add percentages
- Open the "New Visitors" Audience
- Create > Rules


### How does this work in Code?
In the Layout file, wrap all content in a custom Ninetailed provider. This way you have reference to all of the ninetailed data from Contentful available to all child components. We pass in the preview object to enable preview mode in the browser.

For each block on the page, we send it's data to the Experience component, provided by Ninetailed.

### Experience Data
Go to this to see the JSON of the page using Thunder Client...
http://localhost:3000/api/page?slug=test-page


### Create a test component that shows different for desktop vs mobile:
- Create a Test Page
- Add a CTA
- Create New Audience: Mobile Users
- Variant: Dup entry
- View test-page
- Show the Personalization Preview pane.
- Look at nt_experiences data: http://localhost:3000/api/page?slug=test-page 

- Show the New Visitor banner


## Alternatives:
Optimizely


## Terms
#### Holdout: 
10% means that 90% of visitors see the personalized content, and 10% will see the non-personalized version. The holdout is the control group.




