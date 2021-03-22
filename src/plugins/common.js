function DateAdd(date, format, num) {
    if (format === 'yyyy') {
        var y = date.getFullYear()
        y = y + num
        date.setFullYear(y)
    }
    return date
}

export default {
    DateAdd: DateAdd,
}
