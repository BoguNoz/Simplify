import { MetadataModel } from "@core/models";
import { createContext, useContext } from "react";

export const MetadataContext = createContext<MetadataModel | null>(null);

export const useExistingMetadata = () => useContext(MetadataContext);
export const useMetadata = () => useContext(MetadataContext);