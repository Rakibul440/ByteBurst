import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration';

const event = {
  "name": "Prompt Engineering",
  "duneTitle": "The Voice of the Kwisatz Haderach",
  "category": "AI",
  "tagline": "Words are power. The right command bends the machine to your will.",
  "quote": "Paul did not ask the universe for mercy — he commanded it with precision. Your prompts must do the same.",
  "quoteAttr": "— Bene Gesserit Oral Tradition, Cycle VII",
  "posterImg": "https://placehold.co/500x700/0E0C08/C8891A?text=Bug-Bunty",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students. No prior AI experience is required but will be advantageous."
    },
    {
      "title": "Registration",
      "body": "Individual participation only. Team submissions will not be evaluated."
    },
    {
      "title": "Tools",
      "body": "Participants will be provided access to a designated AI interface. External AI tools are prohibited."
    },
    {
      "title": "Duration",
      "body": "Each round is strictly timed. Prompts must be submitted within the window or they will be voided."
    },
    {
      "title": "Format",
      "body": "Multiple rounds of increasing complexity. Early rounds are qualifying; final round is ranked."
    },
    {
      "title": "Scoring Basis",
      "body": "Output is evaluated against a reference benchmark. Closer alignment to target output yields higher score."
    },
    {
      "title": "Code of Honour",
      "body": "Sharing prompts or output with other participants during the event leads to instant disqualification."
    },
    {
      "title": "Judging",
      "body": "Scored on output accuracy (50%), efficiency of prompt (30%), and creative approach (20%)."
    },
    {
      "title": "Disputes",
      "body": "Challenges to benchmark results must be raised within 10 minutes of score display."
    },
    {
      "title": "Final Authority",
      "body": "The organising committee's evaluation of AI outputs is final. Subjective appeals will not be entertained."
    }
  ]
};

export default function PromptEngineering() {
  return (
    <><EventRegistrationPage event={event}/></>

  )
}
