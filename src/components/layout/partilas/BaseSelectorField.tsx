import BaseFieldModel from "../../../models/base-field-model.ts";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select.tsx";
interface SelectorFieldProps {
    field: BaseFieldModel
    onChange: (value: any) => void;
    onBlur: () => void;
    hardDisable?: boolean;
}

const BaseSelectorField: React.FC<SelectorFieldProps> = observer(({ field, onChange, onBlur, hardDisable }) => {
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchKeys = async () => {
            const options = await field.dataSource();
            setOptions(options);
        };

        fetchKeys();

        const handleStorageChange = () => fetchKeys();
        return field.deconstructor(handleStorageChange);

    }, [field.dataSource, field.deconstructor]);

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger
                className={field.style + " w-[500px]"}
                onBlur={onBlur}
                disabled={field.isDisabled || hardDisable}
            >
                <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((opt) => {
                        const rowLabel = opt.split('-')
                        const fieldLabel = rowLabel.slice(1).join('-').slice(0, -4);
                        return (
                            <SelectItem key={opt} value={opt}>
                                {fieldLabel}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
});

export default BaseSelectorField;