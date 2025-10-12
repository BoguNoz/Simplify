import {observer} from "mobx-react-lite";
import {BaseBarCharAggregateTypeEnum, BaseBarChartModeEnum} from "@core/enums/charts/base-bar-chart-enums";
import {useMemo} from "react";
import ReactECharts from "echarts-for-react";

interface BaseHistogramChartProps {
    data: Float32Array; // [x1, y1, value1, x2, y2, value2, ...]

    mode?: BaseBarChartModeEnum;
    bins?: number;
    aggregate?: BaseBarCharAggregateTypeEnum;
    palette?:string[];
    maxCategories?: number;
}

const BaseBarChart: React.FC<BaseHistogramChartProps> = observer(({data, mode, bins, aggregate, palette, maxCategories}) => {
    const points = useMemo(() => {
        const arr = Array.isArray(data) ? data : Array.from(data as Float32Array);
        const res: { x: number; y: number; value: number }[] = [];
        for (let i = 0; i + 2 < arr.length; i += 3) {
            const x = Number(arr[i]);
            const y = Number(arr[i + 1]);
            const value = Number(arr[i + 2]);
            if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(value)) {
                res.push({ x, y, value });
            }
        }
        return res;
    }, [data]);

    const { xLabels, seriesData } = useMemo(() => {
        if (mode === BaseBarChartModeEnum.Histogram) {
            const values = points.map((p) => p.value);
            if (values.length === 0) {
                return { xLabels: [], yLabels: [], seriesData: [], xAxisLabel: "value" };
            }
            const min = Math.min(...values);
            const max = Math.max(...values);
            const nbins = Math.max(1, Math.min(200, bins || 4));
            const binWidth = (max - min) / nbins || 1;
            const counts = new Array(nbins).fill(0);
            const sums = new Array(nbins).fill(0);
            for (const v of values) {
                let idx = Math.floor((v - min) / binWidth);
                if (idx < 0) idx = 0;
                if (idx >= nbins) idx = nbins - 1;
                counts[idx]++;
                sums[idx] += v;
            }

            const labels: string[] = new Array(nbins).fill("").map((_, i) => {
                const a = min + i * binWidth;
                const b = a + binWidth;
                const fmt = (n: number) => Number.isInteger(n) ? n.toString() : n.toFixed(3);
                return `${fmt(a)} — ${fmt(b)}`;
            });

            const data = counts.map((c, i) => {
                const valueForBar = aggregate === "sum" ? sums[i] : c;
                return { name: labels[i], value: valueForBar, count: counts[i], rangeIndex: i };
            });


            return { xLabels: labels, yLabels: [], seriesData: data, xAxisLabel: "Value range" };
        } else {
            const key = mode === BaseBarChartModeEnum.ByX ? "x" : "y";
            const map = new Map<number, { count: number; sum: number }>();
            for (const p of points) {
                const k = (p as any)[key] as number;
                const cur = map.get(k) ?? { count: 0, sum: 0 };
                cur.count += 1;
                cur.sum += p.value;
                map.set(k, cur);
            }
            const keys = Array.from(map.keys()).sort((a, b) => a - b);
            let chosenKeys = keys;
            if (keys.length > maxCategories!) {
                chosenKeys = Array.from(map.entries())
                    .sort(([, a], [, b]) => b.sum - a.sum)
                    .slice(0, maxCategories)
                    .map(([k]) => k)
                    .sort((a, b) => a - b);
            }
            const labels = chosenKeys.map((k) => k.toString());
            const data = chosenKeys.map((k) => {
                const entry = map.get(k)!;
                const val = aggregate === BaseBarCharAggregateTypeEnum.Mean ? entry.sum / entry.count : aggregate === BaseBarCharAggregateTypeEnum.Sum ? entry.sum : entry.count;
                return { name: k.toString(), value: val, count: entry.count };
            });


            return { xLabels: labels, yLabels: [], seriesData: data, xAxisLabel: mode === BaseBarChartModeEnum.ByY ? "X" : "Y" };
        }
    }, [points, mode, bins, aggregate, maxCategories]);

    const options = useMemo(() => {
        return {
            color: palette,
            tooltip: {
                trigger: "item",
                backgroundColor: "#09090b",
                textStyle: {
                    color: "#fafafa",
                    fontSize: 12
                },
                borderWidth: 0,
                formatter: (params: any) => {
                    const p = Array.isArray(params) ? params[0] : params;
                    if (!p) return "";
                    const data = p.data ?? p;
                    if (mode === BaseBarChartModeEnum.Histogram) {
                        return `${data.name}<br/>${aggregate === BaseBarCharAggregateTypeEnum.Sum ? "Sum: " + data.value : "Count: " + data.count}`;
                    }
                    return `${data.name}<br/>Value: ${typeof data.value === "number" ? data.value.toFixed(4) : data.value}<br/>Points: ${data.count ?? "-"}`;
                },
            },
            xAxis: {
                type: "category",
                data: xLabels,
                axisLabel: { show: false },
            },
            yAxis: {
                type: "value",
                splitNumber: 4,
                axisLabel: {
                    formatter: (v: number) => (Number.isInteger(v) ? v.toString() : v.toFixed(2)),
                },
            },
            grid: { left: 40, right: 20, top: 20, bottom: 70 },
            series: [
                {
                    type: "bar",
                    data: seriesData,
                    label: { show: seriesData.length <= 20, position: "top" },
                    emphasis: { focus: "series" },
                },
            ],
        } as any;
    }, [xLabels, seriesData, palette, mode, aggregate]);

    return <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />;

});

export default BaseBarChart;