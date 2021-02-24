const _ = require('lodash')

/**
 *
 * @param queryParams
 * @returns {(number|number|*|string)[]}
 * @private
 */
function _handleQueryParams(queryParams) {
    let limit = (queryParams.limit && queryParams.limit > 0 && queryParams.limit <= 200) ? Number(queryParams.limit) : 60;
    let page = !_.isEmpty(queryParams.page) ? Number(queryParams.page) : 1;
    let offset = !_.isEmpty(queryParams.offset) ? Number(queryParams.offset) : 0;
    let sort = queryParams.sort ? queryParams.sort : '';
    let sortType = queryParams.sortType ? queryParams.sortType : '';
    return [page, limit, offset, sort, sortType]
}


module.exports = {
    _handleRequestParams: _handleQueryParams
}
