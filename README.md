# Slider V2

## Reasons for the Reimplementation

Shortly after first starting working here, I decided that I needed an easy to use, robust slider that would work for any post type, and any format. I set out to accomplish this, starting out simple, and working my way up to adding more features. Features like the ability to trigger the slider automatically every few seconds (autoswipe) or being able to navigate using the dots along the bottom of the slider. However, because I added all of these features separately and not at the same time, the code began to look scary and I incrued a lot of technical debt by adding on instead of refactoring.

Another issue I faced was that I was using a lot of jQuery in the old implementation, even so far as to manually move elements around in the DOM (which made debugging the slider or elements inside of it a pain because the DOM changes don't allow you to focus on an element.) Also, in the old slider, there was only 1 animation type: slide. This slider supports fade in/out, and will be easy to add different animations to it because of the way I have configured it.

## Benefits of this version:

* more simple jQuery
* uses CSS animations to transition between slides
* configurable using HTML data attributes (which the jQuery then parses)
* can easily support more than 1 element being shown at a time

## Possible downsides of this version:

* Uses a LOT of CSS for the animations/viewport options (I may convert this back into jQuery if this becomes an issue. Basically, it has to create 2x * y rules, where x is the total # of slides and y is the amount of viewport options you have configured.)

* No Wordpress shortcode (yet). This is my next priority.

## Summary

In short, I believe this version of the content slider is more easy to understand and will make development in the future MUCH easier.