// @flow strict
import React from 'react';
import Markdown from './components/Markdown.js';

const mdFile = require('./Development.md');

const cards = [];
const card = c => cards.push(c);

card(<Markdown text={mdFile} fetchFile />);

export default cards;
