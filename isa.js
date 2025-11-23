// isa.js

let momentos = [
    { id: 1, src: 'foto1.jpeg', titulo: 'Mãos Dadas no Parque', endereco: 'Parque Ibirapuera, São Paulo', descricao: 'Nosso estilo e a conexão de sempre! Amo segurar sua mão, meu amor.' },
    { id: 2, src: 'foto2.jpeg', titulo: 'Você e as Flores', endereco: 'Rua do Ouvidor, Centro, Rio de Janeiro', descricao: 'Seu sorriso ilumina mais que o sol. Cada dia ao seu lado é um presente, como essas flores.' },
    { id: 3, src: 'foto3.jpeg', titulo: 'Noite Especial', endereco: 'Restaurante Aconchego, São Paulo', descricao: 'Um jantar inesquecível, cheio de risadas e amor. Amo nossos momentos assim.' },
    { id: 4, src: 'foto4.jpeg', titulo: 'Detalhes da Viagem', endereco: 'Aeroporto do Galeão, Rio de Janeiro', descricao: 'Lembranças daquela viagem que planejamos com tanto carinho. Mal posso esperar pela próxima!' },
    { id: 5, src: 'foto5.jpeg', titulo: 'Aquele Abraço', endereco: 'Café do Bosque, São Paulo', descricao: 'Seu abraço é o meu porto seguro. Um momento de pura paz e carinho.' },
    { id: 6, src: 'foto6.jpeg', titulo: 'Sorrisos e Carinhos', endereco: 'Centro Cultural Banco do Brasil, Rio', descricao: 'Adoro esses momentos espontâneos, onde a única coisa que importa é a nossa felicidade.' },
    { id: 7, src: 'foto7.jpeg', titulo: 'Passeio Romântico', endereco: 'Parque da Cidade, São José dos Campos', descricao: 'Caminhando de mãos dadas, apreciando a beleza ao nosso redor e a beleza do nosso amor.' },
    { id: 8, src: 'foto8.jpeg', titulo: 'Momento Especial', endereco: 'Praça da Liberdade, Belo Horizonte', descricao: 'Cada olhar, cada toque, uma história. Amo construir memórias com você.' },
    { id: 9, src: 'foto9.jpeg', titulo: 'Doce Encontro', endereco: 'Confeitaria Parisiense, Rio de Janeiro', descricao: 'Aquele dia que passamos experimentando doces e fazendo planos para o futuro. Você é meu doce favorito!' },
    { id: 10, src: 'foto10.jpeg', titulo: 'Caminhada no Final da Tarde', endereco: 'Parque Burle Marx, São Paulo', descricao: 'Momentos simples, mas tão preciosos. Sua companhia torna tudo especial.' },
    { id: 11, src: 'foto11.jpeg', titulo: 'Viagem de Carro', endereco: 'Estrada do Litoral, Angra dos Reis', descricao: 'Adoro quando viajamos juntos, a trilha sonora perfeita e você ao meu lado.' },
    { id: 12, src: 'foto12.jpeg', titulo: 'Noite de Cinema', endereco: 'Nosso Cantinho no Sofá', descricao: 'Nossa rotina favorita: um bom filme, pipoca e seu abraço. Te amo!' },
];

function renderizarCarrossel() {
    const carouselContainer = document.getElementById('carousel-container');
    carouselContainer.innerHTML = ''; 

    if (momentos.length === 0) {
        carouselContainer.innerHTML = '<p>Nenhuma memória cadastrada ainda.</p>';
        document.getElementById('detalhes-memoria').innerHTML = '<p>Clique em uma foto acima para reviver esta memória especial.</p>';
        return; 
    }
    
    momentos.forEach((momento) => {
        const img = document.createElement('img');
        img.src = momento.src;
        img.alt = momento.titulo;
        img.title = momento.titulo; 
        
        img.addEventListener('click', () => {
            document.querySelectorAll('.carousel img').forEach(i => i.classList.remove('active'));
            img.classList.add('active');
            mostrarDetalhes(momento);
        });
        carouselContainer.appendChild(img);
    });
    
    if (momentos.length > 0) {
        // Garante que a primeira imagem seja ativa, se houver
        const primeiraImagem = document.querySelector('.carousel img');
        if (primeiraImagem) {
            primeiraImagem.classList.add('active');
            mostrarDetalhes(momentos[0]);
        }
    }
}

function mostrarDetalhes(momento) {
    const detalhesDiv = document.getElementById('detalhes-memoria');
    
    // Conteúdo HTML da ficha detalhada
    detalhesDiv.innerHTML = `
        <img src="${momento.src}" alt="${momento.titulo}">
        <h3>${momento.titulo}</h3>
        <p id="endereco-${momento.id}"><strong>📍 Local:</strong> ${momento.endereco}</p>
        <p id="descricao-${momento.id}"><strong>📝 Nossa História:</strong> ${momento.descricao}</p>
        
        <div class="acoes">
            <button id="btn-editar-local-${momento.id}" class="botao-editar-local">Editar Localização</button>
            <button id="btn-editar-desc-${momento.id}" class="botao-editar-desc">Editar Descrição</button>
            <button id="btn-excluir-${momento.id}" class="botao-excluir">Excluir Momento</button>
        </div>
    `;

    // Adiciona os event listeners após o elemento ser criado no DOM
    document.getElementById(`btn-editar-local-${momento.id}`).onclick = () => {
        abrirEdicaoLocal(momento.id, momento.endereco);
    };
    document.getElementById(`btn-editar-desc-${momento.id}`).onclick = () => {
        abrirEdicaoDescricao(momento.id, momento.descricao);
    };
    document.getElementById(`btn-excluir-${momento.id}`).onclick = () => {
        excluirMomento(momento.id);
    };
}


// --- NOVAS FUNÇÕES DE EDIÇÃO DE LOCALIZAÇÃO ---

function abrirEdicaoLocal(id, enderecoAtual) {
    const novoEndereco = prompt("Edite o endereço do momento:", enderecoAtual);
    
    if (novoEndereco !== null && novoEndereco.trim() !== "") {
        editarLocalizacao(id, novoEndereco);
    }
}

function editarLocalizacao(id, novoEndereco) {
    const index = momentos.findIndex(m => m.id === id);
    if (index !== -1) {
        momentos[index].endereco = novoEndereco;
        alert("Localização atualizada com sucesso!");
        mostrarDetalhes(momentos[index]); // Renderiza os novos detalhes
    }
}


// --- FUNÇÕES DE EDIÇÃO DE DESCRIÇÃO E EXCLUSÃO (RENOMEADAS) ---

function abrirEdicaoDescricao(id, descricaoAtual) {
    const novaDescricao = prompt("Edite a descrição do momento:", descricaoAtual);
    
    if (novaDescricao !== null && novaDescricao.trim() !== "") {
        editarDescricao(id, novaDescricao);
    }
}

function editarDescricao(id, novaDescricao) {
    const index = momentos.findIndex(m => m.id === id);
    if (index !== -1) {
        momentos[index].descricao = novaDescricao;
        alert("Descrição atualizada com sucesso!");
        mostrarDetalhes(momentos[index]);
    }
}

function excluirMomento(id) {
    if (confirm("Tem certeza que deseja excluir este momento? Esta ação não pode ser desfeita na galeria temporária.")) {
        const index = momentos.findIndex(m => m.id === id);
        if (index !== -1) {
            momentos.splice(index, 1);
            alert("Momento excluído.");
            renderizarCarrossel();
        }
    }
}

// --- FUNÇÕES DE NAVEGAÇÃO E FORMULÁRIO (ATUALIZADO PARA UPLOAD) ---

function gerenciarMenu() {
    const btnGaleria = document.getElementById('btnGaleria');
    const btnCadastro = document.getElementById('btnCadastro');
    const galeriaSecao = document.getElementById('galeria-secao');
    const cadastroSecao = document.getElementById('cadastro-secao');

    function trocarSecao(secaoAtivar, btnAtivar, secaoDesativar, btnDesativar) {
        secaoAtivar.classList.remove('secao-oculta');
        secaoAtivar.classList.add('secao-ativa');
        btnAtivar.classList.add('active');

        secaoDesativar.classList.remove('secao-ativa');
        secaoDesativar.classList.add('secao-oculta');
        btnDesativar.classList.remove('active');
    }

    btnGaleria.addEventListener('click', () => {
        trocarSecao(galeriaSecao, btnGaleria, cadastroSecao, btnCadastro);
    });

    btnCadastro.addEventListener('click', () => {
        trocarSecao(cadastroSecao, btnCadastro, galeriaSecao, btnGaleria);
    });
}

function configurarFormulario() {
    const formulario = document.getElementById('cadastroFormulario');

    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const arquivoInput = document.getElementById('srcNovo');
        const arquivo = arquivoInput.files[0];
        
        // 1. Cria um URL temporário para visualização imediata (só dura enquanto a página estiver aberta)
        const urlTemporaria = URL.createObjectURL(arquivo);
        
        // 2. Monta o novo objeto de momento
        const novoMomento = {
            id: momentos.length > 0 ? momentos[momentos.length - 1].id + 1 : 1,
            src: urlTemporaria, // Usa a URL temporária para o carrossel
            titulo: document.getElementById('tituloNovo').value,
            endereco: document.getElementById('enderecoNovo').value,
            descricao: document.getElementById('descricaoNovo').value,
        };

        momentos.push(novoMomento);
        renderizarCarrossel();
        formulario.reset();

        // 3. Alerta para o usuário salvar o arquivo
        alert(`🎉 Momento "${novoMomento.titulo}" guardado!
        
        ⚠️ A imagem foi carregada temporariamente.
        PARA SALVAR PERMANENTEMENTE:
        1. Localize o arquivo que você acabou de subir: "${arquivo.name}"
        2. COPIE este arquivo para a pasta do projeto (Presente Isa).
        3. No código isa.js, você deve substituir a URL temporária por "src: '${arquivo.name}'" no array 'momentos'.`);
        
        document.getElementById('btnGaleria').click(); 
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderizarCarrossel();
    gerenciarMenu();
    configurarFormulario();
});