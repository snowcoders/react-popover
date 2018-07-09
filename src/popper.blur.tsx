import * as React from "react";

import { Popper } from "react-popper";
import { default as ReactResizeDetector } from "react-resize-detector";

import * as classnames from "classnames";
import { PopperOptions } from "popper.js";

export interface PopperBlurProps extends PopperOptions {
  className?: string;
  onDismiss: (event: MouseEvent) => void;
}

export class PopperBlur extends React.Component<PopperBlurProps> {
  private contentRef: null | HTMLElement;

  constructor(props: PopperBlurProps) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.onDocumentMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onDocumentMouseDown);
  }

  render() {
    let { children, className, onDismiss, ...popperProps } = this.props;
    return (
      <Popper>
        {({ ref, style, placement, arrowProps }) => (
          <span
            className={classnames(
              "sci-react-popover--popper",
              "blur",
              className
            )}
            onClick={this.onPopperClick}
            ref={newRef => {
              ref(newRef);
              this.contentRef = newRef;
            }}
          >
            {children}
            <ReactResizeDetector
              handleWidth
              handleHeight
              skipOnMount
              onResize={this.onResize}
            />
            <span
              ref={arrowProps.ref}
              style={arrowProps.style}
              className="popper__arrow"
            />
          </span>
        )}
      </Popper>
    );
  }

  private onResize = () => {
    this.forceUpdate();
  };

  private onDocumentMouseDown = (event: MouseEvent) => {
    if (this.contentRef == null) {
      return;
    }

    if (event.srcElement == null) {
      return;
    }

    let isPopperOrChild = false;
    let parent: Element | null = event.srcElement;
    while (parent != null) {
      if (this.contentRef == parent) {
        isPopperOrChild = true;
        break;
      }
      parent = parent.parentElement;
    }

    if (!isPopperOrChild) {
      this.props.onDismiss(event);
    }
  };

  private onPopperClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
  };
}
