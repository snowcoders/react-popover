import * as React from "react";

import { Popper } from "react-popper";
import { default as ReactResizeDetector } from "react-resize-detector";

import * as classnames from "classnames";
import { PopperOptions } from "popper.js";

export interface PopperHoverProps extends PopperOptions {
  className?: string;
  onHoverChange: (isHovering: boolean) => void;
  setScheduleUpdate?: (scheduleUpdate: () => void) => void;
}

export interface PopperHoverState {
  isArrowHovering: boolean;
  isPopperHovering: boolean;
}

export class PopperHover extends React.Component<
  PopperHoverProps,
  PopperHoverState
> {
  private scheduleUpdate: null | (() => void);

  constructor(props: PopperHoverProps) {
    super(props);
    this.state = {
      isArrowHovering: false,
      isPopperHovering: false
    };
  }

  render() {
    let {
      children,
      className,
      onHoverChange,
      setScheduleUpdate,
      ...popperProps
    } = this.props;
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
          {({ ref, style, placement, scheduleUpdate, arrowProps }) => {
            this.setScheduleUpdate(scheduleUpdate);
            return (
              <div
                className="content"
                ref={ref}
                style={style}
                data-placement={placement}
              >
                {this.renderChildren()}
                <span
                  ref={arrowProps.ref}
                  style={arrowProps.style}
                  className="popper__arrow"
                />
              </div>
            );
          }}
        </Popper>
      </div>
    );
  }

  setScheduleUpdate = (scheduleUpdate: () => void) => {
    const { setScheduleUpdate } = this.props;
    this.scheduleUpdate = scheduleUpdate;
    if (setScheduleUpdate) {
      setScheduleUpdate(scheduleUpdate);
    }
  };

  private renderChildren() {
    const { children } = this.props;
    if (React.version.indexOf("15.") === 0) {
      return children;
    } else {
      return (
        <ReactResizeDetector
          handleHeight
          handleWidth
          onResize={this.onResize}
          skipOnMount
        >
          {children}
        </ReactResizeDetector>
      );
    }
  }

  private onResize = () => {
    if (this.scheduleUpdate) {
      this.scheduleUpdate();
    }
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
