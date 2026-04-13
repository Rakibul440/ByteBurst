import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration';

const event = {
  "name": "Graphics Design",
  "duneTitle": "The Cartographer's Sigil",
  "category": "Design",
  "tagline": "Every line is a spice trail. Every colour, a mirage you must earn.",
  "quote": "A map of Arrakis drawn without precision is not a map — it is a death sentence. Design accordingly.",
  "quoteAttr": "— Fremen Wayfinder's Codex",
  "posterImg": "https://placehold.co/500x700/0E0C08/C8891A?text=Graphics-Design",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students with a valid institution ID."
    },
    {
      "title": "Registration",
      "body": "Individual participation only. Group submissions will not be evaluated."
    },
    {
      "title": "Theme",
      "body": "A theme will be revealed at the start of the event. All submissions must address it directly."
    },
    {
      "title": "Duration",
      "body": "Participants have exactly 90 minutes from theme announcement. Submissions after time are voided."
    },
    {
      "title": "Tools",
      "body": "Any design software is permitted. AI-generated content used as a final output is prohibited."
    },
    {
      "title": "Devices",
      "body": "Personal devices only. Sharing assets or resources between participants is not allowed."
    },
    {
      "title": "File Format",
      "body": "Final submission must be exported as a single PDF or PNG at minimum 1920×1080 resolution."
    },
    {
      "title": "Judging",
      "body": "Scored on creativity (40%), theme adherence (35%), and technical execution (25%)."
    },
    {
      "title": "Disputes",
      "body": "Concerns regarding scoring must be raised within 10 minutes of result announcement."
    },
    {
      "title": "Final Authority",
      "body": "The organising committee's decision on theme interpretation and judging is final and binding."
    }
  ]
};

export default function GraphicsDesign() {
  return (
    <><EventRegistrationPage event={event}/></>
  )
}
