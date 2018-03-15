# School Transportation Narrative

Url: [https://apps.urban.org/features/school-transportation](https://apps.urban.org/features/school-transportation)

## Build instructions
- Install [Compass](http://compass-style.org/install/)
 - Simplest command is `gem install compass`
- Build css via `compass compile -c config.rb --force`
- Note, css edits should be made to `styleshets/sass`, not `stylesheets/css` (build command will overwrite css directory) 	 

## Libraries used
- jQuery v2.1.4
- [Waypoints  v4.0.1](http://imakewebthings.com/waypoints/guides/getting-started/)
- [Pym.js v1.3.2](http://blog.apps.npr.org/pym.js/)
- [D3v4](https://d3js.org/)

Find previous versions, sketches, and chartes in the sketches branch.

## Known Issues/To Do List
- Dot fade experience could be less brittle
- Fade in of maps on load
- charts and maps do not properly resize on window drag