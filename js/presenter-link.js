const presenterLink = (() => {
  const channel = 'biomass-presenter';
  const localFile = location.protocol === 'file:';
  const origin = localFile ? 'null' : location.origin;

  function newSession() {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte =>
      byte.toString(16).padStart(2, '0')
    ).join('');
  }

  function validSession(session) {
    return typeof session === 'string' && /^[a-f0-9]{32}$/.test(session);
  }

  function send(target, session, type, payload = {}) {
    if (target && !target.closed) {
      target.postMessage({ ...payload, channel, session, type }, localFile ? '*' : origin);
    }
  }

  function matches(event, session) {
    return validSession(session) && event.origin === origin && event.source &&
      event.data?.channel === channel && event.data.session === session;
  }

  return { newSession, validSession, send, matches };
})();
