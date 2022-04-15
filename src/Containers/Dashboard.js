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
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Dashboard() {


    //           <option value='XYBarChart'>XY Bar Chart</option>
    //           <option value='SlicedChart'>Sliced Funnel Chart</option>
    //           <option value='DonutChart'>Donut Chart</option>
    //           <option value='XYLineChart'>Line Chart</option>
    //           <option value='TableWidget'>Data Table</option>
    //           <option value='CardWidget'>Card Widget</option>

    const getWidgets = (widget, data) => {
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
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><TableWidget data={data} /></div>
            case "CardWidget":
                return <div key={widget} data-grid={{ x: 0, y: 1, w: 5, h: 2 }}><CardWidget data={data} /></div>
        }
    }
    let savedData = JSON.parse(localStorage.getItem("savedConfig"));
    if(!savedData) {
        savedData = [];
    }
    return (
        <>
            <div>Dashboard</div>
            <Link to="/add-widget">Add a New Widget</Link>

            <ResponsiveReactGridLayout width={1200}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
            >
                {
                    
                    cloneDeep(savedData).map((component) => {
                        return getWidgets(component.widget, component.data)
                    })
                }
            </ResponsiveReactGridLayout>

        </>
    )
}

export default Dashboard