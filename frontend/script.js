const apiUrl = "http://localhost:8000/products/";
const form = document.getElementById("product-form");
const tableBody = document.getElementById("product-table-body");
const alertMessage = document.getElementById("alert-message");

async function fetchProducts() {
  const res = await fetch(apiUrl);
  const products = await res.json();

  tableBody.innerHTML = "";

  products.forEach((p) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.description || ""}</td>
      <td>${p.price}</td>
      <td>${p.quantity}</td>
      <td class="actions">
        <button class="btn btn-warning btn-sm" onclick="editProduct(${p.id}, '${p.name}', '${p.description}', ${p.price}, ${p.quantity})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Eliminar</button>
        <button class="btn btn-secondary btn-sm" onclick="cancelEdit()">Cancelar</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("product-id").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  const data = { name, description, price, quantity };

  try {
    let response;
    if (id) {
      // Actualizar producto
      response = await fetch(apiUrl + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Crear producto
      response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // Verificar si la respuesta es exitosa
    if (response.ok) {
      showAlert("Producto registrado con éxito", "success");
      form.reset();
      fetchProducts();
    } else {
      showAlert("Inténtelo nuevamente", "danger");
    }
  } catch (error) {
    showAlert("Hubo un error. Inténtelo nuevamente.", "danger");
  }
});

function showAlert(message, type) {
  alertMessage.className = `alert alert-${type}`;
  alertMessage.textContent = message;
  alertMessage.style.display = "block";

  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 5000);
}

function editProduct(id, name, description, price, quantity) {
  document.getElementById("product-id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("description").value = description;
  document.getElementById("price").value = price;
  document.getElementById("quantity").value = quantity;
}

async function deleteProduct(id) {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    await fetch(apiUrl + id, { method: "DELETE" });
    fetchProducts();
  }
}

function cancelEdit() {
  document.getElementById("product-id").value = '';
  document.getElementById("name").value = '';
  document.getElementById("description").value = '';
  document.getElementById("price").value = '';
  document.getElementById("quantity").value = '';
}

fetchProducts();
