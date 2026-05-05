import type {Meta, StoryObj} from "@storybook/react";
import {mockCompositeStore} from "@core/components/stories/composites/mock-composite-store";
import {mockStore} from "@core/components/stories/mock-store";
import {SectionComposite, SectionCompositeSectionType} from "../SectionComposite";
import {buildComposites, createCompositesPlaceholders } from "@core/lib/base-composite-model-utils";
import {lang} from "@core/lib/lang";
import { BaseSectionModel } from "@core/models/partials/base-section-model";
import {sectionMock} from "@core/components/stories/composites/section-mock";

const meta: Meta<typeof SectionComposite> = {
    title: "composites/SectionComposite",
    component: SectionComposite,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof SectionComposite>;

// #region Default
export const Default: Story = {
    args: {
        compositeId: "sectionCard",
        compositeStore: mockCompositeStore,
        store: mockStore
    },
};
// #endregion Default

// #endregion Mock
const text = lang()

const composites = createCompositesPlaceholders({ formCard: "sectionCard" });

composites.formCard.render = true;
composites.formCard.renderFn = () => true;
composites.formCard.sections = [
    {
        type: SectionCompositeSectionType.SECTION,
        fields: sectionMock,
        title: text.mock.form.cameraMetadata.sectionTitle,
        description: text.mock.form.cameraMetadata.sectionDescription,
        disable: false,

    } as BaseSectionModel,
];
composites.formCard.mode = "vertical-window";

const composite = buildComposites(composites);

mockCompositeStore.initializeComposite(composite);
// #endregion Mock
