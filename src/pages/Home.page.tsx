import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { resetItemsApiCall } from '../redux/api/itemsApi'
import usePagination from '../hooks/usePagination'
import useSortItems from '../hooks/useSortItems'
import { itemModel } from '../types/types'
import Item from '../components/Item/Item'
import styled from 'styled-components'
import Button from '../components/Button/Button'
import SearchInput from '../components/SearchInput/SearchInput'
import FavoritesModal from '../components/Favorites/Modal/FavoritesModal'
import { SortBy } from '../hooks/useSortItems'
import SortingButton from '../components/SortingButton/SortingButton'
export interface itemsListModel extends itemModel {
    id: number
}
const Home = () => {
    const dispatch = useAppDispatch()
    const itemsApi = useAppSelector((store) => store.itemsApi.getItems)

    const [itemsList, setItemsList] = useState<itemsListModel[]>([])
    const [itemsListFiltered, setItemsListFiltered] = useState<
        itemsListModel[] | undefined
    >(undefined)
    const [search, setSearch] = useState('')
    const [sortingBy, setSortingBy] = useState<SortBy>('')
    const [isDesc, setIsDesc] = useState<boolean | undefined>(undefined)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    function closeModal() {
        setIsModalOpen(false)
    }
    const handleSorting = (value: SortBy) => {
        if (value === sortingBy) {
            setIsDesc(!isDesc)
        } else if (value !== undefined) {
            setIsDesc(true)
        } else {
            setIsDesc(undefined)
        }
        setSortingBy(value)
        handleSortBy(value)
    }
    useEffect(() => {
        itemsApi.loading === 'succeeded' &&
            itemsApi.response.items &&
            itemsApi.response.items.flatMap((item: itemModel, index) => {
                setItemsList((itemsList) => [
                    ...itemsList,
                    { ...item, id: index }
                ])
            })
        dispatch(resetItemsApiCall())
    }, [itemsApi.response, itemsApi.loading])

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
            <Main>
                <FavoritesModal
                    isOpen={isModalOpen}
                    onRequestClose={() => closeModal()}
                />
                <h1 style={{ color: '#13C1AC' }}>Wallapop items manager app</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <TextButton>Favourites</TextButton>
                </Button>
                <div>
                    <SearchInput
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SortDiv>
                        <SortingButton
                            label="Sort by title"
                            value="title"
                            sortingBy={sortingBy}
                            isDesc={isDesc}
                            onClick={handleSorting}
                        />
                        <SortingButton
                            label="Sort by description"
                            value="description"
                            sortingBy={sortingBy}
                            isDesc={isDesc}
                            onClick={handleSorting}
                        />
                        <SortingButton
                            label="Sort by price"
                            value="price"
                            sortingBy={sortingBy}
                            isDesc={isDesc}
                            onClick={handleSorting}
                        />
                        <SortingButton
                            label="Sort by email"
                            value="email"
                            sortingBy={sortingBy}
                            isDesc={isDesc}
                            onClick={handleSorting}
                        />
                    </SortDiv>
                </div>

                <ItemsList>
                    {currentItems &&
                        currentItems.map((item) => (
                            <Item item={item} key={item.id} />
                        ))}
                </ItemsList>
                <div>
                    <Button
                        disabled={currentPage === 1}
                        onClick={goToPreviousPage}
                    >
                        Previous page
                    </Button>
                    <a>{currentPage}</a>
                    <a>of</a>
                    <a>{totalPages}</a>
                    <Button
                        disabled={currentPage === totalPages}
                        onClick={goToNextPage}
                    >
                        Next page
                    </Button>
                </div>
            </Main>
        </>
    )
}
const TextButton = styled.p`
    margin: 0;
    color: #00292b;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
`
const SortDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* height: 100vh; */
    width: 100%;
    background-color: #ffffff;
`

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 20px 20px;
    grid-template-areas:
        '.'
        '.'
        '.';
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 20px 50px;
        grid-template-areas:
            '. . .'
            '. . .';
    }
`
export default Home
