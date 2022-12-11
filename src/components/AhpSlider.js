import React from "react";
import Form from "react-bootstrap/Form";

export default function AhpSlider(props) {   

    const handleChange = (event) => {
        props.onChange(parseInt(event.target.value));
    }


    return (
        <div>
            <Form.Label>{props.name}</Form.Label>
            <Form.Range min={-8} max={8} step={1} value={props.value} onChange={handleChange} />
        </div>
    );
}