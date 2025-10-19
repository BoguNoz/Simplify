import BaseFieldModel from "@core/models/base-field-model";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@core/components/ui/select";

interface SelectorFieldProps {
    field: BaseFieldModel

    handleChange: (value: any) => void;
    handleBlur: () => void;

    hardDisable?: boolean;
}

const BaseSelector: React.FC<SelectorFieldProps> = observer((props) => {
    const [options, setOptions] = useState<Record<string, string>>({});

    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

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
        <Select onValueChange={handleChange}>
            <SelectTrigger
                className={field.style + " w-[500px]"}
                onBlur={handleBlur}
                disabled={field.isDisabled || hardDisable}
            >
                <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.entries(options).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
});

export default BaseSelector;