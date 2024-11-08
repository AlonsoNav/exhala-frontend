export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export const validatePhone = (phone) => {
    const re = /^\d{8}$/
    return re.test(phone)
}