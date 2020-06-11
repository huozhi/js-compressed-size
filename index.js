#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const terser = require('terser');
const gzipSize = require('gzip-size');
const prettyBytes = require('pretty-bytes');


function minifyCode(code) {
  const result = terser.minify(code, {
    mangle: {
      properties: true,
    },
    output: {
      comments: false
    },
  });
  if (result.error) {
    throw result.error;
  }
  return result.code;
}

function getGzipSize(code) {
  return gzipSize.sync(code)
}

function logCodeSize(code) {
  const minifiedCode = minifyCode(code);
  const bytesLength = getGzipSize(minifiedCode);
  const prettiedSize = prettyBytes(bytesLength);
  console.log(prettiedSize);
}

const args = process.argv;
const filename = args[2];
console.log('compressing file', filename);
const content = fs.readFileSync(path.resolve(filename), {encoding: 'utf-8'});
logCodeSize(content)