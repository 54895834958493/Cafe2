import React from 'react'
import {adminRoutesArray} from '../../utils/arrays';
import './Admin.scss';

const Admin = () => {

  const renderAdminRoutes = () => (
    adminRoutesArray.map(({route,name},index) =>(
      <a 
        className="buttons-routes-to-manage"
        key={index}
        href={`/admin/${route}`}
        >
        {name}
    </a>
  ))
  )

  return (
    <main className="admin-page-wrapper">
      <h1 className="admin-page-title">Админ-панель</h1>

        <div className="admin-page-content">
          {
             renderAdminRoutes()
          }
        </div>

    </main>
  );
}

export default Admin