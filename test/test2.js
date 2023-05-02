/* test/sample-test.js */
describe("FileShare", function() {
  it("Should create and execute talent", async function() {
    /* deploy the marketplace */
    const FileNFT = await hre.ethers.getContractFactory("FileNFT");
    const fileShare = await FileNFT.deploy();
    await fileShare.deployed();

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await fileShare.createToken("https://bafkreidugtjoxts62zsi32riqsjlpt643vnqxtaljo4tba2n2dlqvb2jyq.ipfs.w3s.link/")
    await fileShare.createToken("https://bafkreidugtabcds62zsi32riqsjlpt643vnqxtaljo4tba2n2dlqvbwxyz.ipfs.w3s.link/")

    const [_, userAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    await waste.connect(userAddress).createStorageItem(2)

    /* query for and return the unsold items */
    items = await waste.fetchAllStorageItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await waste.tokenURI(i.tokenId)
      let item = {
        tokenId: i.tokenId.toNumber(),
        image: i.image,
        name: i.name,
        created: i.created,
        description: i.description,
        size: i.size,
        sharelink: httpUri,
        owner: i.owner,
        view: i.view,
      }
      return item
    }))
    console.log('items: ', items)
  })
})
