import * as React from "react";

import { Popper } from "react-popper";
import { default as ReactResizeDetector } from "react-resize-detector";

import * as classnames from "classnames";
import { PopperOptions } from "popper.js";

export interface PopperHoverProps extends PopperOptions {
  className?: string;
  onHoverChange: (isHovering: boolean) => void;
}

export interface PopperHoverState {
  isArrowHovering: boolean;
  isPopperHovering: boolean;
}

export class PopperHover extends React.Component<
  PopperHoverProps,
  PopperHoverState
> {
  constructor(props: PopperHoverProps) {
    super(props);
    this.state = {
      isArrowHovering: false,
      isPopperHovering: false
    };
  }

  render() {
    let { children, className, onHoverChange, ...popperProps } = this.props;
    return (
      <div
        className={classnames("sci-react-popover--popper", "hover", className)}
        onMouseOut={() => {
          this.onPopperHover(false);
        }}
        onMouseOver={() => {
          this.onPopperHover(true);
        }}
      >
        <Popper {...popperProps}>
          {({ ref, style, placement, arrowProps }) => (
            <div
              className="content"
              ref={ref}
              style={style}
              data-placement={placement}
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

  private onPopperHover(isHovering: boolean) {
    if (isHovering === this.state.isPopperHovering) {
      return;
    }

    this.setState(
      {
        isPopperHovering: isHovering
      },
      () => {
        this.props.onHoverChange(isHovering);
      }
    );
  }
}
