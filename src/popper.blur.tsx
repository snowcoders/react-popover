import * as React from 'react';

import { IPopperProps, Popper, Arrow } from '@snowcoders/react-popper';
import PopperJS from 'popper.js';

import * as classnames from "classnames";

export interface PopperBlurProps extends PopperJS.PopperOptions {
    className?: string,
    onDismiss: () => void;
}

export class PopperBlur extends React.Component<PopperBlurProps> {
    private contentRef: HTMLElement | null;

    constructor(props: PopperBlurProps) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.onDocumentMouseDown);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onDocumentMouseDown);
    }

    render() {
        let { children, onDismiss, className, ...popperProps } = this.props;
        return <span
            className={classnames("sci-react-popover--popper", "blur", className)}>
            <Popper {...popperProps} componentFactory={(popperChildProps) => {
                return (
                    <span
                        key="content"
                        className="content"
                        {...popperChildProps}
                        ref={(ref) => {
                            popperChildProps.ref(ref);
                            this.contentRef = ref;
                        }}
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
            }} /></span>;
    }

    private onDocumentMouseDown = (event: MouseEvent) => {
        if (this.contentRef == null) {
            return;
        }

        if (event.srcElement == null) {
            return;
        }

        let isPopperOrChild = false;
        let parent: Element | null = event.srcElement;
        while (parent != null) {
            if (this.contentRef == parent) {
                isPopperOrChild = true;
                break;
            }
            parent = parent.parentElement;
        }

        if (!isPopperOrChild) {
            this.props.onDismiss();
        }
    }

    private onPopperClick = (event: React.SyntheticEvent<HTMLElement>) => {
        event.preventDefault();
    }
}
