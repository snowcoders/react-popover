import * as React from "react";

import { Target } from "@snowcoders/react-popper";

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
      <Target
        componentFactory={targetProps => (
          <span
            {...targetProps}
            className={classnames(
              "sci-react-popover--target",
              "hover",
              this.props.className
            )}
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
      />
    );
  }

  private onHoverChange = (newValue: boolean) => {
    this.props.onHoverChange(newValue);
  };
}
