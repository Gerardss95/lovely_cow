import React, { useState, useEffect } from 'react'
import { itemModel } from '../../types/types'
import styled from 'styled-components'
import EmptyHeart from '../../assets/emptyHeart.svg'
import FullHeart from '../../assets/fullHeart.svg'
import {
    addFavoriteItem,
    removeFavoriteItem
} from '../../redux/features/favourites/favoritesDataSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export interface ItemProps {
    item: itemModel
}

const Item: React.FC<ItemProps> = ({ item }) => {
    const dispatch = useAppDispatch()
    const [isFavourite, setIsFavourite] = useState(false)
    const itemsFavorites = useAppSelector(
        (store) => store.favoritesData.favoritesItemsList
    )
    useEffect(() => {
        const isItemFavourite = itemsFavorites.some(
            (favoriteItem) => favoriteItem.id === item.id
        )
        isItemFavourite ? setIsFavourite(true) : setIsFavourite(false)
    }, [itemsFavorites])

    const handleFavourite = (value: boolean) => {
        setIsFavourite(value)
        value
            ? dispatch(addFavoriteItem(item))
            : dispatch(removeFavoriteItem(item))
    }

    return (
        <ItemDiv>
            <ItemImage src={item.image} alt="ProductImage" />
            <SecondBox>
                <Price>{item.price}€</Price>
                {isFavourite ? (
                    <HeartButton
                        onClick={() => handleFavourite(false)}
                        src={FullHeart}
                        alt="EmptyHeart"
                    />
                ) : (
                    <HeartButton
                        onClick={() => handleFavourite(true)}
                        src={EmptyHeart}
                        alt="FullHeart"
                    />
                )}
            </SecondBox>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
            <Email>{item.email}</Email>
        </ItemDiv>
    )
}
const HeartButton = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`
const Title = styled.h6`
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;
`
const Price = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    cursor: pointer;
`
const Email = styled.p`
    color: #13c1ac;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
`
const Description = styled.p`
    font-size: 0.8rem;
    font-weight: 400;
    text-overflow: ellipsis;
`
const ItemImage = styled.img`
    object-fit: cover;
    width: 220px;
    height: 220px;
    float: left;
    align-self: center;
    border-radius: 8px;
`
const SecondBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
`

const ItemDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 0.5fr 0.5fr 1.5fr 0.5fr;
    gap: 0px 0px;
    grid-template-areas:
        '.'
        '.'
        '.'
        '.'
        '.';
    width: 80%;
    @media (min-width: 768px) {
        width: 220px;
    }
`

export default Item
