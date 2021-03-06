const mongoose = require('mongoose');

var memberShema = new mongoose.Schema({
  lastName:    { type: String, required: true },
  firstName:   { type: String, required: true },
  contacts:    [{ type: { type: String} , value: String }],
  addedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  boardMember: Boolean,
  meta:        { hidden: Boolean }
}, { timestamps: true });

memberShema.virtual('id').get(function () { return this._id.toHexString() });
memberShema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Member', memberShema);
