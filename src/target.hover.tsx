import * as React from "react";

import * as classnames from "classnames";
import { Reference } from "react-popper";

export interface TargetHoverProps {
  className?: string;
  onHoverChange: (isHovering: boolean) => void;
}

export interface TargetHoverState {}

export class TargetHover extends React.Component<
  TargetHoverProps,
  TargetHoverState
> {
  constructor(props: TargetHoverProps) {
    super(props);
  }

  componentWillUpdate(props: Readonly<TargetHoverProps>) {}

  render() {
    return (
      <Reference>
        {({ ref }) => (
          <span
            className={classnames(
              "sci-react-popover--target",
              "hover",
              this.props.className
            )}
            onBlur={() => {
              this.onHoverChange(false);
            }}
            onFocus={() => {
              this.onHoverChange(true);
            }}
            onMouseOut={() => {
              this.onHoverChange(false);
            }}
            onMouseOver={() => {
              this.onHoverChange(true);
            }}
            ref={ref}
            tabIndex={0}
          >
            {this.props.children}
          </span>
        )}
      </Reference>
    );
  }

  private onHoverChange = (newValue: boolean) => {
    this.props.onHoverChange(newValue);
  };
}
