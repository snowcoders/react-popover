import * as React from "react";

import { UnstyledButton } from "@snowcoders/react-unstyled-button";
import { Reference } from "react-popper";

import * as classnames from "classnames";

export interface TargetClickProps {
  className?: string;
  onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export interface TargetClickState {}

export class TargetClick extends React.Component<
  TargetClickProps,
  TargetClickState
> {
  constructor(props: TargetClickProps) {
    super(props);
  }

  render() {
    return (
      <Reference>
        {({ ref }) => (
          <span
            ref={ref}
            className={classnames(
              "sci-react-popover--target",
              "click",
              this.props.className
            )}
          >
            <UnstyledButton onClick={this.onClick}>
              {this.props.children}
            </UnstyledButton>
          </span>
        )}
      </Reference>
    );
  }

  private onClick = (event: React.SyntheticEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };
}
