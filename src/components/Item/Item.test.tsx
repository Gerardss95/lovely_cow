import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { itemModel } from '../../types/types'
import { BrowserRouter as Router } from 'react-router-dom'
import Item from './Item'

describe('Item test', () => {
    afterEach(cleanup)

    it('should render the item', () => {
        const item: itemModel = {
            title: 'iPhone 6S Oro',
            description:
                'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
            price: '740',
            email: 'iphonemail@wallapop.com"',
            image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/camera.png'
        }

        render(
            <Router>
                <Item {...item} />
            </Router>
        )

        screen.getByText(item.title)
        screen.getByText(item.description)
        screen.getByText(item.price)
        screen.getByText(item.email)
        screen.getByAltText('ProductImage')
    })
})
