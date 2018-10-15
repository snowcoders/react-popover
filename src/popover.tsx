import * as React from "react";
import * as ReactDOM from "react-dom";

import { Manager } from "react-popper";
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
  isOpen?: boolean;
  popperClassName?: string;
  popperContent?: React.ReactNode;
  popperOptions?: PopperOptions;
  popperType: PopperType;
  targetClassName?: string;
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
  private scheduleUpdate: null | (() => void);

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      isOpen: false
    };

    if (
      React.version.indexOf("15.") === 0 &&
      this.props.wrapperElementType == null
    ) {
      console.warn("Must provide wrapperElementType for React version 15.*.*");
    }
  }

  public open() {
    if (this.props.isOpen != null) {
      console.warn(
        "Popover's open() can only be used when popover control's it's open state, not when `open` is passed as a prop"
      );
    }
    this.setState({
      isOpen: true
    });
  }

  public close() {
    if (this.props.isOpen != null) {
      console.warn(
        "Popover's open() can only be used when popover control's it's open state, not when `open` is passed as a prop"
      );
    }
    this.setState({
      isOpen: false
    });
  }

  componentDidUpdate(prevProps: PopoverProps, prevState: PopoverState) {
    // There seems to be some weirdness with react 15 and react-popper not positioning after mount
    if (this.state.isOpen && !prevState.isOpen && this.scheduleUpdate != null) {
      this.scheduleUpdate();
    }

    const { onOpenChange } = this.props;
    if (onOpenChange != null) {
      if (this.props.isOpen !== prevProps.isOpen) {
        onOpenChange(this.props.isOpen || false);
      }
      if (this.state.isOpen !== prevState.isOpen) {
        onOpenChange(this.state.isOpen);
      }
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
    const {
      popperType,
      targetClassName,
      targetContent,
      targetType
    } = this.props;

    switch (targetType) {
      case "click":
        return (
          <TargetClick
            className={targetClassName}
            onClick={() => {
              this.setState({
                isOpen: !this.state.isOpen
              });
            }}
            ref={ref => {
              this.targetClickRef = ref;
            }}
          >
            {targetContent}
          </TargetClick>
        );
      case "hover":
        return (
          <TargetHover
            className={targetClassName}
            onHoverChange={(isHovering: boolean) => {
              if (
                popperType === "hover" ||
                popperType === "none" ||
                isHovering
              ) {
                this.setState({
                  isOpen: isHovering
                });
              }
            }}
          >
            {targetContent}
          </TargetHover>
        );
      default:
        throw new Error("Target type must be either click or hover");
    }
  }

  private renderPopper() {
    const { popperContent, popperOptions, popperType } = this.props;

    let className = this.props.popperClassName;
    if (
      (this.props.isOpen != null && this.props.isOpen) ||
      (this.props.isOpen == null && this.state.isOpen)
    ) {
      className = classnames(className, "visible");
    }

    switch (popperType) {
      case "click":
        return (
          <PopperClick
            className={className}
            setScheduleUpdate={this.setScheduleUpdate}
            {...popperOptions}
            onDismiss={() => {
              this.setState({
                isOpen: false
              });
            }}
          >
            {popperContent}
          </PopperClick>
        );
      case "hover":
        return (
          <PopperHover
            className={className}
            setScheduleUpdate={this.setScheduleUpdate}
            {...popperOptions}
            onHoverChange={(isHovering: boolean) => {
              this.setState({
                isOpen: isHovering
              });
            }}
          >
            {popperContent}
          </PopperHover>
        );
      case "none":
        return (
          <PopperHover
            className={className}
            setScheduleUpdate={this.setScheduleUpdate}
            {...popperOptions}
            onHoverChange={(isHovering: boolean) => {}}
          >
            {popperContent}
          </PopperHover>
        );
      case "blur":
        return (
          <PopperBlur
            className={className}
            setScheduleUpdate={this.setScheduleUpdate}
            {...popperOptions}
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
            {popperContent}
          </PopperBlur>
        );
      default:
        throw new Error("Target type must be either click or hover");
    }
  }

  private setScheduleUpdate = (ref: null | (() => void)) => {
    if (ref != null) {
      this.scheduleUpdate = ref;
    }
  };
}
