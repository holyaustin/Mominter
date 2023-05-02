// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  // Getting the name and URL from body of the request
  const { name, url } = req.body;
  // Calling api and passing in the name and download URL of the asset from the 'uploadURL' form
  try {
    const response = await fetch(`https://livepeer.studio/api/asset/import`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        url,
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
