import React, { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { SliderPicker } from "react-color";

export default function NewBarChart({ response }) {

    let firstRender = useRef(true);
    var rootChart = useRef();

    // const [width, setWidth] = useState(50);
    const [config, setConfig] = useState({
        legend: true,
        cursor: true,
        width: 70,
        fillOpacity: 0.5,
        strokeWidth: 2,
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        fill: "#000000",
        stroke: "#ffffff"
    })
    useEffect(() => {
        if (response) {
            if (firstRender.current) {
                let root = am5.Root.new(response.widgetId);
                rootChart.current = root
                let chart = createBarChart();
                firstRender.current = false;
                return (() => {
                    chart.dispose()
                })
            } else {
                let chart = createBarChart();
                return (() => {
                    chart.dispose()
                })
            }
        }
    }, [response, config])

    useEffect(() => {
        console.log(config)
    }, [config])

    function createBarChart() {

        rootChart.current.setThemes([am5themes_Animated.new(rootChart.current)]);

        let chart = rootChart.current.container.children.push(
            am5xy.XYChart.new(rootChart.current, {
                panY: false,
                layout: rootChart.current.verticalLayout
            })
        );

        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(rootChart.current, {
                renderer: am5xy.AxisRendererY.new(rootChart.current, {})
            })
        );

        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(rootChart.current, {
                renderer: am5xy.AxisRendererX.new(rootChart.current, {}),
                categoryField: response.widgetData.category
            })
        );

        // Create series
        let series1 = chart.series.push(
            am5xy.ColumnSeries.new(rootChart.current, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: response.widgetData.value,
                categoryXField: response.widgetData.category,
                fill: am5.color(config.fill),
                stroke: am5.color(config.stroke)
            })
        );

        xAxis.data.setAll(response.widgetData.data);
        series1.data.setAll(response.widgetData.data);

        series1.columns.template.setAll({
            width: parseFloat(config.width),
            fillOpacity: parseFloat(config.fillOpacity),
            strokeWidth: parseFloat(config.strokeWidth),
            cornerRadiusTL: parseFloat(config.cornerRadiusTL),
            cornerRadiusTR: parseFloat(config.cornerRadiusTR)
        });

        // Add legend
        {
            config.legend.show &&
                (function () {
                    let legend = chart.children.push(am5.Legend.new(rootChart.current, {}));
                    legend.data.setAll(chart.series.values)
                })();
        }

        // Add cursor
        { config.cursor && chart.set("cursor", am5xy.XYCursor.new(rootChart.current, {})) }

        return chart;
    }

    // const config = {
        // "legend": {
        //     "show": true,
        // },
        // "cursor": true,
        // "width": 70,
        // "fillOpacity": 0.5,
        // "strokeWidth": 2,
        // "cornerRadiusTL": 5,
        // "cornerRadiusTR": 5,
        // "fill": 0x095256,
        // "stroke": 0x095256
    // }

    // const changeWidth = (e) => {
    //     setWidth(e.target.value)
    // }

    const handleChangeFillColor = (color) => {
        setConfig((prev) => ({ ...prev, fill: color.hex }));
      };

    const handleChangeStrokeColor = (color) => {
        setConfig((prev) => ({ ...prev, stroke: color.hex }));
      };

    return (
        response &&
        <>
            <div className="row">
                <div className="col-md-4">
                    <label>Legend : </label>
                    <input type="checkbox" onChange={(e) => setConfig((prev) => ({ ...prev, legend: e.target.checked}))} />
                </div>
                <div className="col-md-4">
                    <label>Cursor : </label>
                    <input type="checkbox" onChange={(e) => setConfig((prev) => ({ ...prev, cursor: e.target.checked}))} />
                </div>
                <div className="col-md-4">
                    <label>Width : </label>
                    <input type="range" min="10" max="100" value={config.width} onChange={(e) => setConfig((prev) => ({ ...prev, width: e.target.value}))} />
                </div>
                <div className="col-md-4">
                    <label>Fill Opacity : </label>
                    <input type="range" min="0" max="1" step="0.1" value={config.fillOpacity} onChange={(e) => setConfig((prev) => ({ ...prev, fillOpacity: e.target.value}))} />
                </div>
                <div className="col-md-4">
                    <label>Stroke Width : </label>
                    <input type="range" min="1" max="10" value={config.strokeWidth} onChange={(e) => setConfig((prev) => ({ ...prev, strokeWidth: e.target.value}))} />
                </div>
                <div className="col-md-4">
                    <label>Corner Radius TopLeft : </label>
                    <input type="range" min="1" max="10" value={config.cornerRadiusTL} onChange={(e) => setConfig((prev) => ({ ...prev, cornerRadiusTL: e.target.value}))} />
                </div>
                <div className="col-md-4">
                    <label>Corner Radius TopRight : </label>
                    <input type="range" min="1" max="10" value={config.cornerRadiusTR} onChange={(e) => setConfig((prev) => ({ ...prev, cornerRadiusTR: e.target.value}))} />
                </div>
                <div className="col-md-4">
                    <label>Fill Color : </label>
                    <SliderPicker color={config.fill} onChangeComplete={handleChangeFillColor} />
                </div>
                <div className="col-md-4">
                    <label>Stroke Color : </label>
                    <SliderPicker color={config.stroke} onChangeComplete={handleChangeStrokeColor} />
                </div>
            </div>
            <div style={{ height: "400px", width: "100%" }} id={response.widgetId}></div>
        </>
    );
}