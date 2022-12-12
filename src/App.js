import logo from './logo.svg';
import './App.css';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceFilter from "./components/PriceFilter";
import React, {useState} from "react";
import AhpSlider from './components/AhpSlider';


const initialState = {
  priceMin: 0,
  priceMax: 0,
  "Ahp.0.1": 0,
  "Ahp.0.2": 0,
  "Ahp.0.3": 0,
  "Ahp.1.2": 0,
  "Ahp.1.3": 0,
  "Ahp.2.3": 0,
}


function App() {
  const [state, setState] = useState(initialState);

  const handleChange = key => value => {
    setState({
      ...state,
      [key]: value
    });
    console.log(state);
  }
  return (
    <div className="App">
      <PriceFilter 
      onPriceMinChange={handleChange('priceMin')}
      onPriceMaxChange={handleChange('priceMax')}
      priceMin={state.priceMin}
      priceMax={state.priceMax}
      />
    <AhpSlider
      name="Price_ReviewCount"
      value={state['Ahp.0.1']}
      onChange={handleChange('Ahp.0.1')}
    />
    <AhpSlider
      name="Price_PositiveRatingPercentage"
      value={state['Ahp.0.2']}
      onChange={handleChange('Ahp.0.2')}
    />
    <AhpSlider
      name="Price_AveragePlaytime"
      value={state['Ahp.0.3']}
      onChange={handleChange('Ahp.0.3')}
    />
    <AhpSlider
      name="ReviewCount_PositiveRatingPercentage"
      value={state['Ahp.1.2']}
      onChange={handleChange('Ahp.1.2')}
    />
    <AhpSlider
      name="ReviewCount_AveragePlaytime"
      value={state['Ahp.1.3']}
      onChange={handleChange('Ahp.1.3')}
    />
    <AhpSlider
      name="PositiveRatingPercentage_AveragePlaytime"
      value={state['Ahp.2.3']}
      onChange={handleChange('Ahp.2.3')}
    />
    </div>
  );
}

export default App;
