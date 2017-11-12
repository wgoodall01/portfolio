---
title: Turnitin Notify
section: Projects
layout: project.jade

index: 60

github:
    owner: "wgoodall01"
    repo: "turnitin-notify"
enableDescription: true
hasReadme: true
---

Turnitin.com, what we use at school to turn in most of our assignments, doesn't send any notifications for any event. That means that whenever something is graded, or a new assignment is added, I have no way of fiding out other than obsessively checking the website. So, I made a scraper that does that for me. 

Every 10 minutes, on a cronjob, it will log in to turnitin.com with my credentials, and basically scrape every client-facing page into JSON blob. It stores this, and diffs it with the last capture - and if anything's different, it sends me an SMS with the Twilio API.

That way, I'm the first to know when a due date changes, an assignment is graded, or anything else happens. 
