export function setLoadingTrue() {
    return {
        type: "TRUE",
        payload: true,
    };
}

export function setLoadingFalse() {
    return {
        type: "FALSE",
        payload: false,
    };
}
