// reservations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.


module.exports = function (app) {
  const modelName = 'reservations';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    id: { type: String},
    customer_id: { type: String},
    hairdresser_id: { type: String},
    date_of_reservation: { type: Date},
    timeslot: { type: String },
    hairstyle: { type: String },
    availability: { type: String },
    actioned: { type: String},
    comments: { type: String }

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
