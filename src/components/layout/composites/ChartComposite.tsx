import {BaseCompositeInterface, MetadataModel} from "@core/models";
import {composite, useMetadata} from "@core/engine";
import {Card, CardContent} from "@core/components/ui";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {CompositeHeader, LineChart} from "@core/components";

interface ChartCompositeProps extends BaseCompositeInterface {
    palette: string[];
    labels: string[];

    hasBorder: boolean;
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

interface ChartProps {
    section: BaseSectionModel;
    data: any;
    palette: string[];
    labels: string[];

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

export enum ChartCompositeSectionType {
    HEADER= "HEADER",
    LINE_CHART = "LINE_CHART",
}
/**
 * A composite component for rendering interactive charts.
 *
 * @remarks
 * This composite combines a header section with a customizable chart.
 * It fetches data dynamically from the store based on the configuration in the section.
 *
 * The chart supports multiple series, custom styling, axis configuration, grid margins,
 * and optional legend. It is designed to work seamlessly within the composite engine.
 *
 * ### Supported Sections:
 * - **`HEADER`** — rendered via `CompositeHeader` (title + description)
 * - **`LINE_CHART`** — defines the data source and chart behavior
 *
 * ### Key Features:
 * - Dynamic data fetching from `store.getDataSource()`
 * - Full support for multi-series line charts
 * - Configurable grid, axes, smoothing, symbols and legend
 * - Responsive sizing based on `MetadataModel`
 * - Proper cleanup of storage listeners
 *
 * ### Use Cases:
 * - Time series visualization
 * - Performance metrics dashboards
 * - Trend analysis panels
 * - Scientific or financial data presentation
 *
 * @example
 * ```tsx
 * <ChartComposite
 *     compositeId="cpuUsageChart"
 *     compositeStore={compositeStore}
 *     store={store}
 *     palette={["#22d3ee", "#f472b6"]}
 *     labels={["CPU Usage", "Memory Usage"]}
 *     legends={true}
 *     smooth={false}
 * />
 * ```
 *
 * @see BaseCompositeInterface
 * @see BaseSectionModel
 * @see LineChart
 * @see LineChartCard
 */
const ChartComposite= composite((props: ChartCompositeProps) => {
    const {compositeId, compositeStore, store, handleBlur, handleChange,
        palette, labels, hasBorder, legends, smooth, showSymbols, grid, xAxis, yAxis, height, width} = props;

    const [data, setData] = useState<any>([]);

    const metadata = useMetadata() ?? {} as MetadataModel;

    const composite = compositeStore.composites[compositeId];
    if (!composite) {
        return <></>;
    }


    const sectionMap = Object.fromEntries(
        composite.sections.map(section => [section.type, section])
    );

    const header = sectionMap[ChartCompositeSectionType.HEADER] ?? {} as BaseSectionModel;
    const lineChart = sectionMap[ChartCompositeSectionType.LINE_CHART] ?? {} as BaseSectionModel;

    useEffect(() => {
        const fetchData = async () => {
            const data = await store.getDataSource(lineChart.fields[0]?.id);
            setData(data);
        };

        fetchData();

        const handleStorageChange = () => fetchData();
        return lineChart.fields[0].deconstructor(handleStorageChange);

    });

    return (
        <Card
            style={{ width: `${metadata.width}px`, height: `${metadata.height}px` }}
            className="flex flex-col"
            hasBorder={hasBorder}
        >
            <CompositeHeader
                section={header}
            />
           <LineChartCard
               section={lineChart}
               data={data ?? []}
               labels={labels}
               palette={palette}
               legends={legends}
               smooth={smooth}
               showSymbols={showSymbols}
               grid={grid}
               xAxis={xAxis}
               yAxis={yAxis}
               height={height}
               width={width}
           />
        </Card>
    )
});

const LineChartCard = observer(({
    section,
    data,
    palette,
    labels,
    legends,
    smooth,
    showSymbols,
    grid,
    xAxis,
    yAxis,
    height,
    width,
}: ChartProps) => {

    if (section.disable) {
        return null;
    }

    return (
        <CardContent className="h-full w-full p-0">
            <LineChart
                data={data ?? []}
                labels={labels ?? []}
                palette={palette ?? []}
                legends={legends}
                smooth={smooth}
                showSymbols={showSymbols}
                grid={grid}
                xAxis={xAxis}
                yAxis={yAxis}
                height={height}
                width={width}
            />
        </CardContent>
    );
});

export {ChartComposite};