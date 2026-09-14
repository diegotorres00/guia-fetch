const contenedor = document.querySelector("#contenedorUsuarios");
const mensaje = document.querySelector("#mensaje");
const buscar = document.querySelector("#buscar");
const limpiar = document.querySelector("#limpiar");
const urlUsuarios = "https://jsonplaceholder.typicode.com/users";
let usuariosGlobales = [];

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
		usuariosGlobales = usuarios.sort((a, b) => a.name.localeCompare(b.name));
		mostrarUsuarios(usuariosGlobales);
		mensaje.textContent = `${usuariosGlobales.length} usuarios cargados.`;
	} catch (error) {
		mensaje.textContent = "No fue posible cargar la información.";
		console.error(error);
	}
}

buscar.addEventListener("input", () => {
	const texto = buscar.value.trim().toLowerCase();
	const filtrados = usuariosGlobales.filter(usuario => {
		const datosUsuario = [
			usuario.name,
			usuario.email,
			usuario.address.city
		].join(" ").toLowerCase();

		return datosUsuario.includes(texto);
	});

	mostrarUsuarios(filtrados);
	mensaje.textContent = filtrados.length === 0
		? "No se encontraron usuarios."
		: `${filtrados.length} usuario(s) encontrado(s).`;
});

limpiar.addEventListener("click", () => {
	buscar.value = "";
	buscar.dispatchEvent(new Event("input"));
	buscar.focus();
});

cargarUsuarios();
