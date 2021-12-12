import React from 'react';
import styles from './buttons.module.scss';

export const CustomButton = (props) => {
    return (
        <div>
            <button
                className={`
                    ${props.classType === 'primaryBtn' ? styles.primaryBtn : ''}
                    ${props.classType === 'secondaryBtn' ? styles.secondaryBtn : ''}
                    ${props.classType === 'tertiaryBtn' ? styles.tertiaryBtn : ''}
                    ${props.classType === 'feeCardBtn' ? styles.feeCardBtn : ''}
                    ${props.classType === 'regularCardBtn' ? styles.regularCardBtn : ''}
                    ${props.classType === 'formSubmitBtn' ? styles.formSubmitBtn : ''}
                    ${props.classType === 'formRejectBtn' ? styles.formRejectBtn : ''}
                    ${props.classType === 'successBtn' ? styles.successBtn : ''}
                    ${props.classType === 'dangerBtn' ? styles.dangerBtn : ''}
                `}
                disabled={props.buttonDisabled}
                onClick={props.handleClick}
                name={props.buttonName}
                type={props.buttonType}
            >
                {props.frontIcon && props.frontIcon}
                &nbsp;&nbsp;
                {props.label}
                &nbsp;&nbsp;
                {props.backicon && props.backicon}
            </button>
        </div>
    )
}

CustomButton.defaultProps = {
    classType: "primaryBtn",
    type:'button'
}
