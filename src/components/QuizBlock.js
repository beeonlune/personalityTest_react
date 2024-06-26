import React, { useState } from 'react';
import styled from "styled-components";
import PersonalityTypeSelector from './PersonalityTypeSelector';
import ENFJ from './ENFJ';
import ENFP from './ENFP';
import ENTJ from './ENTJ';
import ENTP from './ENTP';
import ESFJ from './ESFJ';
import ESFP from './ESFP';
import ESTJ from './ESTJ';
import ESTP from './ESTP';
import INFJ from './INFJ';
import INFP from './INFP';
import INTJ from './INTJ';
import INTP from './INTP';
import ISFJ from './ISFJ';
import ISFP from './ISFP';
import ISTJ from './ISTJ';
import ISTP from './ISTP';

const Container = styled.div``;
const QuestionsBlock = styled.div``;
const ProgressBar = styled.div`
  max-width: 98%;
  width: ${props => props.progress}%;
  height: 1.3vw;
  background: #BAA6B8;
  border-radius: 20px;
  display: flex;
  position: relative;
  margin: 0 10px;
`;
const AnswerButton = styled.label`
  display: inline-block;
  border: 1px solid #000;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ checked }) => (checked ? "#BAA6B8" : "transparent")};
  transition: background-color 0.5s;

  &:hover {
    background-color: #E7C6FF;
  }

  input {
    display: none;
  }
`;
const ResultBlock = styled.div`
  position: relative;
  top: 2vw; 
  width: 400px;
  left: 0.5vw; 
  background-color: white;
  color: black;
  padding: 1vw;
  border-radius: 1vw;
  max-width: 32.5vw; 
  font-family: 'Jost';
  font-style: normal;
  font-weight: 500;
`;
const InformationBlock = styled.div`
  justify-content: space-between; 
  position: absolute;
  top: 14.5vw;
  left: 28vw;
  width: 33vw;
  height: auto;
  bottom: 52vw;
  font-family: 'Jost';
  font-style: normal;
  font-weight: 500;
`;

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1vw;
  border-radius: 1vw;
  width: 65%; 
  position: relative;
  left: -3vw;
  text-align: left;
  overflow: auto; 
  height: 515px; 
  scrollbar-width: thin; 
  scrollbar-color: #d6dee1 transparent; 
  &::-webkit-scrollbar { 
    width: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 1vw;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: black;
  }
`;
const QuestionsContainer = styled.div`
position: relative;
width: 49vw;
height: 840px;
left: 9vw;
top: 22vw;
background: rgba(241, 226, 255, 0.7);
backdrop-filter: blur(50px);
border-radius: 20px;
text-align: left;
font-family: 'Jost';
font-style: normal;
font-weight: 500;
font-size: 25px;
line-height: 36px;

  .question-block {
    padding: 15px;
    border-radius: 1px;
    margin-bottom: 1px;
    text-align: left;
  }

  .question {
    margin-top: 10px;
    margin-bottom: 1px;
  }

  .answer-container {
    display: flex;
    justify-content: space-around;
    font-weight: bold; 
  }

`;

const QuizBlock = () => {
  const [selectedType, setSelectedType] = useState(null);
  const questionsPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isFinished, setFinished] = useState(false);
  const [result, setResult] = useState(''); 

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage * questionsPerPage < questions.length) {
      const nextPage = currentPage + 1;
      for (let i = currentPage * questionsPerPage; i < Math.min((currentPage + 1) * questionsPerPage, questions.length); i++) {
        if (answers[i] === null) {
          alert("Please answer all questions before proceeding.");
          return;
        }
      }
      setCurrentPage(nextPage);
    } else {
      setFinished(true);
      const calculatedResult = calculateMBTI(answers);
      setResult(calculatedResult);
      setSelectedType(calculatedResult); 
    }
  }

  const handleShowResult = () => {
    for (let i = currentPage * questionsPerPage; i < Math.min((currentPage + 1) * questionsPerPage, questions.length); i++) {
      if (answers[i] === null) {
        alert("Please answer all questions before seeing the result.");
        return;
      }
    }
    setFinished(true);
    const calculatedResult = calculateMBTI(answers);
    setResult(calculatedResult);
    setSelectedType(calculatedResult); 
  }

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage * questionsPerPage + index] = answer;
    setAnswers(updatedAnswers);
  }

  const renderQuestions = () => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = Math.min((currentPage + 1) * questionsPerPage, questions.length);
    return questions.slice(startIndex, endIndex).map((question, index) => (
      <div key={startIndex + index} className="question-block">
        <div className="question">{question}</div>
        <div className="answer-container">
        <AnswerButton checked={answers[currentPage * questionsPerPage + index] === "Yes"} style={{ width: '40px', height: '20px', lineHeight: '41px', borderRadius: '25px 25px 25px 25px', border: '3px solid rgba(186, 166, 184, 1)', marginLeft: '-37vw', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
            <input 
              type="radio" 
              name={`answer-${index}`} 
              value="Yes" 
              checked={answers[currentPage * questionsPerPage + index] === "Yes"} 
              onChange={() => handleAnswer(index, "Yes")} 
            />
            Yes
          </AnswerButton>
          <AnswerButton checked={answers[currentPage * questionsPerPage + index] === "No"} style={{ width: '40px', height: '20px', lineHeight: '41px', borderRadius: '25px 25px 25px 25px', border: '3px solid rgba(186, 166, 184, 1)', marginLeft: '-70vw', fontSize: '20px', display: 'flex', alignItems: 'center'}}>
            <input 
              type="radio"  
              name={`answer-${index}`} 
              value="No" checked={answers[currentPage * questionsPerPage + index] === "No"} 
              onChange={() => handleAnswer(index, "No")} 
            />
            No
          </AnswerButton>
        </div>
      </div>
    ));
  };

  const handleButtonClick = (type) => {
    setSelectedType(type); 
  };

  return (
    <Container>
      <QuestionsContainer>
        {!isFinished ? (
          <QuestionsBlock>
            {renderQuestions()}
            {currentPage > 0 && (
              <button id="prev-btn" className="button-prev" onClick={handlePrev}>
              </button>
            )}
            {currentPage === Math.ceil(questions.length / questionsPerPage) - 1 ? (
              <button id="next-btn" className="button-next" onClick={handleShowResult}>
              </button>
            ) : (
              <button id="next-btn" className="button-next" onClick={handleNext}>
              </button>
            )}
            <ProgressBar progress={(currentPage + 1) / (Math.ceil(questions.length / questionsPerPage)) * 100} />
          </QuestionsBlock>
        ) : (
            <div>
            <PersonalityTypeSelector result={selectedType} handleButtonClick={handleTypeChange} /> 
            <ResultBlock>
            <div id="result" style={{ border: "1px solid #000", padding: "10px", marginBottom: "10px" }}>
                Your MBTI type is {result}!
            </div>
            <div id="description" style={{ border: "1px solid #000", padding: "10px", marginBottom: "10px" }}>
                {result === "ISTJ" && (
                "ISTJ (Introverted, Sensing, Thinking, Judging) - ISTJs are responsible organizers, known for their practicality and attention to detail. They are focused on traditions and loyalty, and are often seen as dependable and dedicated individuals."
                )}
                {result === "ISFJ" && (
                "ISFJ (Introverted, Sensing, Feeling, Judging) - ISFJs are warm and conscientious individuals, often placing the needs of others above their own. They are reliable, hardworking, and have a strong sense of duty."
                )}
                {result === "INFJ" && (
                "INFJ (Introverted, Intuitive, Feeling, Judging) - INFJs are compassionate and insightful, often driven by their desire to help others and make a positive impact on the world. They are creative, idealistic, and value deep, meaningful connections."
                )}
                {result === "INTJ" && (
                "INTJs are analytical and innovative thinkers, known for their strategic approach to problem-solving. They are independent, determined, and have a strong drive to achieve their goals."
                )}
                {result === "ISTP" && (
                "ISTP (Introverted, Sensing, Thinking, Perceiving) - ISTPs are practical and adaptable, often drawn to hands-on activities and a desire for freedom. They are logical, resourceful, and enjoy exploring new experiences."
                )}
                {result === "ISFP" && (
                "ISFP (Introverted, Sensing, Feeling, Perceiving) - ISFPs are gentle and sensitive individuals, often expressing themselves through artistic and creative pursuits. They are empathetic, adaptable, and value harmony and personal growth."
                )}
                {result === "INFP" && (
                "INFP (Introverted, Intuitive, Feeling, Perceiving) - INFPs are idealistic and compassionate, driven by their desire to find meaning and authenticity in life. They are creative, empathetic, and value personal integrity and individuality."
                )}
                {result === "INTP" && (
                "INTP (Introverted, Intuitive, Thinking, Perceiving) - INTPs are logical and curious thinkers, known for their love of exploration and analysis. They are independent, inventive, and enjoy delving into complex ideas and theories."
                )}
                {result === "ESTP" && (
                "ESTP (Extraverted, Sensing, Thinking, Perceiving) - ESTPs are energetic and action-oriented individuals, often seeking excitement and new experiences. They are adaptable, pragmatic, and enjoy living in the present moment."
                )}
                {result === "ESFP" && (
                "ESFP (Extraverted, Sensing, Feeling, Perceiving) - ESFPs are spontaneous and fun-loving, often bringing joy and enthusiasm to those around them. They are sociable, supportive, and value living life to the fullest."
                )}
                {result === "ENFP" && (
                "ENFP (Extraverted, Intuitive, Feeling, Perceiving) - ENFPs are imaginative and empathetic, driven by their passion for exploring new possibilities and connecting with others. They are enthusiastic, creative, and value authenticity and personal growth."
                )}
                {result === "ENTP" && (
                "ENTP (Extraverted, Intuitive, Thinking, Perceiving) - ENTPs are innovative and resourceful thinkers, often drawn to intellectual challenges and debate. They are independent, curious, and enjoy exploring new ideas and opportunities."
                )}
                {result === "ESTJ" && (
                "ESTJ (Extraverted, Sensing, Thinking, Judging) - ESTJs are practical and decisive individuals, often taking charge and organizing others to achieve their goals. They are responsible, direct, and value efficiency and productivity."
                )}
                {result === "ESFJ" && (
                "ESFJ (Extraverted, Sensing, Feeling, Judging) - ESFJs are warm and caring, often taking on the role of nurturer and supporter within their communities. They are sociable, conscientious, and value harmony and cooperation."
                )}
                {result === "ENFJ" && (
                    "ENFJ (Extraverted, Intuitive, Feeling, Judging) - ENFJs are charismatic and compassionate, often inspiring and guiding others toward personal growth and positive change. They are empathetic, diplomatic, and value meaningful connections and teamwork."
                )}
                {result === "ENTJ" && (
                    "ENTJ (Extraverted, Intuitive, Thinking, Judging) - ENTJs are strategic and assertive leaders, known for their ability to take charge and implement long-term plans. They are decisive, ambitious, and value competence and achievement."
                )}
                </div>
                <div id="link" style={{ border: "1px solid #000", padding: "10px" }}>
                Want to learn more about what this means? You can consider visiting this source for more information: <a href="https://www.16personalities.com/">https://www.16personalities.com/</a>
                </div>
            </ResultBlock>
            <InformationBlock>
            <Text>
              {selectedType === 'INTJ' && (
                <div dangerouslySetInnerHTML={{ __html: INTJ }} />
              )}
              {selectedType === 'INTP' && (
                <div dangerouslySetInnerHTML={{ __html: INTP }} />
              )}
              {selectedType === 'ENTJ' && (
                <div dangerouslySetInnerHTML={{ __html: ENTJ }} />
              )}
              {selectedType === 'ENTP' && (
                <div dangerouslySetInnerHTML={{ __html: ENTP }} />
              )}
              {selectedType === 'INFJ' && (
                <div dangerouslySetInnerHTML={{ __html: INFJ }} />
              )}
              {selectedType === 'INFP' && (
                <div dangerouslySetInnerHTML={{ __html: INFP }} />
              )}
              {selectedType === 'ENFJ' && (
                <div dangerouslySetInnerHTML={{ __html: ENFJ }} />
              )}
              {selectedType === 'ENFP' && (
                <div dangerouslySetInnerHTML={{ __html: ENFP }} />
              )}
              {selectedType === 'ISTJ' && (
                <div dangerouslySetInnerHTML={{ __html: ISTJ }} />
              )}
              {selectedType === 'ISFJ' && (
                <div dangerouslySetInnerHTML={{ __html: ISFJ }} />
              )}
              {selectedType === 'ESTJ' && (
                <div dangerouslySetInnerHTML={{ __html: ESTJ }} />
              )}
              {selectedType === 'ESFJ' && (
                <div dangerouslySetInnerHTML={{ __html: ESFJ }} />
              )}
              {selectedType === 'ISTP' && (
                <div dangerouslySetInnerHTML={{ __html: ISTP }} />
              )}
              {selectedType === 'ISFP' && (
                <div dangerouslySetInnerHTML={{ __html: ISFP }} />
              )}
              {selectedType === 'ESTP' && (
                <div dangerouslySetInnerHTML={{ __html: ESTP }} />
              )}
              {selectedType === 'ESFP' && (
                <div dangerouslySetInnerHTML={{ __html: ESFP }} />
              )}
            </Text>
            </InformationBlock>
            </div>
        )}
      </QuestionsContainer>
    </Container>
  );
}

export default QuizBlock;

function calculateMBTI(answers) {
  let result = '';

  // Introversion/Extraversion
  let IE_count = 0;
  if (answers[0] == 'Yes') IE_count++;
  if (answers[6] == 'Yes') IE_count++;
  if (answers[12] == 'No') IE_count++;
  if (answers[14] == 'Yes') IE_count++;
  if (answers[18] == 'No') IE_count++;
  result += (IE_count >= 3) ? 'E' : 'I';

  // Sensing/Intuition
  let SN_count = 0;
  if (answers[4] == 'Yes') SN_count++;
  if (answers[9] == 'Yes') SN_count++;
  if (answers[13] == 'Yes') SN_count++;
  if (answers[17] == 'No') SN_count++;
  if (answers[19] == 'Yes') SN_count++;
  result += (SN_count >= 3) ? 'N' : 'S';

  // Thinking/Feeling
  let TF_count = 0;
  if (answers[2] == 'Yes') TF_count++;
  if (answers[3] == 'Yes') TF_count++;
  if (answers[8] == 'Yes') TF_count++;
  if (answers[10] == 'Yes') TF_count++;
  if (answers[15] == 'No') TF_count++;
  result += (TF_count >= 3) ? 'F' : 'T';

  // Judging/Perceiving
  let JP_count = 0;
  if (answers[1] == 'No') JP_count++;
  if (answers[5] == 'No') JP_count++;
  if (answers[7] == 'No') JP_count++;
  if (answers[11] == 'Yes') JP_count++;
  if (answers[16] == 'No') JP_count++;
  result += (JP_count >= 3) ? 'P' : 'J';

  return result;
}

const questions = [
  "You regularly make new friends.",
  "You prefer to do your chores before allowing yourself to relax.",
  "When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",
  "You are willing to bend the truth to make someone feel better.",
  "You enjoy experimenting with new and untested approaches.",
  "You like to use organizing tools like schedules and lists.",
  "You enjoy participating in team-based activities.",
  "Your living and working spaces are clean and organized.",
  "You are more likely to rely on emotional intuition than logical reasoning when making a choice.",
  "You become bored or lose interest when the discussion gets highly theoretical.",
  "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",
  "You often allow the day to unfold without any schedule at all.",
  "You enjoy solitary hobbies or activities more than group ones.",
  "You actively seek out new experiences and knowledge areas to explore.",
  "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
  "You favor efficiency in decisions, even if it means disregarding some emotional aspects.",
  "You prioritize and plan tasks effectively, often completing them well before the deadline.",
  "You are not too interested in discussions about various interpretations of creative works.",
  "You find the idea of networking or promoting yourself to strangers very daunting.",
  "Complex and novel ideas excite you more than simple and straightforward ones."
];