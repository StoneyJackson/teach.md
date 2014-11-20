# teach.md

A framework for generating HTML slides, activites, and handouts written in
markdown.


## License

Copyright &copy; Stoney Jackson<br>
[GPLv3](http://www.gnu.org/licenses/)


## Required

- bash
- Python 3
- GNU make
- pandoc
- plantuml


## 3rd Party Projects

teach.md ships with several 3rd party projects. They can be found under
'assets/' along with their licenses.


## Install

- Install required software (see above)
- Clone teach.md

You might consider creating a git branch to store your content and changes. If
you do, delete `src/.gitignore`.


## Use

Put your content in `src/`. Organize it any way you want. Follow a couple of
naming conventions to identify markdown files a slides, activities, or a
handout. Run `make` to generate `www/`. Run `make` clean do delete everything in
`www/`.

Files named `\*.slides.md` will generate reveal.js slide presentations.
You may customize its output by modifying `templates/slides.html` and the options
passed to pandoc within the `Makefile`.

Similarly files named `\*.activity.md` will generate HTML based on
`templates/activity.html`.

Files named `\*.plantuml` will generate png files using plantuml.
