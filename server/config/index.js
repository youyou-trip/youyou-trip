/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
const db = require('./db.conf');
const user = require('./user.conf')
const config = {
  db,
  user
};

module.exports = config;
