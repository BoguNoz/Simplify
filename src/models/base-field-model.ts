import {BaseDependencyModel} from "@core/models/base-dependency-model.ts";
import BaseFieldTypesEnum from "@core/enums/base-field-type-enum.ts";
import {BaseValidatorFn} from "@core/events/validator.ts";
import {BaseOperationFn} from "@core/events/operation.ts";


export default interface BaseFieldModel {
    id: string;
    fieldType: BaseFieldTypesEnum;
    value: any;
    state: {
        error: boolean;
        processing: boolean;
    }
    isDisabled: boolean;
    isRequired: boolean;
    render: boolean;
    label: string;
    description: string;
    placeholder: string;
    style: string;
    variant: any;


    validatorsFn: BaseValidatorFn[];
    operations?: BaseOperationFn[];
    dependencies: BaseDependencyModel[];
    dataSource: (...args: any[]) => any;
    deconstructor: (...args: any[]) => void;

    addit: { [key: string]: any } | null;
}

