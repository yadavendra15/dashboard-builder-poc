import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function PieChart3D({ data }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            pieChart3D()
        }
    }, [data])

    const pieChart3D = () => {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("pie-3d", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = data.data;

        chart.innerRadius = am4core.percent(40);
        chart.depth = 120;

        // chart.legend = new am4charts.Legend();
        // chart.legend.position = "right";

        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = data.value;
        series.dataFields.depthValue = data.value;
        series.dataFields.category = data.category;
        series.slices.template.cornerRadius = 5;
        series.colors.step = 3;

        return () => {
            chart.dispose();
        };

    }

    return <div className="chart-wrapper" id="pie-3d"></div>;

}


export default memo(PieChart3D);