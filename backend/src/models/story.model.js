const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: String,            // unified headline
  articleIds: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  summary_master: String,
  sentiment_overall: { label: String, score: Number },
  topics: [String],
  createdAt: { type: Date, default: Date.now },
  lastUpdatedAt: Date
});

module.exports = mongoose.model('Story', StorySchema);
