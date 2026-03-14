export const INITIAL_STATE = {
  isValid: {
    text: true,
    title: true,
    date: true,
  },
  values: {
    text: "",
    title: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, values: { ...state.values, ...action.payload } };
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const textValidity = state.values.text?.trim().length;
      const titleValidity = state.values.title?.trim().length;
      const dateValidity = state.values.date;
      return {
        ...state,
        isValid: {
          text: textValidity,
          title: titleValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: textValidity && titleValidity && dateValidity,
      };
    }
    case "RESET":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit: false,
      };
  }
}
