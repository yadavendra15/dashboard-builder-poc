import React, { memo, useEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function PieChart({ data }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            pieChart()
        }
    }, [data])

    const pieChart = () => {
        am4core.useTheme(am4themes_animated);
        // Create chart instance
        let chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data = data.data

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = data.value;
        pieSeries.dataFields.category = data.category;
    }

    return <div className="chart-wrapper" id="chartdiv"></div>;

}

export default memo(PieChart);