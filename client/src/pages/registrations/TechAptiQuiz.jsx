import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration'

const event = {
  "name": "Tech & Apti Quiz",
  "duneTitle": "The Mentat Trials",
  "category": "Quiz",
  "tagline": "Logic is a weapon. The fastest mind commands the stillsuit.",
  "quote": "A Mentat who hesitates has already computed the wrong answer. Speed and precision are one.",
  "quoteAttr": "— House Atreides Combat Manual",
  "posterImg": "https://placehold.co/500x700/0E0C08/C8891A?text=Bug-Bunty",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students. Valid ID is mandatory for participation."
    },
    {
      "title": "Team Size",
      "body": "Teams of exactly 2 members. Neither solo nor larger groups will be permitted."
    },
    {
      "title": "Format",
      "body": "Multiple rounds including rapid-fire, buzzer, and written segments. Format may vary per round."
    },
    {
      "title": "Devices",
      "body": "No phones, smartwatches, or electronic devices during the quiz. Violators will be eliminated."
    },
    {
      "title": "Answering",
      "body": "Only the spokesperson may answer during buzzer rounds. Simultaneous answers will be disqualified."
    },
    {
      "title": "Negative Marking",
      "body": "Incorrect buzzer answers carry a penalty of -1. Passed questions are open to all teams."
    },
    {
      "title": "Code of Honour",
      "body": "Any form of external communication or signal between teams results in immediate disqualification."
    },
    {
      "title": "Judging",
      "body": "Final score is cumulative across all rounds. Tiebreakers will be resolved by a sudden-death question."
    },
    {
      "title": "Disputes",
      "body": "Factual disputes must be raised immediately. Retrospective appeals will not be considered."
    },
    {
      "title": "Final Authority",
      "body": "The quizmaster's ruling on all answers is final. Decisions will not be reversed post-announcement."
    }
  ]
};

export default function TechAptiQuiz() {
  return (
    <>
        <EventRegistrationPage event={event}/>
    </>
  )
}
