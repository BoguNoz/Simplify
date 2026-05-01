import type {Meta, StoryObj} from "@storybook/react";
import {mockCompositeStore} from "@core/components/stories/composites/mock-composite-store";
import {mockStore} from "@core/components/stories/mock-store";
import ChartComposite, {ChartCompositeSectionType} from "@core/components/layout/composites/ChartComposite";
import {lang} from "@core/text/utils/lang";
import {buildComposites, buildFields, createCompositesPlaceholders, createFieldPlaceholders} from "@core/lib";
import {BaseSectionModel} from "@core/models/partials/base-section-model";

const meta: Meta<typeof ChartComposite> = {
    title: "composites/ChartComposite",
    component: ChartComposite,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof ChartComposite>;

// #region Default
export const Default: Story = {
    args: {
        compositeId: "chardCard",
        compositeStore: mockCompositeStore,
        store: mockStore,
        labels: ["sin(x)", "cos(x)"],
        palette: ["#22d3ee", "#f472b6"],
        legends: true
    },
};
// #endregion Default

// #endregion Mock

const chartRegisteredFields = {
    lineChart: "lineChart",
}

const text = lang();
// @ts-ignore
const fields = createFieldPlaceholders(chartRegisteredFields, text.mock.charts);

const generateSineData = (points = 200): [number, number][][] => {
    const series: [number, number][] = [];

    for (let i = 0; i < points; i++) {
        const x = i * 0.1;
        const y = Math.sin(x);
        series.push([x, y]);
    }

    return [series];
};

const generateMultiSineData = (points = 200): [number, number][][] => {
    const sin: [number, number][] = [];
    const cos: [number, number][] = [];

    for (let i = 0; i < points; i++) {
        const x = i * 0.1;
        sin.push([x, Math.sin(x)]);
        cos.push([x, Math.cos(x)]);
    }

    return [sin, cos];
};

// #region LineChart
fields.lineChart.render = true
fields.lineChart.dataSource = () => {
    return generateMultiSineData();
}
// #endregion LineChart

const mockFields = buildFields(fields);
// #endregion AmplitudeMapHistogram


const composites = createCompositesPlaceholders({ composite: "chardCard" });

composites.composite.render = true;
composites.composite.renderFn = () => true;
composites.composite.sections = [
    {
        type: ChartCompositeSectionType.HEADER,
        title: text.mock.charts.chartCardTitle,
        description: text.mock.charts.chartCardDescription,
        disable: false,

    } as BaseSectionModel,
    {
        type: ChartCompositeSectionType.LINE_CHART,
        fields: mockFields,
        disable: false,

    } as BaseSectionModel,
];
composites.composite.mode = "horizontal-window";

const composite = buildComposites(composites);

mockCompositeStore.initializeComposite(composite);
// #endregion Mock