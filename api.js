// ===================================================================================
// ARQUIVO DE CONFIGURAÇÃO DA API
// ===================================================================================
// Objetivo: Centralizar a lógica para buscar dados e adaptá-los para os templates.
// ===================================================================================

/**
 * Configurações da API.
 */
const config = {
	apiUrlBase: 'https://sup.bixs.com.br/v1/api',
	source: 'uai_pdv_mais',
	// ATENÇÃO: Token de autenticação Bearer.
	authToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoiUGVkcm8iLCJlbWFpbCI6InBlZHJvbHVjYXNtb3RhMjAwNS5wbEBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwic3ViIjoiNSIsImV4cCI6MTc1ODY0NTI2OCwiaWF0IjoxNzU4NTU4ODY4fQ.nGPXFElrknEwP_N62oRYf3s7wIHRCqYn7hxudRn-4aI',
};

/**
 * Função genérica para realizar requisições à API.
 * @param {string} endpoint - O endpoint a ser consultado (ex: '/products').
 * @returns {Promise<any>} - A resposta da API em formato JSON.
 */
async function fetchData(endpoint) {
	const url = `${config.apiUrlBase}${endpoint}?source=${config.source}`;

	try {
		console.log(
			`%c[API REAL]`,
			'color: #3498db; font-weight: bold;',
			`Requisitando dados de: ${url}`
		);
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${config.authToken}`,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Erro na requisição: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		console.log(
			'%c[API RETORNO BRUTO]',
			'color: #8e44ad; font-weight: bold;',
			data
		);
		return data;
	} catch (error) {
		console.error(`Falha ao buscar dados do endpoint ${endpoint}:`, error);
		// Retorna um array vazio em caso de erro para não quebrar a aplicação.
		return [];
	}
}

/**
 * Adapta os dados dos produtos da API para o formato esperado pelos templates.
 * @param {Array} produtosApi - Lista de produtos vinda da API.
 * @returns {Array} - Lista de produtos no formato dos templates.
 */
function adaptarProdutos(produtosApi) {
	if (!Array.isArray(produtosApi)) return [];
	return produtosApi.map((produto) => ({
		id: produto.id,
		nome: produto.name,
		descricao: produto.description,
		preco: produto.base_price,
		fotoUrl: produto.image_url,
		imagemUrl: produto.image_url,
		imagem: produto.image_url,
		categoriaId: produto.group ? produto.group.group_code : null,
	}));
}

/**
 * Adapta os dados dos grupos (categorias) da API para o formato esperado.
 * @param {Array} gruposApi - Lista de grupos vinda da API.
 * @returns {Array} - Lista de categorias no formato dos templates.
 */
function adaptarCategorias(gruposApi) {
	// Mapeamento de group_code para imagens específicas para manter o design.
	const imagensCategorias = {
		BEBIDAS: 'img/bebidasgeral.jpg',
		BEBIDAS_QUENTES: 'img/bebidasgeral.jpg',
		SALGADOS: 'img/salgados.jpg',
		PADARIA: 'img/paes.webp',
		SOBREMESAS: 'img/doces.png',
	};

	if (!Array.isArray(gruposApi)) {
		console.error('A API de grupos não retornou um array:', gruposApi);
		return [];
	}

	return gruposApi.map((grupo) => {
		const idDaCategoria = grupo.group_code;
		// Usa a imagem do mapeamento ou gera uma imagem de placeholder.
		const imagemCategoria =
			imagensCategorias[idDaCategoria] ||
			`https://placehold.co/100x100/c0392b/FFFFFF?text=${encodeURIComponent(
				grupo.name
			)}`;

		return {
			id: idDaCategoria,
			nome: grupo.name,
			imagemUrl: imagemCategoria,
			imagem: imagemCategoria,
		};
	});
}

/**
 * Funções exportadas para buscar e adaptar dados.
 */
const api = {
	/**
	 * Busca e adapta a lista de todas as categorias.
	 */
	async getCategorias() {
		// Endpoint corrigido para /groups
		const grupos = await fetchData('/groups');
		return adaptarCategorias(grupos);
	},

	/**
	 * Busca e adapta a lista de todos os produtos.
	 */
	async getProdutos() {
		const produtos = await fetchData('/products');
		return adaptarProdutos(produtos);
	},
};

/**
 * Função de autoteste para verificar a conexão e os dados já adaptados.
 */
(async function runApiTest() {
	console.log('========================================');
	console.log('Iniciando verificação da API...');

	const categorias = await api.getCategorias();
	const produtos = await api.getProdutos();

	if (categorias && categorias.length > 0) {
		console.log(
			'%c✔ Categorias (API) adaptadas com sucesso:',
			'color: #2ecc71; font-weight: bold;'
		);
		console.table(categorias);
	} else {
		console.error(
			'✖ Não foi possível receber as categorias ou a lista está vazia.'
		);
	}

	if (produtos && produtos.length > 0) {
		console.log(
			'%c✔ Produtos adaptados com sucesso:',
			'color: #2ecc71; font-weight: bold;'
		);
		console.table(produtos);
	} else {
		console.error(
			'✖ Não foi possível receber os produtos ou a lista está vazia.'
		);
	}
	console.log('Verificação da API finalizada.');
	console.log('========================================');
})();
