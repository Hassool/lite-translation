import { ABOUTAR, ABOUTEN, ABOUTES, ABOUTFR } from "./modules/about";
import { HOMEAR, HOMEEN, HOMEES, HOMEFR } from "./modules/home";
import { XAR, XEN, XES, XFR } from "./modules/x";

function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

export function deepEqual(a, b) {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  const ak = Object.keys(a).sort();
  const bk = Object.keys(b).sort();
  if (ak.length !== bk.length) return false;
  for (let k of ak) {
    if (!deepEqual(a[k], b[k])) return false;
  }
  return true;
}

export function deepMerge(base, override) {
  if (!isObject(base)) return override === undefined ? base : override;
  if (!isObject(override)) return override === undefined ? base : override;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(override)) {
    const vBase = out[key];
    const vOverride = override[key];
    if (isObject(vBase) && isObject(vOverride)) {
      out[key] = deepMerge(vBase, vOverride);
    } else {
      out[key] = vOverride;
    }
  }
  return out;
}

function buildModuleConfig(en, ar, es, fr) {
  const config = { default: en };
  if (!deepEqual(en, ar)) config.ar = ar;
  if (!deepEqual(en, es)) config.es = es;
  if (!deepEqual(en, fr)) config.fr = fr;
  return config;
}

export const modules = {
  x: buildModuleConfig(XEN, XAR, XES, XFR),
  home: buildModuleConfig(HOMEEN, HOMEAR, HOMEES, HOMEFR),
  about: buildModuleConfig(ABOUTEN, ABOUTAR, ABOUTES, ABOUTFR)
};
