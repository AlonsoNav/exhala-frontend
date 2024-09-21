export const filterBySearchTerm = (value, searchTerm) => {
    if (searchTerm === "" || value.toLowerCase().includes(searchTerm.toLowerCase()))
        return true
}