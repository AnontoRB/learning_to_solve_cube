# Cubers

A simple website for learning the 3x3 Rubik's Cube. It has detailed guides for CFOP, Roux, ZZ, blindfolded and one-handed solving, plus beginner, F2L, OLL and PLL algorithms, and a separate page that explains cube notation with pictures.

No build step and no dependencies. It is plain HTML, CSS and JavaScript.

## Files

- `index.html` - the home page (methods and algorithms)
- `notation.html` / `notation.js` - the Notation page, with 3x3 cube pictures and an interactive cube
- `style.css` - all styles
- `script.js` - algorithm data, methods, login and profile
- `favicon.svg` - site icon
- `.nojekyll` - tells GitHub Pages to serve the files as they are

## Run on your computer

Open `index.html` in a browser.

## Publish with GitHub Pages

1. Create a new repository on GitHub, for example `cubers`.
2. Upload all the files in this folder to the repository root.
3. Go to Settings, then Pages.
4. Under Build and deployment, choose Deploy from a branch, pick `main` and `/ (root)`, then Save.
5. After a minute your site is at `https://YOUR-USERNAME.github.io/cubers/`.

## Notes

- Login is by name only and is saved in the browser (localStorage) on that device. There are no passwords or server yet.
- Please double-check the algorithms against a trusted source such as speedsolving.com before relying on them.
- The page loads the Inter font from Google Fonts. If it is blocked, a system font is used.
