const mongoose = require('mongoose');

var memberShema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  contacts: [{ type: String, value: String }],
  meta: {
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    hidden: Boolean,
  }
}, {
  timestamps: true
});

memberShema.virtual('fullName').get(() => {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('Member', memberShema);
