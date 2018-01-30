import * as React from 'react';

import { Target } from '@snowcoders/react-popper';

import * as classnames from "classnames";

export interface TargetClickProps {
    className?: string;
    onClick?: () => void;
}

export interface TargetClickState {
}

export class TargetClick extends React.Component<TargetClickProps, TargetClickState> {

    constructor(props: TargetClickProps) {
        super(props);
    }

    render() {
        return <Target componentFactory={(targetProps) => (
            <span
                {...targetProps}
                className={classnames("sci-react-popover--target", "click", this.props.className)}
                tabIndex={0}
                onClick={this.onClick}>
                {this.props.children}
            </span>
        )} />;
    }

    private onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
}