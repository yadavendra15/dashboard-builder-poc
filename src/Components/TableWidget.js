import React from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function TableWidget({data}) {

    const getColumns = () => {
        return [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Job',
                accessor: 'job',
            },
            {
                Header: 'Gender',
                accessor: 'gender',
            },
            {
                Header: 'Department',
                accessor: 'department',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Time',
                accessor: 'time',
            },
            
        ]
    }

    return (
        <ReactTable
            columns={getColumns()}
            data={data}
            className="customReactTable ongoing-table"
            showPaginationBottom={true}
            defaultPageSize={10}
        />
    )
}

export default TableWidget