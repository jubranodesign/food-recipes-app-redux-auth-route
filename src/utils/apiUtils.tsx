import axios from "axios";

export async function handleApiRequest<T>(
    requestFn: () => Promise<any>,
    handleError: (error: unknown) => void,
    notFoundMessage?: string
): Promise<T> {
    try {
        const response = await requestFn();
        return response as T;
    } catch (error) {
        handleError(error);
        if (axios.isAxiosError(error) && error.response?.status === 404 && notFoundMessage) {
            throw new Error(notFoundMessage);
        }
        throw error;
    }
}