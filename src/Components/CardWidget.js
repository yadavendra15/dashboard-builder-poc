import React from 'react'

function CardWidget({ data }) {
    // console.log(data)
    return (
        <div className="container">
            <div className="row">
                {
                    data && (data.length > 0 &&
                    data.map(function(el, index) {
                        return (<div key={index} className="col-md-3">
                                <div className="card-counter">
                                    {/* <i class="fa fa-code-fork"></i> */}
                                    <span className="count-numbers">{el.count}</span>
                                    <span className="count-name">{el.header}</span>
                                </div>
                            </div>)
                    }))
                }
            </div>
        </div>
    )
}

export default CardWidget