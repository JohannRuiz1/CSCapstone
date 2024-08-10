import {Formik, Form, FormikHelpers, Field, ErrorMessage} from 'formik';
import React, {useState} from 'react';
import {useCollegeContext} from "../contexts/CollegeContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import {number, object, ref, string, ValidationError} from "yup";
import {loginPagePath, signupConfirmationPagePath, signUpStudentPagePath, sleep} from "../utils.ts";
import {CollegeItem, MajorItem, SignUpResponse} from "../types.ts";
import {signUp} from "../services.ts";
import TextInput from "../components/form/TextInput.tsx";
import {SelectInput} from "../components/form/SelectInput.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {CheckboxInput} from "../components/form/CheckboxInput.tsx";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    collegeId: number;
    addLab: boolean;
    majorId: number;
    labName: string;
    labUrl: string;
    labDescription: string;
}

const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    collegeId: 1,
    addLab: false,
    majorId: 1,
    labName: '',
    labUrl: '',
    labDescription: ''
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
    collegeId: number().required('College is required')
});

export default function SignUpProfessorPage() {
    const {colleges} = useCollegeContext();
    const navigate = useNavigate();
    const [signupStatus, setSignupStatus] = useState<string>("");
    const [serverErrorMessage, setServerErrorMessage] = useState<string>(
        "An unexpected error occurred on the server, please try again."
    );
    const [selectedCollegeMajors, setSelectedCollegeMajors] = useState<MajorItem[]>(colleges[0].majors);

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
            let signUpResponse: SignUpResponse;
            if (values.addLab) {
                signUpResponse =
                    await signUp({
                        username: values.email,
                        password: values.password,
                        role: "PROFESSOR",
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        collegeId: values.collegeId,
                        majorId: values.majorId,
                        labName: values.labName,
                        labUrl: values.labUrl,
                        labDescription: values.labDescription
                    });
                if (!signUpResponse.success) {
                    setSignupStatus("SERVER_ERROR");
                    setServerErrorMessage(signUpResponse.message);
                } else {
                    setSignupStatus("OK");
                    await sleep(1000);
                    navigate(`${signupConfirmationPagePath}`);
                }
            } else {
                signUpResponse =
                    await signUp({
                        username: values.email,
                        password: values.password,
                        role: "PROFESSOR",
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        collegeId: values.collegeId
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
        }
    };

    const handleCollegeChange = (event: React.ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: number) => void) => {
        const selectedCollegeId = parseInt(event.target.value, 10);
        setFieldValue('collegeId', selectedCollegeId);
        const selectedCollege = colleges.find(college => college.id === selectedCollegeId);
        if (selectedCollege) {
            setSelectedCollegeMajors(selectedCollege.majors);
        }
    };

    return (
        <div className='signup-professor-page center-content'>
            <section className='signup-form'>
                <h2>Professor Sign Up</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({isSubmitting, values, setFieldValue}) => (
                        <Form>
                            <TextInput label="First Name" name="firstName"/>
                            <TextInput label="Last Name" name="lastName"/>
                            <TextInput label="VT Email" name="email"/>
                            <TextInput label="Password" name="password" type="password"/>
                            <TextInput label="Confirm Password" name="confirmPassword" type="password"/>

                            <div>
                                <label htmlFor="collegeId">College:</label>
                                <Field as="select" name="collegeId"
                                       onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCollegeChange(e, setFieldValue)}>
                                    {colleges.map((option: CollegeItem) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage className="checkout-field-error" name="collegeId" component="span"/>
                            </div>

                            <CheckboxInput label="Add Research Lab?" id="addLab" name="addLab"/>

                            {values.addLab && (
                                <>
                                    <SelectInput label="Major:" name="majorId"
                                                 options={selectedCollegeMajors}></SelectInput>
                                    <TextInput label="Research Lab Name" name="labName"/>
                                    <TextInput label="Research Lab Website URL" name="labUrl" type="url"/>
                                    <TextInput label="Research Lab Description" name="labDescription" type="textarea"/>
                                </>
                            )}

                            <div className="complete-professor-signup">
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
                    <p>Not a Professor?</p>
                    <Link to={signUpStudentPagePath}>Student Sign Up</Link>
                </div>

            </section>
        </div>
    );
}