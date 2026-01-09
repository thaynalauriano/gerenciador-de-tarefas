function adicionarTarefa() {
    const input = document.getElementById("tarefaInput");
    const texto = input.value;

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        ${texto}
        <button onclick="removerTarefa(this)">X</button>
    `;

    document.getElementById("listaTarefas").appendChild(li);
    input.value = "";
}

function removerTarefa(botao) {
    botao.parentElement.remove();
}
