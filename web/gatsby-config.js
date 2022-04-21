// DON'T DO ANYTHING IN HERE, THIS JUST PREPS US TO USE TS FOR ALL GATSBY GOODNESS. CHECKOUT THE .GATSBY DIRECTORY
const { useGatsbyConfig } = require('gatsby-plugin-ts-config');

module.exports = useGatsbyConfig('gatsby/gatsby-config', {
  type: 'ts-node',
});
