// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  // Calling api and passing in the Id of the asset from the 'deleteAsset' form as the query
  try {
    const response = await fetch(`https://livepeer.studio/api/asset/${req.body.assetId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });
   
    // Convert json response into JS object
    const data = await response.json();
    return res.status(204).json(data)
  } catch (error) {
    res.status(400).send("error")
  }
}