module.exports = {

  story: async(req, res) => {
    try {
      res.view('story');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  postStory: async(req, res) => {
    try {
      console.log("==== postStory ===", req.body);
      let data = req.body;
      await PostService.create(data, req);
      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getPostById: async(req, res) => {
    try {
      console.log("==== getPostById ===", req.param('id'));
      let post = await PostService.getPostById(req.param('id'));
      res.view('postDetail', {
        post
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  // search
  getPostByKeyword: async(req, res) => {
    try {
      var keyword = req.param('keyword');
      console.log("==== getPostByKeyword ===", keyword);
      let items = await PostService.getPostByKeyword(keyword);
      console.log("=== item[0] ===\n",items[0]);
      res.ok({
        items
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getAllPost: async(req, res) => {
    try {
      let result = await PostService.getAllPost();
      res.ok(result);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  storyCategory: async(req, res) => {
    try {

      let categorys = await PostService.getAllCategory();
      res.view('storyCategory', {
        categorys
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getStoryCategoryItemById: async(req, res) => {
    try {

      let categoryItems = await ItemService.findByLikeId(req.param('id'));
      res.view('storyDetail', {
        categoryItems
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }

}
