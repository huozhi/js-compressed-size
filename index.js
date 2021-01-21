#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const terser = require('terser');
const gzipSize = require('gzip-size');
const prettyBytes = require('pretty-bytes');


function minifyCode(code) {
  const result = terser.minify(code, {
    mangle: {
      properties: false,
    },
    output: {
      comments: false,
    },
  });
  if (result.error) {
    throw result.error;
  }
  return result.code;
}

function sizeInfo(bytesSize) {
  return `${prettyBytes(bytesSize)} (raw bytes: ${bytesSize})`
}

function getBytes(str) {
  return Buffer.byteLength(str, 'utf8')
}

function logging(filename, code) {
  const originSize = getBytes(code);
  const minifiedCode = minifyCode(code);
  const minifiedSize = getBytes(minifiedCode);
  const gzippedSize = gzipSize.sync(minifiedCode);
  
  console.log(`Input ${filename}`);
  console.log(`.....................`);
  console.log('\x1b[36m%s\x1b[0m', `Origin size   >> ${prettyBytes(originSize)}`);
  console.log('\x1b[36m%s\x1b[0m', `Minified size >> ${prettyBytes(minifiedSize)}`);
  console.log('\x1b[36m%s\x1b[0m', `After gzipped >> ${sizeInfo(gzippedSize)}`);
}

function main() {
  const args = process.argv;
  const filename = args[2];
  
  if (!filename.endsWith('.js')) {
    console.error('only js files are allowed');
    process.exit(2);
  }
  
  const content = fs.readFileSync(path.resolve(filename), {encoding: 'utf-8'});
  logging(filename, content);
}


main();
