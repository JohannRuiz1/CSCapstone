import { Field } from 'formik';

interface CheckboxInputProps {
    label: string;
    id: string;
    name?: string;
    value?: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, id, name, value }) => {
    return (
        <div>
            <label htmlFor={id}>
                <Field type="checkbox" name={name} id={id} value={value} />
                {label}
            </label>
        </div>
    );
};