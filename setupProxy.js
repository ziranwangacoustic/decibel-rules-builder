const { createProxyMiddleware } = require('http-proxy-middleware');
const url = require('url');

const PROXY_TARGET_DOMAIN = process.env.PROXY_TARGET_DOMAIN || 'https://app-dev.goacoustic.com';
const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNIRUxMOlJTMjU2OjJOUCJ9.eyJpdWkiOiI1MTEyQUY1UEFNIiwiaWJtIjp7Iml1aSI6IjUxMTJBRjVQQU0iLCJ1c2VyRW1haWwiOiJjdWlwcm9kM0BtYWlsaW5hdG9yLmNvbSIsImdpdmVuTmFtZSI6ImN1aXByb2QzIiwiZmFtaWx5TmFtZSI6InRlc3QiLCJsb2dpbklkIjoiY3VpcHJvZDNAbWFpbGluYXRvci5jb20ifSwiaWF0IjoxNTkxMjE4Njg3LCJleHAiOjE2MDY3NzA2ODcsImlzcyI6ImN1aS1zaGVsbCIsInN1YiI6ImN1aXByb2QzQG1haWxpbmF0b3IuY29tIn0.ZmQYMPgwXjswnRmx9A7nIYAQCagTf_09U3GP5y6GmywfWFY_ExXLJO5rqrfFzV4oFcVD_wFIIJa-JtY2Lm0zapljux2t1f6tJOn2sYQuKTaUYbFGNAuKS1nfKz4GzsGGr48cogekSxFlF2E6imESLxddoLZViH-D3PQT0eCWOvox4bHJb7cbIOq6FVSUX3nAEKxMN6GUNaKsuRza7eEp3SiLoOTAIKJcbK3zF7NfH377-wZJ0eysbpRqelCQz1kHF79KISlF1FM4sa0_-OUzuIuXSDS0Io7KFzf1srBtuWCtzYESNbpcvRKudYutsrSzVoYl6V7eKfEAcCbrB5gyZg';

const EXPIRY_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNIRUxMUkVGUkVTSDpSUzI1NjoxIn0.eyJ1c2VyIjp7Iml1aSI6IjUxMTJBRjVQQU0ifSwiaWF0IjoxNTg1ODQ4Nzk4LCJleHAiOjE2MTc0MDYzOTgsImlzcyI6ImN1aS1zaGVsbCIsInN1YiI6InJlZnJlc2hfdG9rZW4ifQ.ossn6IKOv6irH9RGBbou1Yu0ISE0qdkqZ3lyWmEtl9eemrcXx9vpNnExQof5crKcco7nMmgzmTSJp9jJEIFiRU-20SbNj6xSt_T9Dl2ToHXxfCHzzqmzMpuk1s5zfgvdfiE-mlpbFzjhSKeh6KamEW9_U_4dmaq4aZ_zWjG9RdY';

const LEGACY_CUI_TOKEN_NAME = 'x-ibm-cui-access-token';
const CUI_TOKEN_NAME = 'x-acoustic-access-token';
const CUI_REFRESH_TOKEN_NAME = 'x-acoustic-cui-refresh-token';
const LOCALHOST_COOKIE_CONF = ' Path=/;';
const sharedCookies = [
  [CUI_TOKEN_NAME, TOKEN],
  [LEGACY_CUI_TOKEN_NAME, TOKEN],
  [CUI_REFRESH_TOKEN_NAME, EXPIRY_TOKEN],
].map(([name, value]) => `${name}=${value};${LOCALHOST_COOKIE_CONF}`);

function configureProxy(app) {
  const middleware = createProxyMiddleware({
    target: PROXY_TARGET_DOMAIN,
    changeOrigin: true,
    onProxyReq(proxyReq) {
      proxyReq.setHeader('Cookie', sharedCookies);
    },
  });
  const authMiddleware = createProxyMiddleware({
    target: PROXY_TARGET_DOMAIN,
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes(proxyRes, req, res) {
      const { query } = url.parse(req.url, true);
      const originalPath = query['x-ibm-cui-original-path'];
      const redirectUri = query.redirect_uri;
      res.setHeader('Set-Cookie', sharedCookies);
      res.writeHead(301, { Location: originalPath || redirectUri || '/demo-sso' });
      res.end();
    },
  });
  app.use('/auth/login', authMiddleware);
  app.use(['/api', '/auth'], middleware);
}

module.exports = configureProxy;
