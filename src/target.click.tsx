import * as React from "react";

import { Target } from "@snowcoders/react-popper";
import { UnstyledButton } from "@snowcoders/react-unstyled-button";
import "@snowcoders/react-unstyled-button/styles.css";

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
      <Target
        componentFactory={targetProps => (
          <UnstyledButton
            {...targetProps}
            className={classnames(
              "sci-react-popover--target",
              "click",
              this.props.className
            )}
            onClick={this.onClick}
          >
            {this.props.children}
          </UnstyledButton>
        )}
      />
    );
  }

  private onClick = (event: React.SyntheticEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };
}
