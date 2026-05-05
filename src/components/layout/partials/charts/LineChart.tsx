import { observer } from "mobx-react-lite";
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

interface BaseMultiLineChartProps {
    data: [number, number][][];
    labels: string[];
    palette: string[];

    legends?: boolean;
    smooth?: boolean;
    showSymbols?: boolean;

    grid?: {
        left?: number | string;
        right?: number | string;
        top?: number | string;
        bottom?: number | string;
    };

    xAxis?: {
        showLabels?: boolean;
        labelFormatter?: (value: number) => string;
        min?: number | 'dataMin';
        max?: number | 'dataMax';
    };

    yAxis?: {
        showLabels?: boolean;
        min?: number | 'dataMin';
        max?: number | 'dataMax';
    };

    height?: string;
    width?: string;
}

const LineChart = observer((props: BaseMultiLineChartProps) => {
    const {
        data,
        labels,
        palette,
        legends = false,
        smooth = false,
        showSymbols = false,
        grid: gridProps,
        xAxis: xAxisProps,
        yAxis: yAxisProps,
        height = "100%",
        width = "100%",
    } = props;

    const series = useMemo(() => {
        if (!data || !labels || data.length !== labels.length) {
            console.warn("LineChart: data and labels length mismatch");
            return [];
        }

        return data.map((oneSeries, idx) => ({
            name: labels[idx],
            type: "line" as const,
            showSymbol: showSymbols,
            smooth: smooth,
            data: oneSeries,
            lineStyle: {
                width: idx === 0 ? 2.5 : 1.5,
                type: idx === 0 ? "solid" : "dashed",
            },
            emphasis: { focus: "series" as const },
        }));
    }, [data, labels, smooth, showSymbols]);

    const options = useMemo(() => ({
        color: palette,

        tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross" },
            valueFormatter: (val: number) => val?.toFixed(4) ?? "",
            backgroundColor: "#09090b",
            textStyle: { color: "#fafafa", fontSize: 12 },
            borderWidth: 0,
            extraCssText: "border-radius: 8px; padding: 8px;"
        },

        grid: {
            left: gridProps?.left ?? 45,
            right: gridProps?.right ?? 30,
            top: gridProps?.top ?? (legends ? 60 : 40),
            bottom: gridProps?.bottom ?? 50,
            containLabel: true,
        },

        xAxis: {
            type: "value",
            axisLabel: {
                show: xAxisProps?.showLabels ?? true,
                formatter: xAxisProps?.labelFormatter ?? ((v: number) => v.toFixed(1)),
                color: "#94a3b8",
                fontSize: 11,
                margin: 8,
            },
            axisLine: {
                lineStyle: { color: "#94a3b8" }
            },
            min: xAxisProps?.min,
            max: xAxisProps?.max,
        },

        yAxis: {
            type: "value",
            axisLabel: {
                show: yAxisProps?.showLabels ?? true,
                color: "#94a3b8",
                fontSize: 11,
                margin: 8,
            },
            axisLine: { show: false },
            min: yAxisProps?.min,
            max: yAxisProps?.max,
        },

        series,

        legend: legends ? {
            show: true,
            bottom: 10,
            left: "center",
            icon: "rect",
            itemWidth: 14,
            itemHeight: 3,
            itemGap: 24,
            textStyle: {
                color: "#e2e8f0",
                fontSize: 13,
                fontWeight: 500,
            },
        } : {
            show: false,
        },

    }), [palette, series, legends, gridProps, xAxisProps, yAxisProps]);

    return (
        <ReactECharts
            option={options}
            style={{ height: height, width: width }}
            notMerge={true}
        />
    );
});

export {LineChart};