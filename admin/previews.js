const {
  markdownFilter,
  helpers,
} = previewUtil;

const env = nunjucks.configure();

env.addFilter('markdownFilter', markdownFilter);

const Preview = ({ entry, path, context }) => {
  const data = context(entry.get('data').toJS());
  const html = env.render(path, { ...data, helpers });
  return <div dangerouslySetInnerHTML={{ __html: html }}/>
};

const Section = ({ entry }) => (
  <Preview
    entry={entry}
    path="base.njk"
    context={({ title, body, fullbleed, img }) => ({
      title,
      content,
      collections: {
        sections: [{
          url: 'javascript:void(0)',
          data: {
            title: title,
            fullbleed: fullbleed,
            img: img,
            content: markdownFilter(body),
          },
        }],
      },
    })}
  />
);

CMS.registerPreviewTemplate('sections', Section);
