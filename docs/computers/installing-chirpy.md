---
title: Installing Chirpy
nav_exclude: true
---
Chirpy eventually worked, but I gave and switched to the much simpler [Just the Docs](https://github.com/just-the-docs/just-the-docs).

This is just a log of what happened.

## Failed Docker attempts

I worked from <https://chirpy.cotes.page/posts/getting-started/>.

After installing Docker Desktop, I clicked "Skip" on the offer of signing in.

In <https://chirpy.cotes.page/posts/getting-started/#using-dev-containers-recommended-for-windows>, I accidentally did an ordinary git clone, and, to see if I could get back on track, I clicked the "Reopen in Container" button in the VS Code "Folder contains a Dev Container configuration file" popup.  Unfortunately, it failed after a few minutes with "An error occurred setting up the container".  I spotted this error message in the logs:

docker: Error response from daemon: accessing specified distro mount service: stat /run/guest-services/distro-services/
ubuntu-22-04.sock: no such file or directory

I am giving up and following the Chirpy instructions properly.

- Quit VS Code
- Remove my chirpy clone
- Start VS Code and run Dev Containers: Clone Repository in Container Volume... from the Command Palette (F1).
- Enter https://github.com/dominicprior/my-chirpy

This did lots of docker-ish stuff before failing with "An error occurred setting up the container".

## WSL (first attempt)

I am giving up again and seeing if going via wsl helps.

- wsl --distribution Ubuntu-24.04
- docker --version

Oops!  I am not sure how to "open it in a container via VS Code" because presumably it means a native Linux VS Code.  Maybe I need to install a full Linux somewhere.

Now trying <https://chirpy.cotes.page/posts/getting-started/#setting-up-natively-recommended-for-unix-like-os> but inside WSL and without thinking about VS Code yet.

- git clone https://github.com/dominicprior/my-chirpy
- wsl --distribution Ubuntu-24.04
- sudo apt-get install ruby-full
- bundle   # error while trying to write to `/var/lib/gems/3.2.0/cache`

Oops!  It said "Don't run Bundler as root. Installing your bundle as root will break this application for all non-root users on this machine.".

It also said "You have to install development tools first".

## WSL

According to [Claude](https://claude.ai/share/fb9b67d8-e636-4ad1-b9e4-ebc5b9a9fef5), Jekyll and Ruby are primarily designed for Unix, while WSL2, on the other hand, is "remarkably faithful".  So I am going to reinstall my WSL Ubuntu distro (in case I messed it up earlier) and start again.

Claude also pointed out the WSL files are visible in Windows Explorer.

- wsl --unregister Ubuntu-22.04
- wsl --unregister Ubuntu-24.04
- wsl --unregister docker-desktop
- wsl -l --online
- wsl --install -d Ubuntu-24.04

## Installing Ruby

I am working from <https://jekyllrb.com/docs/installation/ubuntu/>.

- sudo apt-get install ruby-full build-essential zlib1g-dev

It said "Unable to locate package ruby-full".  Therefore:

- sudo apt update
- sudo apt-get install ruby-full build-essential zlib1g-dev

Then:

- echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
- echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
- echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
- source ~/.bashrc

and:

- gem install jekyll bundler

## Installing Chirpy

- mkdir git
- cd git
- git clone https://github.com/dominicprior/my-chirpy
- bundle
- bundle exec jekyll serve

Wow, it ran!  And produced a webpage at <http://127.0.0.1:4000/> in a fraction of a second.

- code \\wsl.localhost\Ubuntu-24.04\home\dominic\git\my-chirpy

## Seeing the underlying Gem

- bundle info --path jekyll-theme-chirpy  ==>  /home/dominic/gems/gems/jekyll-theme-chirpy-7.4.1

## GitHub access

When I tried a git push from a WSL bash prompt, I got "Password authentication is not supported for Git operations" due to GitHub 2FA etc.

So, instead, I had to make an access token.  For extra security, I chose to make a fine-grained access token, using 
[these instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens),
which started by clicking on my GitHub settings.

Part of the way through the instructions, it asked for a passkey (I think) which I gave simply by clicking on some google authentication button (if I remember rightly).

I chose the one repo, my-chirpy, and the one permission, contents with read and write.  Then I was able to use the personal access token instead of a password.
