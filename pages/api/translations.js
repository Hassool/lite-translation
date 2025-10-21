import { modules } from '../../src/index';

export default function handler(req, res) {
  const { lang = 'en' } = req.query;

  const merged = {};
  for (const key in modules) {
    const module = modules[key];
    const translation =
      module[lang] || module.default || module['en'] || {};
    merged[key] = translation;
  }

  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).json(merged);
}
