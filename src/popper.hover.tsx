import * as React from "react";

import {
  Arrow,
  Popper as SnowPopper,
  IPopperProps
} from "@snowcoders/react-popper";
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
      <span
        className={classnames("sci-react-popover--popper", "hover", className)}
      >
        <SnowPopper
          {...popperProps}
          componentFactory={popperChildProps => {
            return (
              <span
                key="content"
                {...popperChildProps}
                className="content"
                onMouseOver={() => {
                  this.onPopperHover(true);
                }}
                onMouseOut={() => {
                  this.onPopperHover(false);
                }}
              >
                {children}
                <ReactResizeDetector
                  handleWidth
                  handleHeight
                  skipOnMount
                  onResize={this.onResize}
                />
                <Arrow
                  key="arrow"
                  componentFactory={arrowProps => (
                    <span
                      {...arrowProps}
                      className="popper__arrow"
                      onMouseOver={() => {
                        this.onArrowHover(true);
                      }}
                      onMouseOut={() => {
                        this.onArrowHover(false);
                      }}
                    />
                  )}
                />
              </span>
            );
          }}
        />
      </span>
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

  private onArrowHover(isHovering: boolean) {
    if (isHovering === this.state.isArrowHovering) {
      return;
    }

    this.setState(
      {
        isArrowHovering: isHovering
      },
      () => {
        this.props.onHoverChange(isHovering);
      }
    );
  }
}
