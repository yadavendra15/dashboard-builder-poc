import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function SlicedChart({ data,chartid, feature }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            slicedChart()
        }
    }, [data])

    const slicedChart = () => {

        am4core.useTheme(am4themes_animated);

        let chart = am4core.create(chartid, am4charts.SlicedChart);
        chart.data = data.data

        let series = chart.series.push(new am4charts.FunnelSeries());
        series.dataFields.value = data.value;
        series.dataFields.category = data.category;
        series.alignLabels = true;
        series.orientation = "horizontal";

        
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


export default memo(SlicedChart);