import BaseResponseTypeEnum from "../enums/base-response-type-enum.ts";

export interface RequestOptions extends RequestInit {
    responseType?: BaseResponseTypeEnum;
}

export const createServiceClient = (baseUrl: string) => {
    return async function sendRequest<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const defaultHeaders: HeadersInit = {
            "Content-Type": "application/json",
        };

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...(options.headers || {}),
            },
        };

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, config);

            if (!response.ok) {
                throw new Error(
                    `API error: ${response.status} ${response.statusText}`
                );
            }

            switch (options.responseType) {
                case BaseResponseTypeEnum.ArrayBuffer:
                    return (await response.arrayBuffer()) as T;
                case BaseResponseTypeEnum.Blob:
                    return (await response.blob()) as T;
                case BaseResponseTypeEnum.Text:
                    return (await response.text()) as T;
                case BaseResponseTypeEnum.Json:
                default:
                    return (await response.json()) as T;
            }
        } catch (error) {
            console.error("API fetch error:", error);
            throw error;
        }
    };
};
