import {BaseFieldInterface, MetadataModel} from "@core/models";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {useMetadata} from "@core/engine";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@core/components/ui/table";

interface BaseDataTableProps<TData, TValue> extends BaseFieldInterface {
    columns: ColumnDef<TData, TValue>[]
}


const BaseDataTable = observer(function DataTable<TData, TValue>(
    props: BaseDataTableProps<TData, TValue>
) {
    const { fieldId, handleChange, handleBlur, hardDisable, columns, store } = props;

    const [data, setData] = useState<TData[]>([]);
    const metadata = useMetadata() as MetadataModel;

    const field = store.fields[fieldId];

    useEffect(() => {
        if (!field || typeof field.deconstructor !== 'function') return;

        const fetchData = async () => {
            const result = await store.getDataSource(field.id);
            setData(result);
        };

        fetchData();

        const unsubscribe = field.deconstructor(() => {
            fetchData();
        }) as unknown;

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [field, store]);

    if (!field) {
        return null;
    }


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
});

export { BaseDataTable };