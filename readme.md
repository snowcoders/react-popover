# Deprecated

Though the concept is still useful, popper.js has new hook options that make implementing the scenarios in here much easier. I highly recommend looking at [their documentation](https://popper.js.org/docs/v2/modifiers/) directly

Wrapper around react-popper that handles ~95% of popper scenarios

[![npm (scoped)](https://img.shields.io/npm/v/@snowcoders/react-popover.svg)](https://www.npmjs.com/package/@snowcoders/react-popover)
[![CircleCI branch](https://img.shields.io/circleci/project/github/snowcoders/react-popover/master.svg)](https://circleci.com/gh/snowcoders/react-popover)

# Use it

`npm install --save @snowcoders/react-popover save-prefix "~"`

# Parent Library

This component is part of a larger components library, [react-ui-base](https://github.com/snowcoders/react-ui-base). The goal is to keep all the core logic and base css styles in a single location, that way building out new UI component libraries cheaper and faster (and less buggy).

We highly recommend visiting the react-ui-base repository to understand how to customize the css along with see examples.

You can also view all the components on our demo site https://snowcoders.github.io/react-ui-base/

# This component

~95% of popovers fall into a basic category of I have a target that opens a popover and I want a popover that dismisses after a user action. This library summarizes that logic by providing Target types and Popover types that are interchangable. Currently, the available types are

- Target
  - Click - Popover opens when the user clicks on the target
  - Hover - Popover opens when the user hovers on the target
- Popover
  - Click - Popover closes when the user clicks anything except the popover. This click is not sent to the document.
  - Blur - Popover closes when the user clicks anything except the popover. This click is sent to the document.
  - Hover - Popover closes when the user hovers off of the popover

# Basic usage

To see a live example, go to our demo site https://snowcoders.github.io/react-ui-base/

```
<Popover
  isOpen={false}
  popperContent={"I'm inside the popover"}
  popperOptions={{
      placement: "bottom"
  }}
  popperType={"hover"}
  targetContent={"I'm the target text"}
  targetType={"hover"}
/>
```
