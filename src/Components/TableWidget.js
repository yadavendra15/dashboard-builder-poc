import React, { useState, useRef } from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { useNavigate } from 'react-router-dom';

function TableWidget(props) {

    const navigate = useNavigate();

    const data = props.data
    const action = props.action
    const selectedColumn = props.selectedColumn
    const actionSelected = props.actionSelected
    const changeRouteURL = props.changeRouteURL

    const [addAction, setAddAction] = useState(false);

    const actionDropdown = useRef();
    const routeURL = useRef();
    const changeAction = () => {
        setAddAction((prev) => !prev)
    }

    const getTrProp = (state, rowInfo, instance) => {
        if (action) {
            if (rowInfo) {
                return {
                    onClick: e => {
                        navigate(`/${action.url}/${rowInfo.original[action.column]}`)
                    }
                }
            }
        }
        return {}
    }

    return (
        data && <>
            {window.location.pathname === '/add-widget' &&
                <>
                    <button onClick={changeAction}>{addAction ? 'Close Action' : 'Add a Action'}</button>
                    <br />
                    {addAction && <select ref={actionDropdown} onChange={actionSelected}>
                        <option>--Select Column--</option>
                        {data.headers.map((el, index) => {
                            return <option value={el.accessor} key={index}>{el.Header}</option>
                        })}
                    </select>}
                    <br />
                    {(addAction && selectedColumn) &&
                        <>
                            {window.location.origin}/<input ref={routeURL} onChange={changeRouteURL} type='text' />/{selectedColumn}
                        </>
                    }
                </>
            }

            <ReactTable
                columns={data.headers}
                data={data.data}
                className="customReactTable ongoing-table"
                showPaginationBottom={true}
                defaultPageSize={10}
                getTrProps={action && action.url && getTrProp}
            />
        </>
    )
}

export default TableWidget