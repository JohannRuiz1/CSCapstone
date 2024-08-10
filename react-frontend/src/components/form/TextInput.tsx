import React from 'react';
import {Field, ErrorMessage} from 'formik';

interface TextInputProps {
    label: string;
    name: string;
    type?: string;
    disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({label, name, type = 'text', disabled = false}) => {
    return (
        <>
            <div>
                <label htmlFor={name}>{label}:</label>
                {type === 'textarea' ? (
                    <Field as="textarea" name={name} disabled={disabled}/>
                ) : (
                    <Field type={type} name={name} disabled={disabled}/>
                )}
            </div>
            <ErrorMessage className="field-error" name={name} component="span"/>
        </>
    );
};


export default TextInput;