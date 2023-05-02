// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  const { assetId, name, storage, meta } = req.body;
  // console.log(req.body);
  try {
    // Calling api and passing in the properties of the asset from the 'update' form to be updated
    const response = await fetch(`https://livepeer.studio/api/asset/${assetId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        storage,
        meta,
      }),
    });

    // Convert json response into JS object
    const data = await response.json();
    // console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
}