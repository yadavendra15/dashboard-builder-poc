import React from 'react'
import { Link } from 'react-router-dom'
import { WidthProvider, Responsive } from "react-grid-layout";
import { cloneDeep, isEqual } from 'lodash';
import PieChart from '../Components/PieChart';
import HalfCirclePie from '../Components/HalfCirclePie';
import VariableRadiusPieChart from '../Components/VariableRadiusPieChart';
import PieChart3D from '../Components/PieChart3D';
import XYBarChart from '../Components/XYBarChart';
import SlicedChart from '../Components/SlicedChart';
import DonutChart from '../Components/DonutChart';
import XYLineChart from '../Components/XYLineChart';
import TableWidget from '../Components/TableWidget';
import CardWidget from '../Components/CardWidget';
import DraggablePieChart from '../Components/DraggablePieChart';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Dashboard() {
    var tableCount = 0;
    const getWidgets = (widget, data, action) => {
        switch (widget) {
            case "PieChart":
                return <div key={widget} data-grid={{ x: 0, y: 0, w: 5, h: 2 }}><PieChart data={data} /></div>
            case "HalfCirclePie":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><HalfCirclePie data={data} /></div>
            case "VariableRadiusPieChart":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><VariableRadiusPieChart data={data} /></div>
            case "DraggablePieChart":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><DraggablePieChart data={data} /></div>
            case "PieChart3D":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><PieChart3D data={data} /></div>
            case "XYBarChart":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><XYBarChart data={data} /></div>
            case "SlicedChart":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><SlicedChart data={data} /></div>
            case "DonutChart":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><DonutChart data={data} /></div>
            case "XYLineChart":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><XYLineChart data={data} /></div>
            case "TableWidget":
                tableCount++;
                return <div key={`${widget}-${tableCount}`} data-grid={{ x: 0, y: 1, w: 10, h: 2 }}><TableWidget data={data} action={action} /></div>
            case "CardWidget":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><CardWidget data={data} /></div>
        }
    }
    let savedData = JSON.parse(localStorage.getItem("savedConfig"));
    if (!savedData) {
        savedData = [];
    }
    return (
        <>
            <div>Dashboard</div>
            <Link to="/add-widget">Add a New Widget</Link>

            <ResponsiveReactGridLayout width={1200}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                preventCollision={true}
            >
                {

                    cloneDeep(savedData).map((component) => {
                        return getWidgets(component.widget, component.data, component.action)
                    })
                }
            </ResponsiveReactGridLayout>

        </>
    )
}

export default Dashboard