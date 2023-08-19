import { useDispatch, useSelector } from "react-redux";
import endPointServices from "../services/endPointServices";
import { setContact, setLoading } from '../store/action/contactAction'

const callServicesDeleteContact = ({
    onSuccess = (result) => result,
    onReject = (result) => result,
    onError = (error) => error,
}) => {
    const { contactReducer } = useSelector(
        (selector) => selector,
    );
    const dispatch = useDispatch()
    const submit = async () => {
        try {
            dispatch(setLoading(true))
            let response = await endPointServices.deleteContact(contactReducer.idContact)
            let isSuccessRequest;

            if (response.status == 202) {
                isSuccessRequest = true
                dispatch(setLoading(false))
                dispatch(setContact(response?.data?.data))
                onSuccess(response.data);
                return isSuccessRequest;
            }

            dispatch(setLoading(false))
            isSuccessRequest = false
            onError(response);
            return isSuccessRequest;

        } catch (error) {
            console.log('asafd',error);
            dispatch(setLoading(false))
            onReject(error);
            return false;
        }
    };

    return {
        submit,
    };
};

export default callServicesDeleteContact;