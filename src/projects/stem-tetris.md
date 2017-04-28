---
title: STEM Tetris
section: Projects
layout: project.jade

index: 52

github:
    owner: "MKA-Stem"
    repo: "stem-tetris"
enableDescription: true
hasReadme: true
---

I made this to have a leaderboard for a fundraising Tetris competition hosted by my school's STEM Team. It runs on App Engine, with Datastore as the database. The frontend is written in React, and updates live from the server with a WebSocket. Whenever a new score is added from the admin interface, it is automatically added to the leaderboard without any page refresh. 

This was sort of a one-off project, so I didn't add any authentication beyond an access token for the admin API, and the WS server is not designed to scale out.
