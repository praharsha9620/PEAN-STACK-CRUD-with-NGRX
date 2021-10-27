const CACHE_CONTROL = "Cache-Control";
const NO_CACHE_VALUES = "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0";

const cachePreventer = function cachePreventer (req, res, next) {
  res.setHeader(CACHE_CONTROL, NO_CACHE_VALUES);
  next();
};

module.exports = cachePreventer;
