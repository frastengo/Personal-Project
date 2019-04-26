module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get("db");

    db.get_posts()
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => console.log("looooooool", err));
  },

  getPost: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.get_one_post([id])
      .then(posts => {
        res.status(200).send(posts[0]);
      })
      .catch(err => {
        console.log("Error in get_one_post.sql", err);
        res
          .status(500)
          .send({ message: "an error has occured on the server", err });
      });
  },

  createPost: (req, res) => {
    const db = req.app.get("db");
    console.log("==========>", req.body);
    const { post_content, file, user_id } = req.body;

    db.create_post([post_content, file, user_id])
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        console.log("Error in create_post.sql", err);
        res.status(500).send({ message: "an error has occured on the server" });
      });
  },

  editPost: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    if (!id) {
      id = req.query.id;
    }

    if (!id) {
      return res
        .status(400)
        .send({ message: "Invalid or missing 'id' on request" });
    }

    const { post_content, file } = req.body;

    db.edit_post([post_content, file])
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        console.error("Error in edit_post.sql", err);
        res.status(500).send({ message: "an error occured on the server" });
      });
  },

  deletePost: (req, res) => {
    const { id } = req.params;

    if (!parseInt(id)) {
      return res
        .status(400)
        .send({ message: "Invalid or missing 'id' on request" });
    }
    post_id = parseInt(id);
    const db = req.app.get("db");
    db.delete_post([id])
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        console.log("Error in delete_post.sql", err);
        res
          .status(500)
          .send({ message: "An error has occurred on the server" });
      });
  }
};
