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
      <div
        className={classnames("sci-react-popover--popper", "click", className)}
        onClick={this.onBackgroundClick}
      >
        <Popper {...popperProps}>
          {({ ref, style, placement, arrowProps }) => (
            <div
              className="content"
              ref={ref}
              style={style}
              data-placement={placement}
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
            </div>
          )}
        </Popper>
      </div>
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
