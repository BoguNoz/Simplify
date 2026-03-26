import { createContext, useContext } from "react";
import MetadataModel from "@core/models/metadata-model";

export const MetadataContext = createContext<MetadataModel | null>(null);

export const useExistingMetadata = () => useContext(MetadataContext);
export const useMetadata = () => useContext(MetadataContext);