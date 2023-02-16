import React from 'react'
import styled from 'styled-components'
import DeleteItem from '../../../assets/delete.svg'
import { itemsListModel } from '../../../types/types'
import { useAppDispatch } from '../../../redux/hooks'
import { removeFavoriteItem } from '../../../redux/features/favourites/favoritesDataSlice'

interface FavoriteItemProps {
    item: itemsListModel
}
const FavoriteItem: React.FC<FavoriteItemProps> = ({ item }) => {
    const dispatch = useAppDispatch()

    return (
        <ItemDiv>
            <RelativeDiv>
                <ItemImage src={item.image} alt="ProductImage" />
                <DeleteButton
                    onClick={() => dispatch(removeFavoriteItem(item))}
                    src={DeleteItem}
                    alt="DeleteItem"
                />
            </RelativeDiv>

            <Title>{item.title}</Title>
        </ItemDiv>
    )
}
const RelativeDiv = styled.div`
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h6`
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;
`
const ItemImage = styled.img`
    object-fit: cover;
    width: 140px;
    height: 140px;
    align-self: center;
    border-radius: 8px;

    z-index: 0;
`
const DeleteButton = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 20;
`
const ItemDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
        '.'
        '.';
    width: 100%;
    @media (min-width: 768px) {
        width: 220px;
    }
`
export default FavoriteItem
