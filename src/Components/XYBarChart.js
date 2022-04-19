import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

function XYBarChart({ data ,chartid}) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            xyBarChart()
        }
    }, [data])

    const xyBarChart = () => {
        // Apply chart themes
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_kelly);

        // Create chart instance
        var chart = am4core.create(chartid, am4charts.XYChart);

        chart.marginRight = 400;

        // Add data
        chart.data = data.data;

        //console.log('chart', chart);

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = data.category;
        categoryAxis.title.text = data.category;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;

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

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = data.value;

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = data.value;
        series.dataFields.categoryX = data.category;
        series.name = data.value;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.stacked = true;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        return () => {
            chart.dispose();
        };

    }

    return <div className="chart-wrapper" id={chartid}></div>;

}


export default memo(XYBarChart);