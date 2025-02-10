import { useState } from 'react';
import usePageStore from './stores/pagesStore';
import Header from './ui/Header/Header';
import './App.css';

function App() {
  const { currentPage, setPage, pages } = usePageStore();

  const CurrentComponent = pages.find(page => page.id === currentPage)?.component;

  return (
    <div>
      {/* Header */}
      <Header currentPage={currentPage} setPage={setPage} pages={pages} />

      {/* Content */}
      <main style={{ paddingTop: '20px' }}>
        {CurrentComponent && <CurrentComponent />}
      </main>
    </div>
  );
}

export default App;