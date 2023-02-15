import { render, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import SortingButton from './SortingButton'
import { SortButtonProps } from './SortingButton'

describe('SortButton', () => {
    afterEach(cleanup)
    const testProps: SortButtonProps = {
        label: 'Test Label',
        value: 'title',
        sortingBy: '',
        isDesc: undefined,
        onClick: vi.fn()
    }

    it('should render the label text', () => {
        const { getByText } = render(<SortingButton {...testProps} />)
        expect(getByText(testProps.label)).toBeTruthy()
    })

    it('should call onClick when clicked', () => {
        const { getByRole } = render(<SortingButton {...testProps} />)
        fireEvent.click(getByRole('button'))
        expect(testProps.onClick).toHaveBeenCalledWith(testProps.value)
    })

    it('should render the down chevron when sortingBy matches value and isDesc is true', () => {
        const { getByTestId } = render(
            <SortingButton
                {...testProps}
                sortingBy={testProps.value}
                isDesc={true}
            />
        )
        expect(getByTestId('chevron-down')).toBeTruthy()
    })

    it('should render the up chevron when sortingBy matches value and isDesc is false', () => {
        const { getByTestId } = render(
            <SortingButton
                {...testProps}
                sortingBy={testProps.value}
                isDesc={false}
            />
        )
        expect(getByTestId('chevron-up')).toBeTruthy()
    })

    it('should not render a chevron when sortingBy does not match value', () => {
        const { queryByTestId } = render(
            <SortingButton {...testProps} sortingBy="other_value" />
        )
        expect(queryByTestId('chevron')).not.toBeTruthy()
    })
})
