import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch } from './redux/hooks'
import { getItem } from './redux/api/itemsApi'
function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getItem())
    }, [dispatch])

    return (
        <div className="App">
            <h1>hello world</h1>
        </div>
    )
}

export default App
