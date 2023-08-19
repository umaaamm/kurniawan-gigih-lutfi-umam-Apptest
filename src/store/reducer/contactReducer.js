import { contactType } from '../actionType';

const initialState = {
    getAllContact: [],
    loading: false,
    firsNameRequest: '',
    lastNameRequest: '',
    ageRequest: '',
    photoRequest: '',
    idContact: ''
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case contactType.SET_LIST_CONTACT:
            return { ...state, getAllContact: action.payload };
        case contactType.SET_LOADING:
            return { ...state, loading: action.payload };
        case contactType.SET_FIRSTNAME:
            return { ...state, firsNameRequest: action.payload };
        case contactType.SET_LASTNAME:
            return { ...state, lastNameRequest: action.payload };
        case contactType.SET_AGE:
            return { ...state, ageRequest: action.payload };
        case contactType.SET_PHOTO:
            return { ...state, photoRequest: action.payload };
        case contactType.SET_ID_CONTACT:
            return { ...state, idContact: action.payload };
        default:
            return state;
    }
};

export default contactReducer;