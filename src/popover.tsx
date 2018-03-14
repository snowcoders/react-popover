import * as React from 'react';

import { PopperBlur } from "./popper.blur";
import { PopperClick } from "./popper.click";
import { PopperHover } from "./popper.hover";
import { TargetHover } from "./target.hover";
import { TargetClick } from "./target.click";
import { Manager } from '@snowcoders/react-popper';

import * as classnames from "classnames";

export type TargetType = "click" | "hover";
export type PopperType = "blur" | "click" | "hover";

export interface PopoverProps {
    wrapperElementType?: string,
    wrapperElementProps?: any,
    targetContent?: React.ReactNode;
    popperContent?: React.ReactNode;
    targetType: TargetType,
    popperType: PopperType,
    popperOptions: Popper.PopperOptions
}

export interface PopoverState {
    isOpen: boolean
}

export class Popover extends React.Component<PopoverProps, PopoverState> {

    constructor(props: PopoverProps) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    render() {
        // React 16 means we can render arrays
        if (this.props.wrapperElementType == null) {
            return <Manager>
                {this.renderTarget()}
                {this.renderPopper()}
            </Manager>;
        }

        // React 15 will have to pass a element to wrap everything inside of
        let wrapperElement = React.createElement(
            this.props.wrapperElementType,
            this.props.wrapperElementProps,
            this.renderTarget(),
            this.renderPopper()
        );
        return <Manager>
            {wrapperElement}
        </Manager>;
    }

    private renderTarget() {
        switch (this.props.targetType) {
            case "click":
                return <TargetClick onClick={() => {
                    this.setState({
                        isOpen: !this.state.isOpen
                    });
                }}>
                    {this.props.targetContent}
                </TargetClick>
            case "hover":
                return <TargetHover onHoverChange={(isHovering: boolean) => {
                    if (this.props.popperType === "hover" || isHovering) {
                        this.setState({
                            isOpen: isHovering
                        });
                    }
                }}>
                    {this.props.targetContent}
                </TargetHover>
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
                return <PopperClick className={className} {...this.props.popperOptions} onDismiss={() => {
                    this.setState({
                        isOpen: false
                    });
                }}>
                    {this.props.popperContent}
                </PopperClick>
            case "hover":
                return <PopperHover className={className} {...this.props.popperOptions} onHoverChange={(isHovering: boolean) => {
                    this.setState({
                        isOpen: isHovering
                    });
                }}>
                    {this.props.popperContent}
                </PopperHover>
            case "blur":
                return <PopperBlur className={className} {...this.props.popperOptions} onDismiss={() => {
                    this.setState({
                        isOpen: false
                    });
                }}>
                    {this.props.popperContent}
                </PopperBlur>
            default:
                throw new Error("Target type must be either click or hover");
        }
    }
}
