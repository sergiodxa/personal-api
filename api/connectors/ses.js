const AWS = require("aws-sdk");

module.exports = async () => {
  return new AWS.SES({
    apiVersion: "2010-12-01",
    region: "us-west-2"
  });
};
