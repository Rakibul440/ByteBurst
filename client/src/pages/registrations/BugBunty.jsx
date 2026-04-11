import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration'

const event = {
  "name": "Bug Bounty",
  "duneTitle": "The Hunter-Seeker Protocol",
  "category": "Coding",
  "tagline": "The defect hides in the dark. Find it before it finds you.",
  "quote": "A Hunter-Seeker is only deadly to the one who cannot see it coming. Learn to see what others miss.",
  "quoteAttr": "— Suk Medical Security Briefing, Corrino Era",
  posterImg: "https://placehold.co/500x700/0E0C08/C8891A?text=Bug-Bunty",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students. Valid institution ID is mandatory at check-in."
    },
    {
      "title": "Registration",
      "body": "Individual participation only. No team-based bug hunting permitted."
    },
    {
      "title": "Scope",
      "body": "Only systems and code repositories explicitly listed in the event brief are in scope. No exceptions."
    },
    {
      "title": "Duration",
      "body": "Participants have exactly 90 minutes. The repository is locked to submissions after the timer ends."
    },
    {
      "title": "Reporting",
      "body": "Each bug must be reported via the official submission portal with steps to reproduce, severity, and evidence."
    },
    {
      "title": "Devices",
      "body": "Personal laptops only. Automated scanners and pre-written exploit scripts are strictly prohibited."
    },
    {
      "title": "Code of Honour",
      "body": "Attempting to exploit systems outside the defined scope is a disqualifiable and reportable offence."
    },
    {
      "title": "Judging",
      "body": "Bugs scored by severity: critical (10pts), high (7pts), medium (4pts), low (1pt). Duplicates yield no points."
    },
    {
      "title": "Disputes",
      "body": "Duplicate and severity disputes must be raised within 15 minutes of result publication."
    },
    {
      "title": "Final Authority",
      "body": "The ByteBurst committee's classification of bug severity and validity is final and binding."
    }
  ]
};

export default function BugBunty() {
  return (
    <>
      <EventRegistrationPage event={event} />
    </>
  )
}
