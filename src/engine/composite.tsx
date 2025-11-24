import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {baseContainerInitializationSetup} from "@core/stores/utils/composite-store-utils";
import {BaseCompositeStore} from "@core/stores/base-composite-store";
import {BaseStore} from "@core/stores/base-store";
import BaseCompositeModel from "@core/models/base-composite-model";

/**
 * A higher-order component (HOC) that wraps a React component with MobX's `observer`
 * and automatically initializes its related composite store on mount.
 *
 * ### Required Props
 * When using this wrapper, the wrapped component **must receive the following props**:
 *
 * - `compositeId` **(string)** – Unique identifier of the composite instance.
 * - `compositeStore` **(BaseCompositeStore)** – Composite store responsible for managing fields.
 * - `store` **(BaseStore)** – Parent store containing the field data.
 *
 These props are used to properly register and initialize the composite structure.
 *
 * @remarks
 * - This wrapper executes composite initialization only once, when the component
 * is first mounted. It extracts the required parameters from the component's props.
 * - This wrapper menages component rendering using composite `renderFn`
 *
 * @param {React.FC<any>} Component - The React component to be wrapped.
 * @returns {React.FC<any>} The wrapped, MobX-observed component with automatic initialization logic.
 */
const composite = (Component) => {
    const Wrapped = (props) => {

        const storeRef = useRef<BaseCompositeStore | null>(null);
        const idRef = useRef<string>("");

        useEffect(() => {
            const { compositeId, compositeStore, store } = props;
            
            idRef.current = compositeId;
            storeRef.current = compositeStore

            const initialization = async (id: string, cStore: BaseCompositeStore, fStore: BaseStore) => {
                await baseContainerInitializationSetup(id, cStore, fStore)
            }

            initialization(compositeId, compositeStore, store);
        }, []);

        if (storeRef.current?.renderComposite(idRef.current)) {
            return <></>;
        }

        return <Component {...props} />
    }

    return observer(Wrapped);
}

export default composite;