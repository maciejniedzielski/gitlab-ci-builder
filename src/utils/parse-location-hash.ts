export function parseLocationHash(hash: string) {
  hash = hash.split("#")[1];
  let elements: string[] = hash.slice(hash.indexOf("?") + 1).split("&");
  return elements.reduce((parsed, element) => {
    let [key, val] = element.split("=");

    return Object.assign(parsed, { [key]: decodeURIComponent(val) });
  }, {});
}
