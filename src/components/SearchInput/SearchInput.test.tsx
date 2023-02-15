import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import SearchInput from './SearchInput'
describe('SearchInput component', () => {
    const onChange = vi.fn()
    afterEach(cleanup)

    it('should render with placeholder text', () => {
        const placeholderText = 'Search for something...'
        render(
            <SearchInput placeholder={placeholderText} onChange={onChange} />
        )
        expect(screen.getByPlaceholderText(placeholderText))
    })
})
