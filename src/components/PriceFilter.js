import React from "react";
import Form from "react-bootstrap/Form";

export default function PriceFilter(props) {   

    const handlePriceMinChange = (event) => {
        props.onPriceMinChange(parseFloat(event.target.value) || 0);
    }

    const handlePriceMaxChange = (event) => {
        props.onPriceMaxChange(parseFloat(event.target.value) || 0);
    }

    return (
        <div>
            <Form.Label htmlFor="PriceMin">Price Min</Form.Label>
            <Form.Control type="number" id="PriceMin" name="PriceMin" value={props.priceMin} onChange={handlePriceMinChange} />
            <Form.Label htmlFor="PriceMax">Price Max</Form.Label>
            <Form.Control type="number" id="PriceMax" name="PriceMax" value={props.priceMax} onChange={handlePriceMaxChange} />
        </div>
    );
}