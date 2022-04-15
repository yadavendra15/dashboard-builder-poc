import React from 'react'
import { Link } from 'react-router-dom'

function AddWidget() {
    return (<>
        <div>AddWidget</div>
        <Link to="/dashboard">Go back to dashboard</Link>
    </>
    )
}

export default AddWidget