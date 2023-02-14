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
    const [itemsList, setItemsList] = useState<itemModel[]>([])
    const [itemsListFiltered, setItemsListFiltered] = useState<
        itemModel[] | undefined
    >(undefined)
    const [search, setSearch] = useState('')
    useEffect(() => {
        return () => {
            setItemsList(itemsApi.response.items)
            dispatch(resetItemsApiCall())
        }
    }, [itemsApi.loading, itemsApi.response])

    const { items, handleSortBy } = useSortItems(
        itemsListFiltered ? itemsListFiltered : itemsList
    )
    const {
        currentItems,
        goToNextPage,
        goToPreviousPage,
        currentPage,
        totalPages
    } = usePagination(items)

    const filterItems = () => {
        const lowerSearch = search.toLowerCase()

        const filteredItems = itemsList.filter((item) => {
            return (
                item.title.toLowerCase().includes(lowerSearch) ||
                item.description.toLowerCase().includes(lowerSearch) ||
                item.email.toLowerCase().includes(lowerSearch) ||
                item.price.toLowerCase().includes(lowerSearch)
            )
        })
        return setItemsListFiltered(filteredItems)
    }
    useEffect(() => {
        search.length >= 1 && filterItems()
    }, [search])

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
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {currentItems.map((item, index) => (
                        <Item {...item} key={index} />
                    ))}
                </div>
            )}
        </>
    )
}

export default Home
