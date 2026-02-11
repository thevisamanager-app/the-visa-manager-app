// src/config/vietnamApplyConfig.js

export const VIETNAM_APPLY_CONFIG = {
  fields: {
    travelDate: { required: true },
    phone: { required: true },
    email: { required: true },
    hotel: { required: true },
  },

  documents: {
    passportFront: {
      label: "Upload Passport Front Page",
      required: true,
      example: require("../assets/examples/passport-front.png"),
    },
    passportBack: {
      label: "Upload Passport Last Page",
      required: true,
      example: require("../assets/examples/passport-back.png"),
    },
    photo: {
      label: "Passport Size Photo",
      required: true,
      example: require("../assets/examples/photo.png"),
    },
    ticket: {
      label: "Upload Return Ticket",
      required: true,
      example: require("../assets/examples/ticket.png"),
    },
  },
};