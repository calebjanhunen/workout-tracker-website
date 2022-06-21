export default function loadingReducer(state = false, action) {
    switch (action.type) {
        case "TRUE":
            return action.payload;
        case "FALSE":
            return action.payload;
        default:
            return state;
    }
}
