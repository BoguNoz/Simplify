import type {Meta, StoryObj} from "@storybook/react";
import FormCardComposite, {FormCardCompositeSectionType} from "@core/components/layout/composites/FormCardComposite";
import {buildComposites, createCompositesPlaceholders} from "@core/lib/base-composite-model-utils";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {mockCompositeStore} from "@core/components/stories/composites/mock-composite-store";
import {formMock} from "@core/components/stories/composites/form-mocks";
import {mockStore} from "@core/components/stories/mock-store";
import {lang} from "@core/lib/lang";

const meta: Meta<typeof FormCardComposite> = {
    title: "composites/FormCardComposite",
    component: FormCardComposite,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof FormCardComposite>;

// #region Default
export const Default: Story = {
    args: {
        compositeId: "formCard",
        compositeStore: mockCompositeStore,
        store: mockStore
    },
};
// #endregion Default

// #endregion Mock
const text = lang()

const composites = createCompositesPlaceholders({ formCard: "formCard" });

composites.formCard.render = true;
composites.formCard.renderFn = () => true;
composites.formCard.sections = [
    {
        type: FormCardCompositeSectionType.HEADER,
        title: text.mock.form.cameraMetadata.sectionTitle,
        description: text.mock.form.cameraMetadata.sectionDescription,
        disable: false,

    } as BaseSectionModel,
    {
        type: FormCardCompositeSectionType.BODY,
        fields: formMock,
        disable: false,

    } as BaseSectionModel,
];
composites.formCard.mode = "vertical-window";

const composite = buildComposites(composites);

mockCompositeStore.initializeComposite(composite);
// #endregion Mock
