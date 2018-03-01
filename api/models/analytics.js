module.exports = async ({ analytics }) => {
  return {
    track({ type, action, description = "" }) {
      return analytics({ type, action, description });
    },

    event({ action, description }) {
      this.track({ type: "event", type, description });
    },

    info({ action, description }) {
      this.track({ type: "info", type, description });
    },

    warning({ action, description }) {
      this.track({ type: "warning", type, description });
    },

    error({ action, description }) {
      this.track({ type: "error", type, description });
    }
  };
};
