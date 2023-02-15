import React, { useState } from 'react'
import styled from 'styled-components'
import Delete from '../../assets/delete.svg'
interface SearchInputProps {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder,
    onChange,

}) => {

    return (
        <InputDiv>
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
            />
        </InputDiv>
    )
}
const InputDiv = styled.div`
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: #90a4ae 2px solid;
    border-radius: 32px;
    padding: 12px 24px 12px 24px;
    &:focus {
        outline: none;
        border: #253238 2px solid;
    }
`
const Input = styled.input`
    width: 100%;
    border: none;
    height: 100%;
    &:focus {
        outline: none;
        border: none;
    }
`

export default SearchInput
