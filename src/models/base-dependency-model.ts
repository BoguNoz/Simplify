import {BaseDependencyFn} from "@core/events/dependency.ts";

export interface BaseDependencyModel {
    fieldId: string;
    events: BaseDependencyFn[];
}