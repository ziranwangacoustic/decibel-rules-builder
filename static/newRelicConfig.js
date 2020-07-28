(function (env) {
  try {
    const config = {
      nonProd: {
        loader_config: null,
        info: null,
      },
      prod: {
        loader_config: null,
        info: null,
      },
    };
    window.NREUM = config[env] || {};

    if (!window.NREUM.loader_config || window.location.hostname.indexOf('goacoustic.com') === -1) {
      return;
    }
    const relicScriptTag = document.createElement('script');
    relicScriptTag.setAttribute('src', '/nr.js');
    document.head.appendChild(relicScriptTag);
  } catch (e) {
    console.log(e);
  }
})(
  (function () {
    const hostName = window.location.hostname;
    return hostName === 'app.goacoustic.com' ? 'prod' : 'nonProd';
  })(),
);
