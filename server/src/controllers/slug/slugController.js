const slugify = require('slugify');
const generateSlug = (text) => {
    return slugify(text, { lower: true });
};
module.exports = generateSlug;