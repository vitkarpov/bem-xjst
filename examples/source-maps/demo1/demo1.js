var fs = require('fs'),
    bemxjst = require('../../../').bemhtml,
    tmpl = 'b1.bemhtml.js',
    bundle = 'bundle.bemhtml.js';

var result = bemxjst.generate(fs.readFileSync(tmpl, 'utf8'), {
    sourceMap: true,
    from: tmpl,
    to: bundle
});

fs.writeFileSync(bundle, result);
