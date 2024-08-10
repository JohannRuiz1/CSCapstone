// src/components/form/SituationCheckboxes.tsx
import React from 'react';
import { CheckboxInput } from './CheckboxInput.tsx';

const SituationCheckboxes: React.FC = () => {
    return (
        <div className="checkboxes">
            <label htmlFor='situation'>Select the boxes that best describe you:</label>
            <CheckboxInput label="Seeking Volunteer Opportunities" id="seeking-volunteer"
                           name="situation" value="seeking-volunteer"/>
            <CheckboxInput label="Seeking Credit Opportunities" id="seeking-credit"
                           name="situation" value="seeking-credit"/>
            <CheckboxInput label="Seeking Paid Opportunities" id="seeking-paid" name="situation"
                           value="seeking-paid"/>
            <CheckboxInput label="Currently a Volunteer" id="current-volunteer" name="situation"
                           value="current-volunteer"/>
            <CheckboxInput label="Currently Receiving Credit" id="current-credit" name="situation"
                           value="current-credit"/>
            <CheckboxInput label="Currently Paid" id="current-paid" name="situation"
                           value="current-paid"/>
        </div>
    );
};

export default SituationCheckboxes;