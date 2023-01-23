import { Endpoints } from './endpoints';

// According to the docs, selectors must only be created once.
// This object stores created selectors with their args as keys.
const selectorsCache = {};

// Returns a memoized selector, only creating one if one
// doesn't exist yet in the selectors cache
export function getMemoizedSelector<T, R extends Function>(args, endpoint: keyof Endpoints, selectorFunction: R): T {
  const strKey = JSON.stringify({ ...args, endpoint });

  if (!selectorsCache[strKey]) {
    const selector = selectorFunction(args);
    selectorsCache[strKey] = selector;
    return selector;
  } else {
    return selectorsCache[strKey];
  }
}
