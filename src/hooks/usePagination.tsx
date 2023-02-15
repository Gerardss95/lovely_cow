import { useState } from 'react'
import { itemModel } from '../types/types'

const usePagination = (items: itemModel[]) => {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = items && Math.ceil(items.length / 5)

    const currentItems =
        items && items.slice((currentPage - 1) * 5, currentPage * 5)

    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages))
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 1))
    }

    const goToPage = (page: number) => {
        const pageNumber = Math.max(1, page)
        setCurrentPage((page) => Math.min(pageNumber, totalPages))
    }

    return {
        currentPage,
        totalPages,
        currentItems,
        goToNextPage,
        goToPreviousPage,
        goToPage
    }
}

export default usePagination
