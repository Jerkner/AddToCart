import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3a84f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

const addBtn = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const shoppingList = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
    addItemToDB()
    clearInputField()
})

onValue(itemsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingList()
    
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            addItemToList(currentItem)
        }

    } else {
        clearShoppingList()
    }

})

function addItemToDB() {
    if (inputField.value.length > 0) {
        push(itemsInDB, inputField.value)
    }
}

function addItemToList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let itemToBeRemoved = ref(database, `items/${itemID}`)
        remove(itemToBeRemoved)
    })

    shoppingList.append(newEl)
}

function clearShoppingList() {
    shoppingList.innerHTML = ""
}

function clearInputField() {
    inputField.value = ""
}

