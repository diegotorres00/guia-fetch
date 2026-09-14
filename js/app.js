const contenedor = document.querySelector("#contenedorUsuarios");
const mensaje = document.querySelector("#mensaje");
const urlUsuarios = "https://jsonplaceholder.typicode.com/users";

function mostrarUsuarios(usuarios) {
	contenedor.innerHTML = "";

	usuarios.forEach(usuario => {
		const tarjeta = document.createElement("article");
		tarjeta.classList.add("tarjeta");
		tarjeta.innerHTML = `
			<h3>${usuario.name}</h3>
			<p><strong>Usuario:</strong> ${usuario.username}</p>
			<p><strong>Correo:</strong> ${usuario.email}</p>
			<p><strong>Ciudad:</strong> ${usuario.address.city}</p>
			<p><strong>Teléfono:</strong> ${usuario.phone}</p>
			<p><strong>Empresa:</strong> ${usuario.company.name}</p>
			<p><a href="https://${usuario.website}" target="_blank" rel="noopener">Visitar sitio web</a></p>
		`;
		contenedor.appendChild(tarjeta);
	});
}

async function cargarUsuarios() {
	try {
		mensaje.textContent = "Cargando usuarios...";

		const response = await fetch(urlUsuarios);

		if (!response.ok) {
			throw new Error(`Error HTTP: ${response.status}`);
		}

		const usuarios = await response.json();
		mostrarUsuarios(usuarios);
		mensaje.textContent = `${usuarios.length} usuarios cargados.`;
	} catch (error) {
		mensaje.textContent = "No fue posible cargar la información.";
		console.error(error);
	}
}

cargarUsuarios();
