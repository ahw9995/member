const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

let MemberSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  companyName: {type: String},
  email: {type: String, unique: true},
  modifiedDate: {type: Date, default: Date.now},
  createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('members', MemberSchema);
MemberSchema.plugin(autoIncrement.plugin, {
  model: 'MemberSchema',
  field: 'member_id',
  startAt: 1,
  incrementBy: 1
});
