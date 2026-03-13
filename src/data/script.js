export const conversationSteps = [
  {
    id: "welcome",
    message: "Hi there. I'm here to help you get ready for your session. Everything we talk about is private. Ready to begin?",
    type: "choice",
    options: ["Let's begin"],
    field: null
  },
  {
    id: "name",
    message: "First, what is the name you'd like your counselor to call you?",
    type: "text",
    field: "name"
  },
  {
    id: "occupation",
    message: "Nice to meet you. What do you do with most of your days? (e.g., working, student, or taking a break)",
    type: "text",
    field: "occupation"
  },
  {
    id: "chief_complaint",
    message: "Take your time with this... In your own words, what has been weighing on you lately?",
    type: "voice_text", // We'll use this to show the mic icon later
    field: "verbatim_complaint"
  },
  {
    id: "onset",
    message: "Did these feelings start suddenly, or have they been building up over time?",
    type: "choice",
    options: ["Suddenly", "Gradually"],
    field: "onset"
  },
  // Add these to your existing conversationSteps array
  {
  id: "sleep",
  message: "How has your sleep been lately?",
  type: "slider",
  labels: ["Very Poor", "Very Restful"],
  field: "sleep_quality"
  },
  {
  id: "appetite",
  message: "How about your appetite?",
  type: "slider",
  labels: ["No appetite", "Eating more than usual"],
  field: "appetite_level"
  },
  // NEW: Family & Social History
  {
    id: "family_history",
    message: "Does anyone else in your family have a history of similar emotional or mental health challenges?",
    type: "choice",
    options: ["Yes, on my father's side", "Yes, on my mother's side", "Both sides", "No one that I know of"],
    field: "family_psychiatric_history"
  },
  {
    id: "premorbid_personality",
    message: "If you had to describe your 'usual self' before these challenges began, which words fit best?",
    type: "choice", // You can turn this into multi-select later
    options: ["Quiet/Reserved", "Social/Outgoing", "Anxious/Worrier", "Cheerful/Optimistic"],
    field: "premorbid_personality"
  },
  // NEW: Personal History (Education/Work)
  {
    id: "educational_history",
    message: "How was your experience during your school and college years? Did you find it stressful or manageable?",
    type: "text",
    field: "educational_adjustment"
  },
  {
    id: "occupational_history",
    message: "How has your relationship been with your work and colleagues recently?",
    type: "text",
    field: "occupational_history"
  }
];