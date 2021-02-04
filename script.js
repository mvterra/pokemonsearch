let myObject

const button = document.querySelector("#search")
const pokemonName = document.querySelector(".pokemonName")
const poke = document.querySelector('.pokemonName')
const temp = document.querySelector('.temperature')
const pokeImg = document.querySelector('.pokemonImage')
const rain = document.querySelector('.rain')

button.addEventListener('click',async function(){
    const city = document.querySelector("#city").value;
    //Faz a requisição da API para pegar as informações do clima e temperatura
    async function getWeather() {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed3d1a710d95e934076b898ba73c404c&units=metric`
        const response = await fetch(url);
        const data = await response.json()
        const temperature = data.main.temp
        const weather = data.weather[0].main
        temp.textContent=temperature + 'ºC'
        return [temperature,weather]
    }
    //Estabelece o tipo do pokemon com base na temperatura obtida na funcao getWeather
    async function getPokemon(temperature,weather){
        let type
        if (weather === 'Rain') {
            type = 'electric';
            rain.textContent="It is raining!"
        }
        else if (temperature > 33){
            type = 'fire'
            rain.textContent=""
        }
        else if (temperature >= 27){
            type = 'rock'
            rain.textContent=""
        }
        else if (temperature >= 23){
            type = 'bug'
            rain.textContent=""
        }
        else if (temperature >= 15 && temperature <21){
            type = 'ground'
            rain.textContent=""
        }
        else if (temperature >= 12){
            type = 'grass'
            rain.textContent=""
            //console.log()
        }
        else if (temperature >= 5 && temperature < 10){
            type = 'water'
            rain.textContent=""
        }
        else{
            type='normal'
            rain.textContent=""
        }

        //Faz a requisição da API para buscar os pokemons de acordo com o tipo
        const url = `https://pokeapi.co/api/v2/type/${type}`
        response = await fetch(url);
        const data = await response.json()
        const length = data.pokemon.length
        let pokemonName = data.pokemon[Math.trunc(Math.random()*length)+1].pokemon.name

        //Caso o pokemon for repetido, o nome será novamente "sorteado"
        while(poke.textContent===pokemonName){
            pokemonName = data.pokemon[Math.trunc(Math.random()*length)].pokemon.name
        }
        poke.textContent=pokemonName[0].toUpperCase()+pokemonName.slice(1)

        //Faz a requisição da API para buscar a imagem do pokemon de acordo com o nome obtido na requisição passada
        async function getPokeImg(pokename) {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokename}`
            const response = await fetch(url);
            const data = await response.json()
            const pokeurl = data.sprites.front_default
            if (pokeurl){
                pokeImg.src=pokeurl
            }
            else {
                pokeImg.src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png'
            }          
            return pokeurl
        }       
        getPokeImg(pokemonName)
        return [pokemonName, type,getPokeImg]
    }
    if(city===""){
        alert('No city selected')
    }
    else{
        const [temperature,weather] = await getWeather();
        const [pokemon,type] = await getPokemon(temperature,weather);
        console.log(temperature, weather,pokemon,type)

    }
        
})
