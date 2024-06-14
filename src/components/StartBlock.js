import React from 'react'
import compPic from './comp_pic.png';
import im13 from './heart.png';
import styled from "styled-components";

const Rectangle30 = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: absolute;
  width: 622px;
  height: 641px;
  left: 930px;
  top: -100px;
  border: 10px solid #F1E2FF;
  border-radius: 20px;
  transform: rotate(90deg);
`;
const Rectangle31 = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  position: absolute;
  width: 830px;
  height: 651px;
  left: 860px;
  top: 530px;

  border: 10px solid #F1E2FF;
  border-radius: 20px;
  transform: rotate(90deg);
`;
const Rectangle29 = styled.div`
  display: flex;
  box-sizing: border-box;
  position: absolute;
  width: 243px;
  height: 752px;
  left: 180px;
  top: -449px;
  border: 10px solid #F1E2FF;
  border-radius: 20px;
`;
const Rectangle28 = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 33px;
  height: 608px;
  left: 31vw;
  top: -80px;
  display: flex;

  background: #F1E2FF;
  transform: rotate(-90deg);
`;
const Image13 = styled.div`
  position: absolute;
  width: 983px;
  height: 488px;
  left: 730px;
  top: 81px;
  background-image: url(${im13});
  background-repeat: no-repeat;
`;
const CompPic = styled.div`
  position: absolute;
  width: 536px;
  height: 456px;
  left: 1020px;
  top: 650px;
  background-image: url(${compPic});
  background-size: cover;
  background-repeat: no-repeat;
`;
const TestText = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 842px;
  height: 141px;
  /*left: 15.2vw;*/
  left: 280px;
  top: 80px;

  font-family: 'Jost';
  font-style: bold;
  font-weight: 500;
  font-size: 100px;
  line-height: 144px;

  color: #000000;
`;

const StartBlock = (props) => {
    return (
      <>
      <Rectangle29></Rectangle29>
      <Rectangle28></Rectangle28>
      <TestText>Personality test</TestText>
      <Image13></Image13>
      <Rectangle30></Rectangle30>
      <Rectangle31></Rectangle31>
      <CompPic></CompPic>
        <div>   
            <p id="mbtiDescription" class="mbtiDescription">
                <span class="text">
                <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    The Myers-Briggs Type Indicator (MBTI) is a widely used personality assessment tool based on the psychological theories of Carl Jung. It categorizes individuals into 16 personality types, each represented by a combination of four dichotomous preferences:
                    <br />
                    <br />
                    1. Extraversion (E) or Introversion (I)
                    <br />
                    2. Sensing (S) or Intuition (N) 
                    <br />
                    3. Thinking (T) or Feeling (F)
                    <br />
                    4. Judging (J) or Perceiving (P)
                    <br />
                    <br />
                    These preferences result in 16 possible personality types, such as ISTJ, ENFP, or INFJ, each with its own unique characteristics and tendencies. The MBTI is often used to gain insights into individual differences in how people perceive the world, make decisions, and interact with others. 
                </span>
                <button id="start-btn" class="button-54" onClick={()=>{props.handleStart(true)}}>START</button>
            </p></div>
            </>
    )
}

export default StartBlock;