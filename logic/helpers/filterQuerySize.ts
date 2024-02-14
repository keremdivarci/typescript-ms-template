/**
 *
 * @param page - Requested page
 * @param pageSize - The number of items per page
 * @returns {number} - The number of items to skip
 *
 * @example "If page is 2 and pageSize is 10, the function will return 10, which will correspond to the 11th to 20th items in a database"
 */
export function filterQuerySize(page: number, pageSize: number) {
    return ((page || 1) - 1) * pageSize
}
