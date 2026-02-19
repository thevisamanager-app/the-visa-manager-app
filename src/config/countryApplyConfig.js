export const COUNTRY_APPLY_CONFIG = {

  Vietnam: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      hotelDetails: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Back Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
      photo: {
        label: "Passport Size Photo",
        required: true,
        example: require("../assets/examples/passport-photo.png"),
      },
      ticket: {
        label: "Upload Return Ticket",
        required: true,
        example: require("../assets/examples/ticket.png"),
      },
    },
  },

  Azerbaijan: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      hotelDetails: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Back Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
    },
  },

  Combodia: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      hotelDetails: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Back Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
      photo: {
        label: "Passport Size Photo",
        required: true,
        example: require("../assets/examples/passport-photo.png"),
      },
      ticket: {
        label: "Upload Return Air Ticket",
        required: true,
        example: require("../assets/examples/ticket.png"),
      },
      bankStatement: {
        label: "Upload Bank Statement",
        required: true,
        example: null, // optional sample if you add one
      },
      hotelConfirmation: {
        label: "Upload Hotel Confirmation",
        required: true,
        example: null,
      },
    },
  },

 Kenya: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
      maritalStatus: {
        required: true,
        type: "dropdown",
        options: ["Single", "Married", "Divorced"],
      },
      emergencyName: { required: true },
      emergencyPhone: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
      passportBack: {
        label: "Upload Passport Back Page",
        required: true,
        example: require("../assets/examples/passport-back.png"),
      },
      photo: {
        label: "Passport Size Photo",
        required: true,
        example: require("../assets/examples/passport-photo.png"),
      },
      ticket: {
        label: "Upload Confirm Return Air Ticket",
        required: true,
        example: require("../assets/examples/ticket.png"),
      },
      hotelConfirmation: {
        label: "Upload Confirm Hotel Booking",
        required: true,
        example: null,
      },
      invitationLetter: {
        label: "Upload Invitation Letter (Business Purpose)",
        required: true,
        example: null,
      },
    },
  },

  DEFAULT: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },

  DEFAULT: {
    fields: {
      travelDate: { required: true },
      phone: { required: true },
      email: { required: true },
    },
    documents: {
      passportFront: {
        label: "Upload Passport Front Page",
        required: true,
        example: require("../assets/examples/passport-front.png"),
      },
    },
  },
};