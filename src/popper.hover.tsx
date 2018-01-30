import * as React from 'react';

import { IPopperProps, Popper, Arrow } from '@snowcoders/react-popper';
import PopperJS from 'popper.js';

import * as classnames from "classnames";

export interface PopperHoverProps extends PopperJS.PopperOptions {
    className?: string,
    onHoverChange: (isHovering: boolean) => void;
}

export interface PopperHoverState {
    isPopperHovering: boolean;
    isArrowHovering: boolean;
}

export class PopperHover extends React.Component<PopperHoverProps, PopperHoverState> {
    constructor(props: PopperHoverProps) {
        super(props);
        this.state = {
            isPopperHovering: false,
            isArrowHovering: false,
        }
    }
    render() {
        let { children, onHoverChange, className, ...popperProps } = this.props;
        return <span
            className={classnames("sci-react-popover--popper", "hover", className)}>
            <Popper {...popperProps} componentFactory={(popperChildProps) => {
                return [
                    <span
                        key="content"
                        {...popperChildProps}
                        className="content"
                        onMouseOver={() => { this.onPopperHover(true) }}
                        onMouseOut={() => { this.onPopperHover(false) }}>
                        {children}
                        <Arrow
                            key="arrow"
                            componentFactory={(arrowProps) => (
                                <span
                                    {...arrowProps}
                                    className="popper__arrow"
                                    onMouseOver={() => { this.onArrowHover(true) }}
                                    onMouseOut={() => { this.onArrowHover(false) }}
                                />
                            )} />
                    </span>
                ];
            }} /></span>;
    }

    private onPopperHover(isHovering: boolean) {
        if (isHovering === this.state.isPopperHovering) {
            return;
        }

        this.setState({
            isPopperHovering: isHovering
        }, () => {
            this.props.onHoverChange(isHovering);
        });
    }

    private onArrowHover(isHovering: boolean) {
        if (isHovering === this.state.isArrowHovering) {
            return;
        }

        this.setState({
            isArrowHovering: isHovering
        }, () => {
            this.props.onHoverChange(isHovering);
        });
    }
}
