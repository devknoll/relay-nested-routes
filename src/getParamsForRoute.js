import getRouteParams from 'react-router/lib/getRouteParams';

export default function getParamsForRoute({route, params, location}) {
  const paramsForRoute = {};

  // Extract route params for current route and all ancestors.
  for (const branchRoute of location.routes) {
    Object.assign(paramsForRoute, getRouteParams(branchRoute, params));
    if (branchRoute === route) {
      break;
    }
  }

  // Extract specified routes from query.
  if (route.queryParams) {
    // Can't use destructuring default value here, because location.query is
    // null when no query string is present.
    const query = location.query || {};

    route.queryParams.forEach(queryParam => {
      const queryValue = query[queryParam];
      paramsForRoute[queryParam] =
        queryValue !== undefined ? queryValue : null;
    });
  }

  return paramsForRoute;
}
