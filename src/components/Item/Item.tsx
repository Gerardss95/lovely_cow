import React from 'react'
import { itemModel } from '../../types/types'
import styled from 'styled-components'

export interface ItemProps extends itemModel {
    key: number
}

const Item: React.FC<ItemProps> = ({
    title,
    description,
    price,
    email,
    image,
    key
}) => {
    return (
        <div key={key}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{email}</p>
            <img src={image} alt="ProductImage" />
        </div>
    )
}

export default Item
