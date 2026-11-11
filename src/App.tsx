import React, { useState, useEffect } from 'react';
import { WcaProvider, useWca } from './context/WcaContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NotificationToast } from './components/common/NotificationToast';

// Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { AdministrationPage } from './components/pages/AdministrationPage';
import { PlayersPage } from './components/pages/PlayersPage';
import { ClubsPage } from './components/pages/ClubsPage';
import { TournamentsPage } from './components/pages/TournamentsPage';
import { MatchCentrePage } from './components/pages/MatchCentrePage';
import { RankingsPage } from './components/pages/RankingsPage';
import { NewsPage } from './components/pages/NewsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { DocumentsPage } from './components/pages/DocumentsPage';
import { ContactPage } from './components/pages/ContactPage';
import { PlayerRegistrationPage } from './components/pages/PlayerRegistrationPage';
import { ClubRegistrationPage } from './components/pages/ClubRegistrationPage';
import { OfficialRegistrationPage } from './components/pages/OfficialRegistrationPage';
import { VerifyPlayerPage } from './components/pages/VerifyPlayerPage';

// Admin
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';

const WcaApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | undefined>(undefined);
  const [selectedNewsId, setSelectedNewsId] = useState<string | undefined>(undefined);
  const [verifyId, setVerifyId] = useState<string>('');

  // Handle URL hash routing (e.g. #verify/WCA-PL-2026-001)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#verify/')) {
        const id = hash.replace('#verify/', '');
        setVerifyId(id);
        setCurrentTab('verify');
      } else if (hash === '#admin') {
        setCurrentTab('admin');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewPlayer = (playerId: string) => {
    setSelectedPlayerId(playerId);
    setCurrentTab('players');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNews = (newsId: string) => {
    setSelectedNewsId(newsId);
    setCurrentTab('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in dedicated Admin Panel view
  if (currentTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col">
        <NotificationToast />
        <AdminDashboard onBackToSite={() => handleSelectTab('home')} />
      </div>
    );
  }

  // If in public verification page
  if (currentTab === 'verify') {
    return (
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
        <NotificationToast />
        <VerifyPlayerPage
          initialPlayerId={verifyId}
          onBack={() => {
            window.location.hash = '';
            handleSelectTab('home');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      {/* Toast notifications */}
      <NotificationToast />

      {/* Primary Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenPlayerRegister={() => handleSelectTab('register-player')}
        onOpenClubRegister={() => handleSelectTab('register-club')}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={handleSelectTab}
            onOpenPlayerRegister={() => handleSelectTab('register-player')}
            onOpenClubRegister={() => handleSelectTab('register-club')}
            onViewPlayer={handleViewPlayer}
            onSelectNews={handleSelectNews}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage onExploreTournaments={() => handleSelectTab('tournaments')} />
        )}

        {currentTab === 'administration' && (
          <AdministrationPage onOpenAdminLogin={() => setShowAdminLogin(true)} />
        )}

        {currentTab === 'players' && (
          <PlayersPage
            selectedPlayerId={selectedPlayerId}
            onClearSelectedPlayer={() => setSelectedPlayerId(undefined)}
            onOpenRegister={() => handleSelectTab('register-player')}
          />
        )}

        {currentTab === 'clubs' && (
          <ClubsPage
            onOpenClubRegister={() => handleSelectTab('register-club')}
            onViewPlayer={handleViewPlayer}
          />
        )}

        {currentTab === 'tournaments' && (
          <TournamentsPage
            onSelectMatchCentre={() => handleSelectTab('matches')}
            onOpenClubRegister={() => handleSelectTab('register-club')}
          />
        )}

        {currentTab === 'matches' && <MatchCentrePage />}

        {currentTab === 'rankings' && (
          <RankingsPage onViewPlayer={handleViewPlayer} />
        )}

        {currentTab === 'news' && (
          <NewsPage initialArticleId={selectedNewsId} />
        )}

        {currentTab === 'gallery' && <GalleryPage />}

        {currentTab === 'documents' && <DocumentsPage />}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'register-player' && (
          <PlayerRegistrationPage
            initialMode="register"
            onViewPlayer={handleViewPlayer}
          />
        )}

        {currentTab === 'track-application' && (
          <PlayerRegistrationPage
            initialMode="track"
            onViewPlayer={handleViewPlayer}
          />
        )}

        {currentTab === 'register-club' && (
          <ClubRegistrationPage onSuccessRedirect={() => handleSelectTab('clubs')} />
        )}

        {currentTab === 'register-official' && (
          <OfficialRegistrationPage onClose={() => handleSelectTab('home')} />
        )}
      </main>

      {/* Official Association Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenPlayerRegister={() => handleSelectTab('register-player')}
        onOpenClubRegister={() => handleSelectTab('register-club')}
        onOpenOfficialRegister={() => handleSelectTab('register-official')}
      />

      {/* Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={() => handleSelectTab('admin')}
      />
    </div>
  );
};

export default function App() {
  return (
    <WcaProvider>
      <WcaApp />
    </WcaProvider>
  );
}
