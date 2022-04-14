import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function VariableRadiusPie({ data }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            variableRadiusPie()
        }
    }, [data])

    const variableRadiusPie = () => {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("variable-radius-pie", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = data.data

        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = data.value;
        series.dataFields.radiusValue = data.value;
        series.dataFields.category = data.category;
        series.slices.template.cornerRadius = 6;
        series.colors.step = 3;

        series.hiddenState.properties.endAngle = -90;

        chart.legend = new am4charts.Legend();

        return () => {
            chart.dispose();
        };

    }

    return <div className="chart-wrapper" id="variable-radius-pie"></div>;

}


export default memo(VariableRadiusPie);