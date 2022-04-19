import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function XYLineChart({ data,chartid }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            xyLineChart()
        }
    }, [data])

    const xyLineChart = () => {
        am4core.useTheme(am4themes_animated);

        // Create chart instance
        var chart = am4core.create(chartid, am4charts.XYChart);
        chart.paddingRight = 20;

        // Add data
        chart.data = data.data

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = data.category;
        categoryAxis.title.text = data.category;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;

        // Create value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = data.value;
        series1.dataFields.categoryX = data.category;
        series1.strokeWidth = 3;
        series1.tensionX = 0.8;
        series1.bullets.push(new am4charts.CircleBullet());
        series1.connect = true;
        
        // Configure axis label
        var label = categoryAxis.renderer.labels.template;
        label.truncate = true;
        label.maxWidth = 200;
        label.tooltipText = "{category}";

        categoryAxis.events.on("sizechanged", function (ev) {
            var axis = ev.target;
            var cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
            if (cellWidth < axis.renderer.labels.template.maxWidth) {
                axis.renderer.labels.template.rotation = -45;
                axis.renderer.labels.template.horizontalCenter = "right";
                axis.renderer.labels.template.verticalCenter = "middle";
            }
            else {
                axis.renderer.labels.template.rotation = 0;
                axis.renderer.labels.template.horizontalCenter = "middle";
                axis.renderer.labels.template.verticalCenter = "top";
            }
        });
        
        chart.cursor = new am4charts.XYCursor();

        return () => {
            chart.dispose();
        };

    }

    return <div className="chart-wrapper" id={chartid}></div>;

}


export default memo(XYLineChart);