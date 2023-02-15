import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import { SortBy } from '../../hooks/useSortItems'

import SortingButton from './SortingButton'

describe('SortButton', () => {
    afterEach(cleanup)
    const defaultProps = {
        label: 'Test Label',
        value: 'testValue',
        sortingBy: '',
        isDesc: undefined,
        onClick: vi.fn()
    }

    it('should render the label text', () => {
        const { getByText } = render(<SortingButton {...defaultProps} />)
        expect(getByText(defaultProps.label)).toBeTruthy()
    })

    it('should call onClick when clicked', () => {
        const { getByRole } = render(<SortingButton {...defaultProps} />)
        fireEvent.click(getByRole('button'))
        expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.value)
    })

    it('should render the down chevron when sortingBy matches value and isDesc is true', () => {
        const { getByTestId } = render(
            <SortingButton
                {...defaultProps}
                sortingBy={defaultProps.value}
                isDesc={true}
            />
        )
        expect(getByTestId('chevron-down')).toBeTruthy()
    })

    it('should render the up chevron when sortingBy matches value and isDesc is false', () => {
        const { getByTestId } = render(
            <SortingButton
                {...defaultProps}
                sortingBy={defaultProps.value}
                isDesc={false}
            />
        )
        expect(getByTestId('chevron-up')).toBeTruthy()
    })

    it('should not render a chevron when sortingBy does not match value', () => {
        const { queryByTestId } = render(
            <SortingButton {...defaultProps} sortingBy="other_value" />
        )
        expect(queryByTestId('chevron')).not.toBeTruthy()
    })
})
