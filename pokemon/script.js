document.getElementById('submitInput').addEventListener('click', function(event){
    getResults(event);
  });
  
  async function getResults(event){
    event.preventDefault();
    // get form values
    let name = document.getElementById('pokemonInput').value;
  
    // check if name is empty
    let url = "";
    let pokemonResult;
    if (name === "") {
      let number = Math.floor(Math.random() * Math.floor(898));
      url = "https://pokeapi.co/api/v2/pokemon/" + number;
      pokemonResult = await fetch(url)
        .then(function(response) {
          // make sure the request was successful
          if (response.status != 200) {
            return {
              text: "Error calling the PokeApi service: " + response.statusText
            }
          }
          return response.json();
        });
    }
    else {
      url = "https://pokeapi.co/api/v2/pokemon/" + name;
      pokemonResult = await fetch(url)
        .then(function(response) {
          // make sure the request was successful
          if (response.status != 200) {
            return {
              text: service + response.statusText
            }
          }
          return response.json();
        });
    }
    if  (pokemonResult == undefined){
      document.getElementById("result").innerHTML = "<h2>There is no result for " + name + "</h2>";
    }
    else {
        let typesJson = [];
        for (let i = 0; i < pokemonResult.types.length; i++) {
            let typeJson = await fetch(pokemonResult.types[i].type.url)
            .then(function(response) {
                // make sure the request was successful
                if (response.status != 200) {
                  return {
                    text: "Error calling the PokeApi service: " + response.statusText
                  }
                }
                return response.json();
              });
              typesJson.push(typeJson);
        }
        let abilitiesJson = [];
        for (let i = 0; i < pokemonResult.abilities.length; i++) {
            let abilityJson = await fetch(pokemonResult.abilities[i].ability.url)
            .then(function(response) {
                // make sure the request was successful
                if (response.status != 200) {
                  return {
                    text: "Error calling the PokeApi service: " + response.statusText
                  }
                }
                return response.json();
              });
              abilitiesJson.push(abilityJson);
        }
  
        //assignValues
        let results = "";
        results += '<div class = "pokemon"><h2>' + pokemonResult.name + '</h2>';
        results += '<img src="' + pokemonResult.sprites.front_default + '"></div>';
        for (let i = 0; i < typesJson.length; i++) {
            results += '<div class = "types">';
            results += '<h2>' + typesJson[i].name + '</h2>';
            results += '<p>Double Damage From: ';
            for (let j = 0; j < typesJson[i].damage_relations.double_damage_from.length; j++) {
                results += typesJson[i].damage_relations.double_damage_from[j].name += ','
            }
            results += '</p>';
            results += '<p>Double Damage To: ';
            for (let j = 0; j < typesJson[i].damage_relations.double_damage_to.length; j++) {
                results += typesJson[i].damage_relations.double_damage_to[j].name += ','
            }
            results += '</p>';
            results += '<p>Half Damage From: ';
            for (let j = 0; j < typesJson[i].damage_relations.half_damage_from.length; j++) {
                results += typesJson[i].damage_relations.half_damage_from[j].name += ','
            }
            results += '</p>';
            results += '<p>Half Damage To: ';
            for (let j = 0; j < typesJson[i].damage_relations.half_damage_to.length; j++) {
                results += typesJson[i].damage_relations.half_damage_to[j].name += ','
            }
            results += '</p>';
            results += '<p>No Damage From: ';
            for (let j = 0; j < typesJson[i].damage_relations.no_damage_from.length; j++) {
                results += typesJson[i].damage_relations.no_damage_from[j].name += ','
            }
            results += '</p>';
            results += '<p>No Damage To: ';
            for (let j = 0; j < typesJson[i].damage_relations.no_damage_to.length; j++) {
                results += typesJson[i].damage_relations.no_damage_to[j].name += ','
            }
            results += '</p>';
            results += '</div>';
        }
        document.getElementById("result").innerHTML = results;
      }
  }