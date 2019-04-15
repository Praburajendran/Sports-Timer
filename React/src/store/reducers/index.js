const initialState = {
  posList: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'CAPTURE_DATA':
        return {
          posList: [...state],
        }
      case 'CAPTURE_DATA_SUCCESS':
        return {
          posList: [...state],
        }
      default:
          return state;
  }
}