# js-compressed-size
> display the javascript file size after minified and gzipped

## Why

if you create any simple javascript or typescript library, usually you don't need to bundle it into one file or do any further optimization on it. but compile might be the only thing required. If there's any optimization could be done on library side, tree-shaking is one.

when it's adopted by a web app or any other kind of app, the app layer will do the full bundle and minify. maybe bundle with webpack and compress all assets with terser. your library is just part of the output minified file, and it will be compressed 2nd round by gzip during transportation.

so you might be curious about the final file size. :)

## Usage

```sh
→ js-compressed-size ./demo-script.js

Input index.js
.....................
Origin size   >> 1.45 kB
Minified size >> 934 B
After gzipped >> 499 B (raw bytes: 499)
```

## License

MIT

