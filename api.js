// ===================================================================================
// ARQUIVO DE CONFIGURAÇÃO DA API COM REAUTENTICAÇÃO AUTOMÁTICA
// ===================================================================================
// Objetivo: Centralizar a lógica da API, com capacidade de renovar o token de
// acesso automaticamente em caso de expiração.
// ===================================================================================

/**
 * Configurações da API e credenciais do usuário.
 * ATENÇÃO: Em um ambiente de produção, não é seguro armazenar credenciais
 * diretamente no código. Elas devem ser obtidas de forma segura.
 */
const config = {
	// CORREÇÃO: URL base para os endpoints de dados (produtos, categorias, etc.)
	apiUrlBase: 'https://sup.bixs.com.br/v1/api',
	// CORREÇÃO: URL base separada para o endpoint de autenticação
	authUrlBase: 'https://sup.bixs.com.br/v1',
	source: 'uai_pdv_mais',
	loginCredentials: {
		email: 'pedrolucasmota2005.pl@gmail.com',
		mac: '00000',
		password: 'plm200510',
		source_app: 'bixs',
	},
	// O token permanente pode ser usado em uma lógica de "refresh token" se a API suportar.
	// Por enquanto, usaremos o login/senha que é garantido pela rota /auth/login.
	permanentToken: 'db34b6ee-a6c5-4c7c-88e5-ecc70cc88e23',
};

/**
 * Armazenamento de token.
 * Usamos o localStorage para que o token persista entre recarregamentos da página.
 */
const tokenStorage = {
	save: (token) => localStorage.setItem('authToken', token),
	get: () => localStorage.getItem('authToken'),
	clear: () => localStorage.removeItem('authToken'),
};

/**
 * Realiza o login na API para obter um novo token de acesso.
 * @returns {Promise<string|null>} O novo token de acesso ou null em caso de falha.
 */
async function loginAndGetNewToken() {
	// CORREÇÃO: Utiliza a authUrlBase para a rota de login.
	const url = `${config.authUrlBase}/auth/login`;
	try {
		console.warn(
			'[API AUTENTICAÇÃO]',
			`Token expirado ou inválido. Solicitando um novo em: ${url}`
		);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(config.loginCredentials),
		});

		if (!response.ok) {
			// Tenta ler o corpo da resposta para obter detalhes do erro
			const text = await response.text();
			let body;
			try {
				body = JSON.parse(text);
			} catch (e) {
				body = text;
			}
			console.error(
				'[API AUTENTICAÇÃO] resposta de erro ao logar:',
				response.status,
				response.statusText,
				body
			);
			// Lança um erro mais detalhado incluindo o corpo retornado pela API
			throw new Error(
				`Falha na autenticação: ${response.status} ${
					response.statusText
				} - ${typeof body === 'string' ? body : JSON.stringify(body)}`
			);
		}

		const data = await response.json();

		// A resposta da sua API pode ter uma estrutura diferente.
		// Ajuste 'data.token' conforme necessário (ex: data.access_token, data.data.token, etc.)
		const newToken = data.token;

		if (newToken) {
			console.log(
				'%c[API AUTENTICAÇÃO]',
				'color: #2ecc71; font-weight: bold;',
				'Novo token obtido e salvo com sucesso!'
			);
			tokenStorage.save(newToken);
			return newToken;
		} else {
			console.error(
				'[API AUTENTICAÇÃO]',
				'A resposta da API de login não continha um token.',
				data
			);
			tokenStorage.clear();
			return null;
		}
	} catch (error) {
		console.error(
			'[API AUTENTICAÇÃO]',
			'Erro crítico ao tentar obter novo token:',
			error
		);
		tokenStorage.clear(); // Limpa token antigo se o login falhar
		// Aqui você poderia redirecionar para a página de login manual.
		return null;
	}
}

/**
 * Função genérica para realizar requisições à API, com lógica de "retry".
 * @param {string} endpoint - O endpoint a ser consultado (ex: '/products').
 * @param {boolean} isRetry - Flag para evitar loops infinitos de reautenticação.
 * @returns {Promise<any>} - A resposta da API em formato JSON.
 */
async function fetchData(endpoint, isRetry = false) {
	// Esta função continua usando a apiUrlBase, o que está correto.
	const url = `${config.apiUrlBase}${endpoint}?source=${config.source}`;
	let authToken = tokenStorage.get();

	// Se não houver token, tenta logar para obter um.
	if (!authToken && !isRetry) {
		authToken = await loginAndGetNewToken();
		if (!authToken) {
			console.error(
				`[API REAL]`,
				'Não foi possível obter um token para a requisição. A chamada foi cancelada.'
			);
			return []; // Retorna vazio para não quebrar a aplicação
		}
	}

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
				Authorization: `Bearer ${authToken}`,
			},
		});

		// Se o token expirou (Unauthorized) e ainda não tentamos logar de novo
		if (response.status === 401 && !isRetry) {
			const newToken = await loginAndGetNewToken();
			if (newToken) {
				// Tenta a requisição novamente com o novo token
				console.log(
					'[API REAL]',
					'Repetindo a requisição original com o novo token...'
				);
				return fetchData(endpoint, true); // Passa true para evitar loop
			} else {
				// Se o login falhar, não adianta continuar.
				throw new Error(
					'A reautenticação falhou. Não foi possível completar a requisição.'
				);
			}
		}

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
		console.error(
			`[API REAL]`,
			`Falha ao buscar dados do endpoint ${endpoint}:`,
			error
		);
		return []; // Retorna um array vazio em caso de erro.
	}
}

// ===================================================================================
// O restante do seu código permanece o mesmo.
// Nenhuma alteração necessária abaixo desta linha.
// ===================================================================================

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
