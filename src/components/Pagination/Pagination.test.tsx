import { render, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect, vi } from 'vitest'
import Pagination from './Pagination'

describe('Pagination', () => {
    afterEach(cleanup)
    const props = {
        currentPage: 1,
        totalPages: 4,
        goToPreviousPage: vi.fn(),
        goToNextPage: vi.fn()
    }

    it('disables the previous button on the first page', () => {
        const { getByText } = render(<Pagination {...props} />)
        const previousButton = getByText(/previous page/i)
        fireEvent.click(previousButton)
        expect(props.goToPreviousPage).toHaveBeenCalledTimes(0)
    })

    it('disables the next button on the last page', () => {
        const { getByText } = render(<Pagination {...props} currentPage={4} />)
        const nextButton = getByText(/next page/i)
        fireEvent.click(nextButton)
        expect(props.goToNextPage).toHaveBeenCalledTimes(0)
    })

    it('calls goToPreviousPage when clicking the previous button', () => {
        const { getByText } = render(<Pagination {...props} currentPage={4} />)
        const previousButton = getByText(/previous page/i)
        fireEvent.click(previousButton)
        expect(props.goToPreviousPage).toHaveBeenCalledTimes(1)
    })

    it('calls goToNextPage when clicking the next button', () => {
        const { getByText } = render(<Pagination {...props} />)
        const nextButton = getByText(/next page/i)
        fireEvent.click(nextButton)
        expect(props.goToNextPage).toHaveBeenCalledTimes(1)
    })
})
