const formatter = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "short",
    timeStyle: "short"
});

export function formatDate(timestamp) {
    const date = new Date(timestamp);
    return formatter.format(date).replace(/,/, '');
}