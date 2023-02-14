import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { getItems, resetItemsApiCall } from '../redux/api/itemsApi'
import { itemModel } from '../types/types'

// function usePagination() {
//     const dispatch = useAppDispatch()
//     const itemsApi = useAppSelector((store) => store.itemsApi.getItems)
//     const items = useAppSelector(
//         (store) => store.itemsApi.getItems.response.items
//     )
//     console.log(items)
//     useEffect(() => {
//         return () => {
//             dispatch(resetItemsApiCall())
//         }
//     }, [itemsApi.loading, itemsApi.response])

//     return { items }
// }

const usePagination = (items: itemModel[]) => {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(items.length / 5)

    const currentItems = items.slice((currentPage - 1) * 5, currentPage * 5)

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
