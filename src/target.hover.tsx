import * as React from "react";

import { Reference } from "react-popper";

import * as classnames from "classnames";

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
            ref={ref}
            tabIndex={0}
            onMouseOver={() => {
              this.onHoverChange(true);
            }}
            onMouseOut={() => {
              this.onHoverChange(false);
            }}
            onFocus={() => {
              this.onHoverChange(true);
            }}
            onBlur={() => {
              this.onHoverChange(false);
            }}
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
