import React, { memo, useEffect, useRef, useLayoutEffect } from "react";
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function DraggablePieChart({ data, chartid, feature }) {
    // console.log(data)

    useEffect(() => {
        if (data) {
            draggablePieChart()
        }
    }, [data])

    const draggablePieChart = () => {

        am4core.useTheme(am4themes_animated);

        var widgetData = [{
            "disabled": true,
            "color": am4core.color("#dadada"),
            "opacity": 0.3,
            "strokeDasharray": "4,4"
        }, ...data.data];
        widgetData[0][data.category] = "Dummy";
        widgetData[0][data.value] = 1000;

        
        const getLegend = () => {
            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
        }

        {feature && feature.legend.show && getLegend()}

        // cointainer to hold both charts
        var chart = am4core.create(chartid, am4core.Container);
        chart.width = am4core.percent(100);
        chart.height = am4core.percent(100);
        chart.layout = "horizontal";

        chart.events.on("maxsizechanged", function () {
            chart1.zIndex = 0;
            separatorLine.zIndex = 1;
            dragText.zIndex = 2;
            chart2.zIndex = 3;
        })

        var chart1 = chart.createChild(am4charts.PieChart);
        chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart1.data = widgetData;
        chart1.radius = am4core.percent(70);
        chart1.innerRadius = am4core.percent(40);
        chart1.zIndex = 1;

        var series1 = chart1.series.push(new am4charts.PieSeries());
        series1.dataFields.value = data.value;
        series1.dataFields.category = data.category;
        series1.colors.step = 2;

        var sliceTemplate1 = series1.slices.template;
        sliceTemplate1.cornerRadius = 5;
        sliceTemplate1.draggable = true;
        sliceTemplate1.inert = true;
        sliceTemplate1.propertyFields.fill = "color";
        sliceTemplate1.propertyFields.fillOpacity = "opacity";
        sliceTemplate1.propertyFields.stroke = "color";
        sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
        sliceTemplate1.strokeWidth = 1;
        sliceTemplate1.strokeOpacity = 1;

        var zIndex = 5;

        sliceTemplate1.events.on("down", function (event) {
            event.target.toFront();
            // also put chart to front
            var series = event.target.dataItem.component;
            series.chart.zIndex = zIndex++;
        })

        series1.labels.template.propertyFields.disabled = "disabled";
        series1.ticks.template.propertyFields.disabled = "disabled";

        sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;

        sliceTemplate1.events.on("dragstop", function (event) {
            handleDragStop(event);
        })

        // separator line and text
        var separatorLine = chart.createChild(am4core.Line);
        separatorLine.x1 = 0;
        separatorLine.y2 = 300;
        separatorLine.strokeWidth = 3;
        separatorLine.stroke = am4core.color("#dadada");
        separatorLine.valign = "middle";
        separatorLine.strokeDasharray = "5,5";


        var dragText = chart.createChild(am4core.Label);
        dragText.text = "Drag slices over the line";
        dragText.rotation = 90;
        dragText.valign = "middle";
        dragText.align = "center";
        dragText.paddingBottom = 5;

        // second chart
        var chart2 = chart.createChild(am4charts.PieChart);
        chart2.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart2.radius = am4core.percent(70);
        chart2.data = widgetData;
        chart2.innerRadius = am4core.percent(40);
        chart2.zIndex = 1;

        var series2 = chart2.series.push(new am4charts.PieSeries());
        series2.dataFields.value = data.value;
        series2.dataFields.category = data.category;
        series2.colors.step = 2;

        var sliceTemplate2 = series2.slices.template;
        sliceTemplate2.copyFrom(sliceTemplate1);

        series2.labels.template.propertyFields.disabled = "disabled";
        series2.ticks.template.propertyFields.disabled = "disabled";

        function handleDragStop(event) {
            var targetSlice = event.target;
            var dataItem1;
            var dataItem2;
            var slice1;
            var slice2;

            if (series1.slices.indexOf(targetSlice) != -1) {
                slice1 = targetSlice;
                slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
            }
            else if (series2.slices.indexOf(targetSlice) != -1) {
                slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
                slice2 = targetSlice;
            }


            dataItem1 = slice1.dataItem;
            dataItem2 = slice2.dataItem;

            var series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
            var series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

            var series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
            var series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

            // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
            var targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

            if (targetSlice == slice1) {
                if (targetSlicePoint.x > chart.pixelWidth / 2) {
                    var value = dataItem1.value;

                    dataItem1.hide();

                    var animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
                    animation.events.on("animationprogress", function (event) {
                        slice1.hideTooltip();
                    })

                    slice2.x = 0;
                    slice2.y = 0;

                    dataItem2.show();
                }
                else {
                    slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                }
            }
            if (targetSlice == slice2) {
                if (targetSlicePoint.x < chart.pixelWidth / 2) {

                    var value = dataItem2.value;

                    dataItem2.hide();

                    var animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
                    animation.events.on("animationprogress", function (event) {
                        slice2.hideTooltip();
                    })

                    slice1.x = 0;
                    slice1.y = 0;
                    dataItem1.show();
                }
                else {
                    slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                }
            }

            toggleDummySlice(series1);
            toggleDummySlice(series2);

            series1.hideTooltip();
            series2.hideTooltip();
        }

        function toggleDummySlice(series) {
            var show = true;
            for (var i = 1; i < series.dataItems.length; i++) {
                var dataItem = series.dataItems.getIndex(i);
                if (dataItem.slice.visible && !dataItem.slice.isHiding) {
                    show = false;
                }
            }

            var dummySlice = series.dataItems.getIndex(0);
            if (show) {
                dummySlice.show();
            }
            else {
                dummySlice.hide();
            }
        }

        series2.events.on("datavalidated", function () {

            var dummyDataItem = series2.dataItems.getIndex(0);
            dummyDataItem.show(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;

            for (var i = 1; i < series2.dataItems.length; i++) {
                series2.dataItems.getIndex(i).hide(0);
            }
        })

        series1.events.on("datavalidated", function () {
            var dummyDataItem = series1.dataItems.getIndex(0);
            dummyDataItem.hide(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;
        })

        return () => {
            chart.dispose();
        };

    }

    return <div className="chart-wrapper" id={chartid}></div>;

}


export default memo(DraggablePieChart);