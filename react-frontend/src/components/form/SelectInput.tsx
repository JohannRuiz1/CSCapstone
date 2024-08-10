// Update SelectInput component in `src/components/form/SelectInput.tsx`
import {Field, ErrorMessage} from 'formik';
import React from 'react';
import {CollegeItem, MajorItem, ResearchLabItem} from "../../types.ts";

interface SelectInputProps {
    label: string;
    name: string;
    options: MajorItem[] | CollegeItem[] | ResearchLabItem[];
    valueKey?: 'id' | 'name';
}

export const SelectInput: React.FC<SelectInputProps> = ({label, name, options, valueKey = 'id'}) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field as="select" name={name}>
                {options.map((option: MajorItem | CollegeItem | ResearchLabItem) => (
                    <option key={option.id} value={valueKey === 'id' ? option.id : option.name}>
                        {option.name}
                    </option>
                ))}
            </Field>
            <ErrorMessage className="checkout-field-error" name={name} component="span"/>
        </div>
    );
};