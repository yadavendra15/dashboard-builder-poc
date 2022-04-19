import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function DonutChart({ data,chartid }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            donutChart()
        }
    }, [data])

    const donutChart = () => {
        am4core.useTheme(am4themes_animated);
        // Create chart instance
        let chart = am4core.create(chartid, am4charts.PieChart);

        // Add data
        chart.data = data.data

        chart.padding(10, 0, 0, 0);
        chart.innerRadius = am4core.percent(40);
        var pieSeries = chart.series.push(new am4charts.PieSeries3D());
        pieSeries.dataFields.value = data.value;
        pieSeries.dataFields.category = data.category;

        pieSeries.fontSize = 13;

        var rgm = new am4core.RadialGradientModifier();
        rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
        pieSeries.slices.template.fillModifier = rgm;
        pieSeries.slices.template.strokeModifier = rgm;
        pieSeries.slices.template.strokeOpacity = 0.4;
        pieSeries.slices.template.strokeWidth = 0;

        chart.legend = new am4charts.Legend();

        return () => {
            chart.dispose();
        };

    }

    return <div className="chart-wrapper" id={chartid}></div>;

}


export default memo(DonutChart);