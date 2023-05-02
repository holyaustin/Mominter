// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  // Calling api from backend and passing in the Id of the asset from the 'listAssetId' form as the query
  try {
    const response = await fetch(`https://livepeer.studio/api/asset/${req.query.getAsset}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Convert json response into JS object
    const data = await response.json();
    // console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    // console.log(error);
  }
  res.status(400).send("Error");
}
