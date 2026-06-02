import type { Meta, StoryObj } from "@storybook/react";
import { BaseDataTable } from "@core/components";
import { ColumnDef } from "@tanstack/react-table";
import {mockBaseRegisteredFields} from "@core/components/stories/base-field-mocks";
import {mockStore} from "@core/components/stories/mock-store";

type Person = {
    id: string;
    name: string;
    age: number;
};

const columns: ColumnDef<Person>[] = [
    {
        accessorKey: "id",
        header: "Id",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "age",
        header: "Age",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: info => info.getValue(),
    }
];



const meta: Meta<typeof BaseDataTable> = {
    title: "partials/BaseDataTable",
    component: BaseDataTable as any,
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof BaseDataTable<Person, any>>;

export const Default: Story = {
    args: {
        fieldId: mockBaseRegisteredFields.dataTable,
        columns: columns,
        store: mockStore,
        hardDisable: false,
        handleChange: () => {},
        handleBlur: () => {},
    },
};
// #endregion Default