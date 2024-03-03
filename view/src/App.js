import React from 'react'
import Layout from 'antd/es/layout/layout.js'
import { Routes, Route } from 'react-router-dom'

//Import des pages
import PageAccueil from './pages/PageAccueil.js'

function App() {
  return (
    <Layout>
        <Routes>
          <Route path='/' element={<PageAccueil />}/>          
        </Routes>  
      </Layout>
  );
}

export default App;
