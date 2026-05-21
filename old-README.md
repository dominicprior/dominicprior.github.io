Dominic's website based on <https://github.com/just-the-docs/just-the-docs>.

## Building the website locally

- (For Windows machines) install WSL Ubuntu
- bundle install
- bundle exec jekyll serve --incremental --force_polling --livereload

## Building on GitHub Pages

New builds are triggered by pushes onto the main branch due to:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- choosing `GitHub Actions` in `Settings ► Pages ► Build and deployment`

## The original setup

I used the non-gem approach so I could delve into the underlying Jekyll layouts.

My old, non-Jekyll version of the website is now tucked away in a folder called `old`.

I copied the files from
<https://github.com/just-the-docs/just-the-docs/releases/tag/v0.12.0> and added these fixes:

- remove `vendor` from `.gitignore` so that files like `_includes/vendor/anchor_headings.html` can be pushed to the repo. (This took days to figure out).
- remove the assets tests from `.github/workflows/ci.yml`.
- (for efficiency) remove `.github/workflows/publish-gem.yml`
- (for efficiency) narrow the matrix in `.github/workflows/ci.yml`.
