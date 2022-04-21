// DON'T DO ANYTHING IN HERE, THIS JUST PREPS US TO USE TS FOR ALL GATSBY GOODNESS. CHECKOUT THE .GATSBY DIRECTORY
const { useGatsbyNode } = require('gatsby-plugin-ts-config');

module.exports = useGatsbyNode('gatsby/gatsby-node', {
  type: 'ts-node',
});
