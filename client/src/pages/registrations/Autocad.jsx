import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration'

const event = {
  name: "Autocad ME / CE",
  duneTitle: "The Sietch Architect's Mandate",
  category: "Design",
  tagline: "Precision is survival. Every millimetre a matter of life beneath the dunes.",
  quote: "The sietch was not carved by passion — it was carved by those who measured twice and drew once.",
  quoteAttr: "— Fremen Engineering Proverb",
  posterImg: "https://placehold.co/500x700/0E0C08/C8891A?text=AutoCad",
  rules: [
    {
      title: "Eligibility",
      body: "Open to Mechanical and Civil Engineering students of the institution. Valid department ID required."
    },
    {
      title: "Registration",
      body: "Individual participation only. Each participant must register with their branch clearly specified."
    },
    {
      title: "Software",
      body: "AutoCAD (any standard version) is the only permitted software. Additional plugins are not allowed."
    },
    {
      title: "Duration",
      body: "Participants have 2 hours to complete the assigned drawing task. No overtime will be granted."
    },
    {
      title: "Problem Statement",
      body: "The design brief will be disclosed at the event start. No prior distribution will occur."
    },
    {
      title: "Saving & Submission",
      body: "Final file must be saved in .DWG format and submitted via the designated USB drive provided."
    },
    {
      title: "Code of Honour",
      body: "Sharing screens, files, or dimensions with other participants is strictly prohibited."
    },
    {
      title: "Judging",
      body: "Evaluated on dimensional accuracy (50%), drawing standards (30%), and completion (20%)."
    },
    {
      title: "Disputes",
      body: "Discrepancies in judging must be raised within 15 minutes of result disclosure."
    },
    {
      title: "Final Authority",
      body: "The ByteBurst organising committee holds final authority on all design evaluation decisions."
    }
  ]
};

export default function Autocad() {
  return (
    <>
      <EventRegistrationPage event={event} />
    </>
  )
}
