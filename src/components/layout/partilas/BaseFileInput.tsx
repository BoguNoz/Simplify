import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import React from "react";
import {Input} from "@core/components/ui/input";
import {Toggle} from "@core/components/ui/toggle";

interface BaseFileInputProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
}

const BaseFileInput: React.FC<BaseFileInputProps> = observer((props) => {
    const {field, handleChange, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div>
            <Input
                className={field.style}
                disabled={isDisabled}
                type="file"
                onChange={e => handleChange(field.id, e.target.files?.[0] ?? "")}
            />
        </div>
    )
});

export default BaseFileInput;