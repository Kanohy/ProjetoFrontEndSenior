let tbProdutos;

$("#containerData").ready(function (){
    Listar();
});

$("#container").ready(function (){
    let url = new URL(window.location.href);
    let index = url.searchParams.get("index");   

    if(index != null)
    {
        tbProdutos = localStorage.getItem("tbProdutos");

        if(tbProdutos != null && index != undefined)
        {
            $("#index").val(index);
            tbProdutos = JSON.parse(tbProdutos);
            let produtoSelecionado = JSON.parse(tbProdutos[index]);
            
            if(produtoSelecionado != null)
            {
                $("#NomeProd").val(produtoSelecionado.Nome);
                $("#UnidadeMedida").val(produtoSelecionado.UnidadeMedida);
                $("#Quantidade").val(produtoSelecionado.Quantidade);
                $("#Preco").val(produtoSelecionado.Preco);
                $("#EhPerecivel").val(produtoSelecionado.EhPerecivel);
                $("#DataValidade").val(produtoSelecionado.DataValidade);
                $("#DataFabricacao").val(produtoSelecionado.DataFabricacao);             
            }        
        }
    }    
});

function somente_letras(campo) {
    campo.value = campo.value.replace(/[^\w\.]|\d/g, '');
};

function ValidarCampos(){
    let dataValidade = $("#DataValidade").val();
    let dataFabricacao = $("#DataFabricacao").val();

    if($("#NomeProd").val() == "")
    {
        alert("O campo 'Nome' é obrigatório.");
        return false;
    }
    else if($("#UnidadeMedida").val() == "")
    {
        alert("O campo 'Unidade de medida' é obrigatório.");
        return false;
    }
    else if($("#Preco").val() == "")
    {
        alert("O campo 'Preço' é obrigatório.")
        return false;
    }    
    else if($("#EhPerecivel").is(":checked") && $("#DataValidade").val() == "")
    {
        alert("O campo 'Data de validade' é obrigatório");
        return false;
    }
    else if($("#DataFabricacao").val() == "")
    {
        alert("O campo 'Data de fabricação' é obrigatório.");
        return false;
    }    
    else if(dataValidade > dataFabricacao && $("#EhPerecivel").is(":checked"))
    {
        alert("A data de validade não pode ser superior a data de fabricação");
        return false;
    }
    else if(dataValidade < Date.now && $("#EhPerecivel").is(":checked"))
    {
        alert("O produto está vencido.");
        return false;
    }
    else
    {
        return true;
    }
}

function Adicionar(){
    if(ValidarCampos())
    {
        let index = $("#index").val()
        tbProdutos = localStorage.getItem("tbProdutos");

        if(tbProdutos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
            tbProdutos = [];
        else
            tbProdutos = JSON.parse(tbProdutos);

        if(index == undefined || index == "")
        {        
            let produto = JSON.stringify({
                Nome: $("#NomeProd").val(),
                UnidadeMedida: $("#UnidadeMedida").val(),
                Quantidade: $("#Quantidade").val(),
                Preco: $("#Preco").val(),
                EhPerecivel: $("#EhPerecivel").is(":checked") ? "Sim" : "Não",
                DataValidade: $("#DataValidade").val(),
                DataFabricacao: $("#DataFabricacao").val()
            });

            tbProdutos.push(produto);
            localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
            alert("Registro criado");
            window.location.href = "listagemDados.html";    
        }
        else
        {
            if(tbProdutos.length > 0)
            {                        
                tbProdutos[index] = JSON.stringify({
                    Nome: $("#NomeProd").val(),
                    UnidadeMedida: $("#UnidadeMedida").val(),
                    Quantidade: $("#Quantidade").val(),
                    Preco: $("#Preco").val(),
                    EhPerecivel: $("#EhPerecivel").is(":checked") ? "Sim" : "Não",
                    DataValidade: $("#DataValidade").val(),
                    DataFabricacao: $("#DataFabricacao").val()
                });

                localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
                alert("Informações editadas");
                window.location.href = "listagemDados.html";
            }
        }
    }
}

function Editar(index){    
    window.location.href = "formulario.html?index=" + index;        
}

function Excluir(index)
{
    tbProdutos = localStorage.getItem("tbProdutos");

    if(tbProdutos != null){
        tbProdutos = JSON.parse(tbProdutos);
        tbProdutos.splice(index, 1);
        localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
        alert("Registro excluído!");
        Listar();
    }
}

function Listar(){
    tbProdutos = localStorage.getItem("tbProdutos");

    if(tbProdutos == null)
        tbProdutos = [];
    else
        tbProdutos = JSON.parse(tbProdutos);

    $("#containerData").html("");
    $("#containerData").html(
        "<table id='data'>" +
        "<thead>"+
        "<tr>"+
        "<th>Nome</th>"+
        "<th>Unidade medida</th>"+
        "<th>Quantidade</th>"+
        "<th>Preço</th>"+
        "<th>Perecível</th>"+
        "<th>Data de validade</th>"+
        "<th>Data de fabricação</th>"+
        "<th></th>"+
        "</tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>");

        for (let i in tbProdutos) {
            let produto = JSON.parse(tbProdutos[i]);
            $("#data tbody").append("<tr>");
            $("#data tbody").append("<td>" + produto.Nome + "</td>");
            $("#data tbody").append("<td>" + produto.UnidadeMedida + "</td>");
            $("#data tbody").append("<td>" + produto.Quantidade + "</td>");
            $("#data tbody").append("<td>" + produto.Preco + "</td>");
            $("#data tbody").append("<td>" + produto.EhPerecivel + "</td>");
            $("#data tbody").append("<td>" + produto.DataValidade + "</td>");
            $("#data tbody").append("<td>" + produto.DataFabricacao + "</td>");
            $("#data tbody").append("<td><a onclick='Editar("+i+")'><img src='baseline-edit-24px.svg'/></a><a onclick='Excluir(" + i + ")'><img src='baseline-delete-24px.svg'/></a></td>");
            $("#data tbody").append("</tr>");
        }
}