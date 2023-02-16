import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Item from './Item'
import { Provider } from 'react-redux'
import { itemsListModel } from '../../types/types'

describe('Item test', () => {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    const state = reduxState()
    afterEach(cleanup)

    const mockItem: itemsListModel = {
        id: 1,
        title: 'Test Item',
        description: 'This is a test item',
        email: 'test@test.com',
        price: '100',
        image: 'image.jpg'
    }
    describe('Item component', () => {
        it('renders item data', () => {
            const store = mockStore(state)
            render(
                <Provider store={store}>
                    <Item item={mockItem} />
                </Provider>
            )
            expect(screen.getByText(mockItem.title)).toBeTruthy()
            expect(screen.getByText(`${mockItem.price}€`)).toBeTruthy()
            expect(screen.getByText(mockItem.description)).toBeTruthy()
            expect(screen.getByText(mockItem.email)).toBeTruthy()
            expect(screen.getByAltText(/ProductImage/)).toBeTruthy()
        })
        it('renders item data', () => {
            const store = mockStore(state)
            render(
                <Provider store={store}>
                    <Item item={mockItem} />
                </Provider>
            )
            expect(screen.getByText(mockItem.title)).toBeTruthy()
            expect(screen.getByText(`${mockItem.price}€`)).toBeTruthy()
            expect(screen.getByText(mockItem.description)).toBeTruthy()
            expect(screen.getByText(mockItem.email)).toBeTruthy()
            expect(screen.getByAltText(/ProductImage/)).toBeTruthy()
        })
    })
})
function reduxState() {
    return {
        favoritesData: {
            favoritesItemsList: []
        }
    }
}
