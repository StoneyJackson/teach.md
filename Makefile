#   Copyright (C) 2014  Stoney Jackson <dr.stoney@gmail.com>
#   License: GPLv3 <http://www.gnu.org/licenses/>

SLIDES_MD=$(shell find . -name "*.slides.md" -print)
SLIDES_HTML=$(SLIDES_MD:./src/%.slides.md=./www/%.slides.html)


ACTIVITIES_MD=$(shell find . -name "*.activity.md" -print)
ACTIVITIES_HTML=$(ACTIVITIES_MD:./src/%.activity.md=./www/%.activity.html)


DIAGRAMS_PLANTUML=$(shell find . -name "*.plantuml" -print)
DIAGRAMS_PNG=$(DIAGRAMS_PLANTUML:./src/%.plantuml=./www/%.png)


TEMPLATE_FILES=$(shell find templates -name "*.html" -print)


www/%.slides.html: src/%.slides.md templates/slides.html
	mkdir -p "$(dir $@)"
	touch www/.root
	pandoc --variable=base-url:"$(shell lib/path_to_root "$<")" \
	    --template=./templates/slides.html \
	    --to=revealjs \
	    --variable=theme:moon \
	    --output="$@" \
	    "$<"


www/%.activity.html: src/%.activity.md templates/activity.html
	mkdir -p "$(dir $@)"
	touch www/.root
	pandoc --variable=base-url:"$(shell lib/path_to_root "$<")" \
	    --template=./templates/activity.html \
	    --output="$@" \
	    "$<"


www/%.png: src/%.plantuml
	mkdir -p "$(dir $@)"
	touch www/.root
	plantuml -output "$(shell pwd)/$(dir $@)" "$<"


all: copy $(SLIDES_HTML) $(ACTIVITIES_HTML) $(DIAGRAMS_PNG)
	find www -name "*.slides.md" -delete
	find www -name "*.activity.md" -delete
	find www -name "*.plantuml" -delete


copy:
	cp -R assets www
	cp -R src/* www


clean:
	rm -rf www/*
