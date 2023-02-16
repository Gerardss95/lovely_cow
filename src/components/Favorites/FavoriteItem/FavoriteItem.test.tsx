import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import FavoriteItem from './FavoriteItem'
import { itemsListModel } from '../../../types/types'
import { removeFavoriteItem } from '../../../redux/features/favourites/favoritesDataSlice'

const mockStore = configureStore([])

describe('FavoriteItem', () => {
    afterEach(cleanup)
    const mockItem: itemsListModel = {
        id: 1,
        title: 'Test Item',
        description: 'This is a test item',
        email: 'test@test.com',
        price: '100',
        image: 'image.jpg'
    }

    it('renders the product title', () => {
        const store = mockStore({})
        render(
            <Provider store={store}>
                <FavoriteItem item={mockItem} />
            </Provider>
        )
        const title = screen.getByText('Test Item')
        expect(title).toBeTruthy()
    })

    it('renders the product image', () => {
        const store = mockStore({})
        render(
            <Provider store={store}>
                <FavoriteItem item={mockItem} />
            </Provider>
        )
        const image = screen.getByAltText('ProductImage')
        expect(image).toBeTruthy()
        expect(image).toBeTruthy()
    })

    it('dispatches the removeFavoriteItem action when the delete button is clicked', () => {
        const store = mockStore({})
        render(
            <Provider store={store}>
                <FavoriteItem item={mockItem} />
            </Provider>
        )
        const deleteButton = screen.getByAltText('DeleteItem')
        fireEvent.click(deleteButton)
        expect(store.getActions()).toEqual([removeFavoriteItem(mockItem)])
    })
})
