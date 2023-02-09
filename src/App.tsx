import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppDispatch } from './redux/hooks'
import { getItem } from './redux/api/itemsApi'

const HomePage = lazy(() => import('./pages/Home.page'))
function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getItem())
    }, [dispatch])

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
