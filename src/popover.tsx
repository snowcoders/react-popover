import * as React from "react";
import * as ReactDOM from "react-dom";

import { Manager } from "@snowcoders/react-popper";
import { PopperBlur } from "./popper.blur";
import { PopperClick } from "./popper.click";
import { PopperHover } from "./popper.hover";
import { TargetClick } from "./target.click";
import { TargetHover } from "./target.hover";

import * as classnames from "classnames";

import { PopperOptions } from "popper.js";

export type TargetType = "click" | "hover";
export type PopperType = "blur" | "click" | "hover" | "none";

export interface PopoverProps {
  popperContent?: React.ReactNode;
  popperOptions?: PopperOptions;
  popperType: PopperType;
  targetContent?: React.ReactNode;
  targetType: TargetType;
  wrapperElementProps?: any;
  wrapperElementType?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface PopoverState {
  isOpen: boolean;
}

export class Popover extends React.Component<PopoverProps, PopoverState> {
  private targetClickRef: null | TargetClick;

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  public open() {
    this.setState({
      isOpen: true
    });
  }

  public close() {
    this.setState({
      isOpen: false
    });
  }

  componentDidUpdate(prevProps: PopoverProps, prevState: PopoverState) {
    if (
      this.props.onOpenChange != null &&
      this.state.isOpen !== prevState.isOpen
    ) {
      this.props.onOpenChange(this.state.isOpen);
    }
  }

  render() {
    // React 16 means we can render arrays
    if (this.props.wrapperElementType == null) {
      return (
        <Manager>
          {this.renderTarget()}
          {this.renderPopper()}
        </Manager>
      );
    }

    // React 15 will have to pass a element to wrap everything inside of
    let wrapperElement = React.createElement(
      this.props.wrapperElementType,
      this.props.wrapperElementProps,
      this.renderTarget(),
      this.renderPopper()
    );
    return <Manager>{wrapperElement}</Manager>;
  }

  private renderTarget() {
    switch (this.props.targetType) {
      case "click":
        return (
          <TargetClick
            onClick={() => {
              this.setState({
                isOpen: !this.state.isOpen
              });
            }}
            ref={ref => {
              this.targetClickRef = ref;
            }}
          >
            {this.props.targetContent}
          </TargetClick>
        );
      case "hover":
        return (
          <TargetHover
            onHoverChange={(isHovering: boolean) => {
              if (
                this.props.popperType === "hover" ||
                this.props.popperType === "none" ||
                isHovering
              ) {
                this.setState({
                  isOpen: isHovering
                });
              }
            }}
          >
            {this.props.targetContent}
          </TargetHover>
        );
      default:
        throw new Error("Target type must be either click or hover");
    }
  }

  private renderPopper() {
    let className = undefined;
    if (this.state.isOpen) {
      className = "visible";
    }

    switch (this.props.popperType) {
      case "click":
        return (
          <PopperClick
            className={className}
            {...this.props.popperOptions}
            onDismiss={() => {
              this.setState({
                isOpen: false
              });
            }}
          >
            {this.props.popperContent}
          </PopperClick>
        );
      case "hover":
        return (
          <PopperHover
            className={className}
            {...this.props.popperOptions}
            onHoverChange={(isHovering: boolean) => {
              this.setState({
                isOpen: isHovering
              });
            }}
          >
            {this.props.popperContent}
          </PopperHover>
        );
      case "none":
        return (
          <PopperHover
            className={className}
            {...this.props.popperOptions}
            onHoverChange={(isHovering: boolean) => {}}
          >
            {this.props.popperContent}
          </PopperHover>
        );
      case "blur":
        return (
          <PopperBlur
            className={className}
            {...this.props.popperOptions}
            onDismiss={(event: MouseEvent) => {
              if (!this.state.isOpen) {
                return;
              }
              if (this.targetClickRef != null) {
                let target = ReactDOM.findDOMNode(this.targetClickRef);
                let isTargetOrChild = false;
                let sourceElement: Element | null = event.srcElement;
                while (sourceElement != null) {
                  if (target == sourceElement) {
                    isTargetOrChild = true;
                    break;
                  }
                  sourceElement = sourceElement.parentElement;
                }

                if (isTargetOrChild) {
                  return;
                }
              }
              this.setState({
                isOpen: false
              });
            }}
          >
            {this.props.popperContent}
          </PopperBlur>
        );
      default:
        throw new Error("Target type must be either click or hover");
    }
  }
}
