import * as React from 'react';

import { IPopperProps, Popper, Arrow } from '@snowcoders/react-popper';
import * as PopperJS from 'popper.js';

import * as classnames from "classnames";

export interface PopperClickProps extends Popper.PopperOptions {
    className?: string,
    onDismiss: () => void;
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
            <Popper
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
            this.props.onDismiss();
        }
    }
}
