document.addEventListener("DOMContentLoaded", async function () {
    const apiUrl = "https://pokeapi.co/api/v2/";
    const pokemonTypesSelect = document.getElementById("pokemon-types");
    const carouselContainer = document.getElementById("pokemon-carousel-container");

    // Función para cargar y mostrar los tipos de Pokémon en el menú desplegable
    async function cargarYMostrarTiposPokemon() {
        try {
            const typesUrl = apiUrl + "type";
            const typesResponse = await fetch(typesUrl);
            const typesData = await typesResponse.json();
            const typesList = typesData.results;

            // Rellenar el menú desplegable con los tipos de Pokémon
            for (const type of typesList) {
                const option = document.createElement("option");
                option.value = type.name;
                option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
                pokemonTypesSelect.appendChild(option);
            }
        } catch (error) {
            console.error("Error al cargar los tipos de Pokémon:", error);
        }
    }

    // Función para cargar y mostrar Pokémon de un tipo específico
    async function cargarYMostrarPokemonPorTipo(tipo) {
        try {
            const typeUrl = tipo === "all" ? apiUrl + "type" : apiUrl + `type/${tipo}`;
            const typeResponse = await fetch(typeUrl);
            const typeData = await typeResponse.json();
            const listaPokemon = typeData.pokemon.slice(0, 20); // Límite de 20 Pokémon

            // Limpiar contenido anterior del carrusel
            carouselContainer.innerHTML = "";

            const carrusel = document.createElement("div");
            carrusel.classList.add("pokemon-carrusel");

            const nombreTipo = tipo === "all" ? "Todos los Pokémon" : tipo;
            carrusel.innerHTML = `<h2>${nombreTipo}</h2>`;

            const contenidoCarrusel = document.createElement("div");

            for (const pokemon of listaPokemon) {
                const nombrePokemon = pokemon.pokemon.name;
                const urlImagenPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split("/")[6]}.png`;

                const cartaPokemon = document.createElement("div");
                cartaPokemon.classList.add("pokemon-carta");
                cartaPokemon.innerHTML = `
                    <img src="${urlImagenPokemon}" alt="${nombrePokemon}" class="pokemon-imagen">
                    <p>${nombrePokemon}</p>
                `;

                contenidoCarrusel.appendChild(cartaPokemon);
            }

            carrusel.appendChild(contenidoCarrusel);
            carouselContainer.appendChild(carrusel);

            // Inicializar el carrusel Slick con la configuración deseada
            $(contenidoCarrusel).slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3
            });

            // Configuración adicional del carrusel Slick
            $('.contenidoCarrusel').slick({
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1
                        }
                    }
                ]
            });
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    // Escuchar cambios en el menú desplegable
    pokemonTypesSelect.addEventListener("change", function () {
        const tipoSeleccionado = pokemonTypesSelect.value;
        cargarYMostrarPokemonPorTipo(tipoSeleccionado);
    });

    // Cargar y mostrar los tipos de Pokémon en el menú desplegable inicialmente
    cargarYMostrarTiposPokemon();
});
