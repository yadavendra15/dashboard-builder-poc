import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function HalfCirclePie({ data,chartid, feature }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            halfCirclePie()
        }
    }, [data])

    const halfCirclePie = () => {
        am4core.useTheme(am4themes_animated);
        // Create chart instance
        let chart = am4core.create(chartid, am4charts.PieChart);

        // Add data
        chart.data = data.data

        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        // Add and configure Series
        let series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = data.value;
        series.dataFields.category = data.category;

        series.slices.template.cornerRadius = 10;
        series.slices.template.innerCornerRadius = 7;
        series.slices.template.draggable = true;
        series.slices.template.inert = true;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;

        // chart.legend = new am4charts.Legend();
        
        const getLegend = () => {
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
        }

        {feature && feature.legend.show && getLegend()}

        return () => {
            chart.dispose();
        };

    }

    return <div className="chart-wrapper" id={chartid}></div>;

}


export default memo(HalfCirclePie);