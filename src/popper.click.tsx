import * as React from "react";

import {
  Arrow,
  Popper as SnowPopper,
  IPopperProps
} from "@snowcoders/react-popper";
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
      <span
        className={classnames("sci-react-popover--popper", "click", className)}
        onClick={this.onBackgroundClick}
      >
        <SnowPopper
          {...popperProps}
          positionFixed={popperProps.positionFixed || true}
          componentFactory={popperChildProps => {
            return (
              <span
                key="content"
                className="content"
                {...popperChildProps}
                onClick={this.onPopperClick}
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
                    <span {...arrowProps} className="popper__arrow" />
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

  private onPopperClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
  };

  private onBackgroundClick = (event: React.SyntheticEvent<HTMLElement>) => {
    if (!event.isDefaultPrevented()) {
      this.props.onDismiss(event);
    }
  };
}
