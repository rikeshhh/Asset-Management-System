import React from 'react'
import './Table.css'
export const Table = () => {
    const Data =[{
        id:1,
        productCode: "ITJ-DA-00002",
        name:'Bee Link PC - 32 GB',
        category:'Eletronic',
        status:"active",
        assignedTo:"Ketan Maharjan",
        AssignedDate:"2000",
    },
    {
        id:2,
        productCode: "ITJ-DA-00002",
        name:'Bee Link PC - 32 GB',
        category:'Eletronic',
        status:"active",
        assignedTo:"Ketan Maharjan",
        AssignedDate:"2000",
    },
    {
        id:3,
        productCode: "ITJ-DA-00002",
        name:'Bee Link PC - 32 GB',
        category:'Eletronic',
        status:"active",
        assignedTo:"Ketan Maharjan",
        AssignedDate:"2000",
    },
    {
        id:4,
        productCode: "ITJ-DA-00002",
        name:'Bee Link PC - 32 GB',
        category:'Eletronic',
        status:"active",
        assignedTo:"Ketan Maharjan",
        AssignedDate:"2000",
    },
]
  return (
    <section className='main-container'>
<table>
    <tr>
        <th>Product Code</th>
        <th>Name</th>
        <th>Category</th>
        <th>Status</th>
        <th>Assigned to</th>
        <th>Assigned Date</th>
        <th>Action</th>
    </tr>
        {Data.map((item,index)=>(
    <tr key={item.id}>
            <td data-cell="Product-code">{item.productCode}</td>
            <td data-cell="Name">{item.name}</td>
            <td data-cell="Category">{item.category}</td>
            <td data-cell="Status">{item.status}</td>
            <td data-cell="Assigned To">{item.assignedTo}</td>
            <td data-cell="Assigned Date">{item.AssignedDate}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
    </tr>
        ))}
</table>
    </section>
  )
}
