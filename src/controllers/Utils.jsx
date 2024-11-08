export const getImageType = (base64String) => {
    const matches = base64String.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
    return matches ? matches[1] : 'png';  // By default return png
}