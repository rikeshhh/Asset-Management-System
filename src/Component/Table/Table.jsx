import './Table.css'
import { useState, useMemo } from 'react';
import data from "./data/MOCK_DATA.json"
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Pagination from '../Pagination/Pagination';

let PageSize = 10;
const Table = () => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ProductCode</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr >
                <td>{item.productCode}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.assignedTo}</td>
                <td>{item.AssignedDate}</td>
                <td>
                  <Link to='/profile'> <Button text="Edit" /></Link>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
export default Table