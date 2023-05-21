const path = require('path');
const fs = require('fs');
const db = require('../../../models')
const slug = require('slug')

const before = async (request, context) => {
  return request;
};

module.exports = { before };