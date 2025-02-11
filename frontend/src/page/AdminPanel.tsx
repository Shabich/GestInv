import React from 'react'
import ProductsPanel from '../component/ProductPanel'
import UsersPanel from '../component/UsersPanel'

const AdminPanel: React.FC = () => {
  return (
    <div>
      <h1>Panneau d'administration</h1>
      <UsersPanel/>
      <ProductsPanel/>
    </div>
  )
}

export default AdminPanel
