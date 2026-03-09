const Service = require("../models/ServiceCategory");

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.createService = async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
};