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

function AddWidget() {

    const [chartData, setChartData] = useState();
    const [chartType, setChartType] = useState();

    useEffect(() => {
        am4core.options.autoDispose = true;
        apiSelectBox.current.addEventListener("change", onChangeDataHandler);
        function onChangeDataHandler(e) {
            fetch(apiSelectBox.current.value)
                .then(response => response.json())
                .then(data => setChartData(data));
        }

        chartTypeBox.current.addEventListener("change", onChangeChartTypeHandler);
        function onChangeChartTypeHandler(e) {
            setChartData(undefined)
            apiSelectBox.current.value = '';
            setChartType(chartTypeBox.current.value);
        }

    }, [])

    useEffect(() => {
        // console.log(chartData, chartType)
    }, [chartData, chartType])

    const apiSelectBox = useRef()
    const chartTypeBox = useRef()

    const saveConfig = () => {
        const { value } = chartData;
        let savedData = JSON.parse(localStorage.getItem("savedConfig"));
        if (!!savedData) {
            savedData = [...savedData, { widget: chartType, data: chartData }];
            localStorage.setItem("savedConfig", JSON.stringify(savedData));
        }
        if (!savedData) {
            localStorage.setItem("savedConfig", JSON.stringify([{ widget: chartType, data: chartData }]));
        }
    }

    return (<>
        <div>AddWidget</div>
        <Link to="/dashboard">Go back to dashboard</Link>
        <div className="options-wrapper">
            <div className="options">
                <label>Widget Type : </label>
                <select id="chart-type" ref={chartTypeBox}>
                    <option value=''>--Select Chart Type--</option>
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
                </select>
            </div>
            <div className="options">
                <label>Data to be shown : </label>
                <select id="dynamicChartData" ref={apiSelectBox}>
                    <option value=''>--Select API--</option>
                    {(chartType !== 'TableWidget' && chartType !== "CardWidget") &&
                        <>
                            <option value="https://app-simulator.apps83.com/productData">Product Price Data</option>
                            <option value="https://app-simulator.apps83.com/countryData">Country Litre Data</option>
                            <option value="https://app-simulator.apps83.com/currencyData">Currency Amount Data</option>
                        </>
                    }
                    {chartType === 'TableWidget' && chartType !== 'CardWidget' &&
                        <>
                            <option value="https://app-simulator.apps83.com/usersData">User Details 40 records</option>
                            <option value="https://app-simulator.apps83.com/cityData">City Details records</option>
                            <option value="https://app-simulator.apps83.com/otherUsersData">User Details 99 records</option>
                        </>
                    }
                    {
                        chartType === 'CardWidget' &&
                        <option value="https://app-simulator.apps83.com/cardWidgetData">Card Widget Data</option>
                    }
                </select>
            </div>
            <div className="options">
                <button onClick={saveConfig}>Save Configuration</button>
            </div>
        </div>

        {chartType === 'PieChart' && <PieChart data={chartData} />}
        {chartType === 'HalfCirclePie' && <HalfCirclePie data={chartData} />}
        {chartType === 'VariableRadiusPieChart' && <VariableRadiusPieChart data={chartData} />}
        {chartType === 'XYBarChart' && <XYBarChart data={chartData} />}
        {chartType === 'DraggablePieChart' && <DraggablePieChart data={chartData} />}
        {chartType === 'PieChart3D' && <PieChart3D data={chartData} />}
        {chartType === 'SlicedChart' && <SlicedChart data={chartData} />}
        {chartType === 'DonutChart' && <DonutChart data={chartData} />}
        {chartType === 'XYLineChart' && <XYLineChart data={chartData} />}
        {chartType === 'TableWidget' && <TableWidget data={chartData} />}
        {chartType === 'CardWidget' && <CardWidget data={chartData} />}
    </>
    )
}

export default AddWidget