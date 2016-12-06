block('engine-selector')(
    tag()('select'),

    js()(true),

    content()(function() {
        return this.ctx.versions.map(function(item) {
            return {
                tag: 'option',
                attrs: { value: item.name },
                content: item.name
            };
        });
    })
);
