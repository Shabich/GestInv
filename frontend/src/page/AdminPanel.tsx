import React, { useState } from 'react';
import ProductsPanel from '../component/ProductPanel';
import UsersPanel from '../component/UsersPanel';

const AdminPanel: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'users' | 'products'>('users');

  return (
    <div>
      <h1>Panneau d'administration</h1>
      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActivePanel('users')} 
          style={{ 
            padding: '5px', 
            cursor: 'pointer', 
            backgroundColor: activePanel === 'users' ? '#007bff' : '#f0f0f0',
            color: activePanel === 'users' ? 'white' : 'black'
          }}
        >
          Users
        </button>
        <button 
          onClick={() => setActivePanel('products')} 
          style={{ 
            padding: '10px', 
            cursor: 'pointer', 
            backgroundColor: activePanel === 'products' ? '#007bff' : '#f0f0f0',
            color: activePanel === 'products' ? 'white' : 'black'
          }}
        >
          Products
        </button>
      </nav>
      {activePanel === 'users' ? <UsersPanel /> : <ProductsPanel />}
    </div>
  );
};

export default AdminPanel;
