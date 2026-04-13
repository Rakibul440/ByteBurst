import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration';
const event = {
  "name": "Hackathon",
  "duneTitle": "The Maker's Crucible",
  "category": "Coding",
  "tagline": "Twenty-four hours. One problem. No water breaks for the weak.",
  "quote": "In the deep desert, survival is not a product of tools — it is a product of the mind that wields them.",
  "quoteAttr": "— Stilgar's Address to New Riders",
  "posterImg": "https://placehold.co/500x700/0E0C08/C8891A?text=Hackathon",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students. Cross-department teams are encouraged."
    },
    {
      "title": "Team Size",
      "body": "Teams of 2–4 members. All must be registered before the event commencement."
    },
    {
      "title": "Duration",
      "body": "24-hour continuous build session. Participants must remain within the designated venue."
    },
    {
      "title": "Problem Statement",
      "body": "Themes will be revealed at the opening ceremony. Solutions must be original and theme-relevant."
    },
    {
      "title": "Mentors",
      "body": "Mentors are available for guidance but may not contribute code or design to any team's project."
    },
    {
      "title": "Submissions",
      "body": "A GitHub repository link and a 3-minute demo video must be submitted before the deadline. Late entries are void."
    },
    {
      "title": "Code of Honour",
      "body": "All code must be written during the hackathon. Pre-built templates used as core logic are disqualified."
    },
    {
      "title": "Judging",
      "body": "Evaluated on innovation (30%), impact (30%), technical depth (25%), and presentation (15%)."
    },
    {
      "title": "Disputes",
      "body": "Disputes regarding plagiarism or rule violations must be reported to the committee before result announcement."
    },
    {
      "title": "Final Authority",
      "body": "The ByteBurst organising committee has final authority on all judging and eligibility decisions."
    }
  ]
};
export default function Hackathon() {
  return (
    <><EventRegistrationPage event={event} buttonName='View Problem Statements' navigatePath='/events/hackathon/problem-statements' /></>
    
  )
}
