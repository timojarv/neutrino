import React from 'react';
import ReactDOM from 'react-dom';

import { FiX } from 'react-icons/fi';

import { useLockBodyScroll } from '../util/hooks';

const Modal = props => {
    if (document.getElementById('portal') == null) {
        const portal = document.createElement('div');
        portal.id = 'portal';
        document.body.appendChild(portal);
    }
    useLockBodyScroll();
    return ReactDOM.createPortal(
        <div
            className="fixed w-100 vh-100 top-0 left-0 z-5 flex items-center justify-center pa5"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
            <div
                onClick={e => e.stopPropagation()}
                className={
                    'dark-gray avenir bg-white br3 pa4 shadow-4 relative mw-100 ' +
                    props.className
                }
            >
                <FiX
                    onClick={props.onClose}
                    className="silver f3 absolute pointer hover-gray right-0 top-0 ma3"
                />
                {props.children}
            </div>
        </div>,
        document.getElementById('portal')
    );
};

export default Modal;
