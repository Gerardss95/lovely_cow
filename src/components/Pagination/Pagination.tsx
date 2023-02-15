import React from 'react'
import Button from '../Button/Button'
import styled from 'styled-components'

interface PaginationProps {
    currentPage: number
    totalPages: number
    goToPreviousPage: () => void
    goToNextPage: () => void
}
const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage
}) => {
    const handleNextPage = () => {
        goToNextPage()
        window.scrollTo(0, 0)
    }
    const handlePreviousPage = () => {
        goToPreviousPage()
        window.scrollTo(0, 0)
    }
    return (
        <PaginationDiv>
            <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
                <TextButton> Previous page</TextButton>
            </Button>

            <p>
                {currentPage} of {totalPages}
            </p>
            <Button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
            >
                <TextButton>Next page</TextButton>
            </Button>
        </PaginationDiv>
    )
}
const PaginationDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const TextButton = styled.p`
    margin: 0;
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
`

export default Pagination
