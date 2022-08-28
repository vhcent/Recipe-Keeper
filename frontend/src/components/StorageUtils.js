import AsyncStorage from '@react-native-async-storage/async-storage';

async function getStorageItem(itemName) {
    console.log("Getting it ");
      try {
        const value = await AsyncStorage.getItem(itemName)
        console.log(value)
        if(value !== null) {
          return value;
        }
        else{
          console.log("returning false");
          return false;
        } 
      } catch(e) {
          console.log("Unable to retrieve item ", itemName)
          return false; 
      }
    }
  
  async function storeItem(itemName, value){
      try {
        await AsyncStorage.setItem(itemName, value)
      } catch (e) {
        console.log("Unable to store item")
      }
    }
  
  async function removeItem(key) {
      try {
          await AsyncStorage.removeItem(key);
          return true;
      }
      catch(exception) {
        console.log("Unable to remove item ", key)
          return false;
      }
  }

  module.exports = {
    storeItem, getStorageItem, removeItem
}