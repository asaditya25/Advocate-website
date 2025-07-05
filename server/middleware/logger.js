const morgan = require('morgan');

// Use 'combined' for detailed logs, or 'dev' for concise logs
module.exports = morgan('dev');
