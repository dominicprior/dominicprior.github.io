# Dominic's website

These are the source materials for my website,
[dominicprior.github.io](https://dominicprior.github.io/).

The files in the docs folder are translated from the simple
[markdown](https://en.wikipedia.org/wiki/Markdown) format into static HTML by a system called
[Jekyll](https://en.wikipedia.org/wiki/Jekyll_(software)) that is run
whenever the source materials change.  The layout and colours are
chosen by the [Just the Docs Jekyll theme](https://just-the-docs.com/).

## Installation details

This website is using the recommended [template](https://just-the-docs.github.io/just-the-docs-template/) approach.

Once Ruby and Jekyll are installed, it can run locally with `bundle install` and `bundle exec jekyll serve`.
(On Windows, it is best to run these commands from a [WSL](https://learn.microsoft.com/en-us/windows/wsl/) Ubuntu shell).

The website is hosted on [GitHub Pages](https://docs.github.com/en/pages) by setting Settings->Pages->Source to GitHub Actions.

The previous version of this website went against the grain by running on a non-Gem-based fork of Just the Docs, and before settling on Just the Docs, I tried the Al Folio and Chirpy themes.

The first (non-Jekyll) version of this website has moved to <https://dominicprior.github.io/old/>.

This website can run in a [project site as well as a user site](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites).  The `baseurl` just needs to be `/reponame`, where reponame is the name of your repo.  The site would be served at http://127.0.0.1:4000/reponame/.
