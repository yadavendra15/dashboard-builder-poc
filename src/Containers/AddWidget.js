import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as am4core from "@amcharts/amcharts4/core";
import CardWidget from '../Components/CardWidget';
import DonutChart from '../Components/DonutChart';
import DraggablePieChart from '../Components/DraggablePieChart';
import HalfCirclePie from '../Components/HalfCirclePie';
import PieChart from '../Components/PieChart';
import PieChart3D from '../Components/PieChart3D';
import SlicedChart from '../Components/SlicedChart';
import TableWidget from '../Components/TableWidget';
import VariableRadiusPieChart from '../Components/VariableRadiusPieChart';
import XYBarChart from '../Components/XYBarChart';
import XYLineChart from '../Components/XYLineChart';
import { v4 as uid } from 'uuid';
import NewBarChart from '../Components/NewBarChart';

function AddWidget({ type }) {

    const [widgetData, setWidgetData] = useState();
    const [widgetType, setChartType] = useState();
    const [legend, setLegend] = useState(false);

    useEffect(() => {
        am4core.options.autoDispose = true;
        apiSelectBox.current.addEventListener("change", onChangeDataHandler);
        function onChangeDataHandler(e) {
            fetch(apiSelectBox.current.value)
                .then(response => response.json())
                .then(data => setWidgetData(data));
        }

        widgetTypeBox.current.addEventListener("change", onChangeChartTypeHandler);
        function onChangeChartTypeHandler(e) {
            setWidgetData(undefined)
            apiSelectBox.current.value = '';
            setChartType(widgetTypeBox.current.value);
        }

    }, [])

    useEffect(() => {
        // console.log(widgetData, widgetType)
    }, [widgetData, widgetType])

    const apiSelectBox = useRef()
    const widgetTypeBox = useRef()
    const showLegend = useRef()


    // for the table widgets
    const [selectedColumn, setSelectedColumn] = useState();
    const [routeURL, setRouteURL] = useState();
    const actionSelected = (e) => {
        setSelectedColumn(e.target.value)
    }
    const changeRouteURL = (e) => {
        setRouteURL(e.target.value)
    }
    const changeLegend = (e) => {
        setLegend(showLegend.current.checked)
    }

    useEffect(() => {
        console.log(legend)
    }, [legend])

    const saveConfig = () => {
        let widgetConfig;
        widgetConfig = JSON.parse(localStorage.getItem("savedConfig"));
        if (type === 'main') {
            if (!!widgetConfig) {
                let id=uid();
                widgetConfig = [...widgetConfig, { widget: `${widgetType}/${id}`, data: widgetData, action: { column: selectedColumn, url: routeURL }, feature: { legend: {show: legend, position: '' } } } ];
                localStorage.setItem("savedConfig", JSON.stringify(widgetConfig));
            }
            if (!widgetConfig) {
                let id=uid();
                widgetConfig = [{ widget: `${widgetType}/${id}`, data: widgetData, action: { column: selectedColumn, url: routeURL }, feature: { legend: {show: legend, position: '' } } }]
                localStorage.setItem("savedConfig", JSON.stringify(widgetConfig));
            }
        }
        else if (type === 'drilled-down') {
            let pathname = window.location.pathname;
            let pathnameArr = pathname.split('/');
            let actionUrl = pathnameArr[1];
            let selectedItemIndex = widgetConfig.findIndex(el => el.action.url === actionUrl);
            let drilledData = widgetConfig[selectedItemIndex].drilledData
            if (drilledData) {
                widgetConfig[selectedItemIndex].drilledData = [...drilledData, { widget: widgetType, data: widgetData }]
            }
            else {
                widgetConfig[selectedItemIndex].drilledData = [{ widget: widgetType, data: widgetData }]
            }
            localStorage.setItem("savedConfig", JSON.stringify(widgetConfig));
        }
    }

    return (<>
        <div>AddWidget</div>
        <Link to="/dashboard">Go back to dashboard</Link>
        <div className="options-wrapper">
            <div className="options">
                <label>Widget Type : </label>
                <select id="chart-type" ref={widgetTypeBox}>
                    <option value=''>--Select Widget Type--</option>
                    <option value='PieChart'>Simple Pie Chart</option>
                    <option value='HalfCirclePie'>Half Circle Pie Chart</option>
                    <option value='VariableRadiusPieChart'>Variable Radius Pie Chart</option>
                    <option value='DraggablePieChart'>Draggable Pie Chart</option>
                    <option value='PieChart3D'>3D Pie Chart</option>
                    <option value='XYBarChart'>XY Bar Chart</option>
                    <option value='SlicedChart'>Sliced Funnel Chart</option>
                    <option value='DonutChart'>Donut Chart</option>
                    <option value='XYLineChart'>Line Chart</option>
                    <option value='TableWidget'>Data Table</option>
                    <option value='CardWidget'>Card Widget</option>
                    <option value='NewBarChart'>New Bar Chart</option>
                </select>
            </div>
            <div className="options">
                <label>Data to be shown : </label>
                <select id="dynamicWidgetData" ref={apiSelectBox}>
                    <option value=''>--Select API--</option>
                    {(widgetType !== 'TableWidget' && widgetType !== "CardWidget" && widgetType !== "NewBarChart") &&
                        <>
                            <option value="https://app-simulator.apps83.com/productData">Product Price Data</option>
                            <option value="https://app-simulator.apps83.com/countryData">Country Litre Data</option>
                            <option value="https://app-simulator.apps83.com/currencyData">Currency Amount Data</option>
                        </>
                    }
                    {widgetType === 'TableWidget' && widgetType !== 'CardWidget' && widgetType !== "NewBarChart" &&
                        <>
                            <option value="https://app-simulator.apps83.com/usersData">User Details 40 records</option>
                            <option value="https://app-simulator.apps83.com/cityData">City Details records</option>
                            <option value="https://app-simulator.apps83.com/otherUsersData">User Details 99 records</option>
                        </>
                    }
                    {
                        widgetType === 'CardWidget' && widgetType !== "NewBarChart" &&
                        <option value="https://app-simulator.apps83.com/cardWidgetData">Card Widget Data</option>
                    }
                    {
                        widgetType === "NewBarChart" && 
                        <option value ="https://app-simulator.apps83.com/barChartConfig">Bar Chart Data</option>
                    }
                </select>
            </div>
            <br />
            {widgetData && <>Show Legend : <input type="checkbox" ref={showLegend} onChange={changeLegend} /></>}
            <br />
            <div className="options">
                <button onClick={saveConfig}>Save Configuration</button>
            </div>
        </div>

        {widgetType === 'PieChart' && <PieChart data={widgetData} chartid={uid()} />}
        {widgetType === 'HalfCirclePie' && <HalfCirclePie data={widgetData} chartid={uid()} />}
        {widgetType === 'VariableRadiusPieChart' && <VariableRadiusPieChart data={widgetData} chartid={uid()} />}
        {widgetType === 'XYBarChart' && <XYBarChart data={widgetData} chartid={uid()} />}
        {widgetType === 'DraggablePieChart' && <DraggablePieChart data={widgetData} chartid={uid()} />}
        {widgetType === 'PieChart3D' && <PieChart3D data={widgetData} chartid={uid()} />}
        {widgetType === 'SlicedChart' && <SlicedChart data={widgetData} chartid={uid()} />}
        {widgetType === 'DonutChart' && <DonutChart data={widgetData} chartid={uid()} />}
        {widgetType === 'XYLineChart' && <XYLineChart data={widgetData} chartid={uid()} />}
        {widgetType === 'TableWidget' && <TableWidget data={widgetData} selectedColumn={selectedColumn} actionSelected={(e) => actionSelected(e)} changeRouteURL={(e) => changeRouteURL(e)} />}
        {widgetType === 'CardWidget' && <CardWidget data={widgetData} />}
        {widgetType === 'NewBarChart' && <NewBarChart response={widgetData} />}
    </>
    )
}

export default AddWidget