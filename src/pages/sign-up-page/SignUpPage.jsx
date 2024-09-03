import {useFormik} from "formik";
import * as Yup from "yup";
import {EMAIL_REGEX} from "../../utils/Constants.js";
import classes from "../login-page/LoginPage.module.css";
import {Button} from "@mui/material";
import {hasEmptyStringOnly} from "../../utils/utilHelper.js";
import {signUp} from "../../api/authApi.js";
import {storeAuthDataInLocalStorage} from "../../utils/authHelper.js";
import {dispatch} from "../../store.js";
import {storeAuthData} from "../../features/authDataSlice.js";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {errorNotification} from "../../utils/notificationHelper.js";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: signUp,
        onSuccess: (result) => {
            signupForm.handleReset();
            const authData = {
                authToken: result.data.authToken,
                expirationTime: result.data.expirationTime,
                user: result.data.user
            }
            storeAuthDataInLocalStorage(authData);
            dispatch(storeAuthData(authData));
            navigate('/');
        },
        onError: (error) => {
            errorNotification(error.response.data.message);
            console.error(error);
        }
    });

    const handleSignUp = (values) => {
        mutate(values);
    }

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('*Required').min(5, 'Name must have at least five characters'),
            email: Yup.string()
                .required('*Required').matches(EMAIL_REGEX, 'Email is invalid'),
            password: Yup.string()
                .required('*Required').min(6, 'Password must have at least six characters')
        }),
        onSubmit: handleSignUp
    });
    return (
        <>
            <div className={`shadow ${classes.formContainer} tex`}>
                <h3 className={`text-center text-color`}>SignUp Form</h3>
                <form onSubmit={signupForm.handleSubmit}>
                    <div className={`form-group my-2`}>
                        <label htmlFor={`name`} className={`text-color`}>Name</label>
                        <input id={`name`} type={`text`} {...signupForm.getFieldProps('name')}
                               className={`form-control`}/>
                        {(signupForm.touched.name && signupForm.errors.name) &&
                            <span className="text-danger">{signupForm.errors.name}</span>}
                    </div>

                    <div className={`form-group my-2`}>
                        <label htmlFor={`email`} className={`text-color`}>Email</label>
                        <input id={`email`} type={`email`} {...signupForm.getFieldProps('email')}
                               className={`form-control`}/>
                        {(signupForm.touched.email && signupForm.errors.email) &&
                            <span className="text-danger">{signupForm.errors.email}</span>}
                    </div>

                    <div className={`form-group my-2`}>
                        <label htmlFor={`password`} className={`text-color`}>Password</label>
                        <input id={`password`} type={`password`} {...signupForm.getFieldProps('password')}
                               className={`form-control`}/>
                        {(signupForm.touched.password && signupForm.errors.password) &&
                            <span className="text-danger">{signupForm.errors.password}</span>}
                    </div>

                    <div className={`d-flex justify-content-center`}>
                        <Button variant="contained" type="submit"
                                disabled={!signupForm.isValid || hasEmptyStringOnly(signupForm.values)}>
                            Sign Up
                        </Button>
                    </div>
                </form>
                <Link to={`/login`}>Back to login</Link>
            </div>
        </>
    )
}
