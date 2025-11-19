const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  url: { type: String, unique: true, required: true },
  title: String,
  source: String,
  publishedAt: Date,
  content: String,
  contentSnippet: String,
  summary_fast: String,
  summary_final: String,
  sentiment: { label: String, score: Number },
  quotes: [String],
  language: String,
  topics: [String],
  embeddings: { type: [Number], default: [] }, // store vector or store separately
  clusterId: { type: Schema.Types.ObjectId, ref: 'Story' },
  ingestionStatus: { type: String, enum: ['pending','done','failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
