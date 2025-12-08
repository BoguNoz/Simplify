import type {Meta, StoryObj} from "@storybook/react";
import FormCardComposite from "@core/components/layout/composites/FormCardComposite";
import {buildComposites, createCompositesPlaceholders} from "@core/models/utils/base-composite-model-utils";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {mockCompositeStore} from "@core/components/mocks/mock-composite-store";
import {cameraMetadataRegisteredFields, formMock} from "@core/components/mocks/form-mocks";
import {mockStore} from "@core/components/mocks/mock-store";
import {lang} from "@core/text/utils/lang";

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
composites.formCard.fields = formMock;
composites.formCard.sections = [
    {
        id: "cameraMetadataRegisteredFields",
        fieldsIds: Object.values(cameraMetadataRegisteredFields),
        title: text.mock.form.cameraMetadata.sectionTitle,
        description: text.mock.form.cameraMetadata.sectionDescription,

    } as BaseSectionModel,
];
composites.formCard.mode = "vertical-window";

const composite = buildComposites(composites);

mockCompositeStore.initializeComposite(composite);
// #endregion Mock
