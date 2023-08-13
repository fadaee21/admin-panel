/**
 * Formats a number with commas as thousands separators.
 * 
 * @param number - The number to be formatted.
 * @returns The formatted number as a string.
 */
const numberFormat = (number: number): string => {
    return new Intl.NumberFormat().format(number);
}

/**
 * Handles errors and returns a formatted error message.
 * @param err - The error object.
 * @returns The formatted error message.
 */
const handleError = (err: Error | any): string => {
    if (err.response) {
        console.log('Error Response', err.response.data);
        if (err.response.status === 422) {
            const errors: string[] = [];
            Object.keys(err.response.data.message).map((key: string) => {
                err.response.data.message[key].map((e: string) => {
                    errors.push(e);
                });
            });
            return errors.join(", ");
        }
        return err.response.data.message;
    } else if (err.request) {
        console.log('Error Request', err.request);
        return err.request;
    } else {
        return err.message;
    }
};

export { numberFormat, handleError }