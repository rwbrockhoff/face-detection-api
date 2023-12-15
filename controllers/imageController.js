const clarifaiFunctions = require("./clarifaiFunctions");

const postImage = async (req, res) => {
  if (!req.body.imageURL)
    return res.status(400).json({ error: "No image URL" });

  const { imageURL } = req.body;
  const MODEL_ID = "face-detection";
  try {
    const result = await fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      clarifaiFunctions.renderRequestOptions(imageURL)
    );
    const imageResponse = await result.json();
    return res.status(200).json(imageResponse);
  } catch (err) {
    res.status(400).json({ error: "Error detecting faces. Sorry!" });
  }
};

module.exports = { postImage };
