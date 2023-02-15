import { useState, useEffect } from 'react'
import { itemsListModel } from '../pages/Home.page'

export type SortBy = 'title' | 'description' | 'price' | 'email'

export type SortOrder = 'asc' | 'desc'

const useSortItems = (initialItems: itemsListModel[]) => {
    const [sortBy, setSortBy] = useState<SortBy>()
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
    const sortedItems =
        initialItems &&
        [...initialItems].sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1

            if (sortBy === 'title') {
                return order * a.title.localeCompare(b.title)
            }

            if (sortBy === 'description') {
                return order * a.description.localeCompare(b.description)
            }

            if (sortBy === 'price') {
                const aPrice = parseInt(a.price, 10)
                const bPrice = parseInt(b.price, 10)
                return order * (aPrice - bPrice)
            }

            if (sortBy === 'email') {
                return order * a.email.localeCompare(b.email)
            }

            return 0
        })

    const handleSortBy = (sort: SortBy) => {
        if (sort === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(sort)
            setSortOrder('asc')
        }
    }

    return { items: sortedItems, handleSortBy }
}

export default useSortItems
