import * as React from 'react';

import { IPopperProps, Popper as SnowPopper, Arrow } from '@snowcoders/react-popper';

import * as classnames from "classnames";
import { PopperOptions } from "popper.js";

export interface PopperClickProps extends PopperOptions {
    className?: string,
    onDismiss: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export class PopperClick extends React.Component<PopperClickProps> {
    constructor(props: PopperClickProps) {
        super(props);
        this.state = {
        }
    }
    render() {
        let { children, onDismiss, className, ...popperProps } = this.props;
        return <span
            className={classnames("sci-react-popover--popper", "click", className)}
            onClick={this.onBackgroundClick}>
            <SnowPopper
                {...popperProps}
                positionFixed={popperProps.positionFixed || true}
                componentFactory={(popperChildProps) => {
                    return (
                        <span
                            key="content"
                            className="content"
                            {...popperChildProps}
                            onClick={this.onPopperClick}>
                            {children}
                            <Arrow
                                key="arrow"
                                componentFactory={(arrowProps) => (
                                    <span
                                        {...arrowProps}
                                        className="popper__arrow"
                                    />
                                )} />
                        </span>
                    );
                }} />
        </span>;
    }

    private onPopperClick = (event: React.SyntheticEvent<HTMLElement>) => {
        event.preventDefault();
    }

    private onBackgroundClick = (event: React.SyntheticEvent<HTMLElement>) => {
        if (!event.isDefaultPrevented()) {
            this.props.onDismiss(event);
        }
    }
}
