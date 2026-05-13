import { Switch, Route } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileMenu from '@/components/layout/MobileMenu';
import { useState, useEffect } from 'react';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <MobileMenu activeSection={activeSection} />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
