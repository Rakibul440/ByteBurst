import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration'

const event = {
  "name": "CSS Warriors",
  "duneTitle": "The Weavers of the Sand Tapestry",
  "category": "Design",
  "tagline": "Pixels are your sandstone. Code is your crysknife. Shape the unseen.",
  "quote": "The desert does not become beautiful by accident — it is shaped by wind, time, and the hands of those who dare.",
  "quoteAttr": "— Fremen Weavers' Saying",
  "posterImg": "https://placehold.co/500x700/0E0C08/C8891A?text=CSS-Warriors",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students. Valid ID required at the venue."
    },
    {
      "title": "Registration",
      "body": "Individual participation only. No collaborative entries will be accepted."
    },
    {
      "title": "Challenge Brief",
      "body": "A UI design target (screenshot or mockup) will be revealed at the start. Participants must replicate it using CSS only."
    },
    {
      "title": "Duration",
      "body": "Exactly 90 minutes. Submissions made after time will not be evaluated."
    },
    {
      "title": "Languages",
      "body": "HTML and CSS only. JavaScript, CSS frameworks, and preprocessors are strictly prohibited."
    },
    {
      "title": "Devices",
      "body": "Personal laptops only. Internet access is not permitted. Offline documentation is allowed."
    },
    {
      "title": "Code of Honour",
      "body": "Use of any pre-written CSS templates, frameworks, or AI generation tools will result in disqualification."
    },
    {
      "title": "Judging",
      "body": "Scored on visual accuracy (50%), CSS technique quality (30%), and responsiveness (20%)."
    },
    {
      "title": "Disputes",
      "body": "Disputes on evaluation must be raised within 10 minutes of score release. Verbal appeals are invalid."
    },
    {
      "title": "Final Authority",
      "body": "The ByteBurst organising committee's assessment of visual accuracy is final and non-negotiable."
    }
  ]
};

export default function CssWarriors() {
  return (
    <><EventRegistrationPage event={event}/></>
  )
}
