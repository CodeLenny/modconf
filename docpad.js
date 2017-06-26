module.exports = {

  outPath: "public",

  srcPath: "docs",

  documentPaths: [
    "documents",
    "README.adoc",
  ],

  collections: {

    adoc: function() {
      return this
        .getCollection("documents")
        .findAllLive({ extensions: { $in: [ "adoc" ] } })
        .on("add", (model) => model.setMetaDefaults({
          layout: "adoc"
        }));
    },

    noRender: function() {
      return this
        .getCollection("documents")
        .findAllLive({ outExtension: "adoc" })
        .on("add", (model) => model.setMetaDefaults({
          render: false,
          outFilename: model.attributes.filename,
          contentRendered: model.attributes.body,
          rendered: true,
        }));
    },

  },

}
