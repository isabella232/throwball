/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'postgre',
  tableName: 'our_users',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'the_primary_key'
    },
    name: {
      type: 'string',
      columnName: 'full_name'
    },
    password: {
      type: 'string',
      columnName: 'seriously_encrypted_password'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email_address'
    }
  }
};

