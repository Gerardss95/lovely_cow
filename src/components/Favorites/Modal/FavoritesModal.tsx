import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import SearchInput from '../../SearchInput/SearchInput'
import { useAppSelector } from '../../../redux/hooks'
import { itemsListModel } from '../../../types/types'
import FavoriteItem from '../FavoriteItem/FavoriteItem'
interface Props {
    isOpen: boolean
    onRequestClose: () => void
}
const FavoritesModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
    const [search, setSearch] = useState('')
    const [favoritesFiltered, setFavoritesFiltered] = useState<
        itemsListModel[] | undefined
    >(undefined)
    const itemsFavorites = useAppSelector(
        (store) => store.favoritesData.favoritesItemsList
    )
    const filteredItems = () => {
        const lowerSearch = search.toLowerCase()
        const filteredItems = itemsFavorites.filter((item) => {
            return item.title.toLowerCase().includes(lowerSearch)
        })
        return setFavoritesFiltered(filteredItems)
    }
    useEffect(() => {
        search.length > 0 && filteredItems()
    }, [search, itemsFavorites])

    useEffect(() => {
        if (isOpen === false) {
            setSearch('')
            setFavoritesFiltered(undefined)
        }
    }, [isOpen])
    useEffect(() => {
        setSearch('')
    }, [itemsFavorites])
    const favoritesToRender =
        favoritesFiltered && favoritesFiltered.length > 0
            ? favoritesFiltered
            : itemsFavorites
    return (
        <ModalDiv
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Favorites Modal"
            ariaHideApp={false}
        >
            <div>
                <ModalTitle>My Favorites</ModalTitle>
                <SearchInput
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                {favoritesToRender.length ? (
                    <p>Here you can see your favorite items</p>
                ) : (
                    <p>No items added to favorite list!</p>
                )}
                <FavoritesList>
                    {favoritesToRender.map((item) => (
                        <FavoriteItem item={item} key={item.id} />
                    ))}
                </FavoritesList>
            </div>
        </ModalDiv>
    )
}
const ModalTitle = styled.h2`
    color: #13c1ac;
`
const FavoritesList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
`
const ModalDiv = styled(Modal)`
    width: 50%;
    max-height: 50%;
    height: fit-content;
    margin: auto;
    background-color: white;
    border: 1px solid #13c1ac;
    border-radius: 35px;
    padding: 3rem;
    margin-top: 200px;
    overflow-y: auto;
`
export default FavoritesModal
