document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("tarefaInput");
    const botaoAdicionar = document.getElementById("addBtn");
    const lista = document.getElementById("listaTarefas");

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    function salvarTarefas() {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function renderizarTarefas() {
        lista.innerHTML = "";

        tarefas.forEach((tarefa, index) => {
            const li = document.createElement("li");

            if (tarefa.concluida) {
                li.classList.add("concluida");
            }

            li.innerHTML = `
                <span>${tarefa.texto}</span>
                <div class="actions">
                    <button class="check" data-index="${index}">✔</button>
                    <button class="remove" data-index="${index}">✖</button>
                </div>
            `;

            lista.appendChild(li);
        });
    }

    function adicionarTarefa() {
        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite uma tarefa!");
            return;
        }

        tarefas.push({
            texto,
            concluida: false
        });

        input.value = "";
        salvarTarefas();
        renderizarTarefas();
    }

    function removerTarefa(index) {
        tarefas.splice(index, 1);
        salvarTarefas();
        renderizarTarefas();
    }

    function concluirTarefa(index) {
        tarefas[index].concluida = !tarefas[index].concluida;
        salvarTarefas();
        renderizarTarefas();
    }

    botaoAdicionar.addEventListener("click", adicionarTarefa);

    lista.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("remove")) {
            removerTarefa(index);
        }

        if (e.target.classList.contains("check")) {
            concluirTarefa(index);
        }
    });

    renderizarTarefas();
});
