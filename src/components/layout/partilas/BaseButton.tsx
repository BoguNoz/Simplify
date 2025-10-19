import BaseFieldModel from "@core/models/base-field-model";
import {observer} from "mobx-react-lite";
import {Spinner} from "@core/components/ui/spiner";
import {IconExclamationCircle} from "@tabler/icons-react";
import {Button} from "@core/components/ui/button";
import React from "react";

// TODO Documentation

interface BaseButtonProps {
    field: BaseFieldModel;

    handleChange: (fieldId: string, value: any) => void;
    handleBlur: (fieldId: string) => void;

    hardDisable?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = observer((props) => {
    const {field, handleChange, handleBlur, hardDisable} = props;

    const isDisabled = hardDisable || field.isDisabled;

    return (
        <div className="flex justify-end">
            <Spinner
                className={"mr-1 " + (field.style || "text-gray-300")}
                show={field.state.processing || false}
                size="small"
            />
            {field.state.error && (
                <IconExclamationCircle className="text-destructive w-[20px] h-[20px] mr-2 mt-2 font-light" />
            )}
            <Button
                className={field.style}
                size={field.addit!.size}
                disabled={isDisabled}
                variant={field.variant}
                onClick={c => handleChange(field.id, c)}
                onBlur={() => handleBlur(field.id)}
            >
                {field.label}
            </Button>
        </div>
    )
})