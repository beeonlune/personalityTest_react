import React from 'react';
import styled from 'styled-components';

const PersonalityTypeTable = styled.div`
  border: 2px solid rgba(186, 166, 184, 1);
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 0px;
  border-radius: 10px;
  max-width: 600px;
  position: relative;
  left: 125px;
  top: 20px;
  font-family: 'Jost';
  font-style: normal;
  font-weight: 500;
`;

const PersonalityButton = styled.button`
  padding: 10px 20px;
  border: 2px solid rgba(186, 166, 184, 1);
  border-radius: 5px;
  background-color: ${({ active }) => (active ? 'rgba(186, 166, 184, 1)' : '#f0f0f0')};
  cursor: pointer;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const PersonalityTypeSelector = ({ result, handleButtonClick }) => {
  const personalityTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];
  
  return (
    <PersonalityTypeTable>
      {personalityTypes.map((type) => (
        <PersonalityButton
          key={type}
          active={result === type}
          onClick={() => handleButtonClick(type)}
        >
          {type}
        </PersonalityButton>
      ))}
    </PersonalityTypeTable>
  );
};

export default PersonalityTypeSelector;