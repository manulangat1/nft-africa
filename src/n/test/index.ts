import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMaket ", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    // await Market.deployed()
    const marketAddress = market.address;

    const NFt = await ethers.getContractFactory("NFT");
    const nft = await NFt.deploy(marketAddress);
    // await NFt.deployed();

    const nftContractAddress = nft.address;

    let listingPrice = await market.getListingPrice();

    // listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: auctionPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: auctionPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    const items = await market.fetchMarketItems();
    console.log("items", items);
    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, world!");
    // await greeter.deployed();

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
