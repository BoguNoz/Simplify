import type {Meta, StoryObj} from "@storybook/react";
import ButtonGroupComposite from "@core/components/layout/composites/ButtonGroupComposite";
import {mockStore} from "@core/components/mocks/mock-store";
import {buildComposites, createCompositesPlaceholders} from "@core/models/utils/base-composite-model-utils";
import {buildFields, createFieldPlaceholders} from "@core/models/utils/base-model-utils";
import {lang} from "@core/text/utils/lang";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {BaseSectionModel} from "@core/models/partials/base-section-model";
import {mockCompositeStore} from "@core/components/mocks/mock-composite-store";

const meta: Meta<typeof ButtonGroupComposite> = {
    title: "composites/ButtonGroupComposite",
    component: ButtonGroupComposite,
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj<typeof ButtonGroupComposite>;

// #region Default
export const Default: Story = {
    args: {
        compositeId: "toolbar",
        compositeStore: mockCompositeStore,
        store: mockStore
    },
};
// #endregion Default


// #region Mock
const text = lang();

const buttonsIds = {
    arrowLeft: "arrowLeft",
    archive: "archive",
    registry: "registry",
    arrowRight: "arrowRight",
}

const buttons = createFieldPlaceholders(buttonsIds, text.mock.buttonGroupComposite);

buttons.arrowLeft.fieldType = BaseFieldTypesEnum.Button;
buttons.arrowLeft.variant = "outline";
buttons.arrowLeft.label = ArrowLeft;

buttons.archive.fieldType = BaseFieldTypesEnum.Button;
buttons.archive.variant = "outline";

buttons.registry.fieldType = BaseFieldTypesEnum.Button;
buttons.registry.variant = "outline";

buttons.arrowRight.fieldType = BaseFieldTypesEnum.Button;
buttons.arrowRight.variant = "outline";
buttons.arrowRight.label = ArrowRight;

const fields = buildFields(buttons);

const composites = createCompositesPlaceholders({ toolbar: "toolbar" });

composites.toolbar.render = true;
composites.toolbar.renderFn = () => true;
composites.toolbar.fields = fields;
composites.toolbar.sections = [
    {
        id: "back",
        fieldsIds: [buttonsIds.arrowLeft],

    } as BaseSectionModel,
    {
        id: "folders",
        fieldsIds: [buttonsIds.archive, buttonsIds.registry],

    } as BaseSectionModel,
    {
        id: "forward",
        fieldsIds: [buttonsIds.arrowRight],

    } as BaseSectionModel,
]

const composite = buildComposites(composites);

mockCompositeStore.initializeComposite(composite);
// #endregion Mock
