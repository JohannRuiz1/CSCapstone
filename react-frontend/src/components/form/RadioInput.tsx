import React from 'react';
import { Field } from 'formik';

interface RadioInputProps {
    label: string;
    name: string;
    value: string;
}

export const RadioInput: React.FC<RadioInputProps> = ({ label, name, value }) => {
    return (
        <div>
            <label htmlFor={value}>
                <Field type="radio" name={name} id={value} value={value}/>
                {label}
            </label>
        </div>
    );
};