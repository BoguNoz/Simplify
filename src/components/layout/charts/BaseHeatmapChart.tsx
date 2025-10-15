import {observer} from "mobx-react-lite";
import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface BaseHeatmapChartProps {
    data: Float32Array; // [x1, y1, value1, x2, y2, value2, ...]

    palette: string[]

    matrixHeight: number;
    matrixWith: number

    minValue?: number;
    maxValue?: number;

    useCanvas?: boolean
}


const BaseHeatmapChart: React.FC<BaseHeatmapChartProps> = observer(({data, palette, matrixHeight, matrixWith, minValue, maxValue, useCanvas}) => {
    const yAxis = useMemo(
        () => Array.from({ length: matrixHeight }, (_, i) => i),
        [matrixHeight]
    );
    const xAxis = useMemo(
        () => Array.from({ length: matrixWith }, (_, i) => i),
        [matrixWith]
    );

    const dataset = useMemo(() => {
        return [
            {
                source: data,
                dimensions: ["x", "y", "value"],
            },
        ];
    }, [data]);

    const series = useMemo(() => ([
        {
            type: "heatmap" as const,
            datasetIndex: 0,
            encode: { x: 0, y: 1, value: 2 },
            progressive: 1000,
            animation: false,
            ...(useCanvas ? { renderMode: "canvas" as const } : {}),
        },
    ]), [useCanvas]);

    const option = useMemo(() => ({
        dataset: dataset,
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            containLabel: false,
        },
        xAxis: {
            type: "category",
            data: xAxis,
            axisTick: { show: false },
            axisLabel: { show: false },
        },
        yAxis: {
            type: "category",
            data: yAxis,
            axisTick: { show: false },
            axisLabel: { show: false },
        },
        visualMap: {
            show: false,
            min: minValue,
            max: maxValue,
            inRange: { color: palette ?? ["#313695","#4575b4","#74add1","#abd9e9","#e0f3f8","#ffffbf","#fee090","#fdae61","#f46d43","#d73027","#a50026"] },
        },
        tooltip: {
            trigger: "item",
            formatter: (params: any) => {
                const d = params.data;
                const x = d?.[0];
                const y = d?.[1];
                const v = d?.[2];
                const vStr = typeof v === "number" ? v.toFixed(4) : String(v ?? "");
                return `x: ${x}<br/>y: ${y}<br/>value: ${vStr}`;
            },
            backgroundColor: "#09090b",
            textStyle: {
                color: "#fafafa",
                fontSize: 12
            },
            borderWidth: 0,
        },
        series,
    }), [dataset, palette, xAxis, yAxis, minValue, maxValue, series]);

    return (
        <ReactECharts
            option={option}
            style={{ height: "100%", width: "100%" }}
        />
    )

});

export default BaseHeatmapChart;
