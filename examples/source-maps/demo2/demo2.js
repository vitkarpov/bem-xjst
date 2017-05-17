var fs = require('fs'),
    bemxjst = require('../../../').bemhtml,
    tmpl = 'tmpls-with-sourcemap.bemhtml.js',
    bundle = 'bundle.bemhtml.js';

var result = bemxjst.generate(fs.readFileSync(tmpl, 'utf8'), {
    sourceMap: true,
    from: tmpl,
    to: bundle
});

fs.writeFileSync(bundle, result);
