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

const Home = () => {
    const dispatch = useAppDispatch()
    const itemsApi = useAppSelector((store) => store.itemsApi.getItems)
    const [itemsList, setItemsList] = useState<itemModel[]>([])
    const [itemsListFiltered, setItemsListFiltered] = useState<
        itemModel[] | undefined
    >(undefined)
    const [search, setSearch] = useState('')
    useEffect(() => {
        setItemsList(itemsApi.response.items)
        // dispatch(resetItemsApiCall())
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
            <Main>
                <h1 style={{ color: '#13C1AC' }}>Wallapop items manager app</h1>
                <div>
                    <SearchInput
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SortDiv>
                        <Button onClick={() => handleSortBy('title')}>
                            <TextButton>Sort by title</TextButton>
                        </Button>
                        <Button onClick={() => handleSortBy('description')}>
                            <TextButton>Sort by description</TextButton>
                        </Button>
                        <Button onClick={() => handleSortBy('price')}>
                            <TextButton>Sort by price</TextButton>
                        </Button>
                        <Button onClick={() => handleSortBy('email')}>
                            <TextButton>Sort by email</TextButton>
                        </Button>
                    </SortDiv>
                </div>

                <ItemsList>
                    {currentItems &&
                        currentItems.map((item, index) => (
                            <Item item={item} key={index} />
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

const SortDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const TextButton = styled.p`
    margin: 0;
    color: #00292b;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
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
