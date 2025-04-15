const products = [];
let editIndex = -1;

function toInventory() {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;

    if(name && price && quantity) {
        const product = {name, price, quantity};
        products.push(product);  
        console.log('array updated: ');
        console.log(products);

        //delete input contents after successful add
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('quantity').value = '';
        updateTable();
    } else {
        alert("Fields cannot be empty.");
    }   
}

function updateTable() {
    const tbody = document.querySelector('#tableContainer tbody');
    tbody.innerHTML = ""
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `     
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>                
            </td>
        `
        tbody.appendChild(row);  
    }) 
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        products.splice(index, 1)
        updateTable()
        console.log(products);
    }
}

function editProduct(index) {
    editIndex = index;
    let prod = products[index];
    document.querySelector('#editName').value = prod.name;
    document.querySelector('#editPrice').value = prod.price;
    document.querySelector('#editQuantity').value = prod.quantity;

    document.getElementById('editDialog').showModal();
}

function saveEdit() {
    if(editIndex !== -1) {
        let prod = products[editIndex]
        prod.name = document.querySelector('#editName').value;
        prod.price = document.querySelector('#editPrice').value;
        prod.quantity = document.querySelector('#editQuantity').value;
        
        document.getElementById('editDialog').close();
        editIndex = -1;
    }
    updateTable();
    console.log(products);
}

function cancelEdit() {
    document.getElementById('editDialog').close();
}