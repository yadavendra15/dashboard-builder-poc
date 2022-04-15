import React from 'react'
import { Link } from 'react-router-dom'
import { WidthProvider, Responsive } from "react-grid-layout";
import { cloneDeep, isEqual } from 'lodash';
import PieChart from '../Components/PieChart';
import HalfCirclePie from '../Components/HalfCirclePie';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Dashboard() {

    const getWidgets = (widget, data) => {
        switch (widget) {
            case "PieChart":
                return <div key={widget} data-grid={{ x: 0, y: 0, w: 5, h: 2 }}><PieChart data={data} /></div>
            case "HalfCirclePie":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><HalfCirclePie data={data} /></div>
        }


    }
    const layout = [
        { i: "PieChart", x: 0, y: 0, w: 40, h: 30 },
        { i: "HalfCirclePie", x: 1, y: 0, w: 40, h: 30 }
    ];
    return (
        <>
            <div>Dashboard</div>
            <Link to="/add-widget">Add a New Widget</Link>

            <ResponsiveReactGridLayout width={1200}
                // layout={layout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
            >
                {
                    cloneDeep([
                        {
                            widget: 'PieChart',
                            data: { "category": "country", "value": "litres", "data": [{ "country": "Avon", "litres": 74919, "id": "1" }, { "country": "Berkshire", "litres": 34382, "id": "2" }, { "country": "Buckinghamshire", "litres": 94658, "id": "3" }, { "country": "Berkshire", "litres": 62189, "id": "4" }, { "country": "Avon", "litres": 67600, "id": "5" }, { "country": "Berkshire", "litres": 48585, "id": "6" }, { "country": "Avon", "litres": 20726, "id": "7" }, { "country": "Borders", "litres": 55437, "id": "8" }, { "country": "Bedfordshire", "litres": 54100, "id": "9" }, { "country": "Bedfordshire", "litres": 60326, "id": "10" }, { "country": "Buckinghamshire", "litres": 54010, "id": "11" }, { "country": "Borders", "litres": 88730, "id": "12" }, { "country": "Borders", "litres": 43059, "id": "13" }, { "country": "Borders", "litres": 42245, "id": "14" }, { "country": "Bedfordshire", "litres": 34979, "id": "15" }] },
                            url: "productData"
                        },
                        {
                            widget: 'HalfCirclePie',
                            data: { "category": "country", "value": "litres", "data": [{ "country": "Avon", "litres": 74919, "id": "1" }, { "country": "Berkshire", "litres": 34382, "id": "2" }, { "country": "Buckinghamshire", "litres": 94658, "id": "3" }, { "country": "Berkshire", "litres": 62189, "id": "4" }, { "country": "Avon", "litres": 67600, "id": "5" }, { "country": "Berkshire", "litres": 48585, "id": "6" }, { "country": "Avon", "litres": 20726, "id": "7" }, { "country": "Borders", "litres": 55437, "id": "8" }, { "country": "Bedfordshire", "litres": 54100, "id": "9" }, { "country": "Bedfordshire", "litres": 60326, "id": "10" }, { "country": "Buckinghamshire", "litres": 54010, "id": "11" }, { "country": "Borders", "litres": 88730, "id": "12" }, { "country": "Borders", "litres": 43059, "id": "13" }, { "country": "Borders", "litres": 42245, "id": "14" }, { "country": "Bedfordshire", "litres": 34979, "id": "15" }] },
                            url: "currencyData"
                        }
                    ]).map((component) => {
                        return getWidgets(component.widget, component.data)
                    })
                }
            </ResponsiveReactGridLayout>

        </>
    )
}

export default Dashboard