import React from 'react';
import './Button.component.css';
export const Button = (props) => {
    console.log('Props contains the',props);
    const disabledLabel = props.disabledLabel || 'Submitting..';
    const enabledLabel = props.enabledLabel || 'Submit';
    let button = props.isSubmitting
        ? <button disabled className="btn btn-info m-t-10">{disabledLabel}</button>
        : <button disabled={props.isDisabled} className="btn btn-success m-t-10" type="submit">{enabledLabel}</button>
    return button;
}
