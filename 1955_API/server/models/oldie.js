var mongoose = require('mongoose');
var OldieSchema = new mongoose.Schema({
  name: {type: String, required: true}
});
var Oldie = mongoose.model('Oldie', OldieSchema);
