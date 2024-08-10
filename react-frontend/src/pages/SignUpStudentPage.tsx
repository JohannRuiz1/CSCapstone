import {Link, useNavigate} from "react-router-dom";
import "./SignUpPage.css"
import {loginPagePath, signupConfirmationPagePath, signUpProfessorPagePath, sleep} from "../utils.ts";
import {useMajorContext} from "../contexts/MajorContext.tsx";
import {useState} from 'react';
import {array, number, object, ref, string, ValidationError} from "yup";
import {Form, Formik, FormikHelpers} from "formik";
import TextInput from "../components/form/TextInput.tsx";
import {SelectInput} from "../components/form/SelectInput.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {SignUpResponse} from "../types.ts";
import {signUp} from "../services.ts";
import SituationCheckboxes from "../components/form/SituationCheckboxes.tsx";
import AcademicYearRadioButtons from "../components/form/AcademicYearRadioButtons.tsx";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    studentType: 'undergraduate' | 'graduate-masters' | 'graduate-phd';
    majorId: number;
    situation: string[];
}

const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentType: 'undergraduate',
    majorId: 1,
    situation: []
};

const validationSchema = object({
    firstName: string()
        .required('First name is required.'),
    lastName: string()
        .required('Last name is required.'),
    email: string()
        .email('Invalid email address.')
        .required('Email is required.'),
    password: string()
        .min(8, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
    confirmPassword: string()
        .oneOf([ref('password')], 'Passwords must match.')
        .required('Confirm password is required.'),
    studentType: string()
        .oneOf(['undergraduate', 'graduate-masters', 'graduate-phd'], 'Invalid student type.')
        .required('Student type is required.'),
    majorId: number()
        .integer('Major ID must be an integer.')
        .required('Major ID is required.'),
    situation: array()
        .of(string())
        .required('At least one situation must be selected.'),
});

export default function SignUpStudentPage() {
    const {majors} = useMajorContext()
    const navigate = useNavigate();
    const [signupStatus, setSignupStatus] = useState<string>("");
    const [serverErrorMessage, setServerErrorMessage] = useState<string>(
        "An unexpected error occurred on the server, please try again."
    );
    const handleSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        console.log("Sign Up Started");
        await sleep(1000);
        const result = await validationSchema.validate(values, {abortEarly: false}).catch((err) => err);
        if (result instanceof ValidationError) {
            setSignupStatus('ERROR');
            actions.setSubmitting(false);
        } else {
            setSignupStatus("PENDING");
            const situationsAsString = values.situation.join(', '); // Adjust the separator as needed
            const signUpResponse: SignUpResponse =
                await signUp({
                    username: values.email,
                    password: values.password,
                    role: "STUDENT",
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    year: values.studentType,
                    majorId: values.majorId,
                    aboutMe: situationsAsString
                });
            if (!signUpResponse.success) {
                setSignupStatus("SERVER_ERROR");
                setServerErrorMessage(signUpResponse.message);
            } else {
                setSignupStatus("OK");
                await sleep(1000);
                navigate(`${signupConfirmationPagePath}`);
            }
        }
    };

    return (
        <div className='signup-student-page center-content'>
            <section className='signup-form'>
                <h2>Student Sign Up</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput label="First Name" name="firstName"/>
                            <TextInput label="Last Name" name="lastName"/>
                            <TextInput label="VT Email" name="email"/>
                            <TextInput label="Password" name="password" type="password"/>
                            <TextInput label="Confirm Password" name="confirmPassword" type="password"/>

                            <AcademicYearRadioButtons/>

                            <SelectInput label="Major:" name="majorId" options={majors}></SelectInput>

                            <SituationCheckboxes/>

                            <div className="complete-student-signup">
                                <button type="submit" className="call-to-action-button"
                                        disabled={isSubmitting || signupStatus === 'PENDING'}>
                                    {isSubmitting ?
                                        <FontAwesomeIcon icon={faSpinner} spin/> : 'SIGN UP'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {signupStatus != '' && (
                    <section className="signup-status-box">
                        {signupStatus === 'ERROR' &&
                            <div>Error: Please fix the problems above and try again.</div>}
                        {signupStatus === 'PENDING' && <div>Processing...</div>}
                        {signupStatus === 'OK' && <div>Signing Up...</div>}
                        {signupStatus === "SERVER_ERROR" && serverErrorMessage}
                    </section>
                )}

                <div className="have-account">
                    <p>Already have an account?</p>
                    <Link to={loginPagePath}>Login</Link>
                    <p>Not a Student?</p>
                    <Link to={signUpProfessorPagePath}>Professor Sign Up</Link>
                </div>
            </section>
        </div>
    );
}