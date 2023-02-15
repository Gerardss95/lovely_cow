import React from 'react'
import { SortBy } from '../../hooks/useSortItems'
import styled from 'styled-components'
import Button from '../Button/Button'
import ChevronUp from '../../assets/chevronUp.svg'
import ChevronDown from '../../assets/chevronDown.svg'
import { Mock } from 'vitest'
interface SortButtonProps {
    label: string
    value: string
    sortingBy: string
    isDesc: boolean | undefined
    onClick: (value: string) => void
}
const SortingButton: React.FC<SortButtonProps> = ({
    label,
    value,
    sortingBy,
    isDesc,
    onClick
}) => {
    const handleClick = () => {
        if (value === sortingBy) {
            onClick(value)
        } else {
            onClick(value)
        }
    }
    const renderChevron = () => {
        if (value === sortingBy) {
            return isDesc ? (
                <ChevronIcon src={ChevronDown} data-testid="chevron-down" />
            ) : (
                <ChevronIcon src={ChevronUp} data-testid="chevron-up" />
            )
        } else {
            return <></>
        }
    }
    return (
        <Button onClick={handleClick}>
            <TextButton>{label}</TextButton>
            {renderChevron()}
        </Button>
    )
}

const TextButton = styled.p`
    margin: 0;
    color: #00292b;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
`
const ChevronIcon = styled.img`
    margin: 0;
    width: 24px;
    height: 24px;
`
export default SortingButton
