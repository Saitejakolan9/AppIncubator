const universities = (state, action) => {
  switch (action.type) {
    case "GET_DATA": {
      return { ...state, loading: true };
    }
    case "GET_DATA_SUCCESS": {
      return { ...state, payload: action.payload, loading: false };
    }
    case "GET_DATA_ERROR": {
      return { ...state, loading: false, payload: {error : "Something went wrong"} };
    }
    default:
      return state ? state : null;
  }
};

export default universities;
