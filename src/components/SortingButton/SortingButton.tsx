import React from 'react'
import { SortBy } from '../../hooks/useSortItems'
import styled from 'styled-components'
import Button from '../Button/Button'
import ChevronUp from '../../assets/chevronUp.svg'
import ChevronDown from '../../assets/chevronDown.svg'
export interface SortButtonProps {
    label: string
    value: SortBy
    sortingBy: string
    isDesc: boolean | undefined
    onClick: (value: SortBy) => void
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
        if (value !== sortingBy) {
            return <></>
        }

        const chevronIcon = isDesc ? ChevronDown : ChevronUp

        return (
            <ChevronIcon
                src={chevronIcon}
                data-testid={isDesc ? 'chevron-down' : 'chevron-up'}
            />
        )
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
