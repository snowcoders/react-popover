### Unreleased

### 1.2.1

- Added Popover.update() to allow for force update after animations
- Fixed bug regarding stateless popover's not repositioning when reopened

### 1.2.0

- Added an isOpen prop to support a controlled component

### 1.1.4

- Reduced javascript output from ~20k to ~10k by moving to webpack
- Enabled resize listener for React 15

### 1.1.3

- Fixed initial position of popper
- Disabled resize listener for React 15 due to complaints of errors

### 1.1.0

- TargetClick no longer nests `sci-react-unstyled-button` in side of a span. Thanks Jason!
- Fixed Popper.Click not scrolling with page

### 1.0.0

- Changed dependencies from @snowcoders/react-popper to react-popper now that it's at 1.0.0
- TargetClick now nests the `sci-react-unstyled-button` within a `span`

### 0.5.1

- Added classname overrides for the target and popper to make customization easier

### 0.5.0

- Added peer-dependency to react-resize-detector to fix position on content size changes

### 0.4.5

- Fixed popper.blur to close if the target is clicked
- Added Open and Close methods on Popover

### 0.4.4

- Added popper.none that is only controled by the target

### 0.1.0

- Initial release!
