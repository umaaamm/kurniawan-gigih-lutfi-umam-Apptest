import { useDispatch, useSelector } from "react-redux";
import endPointServices from "../services/endPointServices";
import { setLoading } from '../store/action/contactAction'

const callServicesEditContact = ({
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

            var data = {
                firstName: contactReducer.firsNameRequest,
                lastName: contactReducer.lastNameRequest,
                age: contactReducer.ageRequest,
                photo:contactReducer.photoRequest,
              };

            let response = await endPointServices.editContact(contactReducer.idContact, data)

            let isSuccessRequest;
            if (response.status == 201) {
                isSuccessRequest = true
                dispatch(setLoading(false))
                onSuccess(response.data);
                return isSuccessRequest;
            }

            dispatch(setLoading(false))
            isSuccessRequest = false
            onError(response);
            return isSuccessRequest;

        } catch (error) {
            console.log('afdfdfd dfddd', error);
            dispatch(setLoading(false))
            onReject(error);
            return false;
        }
    };

    return {
        submit,
    };
};

export default callServicesEditContact;