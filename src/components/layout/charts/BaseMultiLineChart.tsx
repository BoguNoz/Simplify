import {observer} from "mobx-react-lite";
import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface BaseMultiLineChartProps {
    data: Float32Array[]; // [t, value]
    labels: string[];

    palette: string[]
}


const BaseMultiLineChart: React.FC<BaseMultiLineChartProps> = observer(({data, labels, palette}) => {
    const datasets = useMemo(() => {
        return data.map((series, idx) => ({
           id: idx,
            source: series,
            dimensions: ["category", "value"],
        }));
    }, [data]);

    const series = useMemo(
        () =>
            data.map((d, idx) => {
                return {
                    name: labels[idx],
                    type: "line" as const,
                    showSymbol: false,
                    datasetId: idx,
                    smooth: false,
                    encode: {
                        x: 0,
                        y: 1,
                        itemName: 0,
                        tooltip: [1],
                    },
                    emphasis: { focus: "series" as const },
                    lineStyle: {
                        type: idx === 0 ? "solid" : "dashed",
                        width: idx === 0 ? 2 : 1,
                    },
                };
            }),
        [data, labels]
    );

    const options = useMemo(() => ({
        color: palette,
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross" },
            valueFormatter: (val: number) => val.toFixed(4),
            backgroundColor: "#09090b",
            textStyle: {
                color: "#fafafa",
                fontSize: 12
            },
            borderWidth: 0,
            extraCssText: "border-radius: 8px; padding: 6px;"
        },
        axisPointer: {
            link: [{ xAxisIndex: "all" }],
        },
        grid: {
            left: 30,
            right: 30,
            top: 30,
            bottom: 30,
        },
        xAxis: {
            type: "category",
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: true,
                onZero: true,
                lineStyle: { color: "#94a3b8", width: 1 }
            },
        },
        yAxis: {
            type: "value",
            axisLine: {
                onZero: false,
                show: false,
            },
            splitNumber: 4,
            splitLine: {
                show: true,
            }
        },
        dataset: datasets,
        series,
        legend: {
           show: false,
        }
    }), [palette, datasets, series]);

    return (
        <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />
    )

});

export default BaseMultiLineChart;
