export const filterBySearchTerm = (value, searchTerm) => {
    if (searchTerm === "" || value.toLowerCase().includes(searchTerm.toLowerCase()))
        return true
}

export const filterByGender = (value, genderValue) => {
    if (value && value === genderValue)
        return true
}

export const filterByType = (value, typeValue) => {
    if (value && value === typeValue)
        return true
}