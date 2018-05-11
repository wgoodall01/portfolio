---
title: SafeSend
section: Projects
layout: project.jade

index: 75

github:
    owner: "MKA-Stem"
    repo: "ayc-galvanize"
enableDescription: true
hasReadme: false
---

SafeSend was the MKA STEM team's project for the 2018 Agile Youth Challenge hackathon. Responding to the prompt of security, we built an app which could securely send messages over an insecure channel. It encrypts the message client-side, keeping the key in escrow on the server. When the recipient gets the encrypted message, they can decrypt it after authenticating with a code texted to their phone, which releases the key and allows them to decrypt the message. 

We implemented the app with a Node.js backend and a React frontend, talking over a couple HTTP API calls. During the course of the hackathon, we first worked out the API and cryptosystem as a team, before splitting off and implementing the frontend and backend separately. We managed to the the whole thing together in under 6 hours, deploying the finished product to Heroku and creating a pitch video for the judges.

At the end of the competition, we won first place in the advanced division for the project, as well as an award for best use of the agile methodology and best pitch video.
