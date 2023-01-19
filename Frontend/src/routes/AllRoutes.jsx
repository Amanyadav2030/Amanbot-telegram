import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import Home from './Home'
import Login from './Login'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            <Route path='/login' element={<Login />} />

        </Routes>

    )
}

export default AllRoutes