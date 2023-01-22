import mongoose from "mongoose";

const EventsSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    default: 'My Event'
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: null
  },
  time: {
    type: String,
    default: 'Friday @ 10PM on 10/20/2030',
    required: true
  },
  creator: {
    type: String,
    required: true,
  },
  creator_name: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: true,
  },
  entry_fee: {
    type: Number,
    default: 0,
  },
  attendees: {
    type: [String],
    default: [],
  }
});

const EventsModel = mongoose.models.Events || mongoose.model('Events', EventsSchema);
export default EventsModel
