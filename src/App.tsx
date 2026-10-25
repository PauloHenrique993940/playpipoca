import { useEffect, useRef, useState } from 'react';
import { films, type Film } from './films';

type View = 'home' | 'movies' | 'series' | 'list';
const genres = ['Todos', 'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção científica', 'Animação', 'Suspense'];
const featured = [films[0], films[1], films[6]];
const titles: Record<View, string> = { home: 'O que vamos assistir hoje?', movies: 'Encontre seu próximo filme', series: 'Mais um episódio?', list: 'Sua próxima sessão começa aqui' };
const headings: Record<View, string> = { home: '↗ Em alta agora', movies: 'Explore os filmes', series: 'Séries para maratonar', list: 'Minha lista' };
const views: { value: View; label: string }[] = [{ value: 'home', label: 'Início' }, { value: 'movies', label: 'Filmes' }, { value: 'series', label: 'Séries' }, { value: 'list', label: 'Minha lista' }];
const image = (path: string, size = 'w500') => `https://image.tmdb.org/t/p/${size}${path}`;

function readSaved(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('playpipoca-list') || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((id): id is number => typeof id === 'number' && films.some(f => f.id === id)))] : [];
  } catch { return []; }
}

function playTrailer(film: Film) {
  const url = film.trailer ? `https://www.youtube.com/watch?v=${film.trailer}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(`${film.title} ${film.year} trailer oficial legendado`)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function Brand() {
  return <a className="brand" href="#" aria-label="PlayPipoca início"><span className="brand-icon">▶</span>play<span>pipoca</span><i /></a>;
}

function Metadata({ film }: { film: Film }) {
  return <div className="metadata"><b>★ {film.rating.toFixed(1)}</b><span>{film.year}</span><span className="age">{film.age}</span><span>{film.time}</span><span>{film.genre}</span></div>;
}

function MovieCard({ film, saved, onSave, onDetails }: { film: Film; saved: boolean; onSave: (id: number) => void; onDetails: (film: Film) => void }) {
  const [imageFailed, setImageFailed] = useState(false);
  return <article className="card">
    <button className="poster-button" onClick={() => onDetails(film)} aria-label={`Ver detalhes de ${film.title}`}>
      {imageFailed ? <span className="poster-fallback">{film.title}</span> : <img src={image(film.poster)} alt={`Pôster de ${film.title}`} loading="lazy" onError={() => setImageFailed(true)} />}
      <span className="rating">★ {film.rating.toFixed(1)}</span><span className="poster-play" aria-hidden="true">▶</span>
    </button>
    <div className="card-info"><div><h4>{film.title}</h4><p>{film.year} · {film.genre}</p></div><button className={`save ${saved ? 'saved' : ''}`} onClick={() => onSave(film.id)} aria-pressed={saved} aria-label={`${saved ? 'Remover' : 'Adicionar'} ${film.title} ${saved ? 'da' : 'à'} minha lista`}>{saved ? '✓' : '＋'}</button></div>
  </article>;
}

function MovieDetails({ film, saved, onSave, onClose }: { film: Film; saved: boolean; onSave: (id: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);
  return <dialog ref={dialog} aria-labelledby="detail-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="close" onClick={onClose} aria-label="Fechar detalhes" autoFocus>✕</button>
    <img className="detail-image" src={image(film.back || film.poster, 'w1280')} alt={film.title} />
    <div className="detail-content"><span className="section-kicker">{film.type === 'series' ? 'SÉRIE' : 'FILME'} · {film.genre.toUpperCase()}</span><h2 id="detail-title">{film.title}</h2><Metadata film={film} /><p>{film.description}</p><p><strong>Direção:</strong> {film.director}<br /><strong>Elenco:</strong> {film.cast}</p><div className="detail-actions"><button className="primary" onClick={() => playTrailer(film)}>▶ Assistir trailer</button><button className="secondary" onClick={() => onSave(film.id)} aria-pressed={saved}>{saved ? '✓ Na minha lista' : '＋ Minha lista'}</button></div><p className="detail-note">Trailer aberto no YouTube. Filme completo não disponível nesta versão.</p></div>
  </dialog>;
}

export default function App() {
  const [view, setView] = useState<View>('home');
  const [genre, setGenre] = useState('Todos');
  const [query, setQuery] = useState('');
  const [sortRating, setSortRating] = useState(false);
  const [saved, setSaved] = useState(readSaved);
  const [heroIndex, setHeroIndex] = useState(0);
  const [selected, setSelected] = useState<Film | null>(null);
  const [notice, setNotice] = useState('');
  const catalog = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const hero = featured[heroIndex];

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 2500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        catalog.current?.scrollIntoView({ behavior: 'smooth' });
        search.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  function toggleSave(id: number) {
    const exists = saved.includes(id);
    const next = exists ? saved.filter(value => value !== id) : [...saved, id];
    try { localStorage.setItem('playpipoca-list', JSON.stringify(next)); }
    catch { setNotice('Não foi possível salvar neste navegador.'); return; }
    setSaved(next);
    setNotice(exists ? 'Filme removido da sua lista.' : 'Adicionado à sua lista. Prepare a pipoca!');
  }

  function changeView(next: View) {
    setView(next);
    catalog.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  const results = films.filter(film =>
    (view !== 'series' || film.type === 'series') &&
    (view !== 'movies' || film.type !== 'series') &&
    (view !== 'list' || saved.includes(film.id)) &&
    (genre === 'Todos' || film.genre === genre || (genre === 'Aventura' && [1, 2, 5, 12].includes(film.id))) &&
    `${film.title} ${film.genre} ${film.director}`.toLocaleLowerCase('pt-BR').includes(normalizedQuery));
  if (sortRating) results.sort((a, b) => b.rating - a.rating);

  return <>
    <header><Brand /><nav aria-label="Principal">{views.map(item => <button key={item.value} className={`nav ${view === item.value ? 'active' : ''}`} data-view={item.value} aria-current={view === item.value ? 'page' : undefined} onClick={() => changeView(item.value)}>{item.label}{item.value === 'list' && <small>{saved.length}</small>}</button>)}</nav><div className="header-right"><button className="search-toggle" aria-label="Buscar filmes" onClick={() => { catalog.current?.scrollIntoView({ behavior: 'smooth' }); search.current?.focus({ preventScroll: true }); }}>⌕</button><span className="divider" /><button className="avatar" aria-label="Preferências do perfil" onClick={() => setNotice('Perfil local • Sua lista fica salva neste navegador.')}>P</button></div></header>
    <main><section className="hero" style={{ backgroundImage: `url(${image(hero.back || hero.poster, 'original')})` }}><div className="hero-shade" /><div className="hero-content"><div className="eyebrow"><span /> O CINEMA É AQUI</div><p className="hero-kicker">UMA EXPERIÊNCIA DE OUTRO MUNDO</p><h1>{hero.title.toUpperCase()}</h1><Metadata film={hero} /><p className="hero-description">{heroIndex === 0 ? <>O amor é a única coisa que transcende o tempo e o espaço.<br />Embarque em uma jornada além dos limites do universo.</> : hero.description}</p><div className="hero-actions"><button className="primary" onClick={() => playTrailer(hero)}>▶ <span>Assistir trailer</span></button><button className="secondary" onClick={() => setSelected(hero)}>ⓘ <span>Mais informações</span></button><button className="circle" onClick={() => toggleSave(hero.id)} aria-pressed={saved.includes(hero.id)} aria-label={saved.includes(hero.id) ? 'Remover da minha lista' : 'Adicionar à minha lista'}>{saved.includes(hero.id) ? '✓' : '＋'}</button></div><div className="hero-bottom"><span className="feature-tag">DESTAQUE DA SEMANA</span><span className="slide-counter"><b>{String(heroIndex + 1).padStart(2, '0')}</b> / 03 <button onClick={() => setHeroIndex(index => (index + featured.length - 1) % featured.length)} aria-label="Destaque anterior">←</button><button onClick={() => setHeroIndex(index => (index + 1) % featured.length)} aria-label="Próximo destaque">→</button></span></div></div><div className="vertical-note">HISTÓRIAS QUE FICAM COM VOCÊ</div></section>
      <section className="catalog" ref={catalog}><div className="discovery"><div><span className="section-kicker">ESCOLHA A SUA PRÓXIMA HISTÓRIA</span><h2>{titles[view]}</h2></div><label className="searchbox"><span>⌕</span><input ref={search} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar filmes, séries..." aria-label="Buscar por título ou gênero" /><kbd>⌘ K</kbd></label></div><div className="filter-row"><div className="filters" aria-label="Gêneros">{genres.map(item => <button key={item} className={genre === item ? 'active' : ''} aria-pressed={genre === item} onClick={() => setGenre(item)}>{item}</button>)}</div><button className="sort" onClick={() => setSortRating(value => !value)}>↕ {sortRating ? 'Melhor avaliação' : 'Mais populares'}</button></div><div className="section-heading"><h3>{headings[view]}</h3><span id="result-count" aria-live="polite">{results.length} títulos</span></div><div className="grid">{results.map(film => <MovieCard key={film.id} film={film} saved={saved.includes(film.id)} onSave={toggleSave} onDetails={setSelected} />)}</div>{results.length === 0 && <div className="empty"><h3>Nenhuma história por aqui ainda</h3><p>{view === 'list' ? 'Salve filmes no botão + para montar sua próxima sessão.' : 'Tente outro título ou gênero.'}</p><button className="secondary" onClick={() => { setView('home'); setGenre('Todos'); setQuery(''); }}>Explorar catálogo</button></div>}<section className="editorial"><div><span className="section-kicker">PREPARE A PIPOCA</span><h2>Uma boa história muda a sua noite.</h2><p>Dos grandes clássicos às novas descobertas. Seu próximo favorito está aqui.</p></div></section></section>
    </main><footer><Brand /><p>Para quem vive boas histórias.</p><span>Catálogo demonstrativo · Trailers no YouTube</span></footer>
    {selected && <MovieDetails key={selected.id} film={selected} saved={saved.includes(selected.id)} onSave={toggleSave} onClose={() => setSelected(null)} />}
    <div className={`toast ${notice ? 'show' : ''}`} role="status">{notice}</div>
  </>;
}
