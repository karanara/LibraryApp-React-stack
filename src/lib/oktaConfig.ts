export const oktaConfig ={
    clientId: "0oafqik2lrrf06E8z5d7",
    issuer : 'https://dev-78925245.okta.com/oauth2/default',
    redirectUri:'http://localhost:3000/login/callback',
    scope:['openid','profile','email'],
    pkce:true,
    disableHttpsCheck:true,
}