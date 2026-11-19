import {StrictMode, type ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import {Shell} from './components/Shell';
import type {PageId} from './content';
import {About} from './pages/About';
import {Contact} from './pages/Contact';
import {Gallery} from './pages/Gallery';
import {Home} from './pages/Home';
import {Projects} from './pages/Projects';
import {Services} from './pages/Services';
import './index.css';

// The scroll-driven heroes depend on scroll position; always start at the top.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const pages: Record<PageId, ComponentType> = {home: Home, about: About, services: Services, projects: Projects, gallery: Gallery, contact: Contact};
const id = (document.body.dataset.page as PageId) in pages ? (document.body.dataset.page as PageId) : 'home';
const Page = pages[id];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Shell page={id}>
      <Page />
    </Shell>
  </StrictMode>,
);
