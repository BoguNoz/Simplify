import type {Meta, StoryObj} from "@storybook/react";
import {mockCompositeStore} from "@core/components/stories/composites/mock-composite-store";
import {mockStore} from "@core/components/stories/mock-store";
import SectionCardComposite, {SectionCardCompositeSectionType} from "../SectionCardComposite";
import {buildComposites, createCompositesPlaceholders } from "@core/lib/base-composite-model-utils";
import {lang} from "@core/text/utils/lang";
import { BaseSectionModel } from "@core/models/partials/base-section-model";
import {formMock} from "@core/components/stories/composites/form-mocks";
import {sectionMock} from "@core/components/stories/composites/section-mock";

const meta: Meta<typeof SectionCardComposite> = {
    title: "composites/SectionCardComposite",
    component: SectionCardComposite,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof SectionCardComposite>;

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
        type: SectionCardCompositeSectionType.HEADER,
        title: text.mock.form.cameraMetadata.sectionTitle,
        description: text.mock.form.cameraMetadata.sectionDescription,
        disable: true,

    } as BaseSectionModel,
    {
        type: SectionCardCompositeSectionType.SECTION,
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
