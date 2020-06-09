function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })


}

populateUFs()

function getCities(e){
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = e.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = `<option value>Select of City</option>`
  citySelect.disabled= true;

  fetch(url)
  .then( res => res.json())
  .then( citys => {
     
      for(city of citys) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled= false;
  });
};

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


//itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
const collectedItems =  document.querySelector("input[name=items]")

for(let item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}

let selecItems = []

function handleSelectedItem(event){
  const itemLi = event.target

  // adicionar ou remover uma classe com js
  itemLi.classList.toggle('selected')

  const itemId = itemLi.dataset.id

  // console.log("Ids:",itemId)

  // verificar se existe items selecionados,
  // se sim pegar os itens selecionados 

  const alreadySelected = selecItems.findIndex( item => item == itemId )

  console.log()

  // se ja estiver selcionado tirar da selecao
    if( alreadySelected >= 0 ) {
      //tirar da sekecao
      const filteredItems = selecItems.filter( item => item != itemId)

      selecItems = filteredItems
    } else {
      // se n'ao estiver adicionar a selecao
      // adicionar
      selecItems.push(itemId)

    }

    // console.log("selecItems",selecItems)
 

  // atualizar o campo escondifo com os itens selcionados
  collectedItems.value = selecItems
  

}