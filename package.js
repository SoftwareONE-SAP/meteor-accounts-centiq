Package.describe({
  summary: "Login service for Centiq accounts",
  version: "1.0.1",
  git : "https://github.com/Centiq/meteor-accounts-centiq"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@0.9.0");
  api.use(['underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('centiq:centiq@1.0.0', ['client', 'server']);

  api.addFiles('accounts-centiq_login_button.css', 'client');

  api.addFiles('accounts-centiq.js');
});
