import React from 'react'
import EventRegistrationPage from '../../components/EventRegistration'

const event = {
  "name": "Techno Commercial",
  "duneTitle": "The Spacing Guild Negotiation",
  "category": "Business",
  "tagline": "Every deal is a desert crossing. Only the prepared reach the other side.",
  "quote": "The Guild does not move without profit. Neither should you — but the profit must be earned, not seized.",
  "quoteAttr": "— CHOAM Merchant Accord, Article III",
  "posterImg": "https://placehold.co/500x700/0E0C08/C8891A?text=Bug-Bunty",
  "rules": [
    {
      "title": "Eligibility",
      "body": "Open to all enrolled students regardless of branch. Valid institution ID required."
    },
    {
      "title": "Team Size",
      "body": "Teams of 2–3 members. All members must be registered and present at the time of participation."
    },
    {
      "title": "Format",
      "body": "Teams will receive a product brief and must present a business pitch within the allotted time."
    },
    {
      "title": "Duration",
      "body": "Preparation time: 30 minutes. Presentation: 7 minutes. Q&A: 5 minutes. Strict adherence required."
    },
    {
      "title": "Resources",
      "body": "Teams may use printed notes and non-electronic reference materials. Laptops and phones are prohibited."
    },
    {
      "title": "Presentation",
      "body": "No slide decks or digital aids. Verbal and whiteboard presentation only."
    },
    {
      "title": "Code of Honour",
      "body": "Fabricating statistics or misrepresenting data will result in immediate disqualification."
    },
    {
      "title": "Judging",
      "body": "Scored on feasibility (35%), market insight (35%), and communication (30%)."
    },
    {
      "title": "Disputes",
      "body": "Post-result appeals must be submitted in writing within 10 minutes. Verbal objections are not valid."
    },
    {
      "title": "Final Authority",
      "body": "All decisions by the judging panel are final. The committee reserves the right to disqualify any entry."
    }
  ]
};


export default function TechnoCommercial() {
  return (
    <>
        <EventRegistrationPage event={event} />
    </>
  )
}
