// helper function to trim and ObjectId down to its actual iD number
const trimId = (id) => {
    id = JSON.stringify(id);
    let result = id.substring( id.indexOf('(' + 1, id.indexOf( ')')));
    result = result.slice(1,-1);
    return result;
};
// Helper function to format a date
const formatDate = (date) => {
  newDate = new Date(date).toLocaleString('en', {
    timeZoneName: 'short',
  });
  return newDate;
};

module.exports = {trimId: trimId, formatDate: formatDate};