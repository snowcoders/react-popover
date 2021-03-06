import * as React from "react";

import { Popper } from "react-popper";
import { default as ReactResizeDetector } from "react-resize-detector";

import * as classnames from "classnames";
import { PopperOptions } from "popper.js";

export interface PopperClickProps extends PopperOptions {
  className?: string;
  onDismiss: (event: React.SyntheticEvent<HTMLElement>) => void;
  setScheduleUpdate?: (scheduleUpdate: () => void) => void;
}

export class PopperClick extends React.Component<PopperClickProps> {
  private scheduleUpdate: null | (() => void);

  constructor(props: PopperClickProps) {
    super(props);
  }

  render() {
    let {
      children,
      className,
      onDismiss,
      setScheduleUpdate,
      ...popperProps
    } = this.props;
    return (
      <div
        className={classnames("sci-react-popover--popper", "click", className)}
        onClick={this.onBackgroundClick}
      >
        <Popper positionFixed={true} {...popperProps}>
          {({ arrowProps, placement, ref, scheduleUpdate, style }) => {
            this.setScheduleUpdate(scheduleUpdate);
            return (
              <div
                className="content"
                data-placement={placement}
                onClick={this.onPopperClick}
                ref={ref}
                style={style}
              >
                <ReactResizeDetector
                  handleHeight
                  handleWidth
                  onResize={this.onResize}
                  skipOnMount
                />
                {children}
                <span
                  className="popper__arrow"
                  ref={arrowProps.ref}
                  style={arrowProps.style}
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

  private onResize = () => {
    if (this.scheduleUpdate) {
      this.scheduleUpdate();
    }
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
