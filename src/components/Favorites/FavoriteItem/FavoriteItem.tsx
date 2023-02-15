import React, { useState } from 'react'
import styled from 'styled-components'
import DeleteItem from '../../../assets/delete.svg'
import FullHeart from '../../../assets/fullHeart.svg'
import { itemsListModel } from '../../../pages/Home.page'
import { useAppDispatch } from '../../../redux/hooks'
import {
    addFavoriteItem,
    removeFavoriteItem
} from '../../../redux/features/favourites/favoritesDataSlice'

interface FavoriteItemProps {
    item: itemsListModel
}
const FavoriteItem: React.FC<FavoriteItemProps> = ({ item }) => {
    const dispatch = useAppDispatch()

    return (
        <ItemDiv>
            <ItemImage src={item.image} alt="ProductImage" />
            <Title>{item.title}</Title>

            <HeartButton
                onClick={() => dispatch(removeFavoriteItem(item))}
                src={DeleteItem}
                alt="FullHeart"
            />
        </ItemDiv>
    )
}
const Title = styled.h6`
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;
`
const ItemImage = styled.img`
    object-fit: cover;
    width: 120px;
    height: 120px;
    float: left;
    align-self: center;
    border-radius: 8px;
`
const HeartButton = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`
const ItemDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 0.5fr 0.5fr 1.5fr 0.5fr;
    gap: 0px 0px;
    grid-template-areas:
        '.'
        '.'
        '.';
    width: 80%;
    @media (min-width: 768px) {
        width: 220px;
    }
`
export default FavoriteItem
