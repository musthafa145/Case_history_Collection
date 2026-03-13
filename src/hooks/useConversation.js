import { useState, useEffect } from 'react';

export const useConversation = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentStep, setCurrentStep] = useState({ type: 'text' });

  // THE MASTER LIST: Cleaned up for conversational flow (Removed redundant DOB)
  const PROTOCOL_FIELDS = [
    // 1. SOCIO-DEMOGRAPHIC
    { field: "name", label: "Name", type: "text" },
    { field: "age", label: "Age", type: "text" },
    { field: "gender", label: "Gender", type: "choice", options: ["Male", "Female", "Transgender", "Prefer not to say"] },
    { field: "edu_qual", label: "Highest Educational Qualification", type: "choice", options: ["High School", "Bachelor's", "Master's", "PhD", "Other"] },
    { field: "marital_status", label: "Marital Status", type: "choice", options: ["Single", "Married", "Divorced", "Widowed", "Separated"] },
    { field: "occupation", label: "Current Occupation", type: "text" },
    { field: "ses", label: "Socio-Economic Status", type: "choice", options: ["Lower", "Middle", "Upper"] },
    { field: "religion", label: "Religion / Belief System", type: "text" },
    { field: "residence", label: "Residence Type", type: "choice", options: ["Urban", "Rural", "Semi-urban"] },
    
    // 2. CHIEF COMPLAINTS
    { field: "complaints_chrono", label: "Main Reason for Visit", type: "text" },
    { field: "course", label: "Course of the Issue", type: "choice", options: ["Continuous", "Episodic", "Worsening", "Improving", "Static"] },
    { field: "onset", label: "How it Started", type: "choice", options: ["Suddenly", "Gradually"] },
    { field: "precipitating", label: "Triggers or Immediate Causes", type: "text" },
    
    // 3. BIOLOGICALS
    { field: "sleep", label: "Sleep Pattern", type: "choice", options: ["Normal", "Trouble falling asleep", "Waking up early", "Sleeping too much"] },
    { field: "appetite", label: "Appetite", type: "choice", options: ["Normal", "Increased", "Decreased"] },
    
    // 4. PRE-MORBID PERSONALITY
    { field: "attitude_self", label: "General attitude towards yourself", type: "text" },
    { field: "mood_baseline", label: "Usual mood before these issues started", type: "text" }
  ];

  const systemInstructions = `
    You are a warm, empathetic clinical counselor guiding a user through an intake form.
    The user you are chatting with IS the patient.
    
    TASK: Ask the user for the specific piece of information required.
    
    RULES:
    1. Speak directly to the user in the first person (use "you", "your").
    2. Be gentle, conversational, and friendly, but keep it brief.
    3. Validate their previous answer slightly if appropriate, then ask the next question.
    4. Output ONLY valid JSON.
    Format: {"message": "Your empathetic question here"}
  `;

  const getNextField = (data) => PROTOCOL_FIELDS.find(f => !data[f.field]);

  useEffect(() => {
    const init = async () => {
      setIsTyping(true);
      const first = PROTOCOL_FIELDS[0];
      const res = await callOllama(`Say hello warmly and ask for the user's ${first.label}.`, first);
      try {
        const parsed = JSON.parse(res);
        setMessages([{ sender: 'bot', text: parsed.message }]);
        setCurrentStep({ ...first, ...parsed });
      } catch (e) {
        setMessages([{ sender: 'bot', text: `Hi there. To get started, what is your name?` }]);
        setCurrentStep(first);
      }
      setIsTyping(false);
    };
    init();
  }, []);

  const callOllama = async (prompt, targetField) => {
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
          model: "mistral",
          prompt: `SYSTEM: ${systemInstructions}\nFIELD TO ASK FOR: ${targetField.label}\nCONTEXT: ${prompt}`,
          stream: false,
          format: "json"
        }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      return JSON.stringify({ message: "Network Error." });
    }
  };

  const handleUserAnswer = async (answer) => {
    const updatedData = { ...userData, [currentStep.field]: answer };
    setUserData(updatedData);
    setMessages(prev => [...prev, { sender: 'user', text: Array.isArray(answer) ? answer.join(", ") : answer }]);
    setIsTyping(true);

    const nextField = getNextField(updatedData);

    if (!nextField) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Thank you for sharing all of this with me. Your information has been securely recorded." }]);
      setIsTyping(false);
      return;
    }

    const res = await callOllama(`User's last answer was: "${answer}". Acknowledge it briefly and naturally, then ask for their ${nextField.label}.`, nextField);
    
    try {
      const parsed = JSON.parse(res);
      setMessages(prev => [...prev, { sender: 'bot', text: parsed.message }]);
      setCurrentStep({ ...nextField, ...parsed });
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'bot', text: `Got it. Next, what is your ${nextField.label}?` }]);
      setCurrentStep(nextField);
    }
    
    setIsTyping(false);
  };

  return { messages, isTyping, currentStep, handleUserAnswer, userData };
};