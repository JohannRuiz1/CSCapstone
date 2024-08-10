import React from 'react';
import { CheckboxInput } from './CheckboxInput.tsx';

interface SubscriptionCheckboxesProps {
    subscriptions: string[];
}

const SituationCheckboxes: React.FC<SubscriptionCheckboxesProps> = ({subscriptions}) => {
    return (
        <div className="checkboxes">
            <label htmlFor='situation'>Select the boxes to unsubscribe:</label>
            {subscriptions.map((subscription, index) => (
                <CheckboxInput
                    key={index}
                    label={subscription}
                    id={`subscription-${index}`}
                    name="unsubscribitions"
                    value={subscription}
                />
            ))}
        </div>
    );
};

export default SituationCheckboxes;
