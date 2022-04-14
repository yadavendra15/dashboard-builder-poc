import * as am4core from "@amcharts/amcharts4/core";
import logo from './logo.svg';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import PieChart from './Components/PieChart'
import HalfCirclePie from './Components/HalfCirclePie';
import XYBarChart from './Components/XYBarChart';
import VariableRadiusPieChart from './Components/VariableRadiusPieChart';
import DraggablePieChart from './Components/DraggablePieChart';
import PieChart3D from './Components/PieChart3D';
import SlicedChart from './Components/SlicedChart';
import DonutChart from './Components/DonutChart';
import XYLineChart from './Components/XYLineChart';
import TableWidget from "./Components/TableWidget";
import CardWidget from "./Components/CardWidget";
// import DataTable from "./Components/DataTable";
function App() {

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

  return (
    <div className="App">
      <div className="options-wrapper">
        <div>
          <label>Widget Type : </label>
          <select id="chart-type" ref={chartTypeBox}>
            <option value=''>--Select Chart Type--</option>
            <option value='SimplePie'>Simple Pie Chart</option>
            <option value='HalfCirclePie'>Half Circle Pie Chart</option>
            <option value='VariableRadiusPie'>Variable Radius Pie Chart</option>
            <option value='DraggablePie'>Draggable Pie Chart</option>
            <option value='3DPieChart'>3D Pie Chart</option>
            <option value='XYBarChart'>XY Bar Chart</option>
            <option value='SlicedChart'>Sliced Funnel Chart</option>
            <option value='DonutChart'>Donut Chart</option>
            <option value='XYLineChart'>Line Chart</option>
            <option value='DataTable'>Data Table</option>
            <option value='CardWidget'>Card Widget</option>
          </select>
        </div>
        <div>
          <label>Data to be shown : </label>
          <select id="dynamicChartData" ref={apiSelectBox}>
            <option value=''>--Select API--</option>
            {(chartType !== 'DataTable' && chartType !== "CardWidget") &&
              <>
                <option value="https://625516ca19bc53e23484f66d.mockapi.io/api/v1/chartData2">Product Price Data</option>
                <option value="https://625516ca19bc53e23484f66d.mockapi.io/api/v1/chartData">Country Litre Data</option>
              </>
            }
            {chartType === 'DataTable' && chartType !== 'CardWidget' &&
              <>
                <option value="https://625516ca19bc53e23484f66d.mockapi.io/api/v1/tablesData">User Details 40 rows</option>
                <option value="https://625516ca19bc53e23484f66d.mockapi.io/api/v1/tablesData2">User Details 99rows</option>
              </>
            } {
              chartType === 'CardWidget' &&
              <option value="http://demo4489656.mockable.io/cardData">Card Widget Data</option>
            }
          </select>
        </div>
      </div>

      {chartType === 'SimplePie' && <PieChart data={chartData} />}
      {chartType === 'HalfCirclePie' && <HalfCirclePie data={chartData} />}
      {chartType === 'VariableRadiusPie' && <VariableRadiusPieChart data={chartData} />}
      {chartType === 'XYBarChart' && <XYBarChart data={chartData} />}
      {chartType === 'DraggablePie' && <DraggablePieChart data={chartData} />}
      {chartType === '3DPieChart' && <PieChart3D data={chartData} />}
      {chartType === 'SlicedChart' && <SlicedChart data={chartData} />}
      {chartType === 'DonutChart' && <DonutChart data={chartData} />}
      {chartType === 'XYLineChart' && <XYLineChart data={chartData} />}
      {chartType === 'DataTable' && <TableWidget data={chartData} />}
      {chartType === 'CardWidget' && <CardWidget data={chartData} />}
    </div>
  );
}

export default App;
