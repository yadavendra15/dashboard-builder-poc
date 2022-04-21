import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function NewBarChart({ data, chartid }) {

    let firstRender = useRef(true);
    var rootChart = useRef();
    useEffect(() => {
        let root = am5.Root.new(chartid);
        rootChart.current = root
        if (data) {
            let chart = createBarChart();
            return (() => {
                chart.dispose();
            })
        }
    }, [])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
        } else {
            let chart = createBarChart();
            return (() => {
                chart.dispose()
            })
        }
    }, [data])

    // This code will only run one time
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
                categoryField: data.category
            })
        );

        // Create series
        let series1 = chart.series.push(
            am5xy.ColumnSeries.new(rootChart.current, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: data.value,
                categoryXField: data.category
            })
        );

        xAxis.data.setAll(data.data);
        series1.data.setAll(data.data);

        // Add legend
        let legend = chart.children.push(am5.Legend.new(rootChart.current, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(rootChart.current, {}));

        return chart;
    }

    return (
        <div style={{ height: "290px", width: "100%" }} id={chartid}></div>
    );
}
