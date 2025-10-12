import {BaseDependencyFn} from "@core/events/dependency";

export interface BaseDependencyModel {
    fieldId: string;
    events: BaseDependencyFn[];
}