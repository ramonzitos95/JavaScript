/**
 * Created by Ramon on 30/10/2016.
 */
/*
* Lista de produtos que o usuario vai adicionar.
* Quantidade de produtos, ele poderá comprar varias vezes o mesmo produto.
*
* */

var list = [
    {"desc": "rice","amount":"1","value":"5.40"},
    {"desc": "beer","amount":"12","value":"1.99"},
    {"desc": "carne","amount":"1","value":"15"}
];

function getTotal(list)
{
    var total = 0;
    for(var key in list)
    {
        total += list[key].value * list[key].amount;
    }

    return total;
};

function setList(list)
{
    var table = '<thead> <tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead></tbody>';
    for(var key in list)
    {
        table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ list[key].amount +'</td><td>'+ formatValue(list[key].value) +'</td><td>Editar/Deletar</td></tr>'
    }
    table +=  '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

function formatDesc(desc)
{
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1); //Primeira letra da descrição mais o restante da palavra
    return str;
}

function formatValue(value)
{
    var str = parseFloat(value).toFixed(2) + ""; //Apenas numeros decimais, após o ponto e declarando um valor implicito para string
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
}

function addData(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc,"amount":amount,"value":value});
    setList(list);
}

setList(list);
console.log(getTotal(list));