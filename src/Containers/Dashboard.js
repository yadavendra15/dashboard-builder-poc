import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import NewBarChart from '../Components/NewBarChart';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
//let layout=getSavedLayout();

function Dashboard({ dashboardConfig, type }) {

    const params = useParams();
    const pathkey=window.location.pathname.split('/')[1]||'layout';
    const[path,setPath]=useState(pathkey);
   // console.log(params,layout,'layout cnsl')

    if (!dashboardConfig) {
        dashboardConfig = [];
    }

    const getWidgets = (widget, data, action, feature) => {
       let ctype=widget.split('/')[0];
        switch (ctype) {
            case "PieChart":
                return <div key={widget} data-grid={getLayout(widget)}><PieChart data={data} chartid={widget} feature={feature} /></div>
            case "HalfCirclePie":
                return <div key={widget} data-grid={getLayout(widget)}><HalfCirclePie data={data} chartid={widget} feature={feature} /></div>
            case "VariableRadiusPieChart":
                return <div key={widget} data-grid={getLayout(widget)}><VariableRadiusPieChart data={data} chartid={widget} feature={feature} /></div>
            case "DraggablePieChart":
                return <div key={widget} data-grid={getLayout(widget)}><DraggablePieChart data={data} chartid={widget} feature={feature}/></div>
            case "PieChart3D":
                return <div key={widget} data-grid={getLayout(widget)}><PieChart3D data={data} chartid={widget} feature={feature}/></div>
            case "XYBarChart":
                return <div key={widget} data-grid={getLayout(widget)}><XYBarChart data={data} chartid={widget} feature={feature}/></div>
            case "SlicedChart":
                return <div key={widget} data-grid={getLayout(widget)}><SlicedChart data={data} chartid={widget} feature={feature}/></div>
            case "DonutChart":
                return <div key={widget} data-grid={getLayout(widget)}><DonutChart data={data} chartid={widget} feature={feature} /></div>
            case "XYLineChart":
                return <div key={widget} data-grid={getLayout(widget)}><XYLineChart data={data} chartid={widget} feature={feature}/></div>
            case "TableWidget":
                return <div key={widget} data-grid={getLayout(widget)}><TableWidget data={data} action={action} /></div>
            case "CardWidget":
                return <div key={widget} data-grid={getLayout(widget)}><CardWidget data={data} /></div>
            case "NewBarChart":
                return <div key={widget} data-grid={getLayout(widget)}><NewBarChart data={data} chartid={widget} /></div>
        }
    }

    const onLayoutChange=(currlayout)=>{
        localStorage.setItem(`${path}-layout`,JSON.stringify(currlayout));      
    }

    function getLayout(key){
       let layout=getSavedLayout(path);
    let config=layout[key]||{ x: 0, y: 0, w: 5, h: 2 };
    return config;
    }

    return (
        <>
            <div>Dashboard</div>
            {type === 'main' && <Link to="/add-widget">Add a New Widget</Link>}
            <ResponsiveReactGridLayout width={1200}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                onLayoutChange={onLayoutChange}
                allowOverlap={false}
            >
                {
                    cloneDeep(dashboardConfig).map((component) => {
                        return getWidgets(component.widget, component.data, component.action, component.feature)
                    })
                }
            </ResponsiveReactGridLayout>

        </>
    )
}

function getSavedLayout(pathname){
    let  tmplayout=JSON.parse(localStorage.getItem(`${pathname}-layout`));
    let obj={};
    if(tmplayout){tmplayout=tmplayout.map(({w,h,x,y,i})=>{
        obj= {...obj,[i]:{w,h,x,y}}
    })}
    tmplayout=obj;
       return tmplayout;
   }

export default Dashboard