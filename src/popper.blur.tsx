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
          {({ ref, style, placement, scheduleUpdate, arrowProps }) => {
            this.setScheduleUpdate(scheduleUpdate);
            return (
              <div
                className="content"
                ref={ref}
                style={style}
                data-placement={placement}
                onClick={this.onPopperClick}
              >
                <ReactResizeDetector
                  handleHeight
                  handleWidth
                  onResize={this.onResize}
                  skipOnMount
                />
                {children}
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

  private onRef = (ref: HTMLElement | null) => {
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
