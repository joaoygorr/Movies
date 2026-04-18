// ARIA labels and accessibility helpers
export const ARIA_LABELS = {
    // Navigation
    HEADER_NAV: 'Navegação principal',
    LANGUAGE_SWITCHER: 'Seletor de idioma',
    MENU_BUTTON: 'Menu de navegação',
    
    // Search
    SEARCH_INPUT: 'Campo de busca de filmes e séries',
    SEARCH_BUTTON: 'Enviar busca',
    SEARCH_RESULTS: 'Resultados da busca',
    
    // Movies/Shows
    MOVIE_CARD: 'Cartão de filme',
    TVSHOW_CARD: 'Cartão de série',
    MOVIE_POSTER: 'Pôster do filme',
    TVSHOW_POSTER: 'Pôster da série',
    
    // Cast
    CAST_SLIDER: 'Carrossel de elenco',
    CAST_IMAGE: 'Foto do ator/atriz',
    ACTOR_CARD: 'Cartão do ator/atriz',
    
    // Pagination
    PAGINATION: 'Paginação de resultados',
    PREVIOUS_PAGE: 'Página anterior',
    NEXT_PAGE: 'Próxima página',
    PAGE_BUTTON: (page: number) => `Ir para página ${page}`,
    
    // Buttons
    LOAD_MORE: 'Carregar mais resultados',
    BACK_BUTTON: 'Voltar',
    CLOSE_BUTTON: 'Fechar',
    
    // Links
    MOVIE_LINK: (title: string) => `Ver detalhes do filme ${title}`,
    TVSHOW_LINK: (title: string) => `Ver detalhes da série ${title}`,
    ACTOR_LINK: (name: string) => `Ver perfil de ${name}`,
    
    // Images
    MISSING_IMAGE: 'Imagem não disponível',
    BACKDROP_IMAGE: (title: string) => `Imagem de fundo de ${title}`,
    
    // Loading
    LOADING_SKELETON: 'Carregando conteúdo...',
    LOADING_SPINNER: 'Carregando...',
    
    // Error
    ERROR_MESSAGE: 'Mensagem de erro',
    RETRY_BUTTON: 'Tentar novamente',
    
    // Modal
    MODAL_DIALOG: 'Diálogo modal',
    MODAL_CLOSE: 'Fechar diálogo',
};

export default ARIA_LABELS;
