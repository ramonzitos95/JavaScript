/**
 * Created by Ramon on 30/10/2016.
 */
/*
 * Lista de produtos que o usuario vai adicionar.
 * Quantidade de produtos, ele poderá comprar varias vezes o mesmo produto.
 *
 * */

var list = [
    {"desc": "rice", "amount": "1", "value": "5.40"},
    {"desc": "beer", "amount": "12", "value": "1.99"},
    {"desc": "carne", "amount": "1", "value": "15"}
];

function getTotal(list)
{
    var total = 0;
    for (var key in list) {
        total += list[key].value * list[key].amount;
    }

    return total;
};

function setList(list)
{
    var table = '<thead> <tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead></tbody>';
    for (var key in list) {
        table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + formatAmount(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-default" onclick="setUpdate(' + key + ');">Editar</button><button class="btn btn-default" onclick="deleteData(' + key + ');">Deletar</button></td></tr>'
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

function formatDesc(desc)
{
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1); //Primeira letra da descrição mais o restante da palavra
    return str;
}

function formatAmount(amount)
{
    return parseInt(amount);
}

function formatValue(value)
{
    var str = parseFloat(value).toFixed(2) + ""; //Apenas numeros decimais, após o ponto e declarando um valor implicito para string
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
}

function addData()
{
    if(!validation()){
        return
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc": desc, "amount": amount, "value": value});
    setList(list);
}

function setUpdate(id)
{
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="' + id + '">';
}

function resetForm()
{
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("errors").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = "";
}

function updateData()
{
    if(!validation()){
        return
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc": desc, "amount": amount, "value": value};
    resetForm();
    setList(list);
}

function deleteData(id)
{
    if(confirm("Deletar este item?")){
        if(id === list.length - 1){
            list.pop(); //Limpa o ultimo registro da lista
        } else if(id === 0) {
            list.shift(); //Limpa o primeiro registro
        } else {
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd); //Juntando os dois arrays;
        }
        setList(list);
    }
}

function validation()
{
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    if(desc === "")
    {
        errors += '<p>Fill out description</p>';
    }
    if(amount === "")
    {
        errors += '<p>Fill out quantity</p>';
    } else if(amount != parseInt(amount)) {
        errors += '<p>Quantidade digitada inválida</p>';
    }
    if(value === "")
    {
        errors += '<p>Fill out value</p>';
    } else if(value != parseFloat(value)) {
        errors += '<p>Valor digitado invalido</p>';
    }

    if(errors != null){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85,85,85, 0.3)"
        document.getElementById("errors").style.color = backgroundColor = "gray";
        document.getElementById("errors").style.borderRadius = "13px";
        document.getElementById("errors").style.margin = "10px"
        document.getElementById("errors").style.padding = "left";
        document.getElementById("errors").style.color = "white";

        document.getElementById("errors").innerHTML = "<h3>Error:</h3>"+ errors;
        return 0;
    }else{
        return 1;
    }

}

setList(list);
console.log(getTotal(list));