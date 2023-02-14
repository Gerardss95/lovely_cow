import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { resetItemsApiCall } from '../redux/api/itemsApi'
import usePagination from '../hooks/usePagination'
import useSortItems from '../hooks/useSortItems'
import { itemModel } from '../types/types'
import Item from '../components/Item/Item'

const Home = () => {
    const dispatch = useAppDispatch()
    const itemsApi = useAppSelector((store) => store.itemsApi.getItems)
    const [itemsList, setItemsList] = useState<Array<itemModel>>([])

    useEffect(() => {
        return () => {
            setItemsList(itemsApi.response.items)
            dispatch(resetItemsApiCall())
        }
    }, [itemsApi.loading, itemsApi.response])

    const { items, handleSortBy } = useSortItems(itemsList)
    const {
        currentItems,
        goToNextPage,
        goToPreviousPage,
        currentPage,
        totalPages
    } = usePagination(items)

    return (
        <>
            {currentItems && (
                <div>
                    <button
                        disabled={currentPage === 1}
                        onClick={goToPreviousPage}
                    >
                        Previous page
                    </button>
                    <a>{currentPage}</a>
                    <a>of</a>
                    <a>{totalPages}</a>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={goToNextPage}
                    >
                        Next page
                    </button>
                    <div>
                        <button onClick={() => handleSortBy('title')}>
                            Sort by title
                        </button>
                        <button onClick={() => handleSortBy('description')}>
                            Sort by description
                        </button>
                        <button onClick={() => handleSortBy('price')}>
                            Sort by price
                        </button>
                        <button onClick={() => handleSortBy('email')}>
                            Sort by email
                        </button>
                    </div>
                    {currentItems.map((item, index) => (
                        <div key={index}>
                            <Item {...item} />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Home
