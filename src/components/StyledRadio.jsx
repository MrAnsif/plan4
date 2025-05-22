import React from 'react';
import styled from 'styled-components';


const StyledRadio = ({setActiveTab}) => {


    return (
        <StyledWrapper>
            <div className="pill-radio-container mb-3">
                <input defaultChecked name="plan" id="pill-free" type="radio" />
                <label htmlFor="pill-free"onClick={()=> setActiveTab('overview')}>Overview</label>
                <input name="plan" id="pill-basic" type="radio" />
                <label htmlFor="pill-basic" onClick={()=> setActiveTab('filingDetails')} >Filing Details</label>
                <div className="pill-indicator" />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .pill-radio-container {
    --main-color: #CBCCC6;
    --secondary-color: #636468;
    --text-color: #ddd;
    --pill-bg: #171F22;
    --total-options: 3;

    display: flex;
    position: relative;
    background: var(--pill-bg);
    border-radius: 1rem;
    padding: 0.5rem;
    gap: 1rem;
    box-shadow: 0 0 20px #000 inset;
    width: fit-content;
  }

  .pill-radio-container input {
    display: none;
  }

  .pill-radio-container label {
    position: relative;
    padding: 0.6rem 1.5rem;
    border-radius: 3rem;
    cursor: pointer;
    font-weight: 600;
    color: var(--text-color);
    transition: color 0.3s ease-in-out;
    z-index: 2;
  }

  .pill-radio-container input:checked + label {
    color: #fff;
  }

  .pill-radio-container label:hover {
    color: var(--main-color);
  }

  .pill-indicator {
    position: absolute;
    bottom: 5px;
    left: 0;
    height: 4px;
    width: calc(100% / var(--total-options));
    background: linear-gradient(
      to right,
      var(--main-color),
      var(--secondary-color)
    );
    border-radius: 2px;
    transition: transform 0.3s ease-in-out;
    z-index: 1;
  }

  /* Sliding effect */
  #pill-free:checked ~ .pill-indicator {
    transform: translateX(20%);
  }
  #pill-basic:checked ~ .pill-indicator {
    transform: translateX(170%);
  }`;

export default StyledRadio;
