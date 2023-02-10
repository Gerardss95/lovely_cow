import React from 'react'
import { itemModel } from '../../types/types'
import styled from 'styled-components'

const Item: React.FC<itemModel> = ({
    title,
    description,
    price,
    email,
    image
}) => {
    return (
        <div>
            <p>{title}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{email}</p>
            <img src={image} alt="ProductImage" />
        </div>
    )
}

export default Item
