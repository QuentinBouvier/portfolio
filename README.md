# Quentinbouvier.fr Portfolio

My public place with various projects and modest introduction of me.

## Docker

Use php:apache image and the custom dockerfile to run this in a container

```sh
docker build . --t portfolio
docker run --name portfolio -v `pwd`/html:/var/www/html -p 8080:80 -d portfolio
```

access `http://localhost:8080`

## Custom scripts

### js

#### Burger.js

jQuery burger menu on resize. Mainly operates on css class

#### Scroller.js

jQuery smooth scrolling on menu links. Dynamic menu button selection on scroll. Change button order on burger menu.

#### Works.js

jQuery Projects section animator. Change tiles order when clicked, expand description, minimize inactive tiles.

#### Slider.js

See [QuentinBouvier/SliderJs](https://github.com/QuentinBouvier/sliderJs)

#### journey.js

Use konami code on main page (Doesn't work on projet description iframes :( )

See [QuentinBouvier/journey](https://github.com/QuentinBouvier/journey)

### php

#### pages/works/worksHandler.php

Detect folders or .html files in a folder and draw tiles according to the folder's structure.

Draw tiles based on preview.html meta tags in each project's folders or each .html files in /projects directory.

## Dependencies

### v2

+ php7-gd
+ msmtp
