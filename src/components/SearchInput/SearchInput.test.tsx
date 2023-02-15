import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, vitest, expect } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import SearchInput from './SearchInput'
describe('SearchInput component', () => {
    const onChange = vitest.fn()
    // const spyOnChangeTab = vitest.fn()
    afterEach(cleanup)

    it('should render with placeholder text', () => {
        const placeholderText = 'Search for something...'
        render(
            <SearchInput placeholder={placeholderText} onChange={onChange} />
        )

        expect(screen.getByPlaceholderText(placeholderText))
    })
})
