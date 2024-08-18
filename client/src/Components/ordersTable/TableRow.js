'use client'
import React from 'react';


const TableRow = ({ rowData }) => {
  const { id, status, amount, products, customer } = rowData;
  

  const renderOrderedProducts = () => (
    <ul>
    {products.map((product, index) => (
      <li key={index}>
        {product.name} ({product.quantity}, {product.size})
      </li>
    ))}
  </ul>
  )

  const renderCostumerInformation = () => (
    <>
    {customer.firstName} {customer.lastName} {customer.middleName}
        <br />
        {customer.phone}
        <br />
        {customer.city}, {customer.street}, {customer.region}, {customer.zip}
        <br />
        {customer.date}
    </>
  )

  return (
    <tr>
      <td>{id}</td>
      <td>{amount}</td>
      <td>
       {renderOrderedProducts()}
      </td>
      <td>
        {renderCostumerInformation()}
      </td>
      <td>{status}</td>
    </tr>
  );
};

export default TableRow;