import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    // useLocation
} from 'react-router-dom';

import './charts/ChartjsConfig';

import Dashboard from './pages/dashboard';

const App = () => {

    // const location = useLocation();
    // console.log("🚀 ~ file: app.tsx ~ line 16 ~ App ~ location", location)

    // useEffect(() => {
    //     const node: any = document.querySelector('html')
    //     node.style.scrollBehavior = 'auto'
    //     window.scroll({ top: 0 })
    //     node.style.scrollBehavior = ''
    // }, [location]); // triggered on route change

    return (
        <Router>
            <Routes>
                <Route path="/home/index" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}

export default App;