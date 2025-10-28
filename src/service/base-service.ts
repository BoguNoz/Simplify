import BaseResponseTypeEnum from "@core/enums/base-response-type-enum";

export interface RequestOptions extends RequestInit {
    responseType?: BaseResponseTypeEnum;
}

/**
 * Creates a strongly-typed HTTP client for performing API requests.
 *
 * @remarks
 * This utility wraps the native `fetch` API and supports multiple response types
 * through the {@link BaseResponseTypeEnum}. It automatically merges default headers
 * with any provided ones and handles error responses by throwing exceptions.
 *
 * @example
 * ```ts
 * const apiClient = createServiceClient("https://api.example.com");
 *
 * // Example: Fetch JSON data
 * const data = await apiClient<MyDataType>("/users", {
 *   method: "GET",
 *   responseType: BaseResponseTypeEnum.Json,
 * });
 *
 * // Example: Download binary file
 * const fileBuffer = await apiClient<ArrayBuffer>("/file", {
 *   method: "GET",
 *   responseType: BaseResponseTypeEnum.ArrayBuffer,
 * });
 * ```
 *
 * @param {string} baseUrl - The base URL for all API requests (e.g., `"https://api.example.com"`).
 * @returns A reusable `sendRequest` function that performs HTTP calls relative to the provided `baseUrl`.
 *
 * @see BaseResponseTypeEnum
 */
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
