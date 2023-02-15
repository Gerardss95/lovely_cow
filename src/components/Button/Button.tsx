import React, { Children } from 'react'
import styled from 'styled-components'

export interface ButtonProps {
    onClick?: () => void
    disabled?: boolean
    children?: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
    return (
        <CustomButton type="button" disabled={disabled} onClick={onClick}>
            {children}
        </CustomButton>
    )
}
const CustomButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3dd2ba;
    color: inherit;
    border: none;
    border-radius: 32px;
    padding: 8px 24px;
    font: inherit;
    cursor: pointer;
    outline: none;
    min-width: 88px;
    margin: 8px;
    &:hover {
        background-color: #6ae1c9;
    }
    &:active {
        background-color: #0b9f93;
    }
    &:disabled {
        background-color: #ccf8eb;
        cursor: not-allowed;
    }
`
export default Button
