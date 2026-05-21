This website is built using the [Just the Docs Jekyll theme](https://just-the-docs.com/),
using the recommended Ruby [Gem-based template](https://just-the-docs.github.io/just-the-docs-template/) approach.

Once Ruby and Jekyll are installed, it can run locally with `bundle install` and `bundle exec jekyll serve`, in a [WSL](https://learn.microsoft.com/en-us/windows/wsl/) Ubuntu shell if you're on Windows.

It also automatically rebuilds on GitHub Pages, once Settings->Pages->Source is set to GitHub Actions.

The previous version of this website went against the grain by running on a non-Gem-based fork of Just the Docs.  And before settling on Just the Docs, I tried Al Folio and Chirpy.

The first (non-Jekyll) version of this website has moved to <https://dominicprior.github.io/old/>.

This website can run in a [project site as well as a user site](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites).  The `baseurl` just needs to be `/reponame`, where reponame is the name of your repo.  The site is served at http://127.0.0.1:4000/reponame/.
