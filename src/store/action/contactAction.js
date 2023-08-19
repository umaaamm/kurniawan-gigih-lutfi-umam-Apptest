import { contactType } from '../actionType';

export const setContact = value => {
    return {
        type: contactType.SET_LIST_CONTACT,
        payload: value,
    };
};

export const setLoading = value => {
    return {
        type: contactType.SET_LOADING,
        payload: value,
    };
};

export const setFistNameReq = value => {
    return {
        type: contactType.SET_FIRSTNAME,
        payload: value,
    };
};

export const setLastNameReq = value => {
    return {
        type: contactType.SET_LASTNAME,
        payload: value,
    };
};

export const setAgeReq = value => {
    return {
        type: contactType.SET_AGE,
        payload: value,
    };
};

export const setPhotoReq = value => {
    return {
        type: contactType.SET_PHOTO,
        payload: value,
    };
};

export const setIdContact = value => {
    return {
        type: contactType.SET_ID_CONTACT,
        payload: value,
    };
};