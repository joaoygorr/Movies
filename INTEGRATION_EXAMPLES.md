# Exemplos de Integração - Validadores e Melhorias Implementadas

## 1. Integração de Validadores Zod na API

### Exemplo: Validação em Método da API

```typescript
import { safeValidateMovieList, IResponse, IListMovie } from '@/shared/validators/validators';

class Api {
    async listMovie(url: string, signal?: AbortSignal): Promise<IResponse<IListMovie[]>> {
        const data = await this.getRequest<IResponse<IListMovie[]>>(url, signal);
        
        // Validar response
        const result = safeValidateMovieList(data);
        if (!result.success) {
            console.error('Movie list validation failed:', result.error);
            throw new Error('Invalid movie list data received from API');
        }
        
        return result.data;
    }
}
```

---

## 2. Validação em Custom Hook

```typescript
import { useRef, useState, useEffect } from 'react';
import { safeValidateTVShowList } from '@/shared/validators/validators';

export function useFetchTVShows(url: string) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                
                // Validar antes de usar
                const result = safeValidateTVShowList(json);
                if (!result.success) {
                    throw new Error('Invalid TV show data');
                }
                
                setData(result.data);
            } catch (err) {
                setError(err);
            }
        };
        
        fetchData();
    }, [url]);
    
    return { data, error };
}
```

---

## 3. Error Boundary com Fallback UI

```tsx
import { ErrorBoundary } from '@/shared/components/errorBoundary/ErrorBoundary';

export default function MovieContainer() {
    return (
        <ErrorBoundary>
            <div className="movie-container">
                {data.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </ErrorBoundary>
    );
}

// Quando um erro ocorre dentro do ErrorBoundary,
// a UI de erro aparecerá automaticamente com botões
// "Recarregar Página" e "Voltar"
```

---

## 4. Lazy Loading de Páginas

```typescript
import { createLazyComponent } from '@/shared/utils/lazyLoad';

// Lazy load a página de detalhes do filme
const MovieDetailsPage = createLazyComponent(
    () => import('@/app/movie/[id]/page')
);

// Uso em rota dinâmica
// Enquanto a página carrega, o skeleton loading aparecerá
// automaticamente via Suspense
```

### Com Fallback Customizado

```typescript
import { createLazyComponentWithCustomFallback } from '@/shared/utils/lazyLoad';

const CustomLoader = () => (
    <div className="custom-loader">
        <div className="spinner">Carregando detalhes...</div>
    </div>
);

const MovieDetailsPageCustom = createLazyComponentWithCustomFallback(
    () => import('@/app/movie/[id]/page'),
    <CustomLoader />
);
```

---

## 5. SSR/SSG - Server-Side Rendering e Static Generation

### Exemplo: Server Component com Data Fetching

```typescript
// app/movie/page.tsx - Server Component
import { Suspense } from "react";
import MovieClient from "./MovieClient";

// Server component for SSR
async function getServerSideData(route: string = "/now_playing", page: number = 1) {
    try {
        const [moviesResponse, genresResponse] = await Promise.all([
            movieApi.listMovie(`${route}?page=${page}`),
            genreApi.findAllGenre("/movie/list")
        ]);

        return {
            movies: moviesResponse,
            genres: genresResponse
        };
    } catch (error) {
        console.error("Error fetching server data:", error);
        return {
            movies: { results: [], total_pages: 0, page: 1, total_results: 0 },
            genres: { genres: [] }
        };
    }
}

export default async function PageMovies() {
    // Fetch initial data on server
    const initialData = await getServerSideData();

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <MovieClient initialData={initialData} />
            </Suspense>
        </main>
    );
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
```

### Exemplo: Client Component para Interatividade

```typescript
// app/movie/MovieClient.tsx - Client Component
"use client";
import { useEffect, useMemo, useState } from "react";
import { movieApi, genreApi } from "../../shared/api/api";

type MovieClientProps = {
    initialData: Movies;
};

export default function MovieClient({ initialData }: MovieClientProps) {
    const [activeRoute, setActiveRoute] = useState<string>("/now_playing");
    const [items, setItems] = useState<IListMovie[]>(initialData.movies.results.slice(0, 10));
    
    // Client-side data fetching for interactions
    const apiCalls = useMemo(() => [
        {
            key: "movies",
            call: (signal?: AbortSignal) => movieApi.listMovie(`${activeRoute}?page=${page}`, signal)
        }
    ], [activeRoute, page]);

    const { data, loading } = useFetchData<Movies>(apiCalls);
    
    // ... rest of interactive logic
}
```

### Benefícios da Implementação:
- **SEO Melhorado**: Conteúdo pré-renderizado é indexado pelos motores de busca
- **Performance Inicial**: Dados carregados no servidor, reduzindo tempo de carregamento
- **ISR**: Páginas atualizadas automaticamente sem rebuild completo
- **Hidratação**: Interatividade mantida com React no cliente

---

## 6. Memoização de Componentes Custom

```typescript
import { memo } from 'react';
import { IListMovie } from '@/shared/interfaces';

interface MovieCardProps {
    movie: IListMovie;
    genre: string;
}

const MovieCardComponent = ({ movie, genre }: MovieCardProps) => {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p className="genre">{genre}</p>
            <p className="rating">⭐ {movie.vote_average}</p>
        </div>
    );
};

// Exportar com memo para evitar re-renders
export const MovieCard = memo(MovieCardComponent);
```

---

## 6. ARIA Labels para Acessibilidade

```tsx
import { ARIA_LABELS } from '@/shared/utils/ariaLabels';

export function SearchBar() {
    return (
        <div className="search-container" role="search">
            <input
                type="text"
                placeholder="Buscar filmes e séries..."
                aria-label={ARIA_LABELS.SEARCH_INPUT}
            />
            <button 
                aria-label={ARIA_LABELS.SEARCH_BUTTON}
                onClick={handleSearch}
            >
                Buscar
            </button>
        </div>
    );
}
```

---

## 7. PWA - Verificar Instalação

```typescript
// Detectar quando PWA pode ser instalada
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

async function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
    }
}
```

---

**Data:** April 18, 2026
/**
 * Exemplo de Integração: Como Usar Validadores Zod na API
 * 
 * Este arquivo demonstra como integrar validadores Zod em métodos da API
 * para garantir type-safety nas respostas do TMDB.
 */

import { safeValidateMovieList, safeValidateTVShowList, safeValidateActorDetails } from '@/shared/validators/validators';

// Exemplo 1: Validação em Método da API
/*
class Api {
    async listMovie(url: string, signal?: AbortSignal): Promise<IResponse<IListMovie[]>> {
        const data = await this.getRequest<IResponse<IListMovie[]>>(url, signal);
        
        // Validar response
        const result = safeValidateMovieList(data);
        if (!result.success) {
            console.error('Movie list validation failed:', result.error);
            throw new Error('Invalid movie list data received from API');
        }
        
        return result.data;
    }
}
*/

// Exemplo 2: Validação em Hook
/*
import { useRef, useState, useEffect } from 'react';
import { safeValidateTVShowList } from '@/shared/validators/validators';

export function useFetchTVShows(url: string) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                
                // Validar antes de usar
                const result = safeValidateTVShowList(json);
                if (!result.success) {
                    throw new Error('Invalid TV show data');
                }
                
                setData(result.data);
            } catch (err) {
                setError(err);
            }
        };
        
        fetchData();
    }, [url]);
    
    return { data, error };
}
*/

// Exemplo 3: Error Boundary com Fallback UI
/*
<ErrorBoundary>
    <div className="movie-container">
        {data.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
</ErrorBoundary>

// Quando um erro ocorre dentro do ErrorBoundary,
// a UI de erro aparecerá automaticamente
*/

// Exemplo 4: Lazy Loading de Páginas
/*
import { createLazyComponent } from '@/shared/utils/lazyLoad';

// No arquivo de rotas ou configuração
const MovieDetailsPage = createLazyComponent(
    () => import('@/app/movie/[id]/page')
);

// Uso em rota dinâmica
// Enquanto a página carrega, o skeleton loading aparecerá
*/

// Exemplo 5: Memoização de Componentes Custom
/*
import { memo } from 'react';

interface MovieCardProps {
    movie: IListMovie;
    genre: string;
}

const MovieCardComponent = ({ movie, genre }: MovieCardProps) => {
    // Component logic here
    return (
        <div className="movie-card">
            {/* ... */}
        </div>
    );
};

export const MovieCard = memo(MovieCardComponent);
*/

// Exemplo 6: ARIA Labels em Componentes
/*
import { ARIA_LABELS } from '@/shared/utils/ariaLabels';

export function SearchBar() {
    return (
        <div className="search-container" aria-label={ARIA_LABELS.SEARCH_INPUT}>
            <input
                type="text"
                placeholder="Buscar filmes..."
                aria-label={ARIA_LABELS.SEARCH_INPUT}
            />
            <button aria-label={ARIA_LABELS.SEARCH_BUTTON}>
                Buscar
            </button>
        </div>
    );
}
*/

// Exemplo 7: PWA - Verificar se está instalável
/*
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar botão de instalar
    showInstallPrompt();
});

async function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        deferredPrompt = null;
    }
}
*/

// Exemplo 8: Integração Completa em Página
/*
'use client';

import { ErrorBoundary } from '@/shared/components/errorBoundary/ErrorBoundary';
import { useEffect, useState } from 'react';
import { safeValidateMovieList } from '@/shared/validators/validators';
import { ARIA_LABELS } from '@/shared/utils/ariaLabels';
import { movieApi } from '@/shared/api/api';

export default function MoviePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await movieApi.listMovie('/popular?page=1');
                
                // Validar dados
                const result = safeValidateMovieList(data);
                if (!result.success) {
                    throw new Error('Invalid movie data');
                }
                
                setMovies(result.data.results);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchMovies();
    }, []);
    
    return (
        <ErrorBoundary>
            <div className="movies-container" aria-label={ARIA_LABELS.MOVIE_CARD}>
                {loading ? (
                    <div>Carregando...</div>
                ) : (
                    <div className="movies-grid">
                        {movies.map(movie => (
                            <a
                                key={movie.id}
                                href={`/movie/${movie.id}`}
                                aria-label={ARIA_LABELS.MOVIE_LINK(movie.title)}
                            >
                                <h2>{movie.title}</h2>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
}
*/

export { };
