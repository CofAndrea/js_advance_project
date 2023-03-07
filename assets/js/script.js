/* variable set to false in order to trigger the callApi function */
let apiCalled=false;
/* set variables in order to get html elements of choice */
let tablecontainer=document.getElementById("table_container");
let button = document.getElementById("search_input");
let input=document.getElementById("text_input")
/* create a function for clearing the result of callApi function */
function createClearBtn(paragrafo){
/* create a button that appends to paragrafo which is used as a medium for textElement(see in callApi function) */    
    let clearbtn=document.createElement("button");
    clearbtn.type="button";
    clearbtn.innerText="Clear";
    clearbtn.id="clear";
    clearbtn.setAttribute("class", "btn btn-outline-danger"); 
/* write the clear function,removing data_table and desc_div and resetting the value of apiCalled to false  */    
    clearbtn.onclick=function(){
        document.getElementById("data_table").remove();
        document.getElementsByClassName("desc_div")[0].remove();
        apiCalled=false
    }
    paragrafo.appendChild(clearbtn)
};
/* declare two methods for calling the function */
button.addEventListener("click", function(){
    callApi();
});
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("search_input").click();
    }
});
/* create the main function for getting data from the API */
function callApi(){
/* declare the table variable and create the element table    */ 
    let table=document.createElement("table");
    table.id="data_table";
/* declare text_input in order to set los-angeles as the right text    */
    let text_input = document.getElementById("text_input");
    let inputText=text_input.value;
/* main function: this creates all the elements where API data will be displayed  */  
          if(!apiCalled && inputText == "los-angeles"){
            fetch("https://api.teleport.org/api/urban_areas/slug:los-angeles/scores/")
            .then((response)=>response.json())
                .then(data=>{
                    const dati = data.categories;
                    dati.forEach(categories=>{
                        const row = document.createElement("tr");
                        const colors = document.createElement("td");
                        const names = document.createElement("td");
                        const scores = document.createElement("td")
                        scores.setAttribute("class", "score_td");
                        colors.style.backgroundColor=categories.color;
                        names.textContent=categories.name;
                        scores.textContent=Math.round(categories.score_out_of_10* 100)/100;
                        row.appendChild(colors);
                        row.appendChild(names);
                        row.appendChild(scores);
                        table.appendChild(row);
                });
                tablecontainer.appendChild(table);
                const textElement = document.createElement('div');
                tablecontainer.append(textElement);
                textElement.innerHTML = data.summary;
                textElement.setAttribute("class", "desc_div");
                const finalscore= document.createElement('p');
                finalscore.textContent="Final score:" + Math.round(data.teleport_city_score*100)/100;
                textElement.append(finalscore);
                createClearBtn(textElement);
            });
            apiCalled=true;
        } else if(inputText !== "los-angeles"){
            alert("Try 'los-angeles'")

        }
};
