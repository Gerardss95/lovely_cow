import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import SearchInput from '../../SearchInput/SearchInput'
import { useAppSelector } from '../../../redux/hooks'
import { itemsListModel } from '../../../pages/Home.page'
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
    }, [search])

    useEffect(() => {
        if (isOpen === false) {
            setSearch('')
            setFavoritesFiltered(undefined)
        }
    }, [isOpen])
    useEffect(() => {
        console.log('favoritesFiltered', favoritesFiltered)
        console.log('itemsFavorites', itemsFavorites)
    }, [favoritesFiltered, itemsFavorites])

    return (
        <ModalDiv
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Favorites Modal"
            ariaHideApp={false}
        >
            <div>
                <h2>My Favorites</h2>
                <SearchInput
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <p>Here you can see your favorite items</p>
                {favoritesFiltered
                    ? favoritesFiltered.map((item) => <p>{item.title}</p>)
                    : itemsFavorites.map((item) => <p>{item.title}</p>)}
            </div>
        </ModalDiv>
    )
}
const ModalDiv = styled(Modal)`
    width: 50%;
    height: 50%;
    margin: auto;
    background-color: white;
    border: 1px solid black;
    border-radius: 35px;
    padding: 20px;
    margin-top: 200px;
`
export default FavoritesModal
