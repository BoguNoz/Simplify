import {useEffect, useRef} from "react";
import {BaseStore} from "@core/stores/base-store";
import MetadataModel from "@core/models/metadata-model";
import {getMetadata} from "@core/lib/metadata-model-utils";
import {observer} from "mobx-react-lite";

// TODO BN Zrobic ten sam mechanizm metadanych w coposite wrapper
// TODO BN Zastosować wrapper i dodąc obsługe metadanych w partialach
const field = (Component: any) => {
    const Wrapped = (props: any) => {
        const storeRef = useRef<BaseStore | null>(null);
        const idRef = useRef<string>("");

        useEffect(() => {
            const {fieldId, store, parent} = props;

            idRef.current = fieldId;
            storeRef.current = store


        },[]);

        return (
            <Component
                {...props}
            />
        );
    }

    return observer(Wrapped);
}