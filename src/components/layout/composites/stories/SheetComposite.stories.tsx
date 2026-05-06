import type {Meta, StoryObj} from "@storybook/react";
import {mockCompositeStore} from "@core/components/stories/composites/mock-composite-store";
import {mockStore} from "@core/components/stories/mock-store";
import {buildComposites, createCompositesPlaceholders, lang} from "@core/lib";
import {SheetComposite, SheetCompositeSectionType} from "../SheetComposite";
import {SectionComposite} from "../SectionComposite";
import {BaseSectionModel} from "../../../../models";


const meta: Meta<typeof SheetComposite> = {
    title: "composites/SheetComposite",
    component: SheetComposite,
};
export default meta;

type Story = StoryObj<typeof SheetComposite>;

// #region Default
export const Default: Story = {
    args: {
        compositeId: "sheetComposite",
        compositeStore: mockCompositeStore,
        store: mockStore,
        children: (
            <>
                <SectionComposite
                    compositeId="sectionCard"
                    compositeStore={mockCompositeStore}
                    store={mockStore}
                />
                <SectionComposite
                    compositeId="sectionCard"
                    compositeStore={mockCompositeStore}
                    store={mockStore}
                />
            </>
        )
    },
};
// #endregion Default

// #endregion Mock
const text = lang()

const composites = createCompositesPlaceholders({ composite: "sheetComposite" });

composites.composite.render = true;
composites.composite.renderFn = () => true;
composites.composite.sections = [
    {
        type: SheetCompositeSectionType.HEADER,
        title: text.mock.form.cameraMetadata.sectionTitle,
        description: text.mock.form.cameraMetadata.sectionDescription,
        disable: false,

    } as BaseSectionModel,
];
composites.composite.mode = "vertical-window";
composites.composite.size = 0.7;

const composite = buildComposites(composites);

mockCompositeStore.initializeComposite(composite);
// #endregion Mock