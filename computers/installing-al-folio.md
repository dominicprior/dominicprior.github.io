---
title: Installing Al Folio
nav_exclude: true
---
# Installing Al Folio
The [recommended approach](https://github.com/alshedivat/al-folio/blob/main/INSTALL.md#recommended-approach) of running Jekyll inside GitHub Actions seemed too slow, which was why I wanted a local version.

The recipe that worked (after a few false starts) was exactly what they proposed:

- [Install WSL](https://github.com/alshedivat/al-folio/blob/main/INSTALL.md#local-setup-on-windows).  Luckily, WSL itself was already on my computer, and so I just had to run `wsl --install -d Ubuntu-24.04` and `wsl --distribution Ubuntu-24.04`, which landed me in an Ubuntu bash session, complete with mount points for a Unix filesystem and the Windows C: drive.  (I didn't understand their point about only needing to go up to step 4, but luckily things turned out OK).

- [Install Docker](https://github.com/alshedivat/al-folio/blob/main/INSTALL.md#local-setup-using-docker-recommended).  This was the hardest stage because of confusion between `docker compose` and `docker-compose`, and false starts with `apt-get install docker` and accidentally running too old a version of Ubuntu.  (It wasn't helped by terminology like docker.io, docker-ce and snap docker).  It turns out that the Linux distros haven't necessarily packaged the latest version of Docker, and that it is better to [install directly from the Docker apt repository](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).  Then `sudo docker compose pull` and `sudo docker compose up` launched some Docker thing that conjured up the al-folio website on `http://localhost:8080/al-folio/` and responded to edits to my `~/git/al-folio/_pages/about.md`.

After those setup steps, I found I could cd to another al-folio (called my-al-folio on my C: drive), and get things going again just with `sudo docker compose up`.
