import './LoginPage.css'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {
    signUpProfessorPagePath,
    signUpStudentPagePath,
    sleep,
    welcomePagePath
} from "../utils.ts";
import {useUserContext} from "../contexts/UserContext.tsx";
import {LoginResponse} from "../types.ts";
import {login} from "../services.ts";
import {Form, Formik, FormikHelpers} from "formik";
import TextInput from "../components/form/TextInput.tsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {object, string, ValidationError} from "yup";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

interface FormValues {
    username: string,
    password: string
}

const initialValues: FormValues = {
    username: '',
    password: ''
}

const validationSchema = object({
    username: string()
        .required("Please provide an email.")
        .email("Your email must contain @xxx.xxx"),
    password: string()
        .required("Please provide a password")
});

export default function LoginPage() {
    const {setToken, setRole, setEmail} = useUserContext();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState<string>("");
    const [serverErrorMessage, setServerErrorMessage] = useState<string>(
        "An unexpected error occurred on the server, please try again."
    );

    const handleSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        await sleep(1000);
        const result = await validationSchema.validate(values, {abortEarly: false}).catch((err) => err);
        if (result instanceof ValidationError) {
            setLoginStatus('ERROR');
            actions.setSubmitting(false);
        } else {
            const loginResponse: LoginResponse =
                await login({
                        username: values.username,
                        password: values.password
                    }
                );
            if (!loginResponse.success) {
                setLoginStatus("SERVER_ERROR");
                setServerErrorMessage(loginResponse.message);
            } else {
                setLoginStatus("OK");
                setRole(loginResponse.role);
                setEmail(values.username);
                setToken(loginResponse.token);
                await sleep(1000);
                navigate(`${welcomePagePath}`);
            }
        }
    };

    return (
        <div className='login-page center-content'>
            <section className='login-form'>
                <h2>Login</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput label="VT Email" name="username"/>
                            <TextInput label="Password" name="password" type="password"/>
                            <div className="complete-login">
                                <button type="submit" className="primary-button"
                                        disabled={isSubmitting || loginStatus === 'PENDING'}>
                                    {isSubmitting ?
                                        <FontAwesomeIcon icon={faSpinner} spin/> : 'LOGIN'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {loginStatus != '' && (
                    <section className="login-status-box">
                        {loginStatus === 'ERROR' &&
                            <div>Error: Please fix the problems above and try again.</div>}
                        {loginStatus === 'PENDING' && <div>Processing...</div>}
                        {loginStatus === 'OK' && <div>Logging In...</div>}
                        {loginStatus === "SERVER_ERROR" && serverErrorMessage}
                    </section>
                )}

                <div className="no-account">
                    <p>Don't have an account?</p>
                    <Link to={signUpStudentPagePath}>Student Sign Up</Link>
                    <Link to={signUpProfessorPagePath}>Professor Sign Up</Link>
                </div>
            </section>
        </div>
    );
}
