let styleInterface;
let styleTheme;

function registerTheme(theme) {
  styleTheme = theme;
}

function registerInterface(interfaceToRegister) {
  styleInterface = interfaceToRegister;
}

function create(makeFromTheme, createWithDirection) {
  const styles = createWithDirection(makeFromTheme(styleTheme));
  return () => styles;
}

function createLTR(makeFromTheme) {
  return create(makeFromTheme, styleInterface.createLTR || styleInterface.create);
}

function createRTL(makeFromTheme) {
  return create(makeFromTheme, styleInterface.createRTL || styleInterface.create);
}

function get() {
  return styleTheme;
}

function resolve(prop, ...styles) {
  if (
    process.env.NODE_ENV !== 'production'
    && typeof performance !== 'undefined'
    && performance.mark !== undefined
  ) {
    performance.mark('react-with-styles.resolve.start');
  }

  const result = styleInterface.resolve(styles, prop);

  if (
    process.env.NODE_ENV !== 'production'
    && typeof performance !== 'undefined'
    && performance.mark !== undefined
  ) {
    performance.mark('react-with-styles.resolve.end');

    performance.measure(
      '\ud83d\udc69\u200d\ud83c\udfa8 [resolve]',
      'react-with-styles.resolve.start',
      'react-with-styles.resolve.end',
    );
  }

  return result;
}

function resolveLTR(...styles) {
  if (styleInterface.resolveLTR) {
    return styleInterface.resolveLTR(styles);
  }

  return resolve(null, styles);
}

function resolveCustomLTR(prop, ...styles) {
  if (styleInterface.resolveLTR) {
    return styleInterface.resolveLTR(styles);
  }

  return resolve(prop, styles);
}

function resolveRTL(...styles) {
  if (styleInterface.resolveRTL) {
    return styleInterface.resolveRTL(styles);
  }

  return resolve(null, styles);
}

function flush() {
  if (styleInterface.flush) {
    styleInterface.flush();
  }
}

export default {
  registerTheme,
  registerInterface,
  create: createLTR,
  createLTR,
  createRTL,
  get,
  resolve: resolveLTR,
  resolveLTR,
  resolveCustomLTR,
  resolveRTL,
  flush,
};
