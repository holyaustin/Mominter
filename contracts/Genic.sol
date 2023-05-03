// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract FileNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    Counters.Counter private  _itemsShared;
    Counters.Counter public _viewIds;

    // address owner;
    uint private monthly_value;
    address private owner;

    mapping(address => bool) accounts;
    mapping(uint256 => StorageItem) private idToStorageItem;
    mapping(uint256 => ViewItem) private idToViewItem;

    struct StorageItem {
      uint256 tokenId;
      address owner;
      address storageDrive;
      uint256 dateCreated;
      bool shared;
    }

    struct ViewItem {
      uint256 vId;
      uint256 tokenId;
      address visitor;
    }

    event StorageItemCreated (
      uint256 indexed tokenId,
      address owner,
      address storageDrive,
      uint256 dateCreated,
      bool shared
    );
    
    event ViewItemCreated (
      uint256 indexed vId,
      uint256 tokenId,
      address visitor
    );

    event SubscriptionMade (
        address account
    );
    event MonthlyPaymentMade (
        address account
    );

    constructor() ERC721("Mominter", "Mominter") {
    owner = payable(msg.sender);
    }

     /* Mints a File*/
    function createFile(string memory tokenURI ) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();
      
      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createStorageItem(newTokenId);
      return newTokenId;
    }

    function createStorageItem(
      uint256 tokenId ) private {
      idToStorageItem[tokenId] =  StorageItem(
        tokenId,
        msg.sender,
        address(this),
        block.timestamp,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit StorageItemCreated(
        tokenId,
        msg.sender,
        address(this),
        block.timestamp,
        false
      );
    }

    function createViewItem(
      uint256 tokenId
    ) public {
      _viewIds.increment();
      uint256 newViewId = _viewIds.current();
      //createViewItem(newViewId, _tokenId);
      idToViewItem[newViewId] =  ViewItem(
        newViewId,
        tokenId,
        msg.sender
      );
      emit ViewItemCreated(
         newViewId,
        tokenId,
        msg.sender
      );
    }

     
    /* Returns all files on drive */
    function fetchAllStorageItems() public view returns (StorageItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint currentIndex = 0;

      StorageItem[] memory items = new StorageItem[](itemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToStorageItem[i + 1].storageDrive == address(this)) {
          uint currentId = i + 1;
          StorageItem storage currentItem = idToStorageItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }


    /* Returns only items that a user has created   */
    function fetchMyFiles() public view returns (StorageItem[]memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToStorageItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      StorageItem[] memory items = new StorageItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToStorageItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          StorageItem storage currentItem = idToStorageItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }


 /* Returns only one items by token id   */
    function fetchOneNews(uint256 _tokenId) public view returns (StorageItem[] memory) {

      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;
      
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToStorageItem[i + 1].tokenId == _tokenId) {
          itemCount += 1;
        }
      }

      StorageItem[] memory items = new StorageItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToStorageItem[i + 1].tokenId == _tokenId) {
          uint currentId = i + 1;
          StorageItem storage currentItem = idToStorageItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only one items by token id   */
    function fetchViews(uint256 _tokenId) public view returns (uint256) {
      uint totalViewCount = _viewIds.current();
      uint itemCount = 0;
      //uint currentIndex = 0;
  
      for (uint i = 0; i < totalViewCount; i++) {
        if (idToViewItem[i + 1].tokenId == _tokenId) {
          itemCount += 1;
        }
      }
    
      return itemCount;
    }

       function subscribe() external payable {
        require(!accounts[msg.sender], "Account already subscribed");
        // require(msg.value == monthly_value, "Wrong value.");

        accounts[msg.sender] = true;
        emit SubscriptionMade(msg.sender);
    }

    function payMonthlyValue() external payable {
        require(accounts[msg.sender], "Account not subscribed");
        require(msg.value == monthly_value, "Wrong value.");

        emit MonthlyPaymentMade(msg.sender);
    }

    function withdraw(uint value) external {
        require(msg.sender == owner, "Address is not the owner");
        require(value <= address(this).balance, "Value higher than balance.");

        (bool success, ) = owner.call{value: value}("");
        require(success, "There was an error!");
    }

}