export function validateRequiredFields<T>(fields: T, required: (keyof T)[]): string | null {
    for (const field of required) {
        const value = fields[field];
        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '') ||
            (typeof value !== 'string' && !value)
        ) {
            return `Invalid Form, ${String(field)} can not be empty`;
        }
    }
    return null;
}

export function validateId(id: string): string | null {
    if (!id || typeof id !== "string" || id.trim() === "") {
        return "ID is required";
    }
    return null;
}