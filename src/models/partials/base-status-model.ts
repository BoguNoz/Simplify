import {ValidatorResponse} from "@core/events/validator";

export interface BaseStatusModel {
    /** State of the field*/
    status: "error" | "valid" | "warning" | "pending";

    /** Validation result of the field*/
    validationResult: ValidatorResponse[];
}