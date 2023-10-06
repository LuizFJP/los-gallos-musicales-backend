/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('lgm');

// Insert a few documents into the sales collection.
db.getCollection('genre').insertMany([
  { 'id': 1, 'genre': 'Rock Nacional' },
  { 'id': 2, 'genre': 'Bossa Nova' },
  { 'id': 3, 'genre': 'MPB' },
  { 'id': 4, 'genre': 'Pop' },
  { 'id': 5, 'genre': 'Game' },
  { 'id': 6, 'genre': 'Teen Beach Movie' },
  { 'id': 7, 'genre': 'Rock Internacional' },
  { 'id': 8, 'genre': 'Clássica' },
  { 'id ': 9, 'genre': 'Leno Brega' },
]);

db.getCollection('playlist').insertMany([
  { 'id': 1, 'genre': { 'id': 1, 'genre': 'Rock Nacional' }, 'playlistUrl': ['RDCLAK5uy_kYTjfQcxkDdM2jXk4V78l1cXOvnmNpxPY','OLAK5uy_nrzOYR9-diR16wdlNz28cyIQxoGbSrMYw', 'OLAK5uy_lrolYFJ12o1By1r2QMu-fDUWIqiWQVVv8'] },
  { 'id': 2, 'genre': { 'id': 2, 'genre': 'Bossa Nova' }, 'playlistUrl': ['RDCLAK5uy_n3QuG8R7-PdIR0VmWV_yUIPtwbDDmlMqg', 'PLgkW7Ibh8NaYAcj0-e9vRe451O7'] },
  { 'id': 3, 'genre': { 'id': 3, 'genre': 'MPB' }, 'playlistUrl': ['PL_Q15fKxrBb7C163SjzBIPYMrGcNzb_-X','PLmCv5Yqy9d2dD4fIO5VNrzjqdhZtjPBad'] },
  { 'id': 4, 'genre': { 'id': 4, 'genre': 'Pop' }, 'playlistUrl': ['RDCLAK5uy_nmS3YoxSwVVQk9lEQJ0UX4ZCjXsW_psU8'] },
  { 'id': 5, 'genre': { 'id': 5, 'genre': 'Game' }, 'playlistUrl': ['PLu6_FOgZp3egGmOCzUquEFDh4_F1Xdm7a'] },
  { 'id': 6, 'genre': { 'id': 6, 'genre': 'Teen Beach Movie' }, 'playlistUrl': ['PLpA2Zc0lXnjibPTznWYS_oTsVMiqvGee7', 'PL2fXjD-QQ16dm77311sd4iNocNbAJHvsa'] },
  { 'id': 7, 'genre': { 'id': 7, 'genre': 'Rock Internacional' }, 'playlistUrl': ['RDCLAK5uy_nNGk2yOsNF2AWjk3FbtO8FjvQhT1FUi_c', 'PL3485902CC4FB6C67'] },
  { 'id': 8, 'genre': { 'id': 8, 'genre': 'Clássica' }, 'playlistUrl': ['RDCLAK5uy_mv1P2oVguxLCIDXavV-jcDG1lQyukfSpo'] },
  { 'id': 9, 'genre': { 'id': 9, 'genre': 'Leno Brega' }, 'playlistUrl': ['OLAK5uy_k4GM6OFUA4qWrhn3heAgtzrQoWAjyMcU0'] },
]);
