import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    font-family: 'avenir next', avenir, sans-serif;
    background-color: transparent;
    cursor: pointer;
    border: none;
    border-radius: 100px;
    color: #4263eb;
    padding: 0.5rem 1rem;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        background-color: #edf2ff;
    }
`;

export const AddButton = ({ className, ...other }) => (
    <span className={'w1 h1 dib hide-child z-4 ' + className}>
        <button
            {...other}
            className={
                'br-100 w1 h1 f7 flex child items-center justify-center pa0 bg-green bn white dim pointer'
            }
        >
            <svg
                className="feather feather-plus sc-dnqmqq jxshSx"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24
    24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                data-reactid="981"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
    </span>
);
export const EditButton = ({ className, ...other }) => (
    <button
        {...other}
        className={
            'br-100 w2 h2 flex child items-center justify-center pa0 bg-blue bn white dim pointer ' +
            className
        }
    >
        <svg
            className="feather feather-edit-2 sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            data-reactid="491"
        >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
    </button>
);
export const DeleteButton = ({ className, ...other }) => (
    <button
        {...other}
        className={
            'br-100 w2 h2 flex child items-center justify-center pa0 bg-red bn white dim pointer ' +
            className
        }
    >
        <svg
            className="feather feather-x sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24
  24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            data-reactid="1401"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    </button>
);

export const buttonContainer = ' nb4 nl3 pv3 flex justify-between nr3 ';

export default Button;
