import { ValidatorResponse } from "@core/events/validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react-lite";
import React from "react";

interface BaseValidatorBoxProps {
    validationResult: ValidatorResponse[];
}

const BaseValidatorBox: React.FC<BaseValidatorBoxProps> = observer((props) => {
    const { validationResult } = props;

    const warnings = validationResult.filter(v => v.isWarning);
    const firstError = validationResult.find(v => !v.isWarning);

    const combinedResults = firstError ? [firstError] : warnings;

    return (
        <div className="w-full">
            {combinedResults.map((v, index) => (
                <div key={index} className="flex items-center gap-x-2 mb-1">
                    {!v.isWarning ? (
                        <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 align-top" />
                    ) : (
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-yellow-500" />
                    )}

                    <label className={v.isWarning ? "text-yellow-500" : "text-destructive"}>
                        {v.message}
                    </label>
                </div>
            ))}
        </div>
    );
});

export default BaseValidatorBox;
