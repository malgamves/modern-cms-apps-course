'use strict';

/**
 * info-page service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::info-page.info-page');
