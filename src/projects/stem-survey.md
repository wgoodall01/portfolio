---
title: Stem-survey
section: Projects
layout: project.jade

index: 10

github:
    owner: "mka-stem"
    repo: "stem-survey"
enableDescription: true
hasReadme: true
---

For the STEM team at MKA, I made an app to record club sign-ups and figure out what people wanted to do. People fill out a survey at the club fair when they sign up, and they can see the results come in live on a monitor to sort of showcase some of the cool things we do in the club.

The app is implemented in Nodejs/express/angular, and runs on Heroku using their excellent managed postgresql. It has a tiny API and uses a websocket to stream results to clients.
