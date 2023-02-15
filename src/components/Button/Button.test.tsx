import { render, fireEvent, cleanup } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import Button from './Button'

describe('Button component', () => {
    afterEach(cleanup)
    it('renders children', () => {
        const { getByText } = render(<Button>Click me</Button>)
        expect(getByText('Click me')).toBeTruthy()
    })

    it('calls onClick when clicked', () => {
        const onClick = vi.fn()
        const { getByRole } = render(
            <Button onClick={onClick}>Click me</Button>
        )
        fireEvent.click(getByRole('button'))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when disabled prop is true', () => {
        const onClick = vi.fn()
        const { getByRole } = render(<Button disabled>Click me</Button>)
        fireEvent.click(getByRole('button'))
        expect(onClick).toHaveBeenCalledTimes(0)
    })
})
