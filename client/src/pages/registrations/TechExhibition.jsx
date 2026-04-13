import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration';

const event = {
  "name": "Tech Exhibition",
  "duneTitle": "The Arrakeen Showcase",
  "category": "Exhibition",
  "tagline": "Display your ingenuity. The sietch remembers those who build.",
  "quote": "The maker does not boast — the maker shows. Let your creation speak louder than the desert wind.",
  "posterImg": "https://placehold.co/500x700/0E0C08/C8891A?text=Tech-Exhibition",
  "quoteAttr": "— Bene Gesserit Archive, Vol. IV",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students. A valid institution ID must be presented at the venue entrance."
    },
    {
      "title": "Registration",
      "body": "Teams of 2–4 members must register together. Solo entries are not permitted for this event."
    },
    {
      "title": "Project Scope",
      "body": "Projects must be original and built by the registered team. Commercial or third-party products will be disqualified."
    },
    {
      "title": "Setup Window",
      "body": "Teams have a 30-minute setup window before judging begins. No setup assistance from outsiders is allowed."
    },
    {
      "title": "Presentation",
      "body": "Each team will present for exactly 5 minutes followed by a 3-minute Q&A. Overrun will be penalised."
    },
    {
      "title": "Materials",
      "body": "All hardware, posters, and peripherals must be brought by the team. The venue provides only power outlets."
    },
    {
      "title": "Code of Honour",
      "body": "Misrepresenting someone else's work as your own results in immediate disqualification of the entire team."
    },
    {
      "title": "Judging",
      "body": "Scored on innovation (40%), functionality (35%), and presentation clarity (25%)."
    },
    {
      "title": "Disputes",
      "body": "Disputes must be filed in writing within 15 minutes of result declaration. Verbal appeals will not be entertained."
    },
    {
      "title": "Final Authority",
      "body": "The ByteBurst committee reserves all rights to amend rules. Participation constitutes acceptance."
    }
  ]
};

export default function TechExhibition() {
  return (
    <><EventRegistrationPage event={event}/></>
  )
}
