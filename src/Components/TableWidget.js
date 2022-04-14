import React from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function TableWidget({data}) {

    return (
        data && <ReactTable
            columns={data.headers}
            data={data.data}
            className="customReactTable ongoing-table"
            showPaginationBottom={true}
            defaultPageSize={10}
        />
    )
}

export default TableWidget