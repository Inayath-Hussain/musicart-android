export const capitalize = (value: string) => {
    if (typeof value !== "string") return value

    return value[0].toUpperCase() + value.slice(1)
}