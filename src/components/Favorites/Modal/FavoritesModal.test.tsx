import { render, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import FavoritesModal from './FavoritesModal'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('FavoritesModal', () => {
    afterEach(cleanup)
    it('should render the modal with the favorite items', () => {
        const store = mockStore({
            favoritesData: {
                favoritesItemsList: [
                    { id: 1, title: 'Favorite 1', image: 'image1.jpg' },
                    { id: 2, title: 'Favorite 2', image: 'image2.jpg' }
                ]
            }
        })
        const { getByText, getByAltText } = render(
            <Provider store={store}>
                <FavoritesModal isOpen={true} onRequestClose={() => {}} />
            </Provider>
        )

        expect(getByText('My Favorites')).toBeTruthy()
        expect(getByText('Here you can see your favorite items')).toBeTruthy()
        expect(getByText('Favorite 1')).toBeTruthy()
        expect(getByText('Favorite 2')).toBeTruthy()
    })

    it('should filter the favorite items when searching', () => {
        const store = mockStore({
            favoritesData: {
                favoritesItemsList: [
                    { id: 1, title: 'Favorite 1', image: 'image1.jpg' },
                    { id: 2, title: 'Favorite 2', image: 'image2.jpg' }
                ]
            }
        })
        const { getByPlaceholderText, getByText, queryByText } = render(
            <Provider store={store}>
                <FavoritesModal isOpen={true} onRequestClose={() => {}} />
            </Provider>
        )

        fireEvent.change(getByPlaceholderText('Search'), {
            target: { value: 'Favorite 1' }
        })

        expect(getByText('Favorite 1')).toBeTruthy()
        expect(queryByText('Favorite 2')).not.toBeTruthy()
    })
})
