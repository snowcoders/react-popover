import * as React from "react";

import { Popper } from "react-popper";
import { default as ReactResizeDetector } from "react-resize-detector";

import * as classnames from "classnames";
import { PopperOptions } from "popper.js";

export interface PopperBlurProps extends PopperOptions {
  className?: string;
  onDismiss: (event: MouseEvent) => void;
  setScheduleUpdate?: (scheduleUpdate: () => void) => void;
}

export class PopperBlur extends React.Component<PopperBlurProps> {
  private contentRef: null | HTMLElement;
  private scheduleUpdate: null | (() => void);

  constructor(props: PopperBlurProps) {
    super(props);
    this.contentRef = null;
    this.scheduleUpdate = null;
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.onDocumentMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onDocumentMouseDown);
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
        className={classnames("sci-react-popover--popper", "blur", className)}
        ref={this.onRef}
      >
        <Popper {...popperProps}>
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

  private onRef = (ref: null | HTMLElement) => {
    this.contentRef = ref;
  };

  private onResize = () => {
    if (this.scheduleUpdate) {
      this.scheduleUpdate();
    }
  };

  private onDocumentMouseDown = (event: MouseEvent) => {
    if (this.contentRef == null) {
      return;
    }

    if (event.srcElement == null) {
      return;
    }

    let isPopperOrChild = false;
    let parent: any = event.srcElement;
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
