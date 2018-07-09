import * as React from "react";

import { Popper } from "react-popper";
import { default as ReactResizeDetector } from "react-resize-detector";

import * as classnames from "classnames";
import { PopperOptions } from "popper.js";

export interface PopperClickProps extends PopperOptions {
  className?: string;
  onDismiss: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export class PopperClick extends React.Component<PopperClickProps> {
  constructor(props: PopperClickProps) {
    super(props);
  }
  render() {
    let { children, className, onDismiss, ...popperProps } = this.props;
    return (
      <Popper>
        {({ ref, style, placement, arrowProps }) => (
          <span
            ref={ref}
            className={classnames(
              "sci-react-popover--popper",
              "click",
              className
            )}
            onClick={this.onPopperClick}
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

  private onPopperClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
  };

  private onBackgroundClick = (event: React.SyntheticEvent<HTMLElement>) => {
    if (!event.isDefaultPrevented()) {
      this.props.onDismiss(event);
    }
  };
}
