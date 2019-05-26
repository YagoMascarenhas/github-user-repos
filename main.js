var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app #user");
var buttonElement = document.querySelector("#app #search");

axios.interceptors.request.use(function(config){
    listElement.innerHTML = "";
    var itemElement = document.createElement("li");
    var itemText = document.createTextNode("Pesquisando...");

    itemElement.appendChild(itemText);
    listElement.appendChild(itemElement);

    return config;
});

buttonElement.onclick = function() {
    var userName = inputElement.value;

    inputElement.value = ""
    inputElement.placeholder = "Digite um nome de usuário..."

    axios.get("https://api.github.com/users/" + userName + "/repos?per_page=1000")
    .then(function(response){
        listElement.innerHTML = "";

        if(response.data.length === 0){
            var itemElement = document.createElement("li");
            var itemText = document.createTextNode("O usuário não tem repositórios");

            itemElement.appendChild(itemText);
            listElement.appendChild(itemElement);
        } else {
            for(var i = 0; i < response.data.length; i++){
                var itemElement = document.createElement("li");
                var itemText = document.createTextNode(response.data[i].name);
                 
                itemElement.appendChild(itemText);
                listElement.appendChild(itemElement);
            }
        }
    })

    .catch(function(error){
        listElement.innerHTML = "";

        var itemElement = document.createElement("li");
        var itemText = document.createTextNode("Usuário não encontrado.");

        itemElement.appendChild(itemText);
        listElement.appendChild(itemElement);
    });
}