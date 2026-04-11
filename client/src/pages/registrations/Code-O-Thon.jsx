import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration'


const event = {
  name:      "Code-A-Thon",
  duneTitle: "The Worm Rider's Sprint",
  category:  "Coding",
  tagline:   "Ride the worm. Solve the storm. Be the last standing.",
  quote:     "The sandworm does not wait for the rider to be ready. Neither does the problem set.",
  quoteAttr: "— Fedaykin Combat Code Manual",
  posterImg: "https://placehold.co/500x700/0E0C08/C8891A?text=Code-A-Thon",
  rules: [
    { title: "Eligibility",    body: "Open to all currently enrolled students of the institution. Valid ID required at the venue." },
    { title: "Registration",   body: "Each participant must register individually. Duplicate registrations will be disqualified without notice." },
    { title: "Team Size",      body: "Individual participation only. No teams permitted for this event." },
    { title: "Duration",       body: "Exactly 2 hours. The clock begins when the problem set is distributed. No extensions." },
    { title: "Language",       body: "Any programming language is permitted. Participants must declare their language at the start." },
    { title: "Devices",        body: "Personal laptops only. Internet access is strictly prohibited. Organisers may inspect devices." },
    { title: "Code of Honour", body: "Plagiarism, cheating, or use of pre-written code will result in immediate disqualification." },
    { title: "Judging",        body: "Scores based on correctness (60%), efficiency (25%), and code elegance (15%)." },
    { title: "Disputes",       body: "All disputes must be raised within 10 minutes of result announcement. Organiser's decision is final." },
    { title: "Final Authority", body: "The ByteBurst organising committee reserves the right to modify rules. Participation implies acceptance." },
  ],
}

export default function () {
  return (
    <>
        <EventRegistrationPage event={event}/>
    </>
  )
}
