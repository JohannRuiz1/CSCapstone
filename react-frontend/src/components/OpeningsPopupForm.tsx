import {object, string, ValidationError} from "yup";
import {Form, Formik, FormikHelpers} from "formik";
import TextInput from "./form/TextInput.tsx";
import './PopupForm.css';
import React from "react";
import {RadioInput} from "./form/RadioInput.tsx";
import {useProfessorUserContext} from "../contexts/ProfessorUserContext.tsx";
import {ProfessorUser} from "../types.ts";

interface FormPopupProps {
    onClose: () => void;
    onCreate: (formData: FormData) => void;
}

interface FormData {
    name: string;
    description: string;
    type: 'Credit' | 'Paid' | 'Volunteer';
    url: string;
    labName: string;
    professor: ProfessorUser;
}



const OpeningsPopupForm: React.FC<FormPopupProps> = ({onClose, onCreate}) => {

    const {professor} = useProfessorUserContext();

    const initialValues: FormData = {
        name: '',
        description: '',
        type: 'Credit',
        url: '',
        labName: professor.lab.name,
        professor: {} as ProfessorUser
    }

    const validationSchema = object({
        name: string()
            .required("The name of the Opening is required."),
        description: string()
            .required("The description of the Opening is required."),
        type: string()
            .oneOf(['Credit', 'Paid', 'Volunteer'], 'Invalid Opening Type')
            .required("The Opening type is required."),
        url: string()
            .required("The URL to the opening is required.")
            .url("Please enter a valid URL.")
    })

    const handleSubmit = async (
        values: FormData,
        actions: FormikHelpers<FormData>
    ) => {
        const result = await validationSchema.validate(values, {abortEarly: false}).catch((err) => err);
        if (result instanceof ValidationError) {
            actions.setSubmitting(false);
        } else {
            if (professor) {
                const sendingData = {
                    name: values.name,
                    description: values.description,
                    type: values.type,
                    url: values.url,
                    labName: professor.lab.name,
                    professor: professor
                }
                onCreate(sendingData);
            } else {
                console.log("professor is null")
            }
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Add Opening</h2>
                <span className="close" onClick={onClose}>&times;</span>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    <Form>
                        <TextInput label="Position Title" name="name"/>
                        <TextInput label="Position Description" name="description" type="textarea"/>

                        <div className="radio-buttons">
                            <label htmlFor="type">Position Type:</label>
                            <RadioInput label="Credit" name="type" value="Credit"/>
                            <RadioInput label="Paid" name="type" value="Paid"/>
                            <RadioInput label="Volunteer" name="type" value="Volunteer"/>
                        </div>
                        <TextInput label="URL to Apply" name="url"/>
                        <TextInput label="Research Lab" name="labName" disabled={true}/>
                        <button type="submit" className="primary-button">CREATE</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default OpeningsPopupForm;