Accounts.oauth.registerService('centiq');

if (Meteor.isClient) {
  Meteor.loginWithCentiq = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Centiq.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: _.map(
      Centiq.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
      function (subfield) { return 'services.centiq.' + subfield; }),

    forOtherUsers: _.map(
      // even with autopublish, no legitimate web app should be
      // publishing all users' emails
      _.without(Centiq.whitelistedFields, 'email', 'verified_email'),
      function (subfield) { return 'services.centiq.' + subfield; })
  });
}
