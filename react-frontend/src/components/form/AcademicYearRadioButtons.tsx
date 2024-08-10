// src/components/form/AcademicYearRadioButtons.tsx
import React from 'react';
import { RadioInput } from './RadioInput.tsx';

const AcademicYearRadioButtons: React.FC = () => {
    return (
        <div className="radio-buttons">
            <label htmlFor='studentType'>Student Type:</label>
            <RadioInput label="Undergraduate" name="studentType" value="undergraduate"/>
            <RadioInput label="Graduate (Master's)" name="studentType" value="graduate-masters"/>
            <RadioInput label="Graduate (PhD)" name="studentType" value="graduate-phd"/>
        </div>
    );
};

export default AcademicYearRadioButtons;