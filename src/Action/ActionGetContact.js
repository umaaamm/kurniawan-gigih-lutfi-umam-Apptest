import { useDispatch } from "react-redux";
import endPointServices from "../services/endPointServices";
import { setContact, setLoading } from '../store/action/contactAction'

const callServicesGetContact = ({
    onSuccess = (result) => result,
    onReject = (result) => result,
    onError = (error) => error,
}) => {

    const dispatch = useDispatch()
    const submit = async () => {
        try {
            dispatch(setLoading(true))
            let response = await endPointServices.getContact()
            let isSuccessRequest;

            if (response.status == 200) {
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
            dispatch(setLoading(false))
            onReject(error);
            return false;
        }
    };

    return {
        submit,
        // loading,
    };
};

export default callServicesGetContact;