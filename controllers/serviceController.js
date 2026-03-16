const ServiceCategory = require("../models/ServiceCategory");

exports.getAllServices = async (req, res) => {
  try {
    const services = await ServiceCategory.find().sort({
      name: 1,
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch services",
      error: err.message,
    });
  }
};

exports.createService = async (req, res) => {
  const { name, description } = req.body;

  try {
    const exists = await ServiceCategory.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Service already exists" });
    }

    const service = await ServiceCategory.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Service created",
      service,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create service",
      error: err.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await ServiceCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete service",
      error: err.message,
    });
  }
};