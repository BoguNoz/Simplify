import BaseFieldModel from "@core/models/base-field-model";
import FormFieldTypesEnum from "@core/enums/base-field-type-enum";
import {Input} from "@core/components/ui/input";
import {Checkbox} from "@core/components/ui/checkbox";
import {Switch} from "@core/components/ui/switch";
import {Button} from "@core/components/ui/button";
import React from "react";
import BaseSelectorField from "@core/components/layout/partilas/BaseSelectorField";
import {Toggle} from "@core/components/ui/toggle";
import BaseFieldTypeEnum from "@core/enums/base-field-type-enum";
import {observer} from "mobx-react-lite";
import {Spinner} from "@core/components/ui/spiner";
import {IconExclamationCircle} from "@tabler/icons-react";
import BaseButtonWithConfirmation from "@core/components/layout/partilas/BaseButtonWithConfirmation";

interface BaseFieldProps {
    field: BaseFieldModel
    value: any;

    handleBlur: (fieldId: string) => void;
    handleChange: (fieldId: string, value: any) => void;

    hardDisable?: boolean;
    hardTyping?: BaseFieldTypeEnum;
}

const BaseField: React.FC<BaseFieldProps> = observer(({ field, value, handleChange, handleBlur, hardDisable, hardTyping }) => {
    const isDisable = field.isDisabled || hardDisable;
    const type = hardTyping || field.fieldType

    switch (type) {
        case FormFieldTypesEnum.Input:
            return (
                <div>
                    <Input
                        className={field.style}
                        disabled={isDisable}
                        type="text"
                        value={value}
                        placeholder={
                            field.placeholder ? field.placeholder : ""
                        }
                        onChange={e => handleChange(field.id, e.target.value)}
                        onBlur={() => handleBlur(field.id)}
                    />
                </div>

            );
        case FormFieldTypesEnum.FileInput:
            return (
                <div>
                    <Input
                        className={field.style}
                        disabled={isDisable}
                        type="file"
                        onChange={e => handleChange(field.id, e.target.files?.[0] ?? "")}
                    />
                </div>
            );
        case FormFieldTypesEnum.CheckBox:
            return (
                <div className="flex items-center justify-between">
                    <Checkbox
                        className={field.style}
                        disabled={isDisable}
                        checked={value}
                        onCheckedChange={c => handleChange(field.id, c)}
                        onBlur={() => handleBlur(field.id)}
                    />
                </div>
            );
        case FormFieldTypesEnum.Switch:
            return (
                <div className={field.style}>
                    <Switch
                        className={field.style}
                        disabled={isDisable}
                        checked={value}
                        onCheckedChange={c => handleChange(field.id, c)}
                        onBlur={() => handleBlur(field.id)}
                    />
                </div>
            );
        case FormFieldTypesEnum.Select:
            return (
                <BaseSelectorField
                    field={field}
                    onChange={e => {handleChange(field.id, e)}}
                    onBlur={() => handleBlur(field.id)}
                    hardDisable={isDisable}
                />
            );
        case FormFieldTypesEnum.Button:
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
                        disabled={isDisable}
                        variant={field.variant}
                        onClick={c => handleChange(field.id, c)}
                        onBlur={() => handleBlur(field.id)}
                    >
                        {field.label}
                    </Button>
                </div>
            )
        case FormFieldTypesEnum.ButtonWithConfirmation:
            return (
                <div className={field.style}>
                    <BaseButtonWithConfirmation
                        field={field}
                        handleChange={c => {handleChange(field.id, c)}}
                        handleBlur={() => handleBlur(field.id)}
                        hardDisable={isDisable}
                    />
                </div>
            )
        case FormFieldTypesEnum.Toggle:
            return (
                <div className="p-1">
                    <Toggle
                        pressed={!!value}
                        size="sm"
                        disabled={isDisable}
                        onChange={e => handleChange(field.id, e)}
                        onPressedChange={(pressed) => handleChange(field.id, pressed)}
                    >
                        <label className="font-light">{field.label}</label>
                    </Toggle>
                </div>
            )
        default:
            return null;
    }
});

export default BaseField;

