const is_freebsd = /^freebsd/.test(process.platform);
const args =
    typeof process !== `undefined` ? require(`args-parser`)(process.argv) : {};
let host_environment = is_freebsd ? null : process.env.HOST;
const hostname = args.host || process.env.UPTIME_KUMA_HOST || host_environment;
const port = [args.port, process.env.UPTIME_KUMA_PORT, process.env.PORT, 3002]
    .map((portValue) => parseInt(portValue))
    .find((portValue) => !isNaN(portValue));
const ssl_key =
    args[`ssl-key`] ||
    process.env.UPTIME_KUMA_SSL_KEY ||
    process.env.SSL_KEY ||
    undefined;
const ssl_certificate =
    args[`ssl-cert`] ||
    process.env.UPTIME_KUMA_SSL_CERT ||
    process.env.SSL_CERT ||
    undefined;
const ssl_key_passphrase =
    args[`ssl-key-passphrase`] ||
    process.env.UPTIME_KUMA_SSL_KEY_PASSPHRASE ||
    process.env.SSL_KEY_PASSPHRASE ||
    undefined;
const is_ssl = ssl_key && ssl_certificate;
function get_local_web_socket_url() {
    const protocol = is_ssl ? `wss` : `ws`;
    const host = hostname || `localhost`;
    return `${protocol}://${host}:${port}`;
}
const local_web_socket_url = get_local_web_socket_url();
const demo_mode = args[`demo`] || false;
module.exports = {
    args,
    hostname,
    port,
    ssl_key,
    ssl_certificate,
    ssl_key_passphrase,
    is_ssl,
    local_web_socket_url,
    demo_mode,
};
