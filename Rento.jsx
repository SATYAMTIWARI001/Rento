import React, { useState, useMemo, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Search, MapPin, Star, Heart, ChevronRight, ChevronLeft, Check,
  Camera, Bike, Gamepad2, Tent, Wrench, Music2, Sofa, BookOpen,
  Car, PartyPopper, Cpu, ShieldCheck, ArrowUpRight, Bell, MessageSquare,
  LayoutGrid, Calendar as CalendarIcon, Wallet, Heart as HeartIcon, User, Menu, X, Plus,
  ImageOff, Eye, Edit3, Pause, Play, AlertCircle, Clock, Trash2, ShieldAlert, CheckCircle2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid
} from "recharts";

import {
  CATEGORIES, INITIAL_LISTINGS, INITIAL_NOTIFICATIONS, INITIAL_REQUESTS,
  EARNINGS_DATA, money, loadFromStorage, saveToStorage, checkBookingConflict
} from "./rentoData.js";
import ListingWizard from "./ListingWizard.jsx";
import AdminPortal from "./AdminPortal.jsx";
import AvailabilityModal from "./AvailabilityModal.jsx";
import { CSS } from "./rentoStyles.js";

/* ---------------------------------- TOASTS ---------------------------------- */

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, tone = "default") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={"toast" + (t.tone === "success" ? " toast-success" : "")}>
            {t.tone === "success" && <Check size={14} />}
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------------------------------- SMART IMAGE ---------------------------------- */

function SmartImage({ src, alt, className }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (errored || !src) {
    return (
      <div className={(className || "") + " img-fallback"}>
        <ImageOff size={22} strokeWidth={1.4} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className={(className || "") + (loaded ? " img-loaded" : " img-loading")}
      onLoad={() => setLoaded(true)}
      onError={() => setErrored(true)}
    />
  );
}

/* ---------------------------------- REVEAL ON SCROLL ---------------------------------- */

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.18, rootMargin: "-12% 0px -12% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={"reveal" + (visible ? " reveal-in" : "") + (className ? " " + className : "")}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- ANIMATED NUMBER ---------------------------------- */

function AnimatedNumber({ value, format }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const duration = 650;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{format ? format(display) : display}</>;
}

/* ---------------------------------- MOTION TILT ---------------------------------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const migrateDefaultUser = (value) => (Array.isArray(value) ? value.map((item) => {
  if (item.ownerId === "user_aditya") {
    return {
      ...item,
      owner: "SATYAM",
      ownerId: "user_satyam",
      approvalHistory: (item.approvalHistory || []).map((entry) =>
        entry.by === "Aditya R." ? { ...entry, by: "SATYAM" } : entry
      )
    };
  }
  if (item.renter === "Aditya R. (You)") return { ...item, renter: "SATYAM (You)" };
  return item;
}) : value);

const mergeInitialListings = (storedListings) => {
  const saved = migrateDefaultUser(storedListings);
  if (!Array.isArray(saved)) return INITIAL_LISTINGS;
  const savedIds = new Set(saved.map((item) => item.id));
  const refreshed = saved.map((item) => {
    if (item.id !== 3 && item.id !== 16) return item;
    const latest = INITIAL_LISTINGS.find((listing) => listing.id === item.id);
    return latest ? { ...item, img: latest.img, images: latest.images } : item;
  });
  return [...refreshed, ...INITIAL_LISTINGS.filter((item) => !savedIds.has(item.id))];
};

function useTilt(maxDeg = 6) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const raf = useRef(null);

  const onMouseMove = (e) => {
    if (isTouchDevice || prefersReducedMotion() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setStyle({
        transform: `perspective(900px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg) scale3d(1.012,1.012,1.012)`,
        transitionDuration: "60ms",
      });
    });
  };
  const onMouseLeave = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)", transitionDuration: "300ms" });
  };
  return { ref, style, onMouseMove, onMouseLeave };
}

/* ---------------------------------- AMBIENT BACKGROUND ---------------------------------- */

function AmbientBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h;
    const count = prefersReducedMotion() ? 0 : 28;
    const dots = Array.from({ length: count }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.3,
      vx: (Math.random() - 0.5) * 0.0001,
      vy: (Math.random() - 0.5) * 0.0001,
      o: 0.06 + Math.random() * 0.12,
    }));

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0;
        if (d.y < 0) d.y = 1; if (d.y > 1) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(194,149,79,${d.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="ambient-bg" aria-hidden="true" />;
}

/* ---------------------------------- ROOT COMPONENT ---------------------------------- */

export default function Rento() {
  const [route, setRoute] = useState({ page: "home" });

  // Persistence in LocalStorage
  const [listings, setListings] = useState(() => mergeInitialListings(loadFromStorage("rento_listings_v1", INITIAL_LISTINGS)));
  const [requests, setRequests] = useState(() => migrateDefaultUser(loadFromStorage("rento_requests_v1", INITIAL_REQUESTS)));
  const [notifications, setNotifications] = useState(() => loadFromStorage("rento_notifs_v1", INITIAL_NOTIFICATIONS));
  const [favorites, setFavorites] = useState(() => new Set(loadFromStorage("rento_favs_v1", [2, 4])));

  // Modal states
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardEditItem, setWizardEditItem] = useState(null);
  const [availModalItem, setAvailModalItem] = useState(null);

  // Sync to localStorage
  useEffect(() => saveToStorage("rento_listings_v1", listings), [listings]);
  useEffect(() => saveToStorage("rento_requests_v1", requests), [requests]);
  useEffect(() => saveToStorage("rento_notifs_v1", notifications), [notifications]);
  useEffect(() => saveToStorage("rento_favs_v1", Array.from(favorites)), [favorites]);

  const goTo = (page, params = {}) => {
    setRoute({ page, ...params });
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const toggleFav = (id, toastFn, title) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      const willAdd = !next.has(id);
      willAdd ? next.add(id) : next.delete(id);
      toastFn?.(willAdd ? `Saved "${title}" to favorites` : `Removed "${title}" from favorites`, "success");
      return next;
    });

  // Listing Handlers
  const handleSaveListing = (savedItem) => {
    setListings((prev) => {
      const exists = prev.some(l => l.id === savedItem.id);
      if (exists) {
        return prev.map(l => l.id === savedItem.id ? savedItem : l);
      }
      return [savedItem, ...prev];
    });

    // Notify owner
    const newNotif = {
      id: "notif_" + Date.now(),
      title: "Listing Submitted for Verification",
      message: `"${savedItem.title}" was submitted and is under review by our safety team.`,
      time: "Just now",
      read: false,
      type: "pending"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleApproveListing = (id, note = "Approved by admin") => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: "PUBLISHED",
          approvalHistory: [
            ...(item.approvalHistory || []),
            {
              date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
              action: "APPROVED",
              by: "Admin (Siddharth K.)",
              note
            }
          ]
        };
      }
      return item;
    }));

    const target = listings.find(l => l.id === id);
    if (target) {
      setNotifications(prev => [
        {
          id: "notif_" + Date.now(),
          title: "Listing Approved & Live!",
          message: `Your listing "${target.title}" was approved and is now active for renters.`,
          time: "Just now",
          read: false,
          type: "success"
        },
        ...prev
      ]);
    }
  };

  const handleRejectListing = (id, reason) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: "REJECTED",
          rejectionReason: reason,
          approvalHistory: [
            ...(item.approvalHistory || []),
            {
              date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
              action: "REJECTED",
              by: "Admin (Siddharth K.)",
              note: reason
            }
          ]
        };
      }
      return item;
    }));

    const target = listings.find(l => l.id === id);
    if (target) {
      setNotifications(prev => [
        {
          id: "notif_" + Date.now(),
          title: "Listing Requires Updates",
          message: `"${target.title}" was not approved. Reason: ${reason}`,
          time: "Just now",
          read: false,
          type: "rejected"
        },
        ...prev
      ]);
    }
  };

  const handleTogglePause = (id, toastFn) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === "PAUSED" ? "PUBLISHED" : "PAUSED";
        toastFn?.(nextStatus === "PAUSED" ? `Listing "${item.title}" paused` : `Listing "${item.title}" resumed`, "success");
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleDeleteListing = (id, toastFn) => {
    if (window.confirm("Are you sure you want to permanently delete this listing?")) {
      setListings(prev => prev.filter(l => l.id !== id));
      toastFn?.("Listing deleted", "default");
    }
  };

  const handleSaveAvailability = (id, blockedDates) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, blockedDates };
      }
      return item;
    }));
  };

  // Booking & Request Handlers
  const handleCreateRentalRequest = (listingId, bookingData, toastFn) => {
    const targetListing = listings.find(l => l.id === listingId);
    if (!targetListing) return { success: false, message: "Listing not found" };

    // Check conflict
    const conflict = checkBookingConflict(targetListing, bookingData.startDate, bookingData.endDate);
    if (conflict.hasConflict) {
      return { success: false, message: conflict.reason };
    }

    const isInstant = targetListing.approvalMode === "instant";
    const newBookingId = "b_" + Date.now();
    const newBooking = {
      id: newBookingId,
      renter: "SATYAM (You)",
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      days: bookingData.days,
      total: bookingData.total,
      status: isInstant ? "Confirmed" : "Pending",
      handoverOwnerConfirmed: false,
      handoverRenterConfirmed: false
    };

    // Update listing's bookings
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        return {
          ...l,
          bookings: [...(l.bookings || []), newBooking]
        };
      }
      return l;
    }));

    // Add to requests list
    const newReq = {
      id: newBookingId,
      listingId,
      item: targetListing.title,
      renter: "SATYAM (You)",
      dates: `${bookingData.startDate} – ${bookingData.endDate}`,
      status: isInstant ? "Confirmed" : "Pending",
      handoverOwnerConfirmed: false,
      handoverRenterConfirmed: false
    };
    setRequests(prev => [newReq, ...prev]);

    // Send notification
    setNotifications(prev => [
      {
        id: "notif_" + Date.now(),
        title: isInstant ? "Booking Confirmed!" : "Rental Request Sent",
        message: isInstant
          ? `Your rental for "${targetListing.title}" is confirmed instantly!`
          : `Request sent to ${targetListing.owner} for "${targetListing.title}".`,
        time: "Just now",
        read: false,
        type: "request"
      },
      ...prev
    ]);

    toastFn?.(isInstant ? "Booking Confirmed Instantly!" : `Request sent to ${targetListing.owner}`, "success");
    return { success: true };
  };

  const handleUpdateRequestStatus = (requestId, newStatus, toastFn) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: newStatus } : r));
    // Also sync to corresponding listing booking
    setListings(prev => prev.map(l => {
      const hasBooking = (l.bookings || []).some(b => b.id === requestId);
      if (!hasBooking) return l;
      return {
        ...l,
        bookings: l.bookings.map(b => b.id === requestId ? { ...b, status: newStatus } : b)
      };
    }));
    toastFn?.(`Rental request ${newStatus.toLowerCase()}`, "success");
  };

  const handleToggleHandover = (requestId, party, toastFn) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const next = {
          ...r,
          [party === "owner" ? "handoverOwnerConfirmed" : "handoverRenterConfirmed"]: !r[party === "owner" ? "handoverOwnerConfirmed" : "handoverRenterConfirmed"]
        };
        toastFn?.(`Condition signed off by ${party}`, "success");
        return next;
      }
      return r;
    }));
  };

  const handleCompleteRental = (requestId, toastFn) => {
    handleUpdateRequestStatus(requestId, "Completed", toastFn);
    toastFn?.("Rental completed! Deposit marked for return.", "success");
  };

  return (
    <ToastProvider>
      <div className="rento-root">
        <style>{CSS}</style>
        <AmbientBackground />

        {/* TOP NAVIGATION BAR */}
        <NavBar
          route={route}
          goTo={goTo}
          notifications={notifications}
          onClearNotifications={() => setNotifications([])}
          onOpenWizard={() => { setWizardEditItem(null); setWizardOpen(true); }}
        />

        {/* ROUTE PAGES */}
        <div key={route.page + (route.id || "")} className="page-transition">
          {route.page === "home" && (
            <Home
              goTo={goTo}
              favorites={favorites}
              toggleFav={toggleFav}
              listings={listings}
              onOpenWizard={() => { setWizardEditItem(null); setWizardOpen(true); }}
            />
          )}

          {route.page === "explore" && (
            <Explore
              goTo={goTo}
              favorites={favorites}
              toggleFav={toggleFav}
              listings={listings}
              initialCategory={route.category}
              initialQuery={route.q}
            />
          )}

          {route.page === "product" && (
            <ProductPage
              id={route.id}
              goTo={goTo}
              favorites={favorites}
              toggleFav={toggleFav}
              listings={listings}
              onCreateRentalRequest={handleCreateRentalRequest}
            />
          )}

          {route.page === "dashboard" && (
            <Dashboard
              goTo={goTo}
              favorites={favorites}
              listings={listings}
              requests={requests}
              initialTab={route.tab || "overview"}
              onOpenWizard={(editItem = null) => {
                setWizardEditItem(editItem);
                setWizardOpen(true);
              }}
              onTogglePause={handleTogglePause}
              onDeleteListing={handleDeleteListing}
              onManageAvailability={(item) => setAvailModalItem(item)}
              onApproveListing={handleApproveListing}
              onRejectListing={handleRejectListing}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onToggleHandover={handleToggleHandover}
              onCompleteRental={handleCompleteRental}
            />
          )}
        </div>

        {/* WIZARD MODAL */}
        <ListingWizard
          isOpen={wizardOpen}
          onClose={() => { setWizardOpen(false); setWizardEditItem(null); }}
          onSaveListing={handleSaveListing}
          initialData={wizardEditItem}
          isEditMode={!!wizardEditItem}
        />

        {/* AVAILABILITY MODAL */}
        <AvailabilityModal
          isOpen={!!availModalItem}
          onClose={() => setAvailModalItem(null)}
          listing={availModalItem}
          onSaveAvailability={handleSaveAvailability}
        />

        <Footer onOpenWizard={() => { setWizardEditItem(null); setWizardOpen(true); }} goTo={goTo} />
      </div>
    </ToastProvider>
  );
}

/* ---------------------------------- NAV BAR ---------------------------------- */

function NavBar({ route, goTo, notifications, onClearNotifications, onOpenWizard }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const linkRefs = useRef(new Map());
  const containerRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const unreadCount = notifications.filter(n => !n.read).length;

  const links = [
    { key: "home", label: "Home" },
    { key: "explore", label: "Explore" },
    { key: "dashboard", label: "Dashboard" }
  ];

  useEffect(() => {
    const el = linkRefs.current.get(route.page);
    if (el && containerRef.current) {
      const containerBox = containerRef.current.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      setIndicator({ left: box.left - containerBox.left, width: box.width, opacity: 1 });
    } else {
      setIndicator((s) => ({ ...s, opacity: 0 }));
    }
  }, [route.page]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="brand" onClick={() => goTo("home")}>
          <span className="brand-mark">R</span>
          <span>Rento</span>
        </button>

        <nav className="nav-links" ref={containerRef}>
          {links.map((l) => (
            <button
              key={l.key}
              ref={(el) => el && linkRefs.current.set(l.key, el)}
              className={"nav-link" + (route.page === l.key ? " nav-link-active" : "")}
              onClick={() => goTo(l.key)}
            >
              {l.label}
            </button>
          ))}
          <span className="nav-indicator" style={{ left: indicator.left, width: indicator.width, opacity: indicator.opacity }} />
        </nav>

        <div className="nav-actions">
          {/* Notifications Drawer */}
          <div style={{ position: "relative" }}>
            <button
              className="icon-btn"
              title="Notifications"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Bell size={17} />
              {unreadCount > 0 && <span className="badge-dot" />}
            </button>

            {notifOpen && (
              <div className="notif-popover">
                <div className="notif-head">
                  <h4>Notifications ({notifications.length})</h4>
                  {notifications.length > 0 && (
                    <button className="notif-clear" onClick={onClearNotifications}>Clear All</button>
                  )}
                </div>
                <div className="notif-list">
                  {notifications.length === 0 ? (
                    <div style={{ padding: "24px 16px", textAlign: "center", color: "var(--muted)", fontSize: "13px" }}>
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={"notif-item" + (!n.read ? " notif-item-unread" : "")}>
                        <strong>{n.title}</strong>
                        <p>{n.message}</p>
                        <span>{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="icon-btn" title="Messages" onClick={() => goTo("dashboard", { tab: "requests" })}>
            <MessageSquare size={17} />
          </button>

          {/* List an item button */}
          <button className="btn btn-primary" onClick={onOpenWizard}>
            <Plus size={15} /> List Your Item
          </button>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={"mobile-menu" + (mobileOpen ? " mobile-menu-open" : "")}>
        {links.map((l) => (
          <button
            key={l.key}
            className={"mobile-link" + (route.page === l.key ? " mobile-link-active" : "")}
            onClick={() => { goTo(l.key); setMobileOpen(false); }}
          >
            {l.label}
          </button>
        ))}
        <button
          className="btn btn-primary"
          style={{ marginTop: 8, width: "100%", justifyContent: "center" }}
          onClick={() => { onOpenWizard(); setMobileOpen(false); }}
        >
          <Plus size={15} /> List Your Item
        </button>
      </div>
    </header>
  );
}

/* ---------------------------------- HOME PAGE ---------------------------------- */

function Home({ goTo, favorites, toggleFav, listings, onOpenWizard }) {
  const [query, setQuery] = useState("");
  const toast = useToast();
  // Only published items appear in public marketplace
  const publicListings = listings.filter(l => l.status === "PUBLISHED");
  const featured = publicListings.filter((l) => l.featured).slice(0, 6);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroDirection, setHeroDirection] = useState("next");
  const [heroNavigating, setHeroNavigating] = useState(false);
  const heroTouchStart = useRef(0);
  const heroIsSwiping = useRef(false);

  const advanceHero = (direction = 1) => {
    setHeroDirection(direction > 0 ? "next" : "previous");
    setHeroIndex((index) => index + direction);
  };

  useEffect(() => {
    if (publicListings.length < 2) return undefined;
    const interval = setInterval(() => advanceHero(1), 4800);
    return () => clearInterval(interval);
  }, [publicListings.length]);

  const heroCount = Math.max(publicListings.length, 1);
  const heroPosition = ((heroIndex % heroCount) + heroCount) % heroCount;
  const heroProduct = publicListings[heroPosition];
  const floatProduct = publicListings[(heroPosition + 1) % heroCount];

  const openHeroProduct = (product) => {
    if (!product || heroIsSwiping.current) return;
    setHeroNavigating(true);
    window.setTimeout(() => goTo("product", { id: product.id }), 520);
  };

  const handleHeroTouchStart = (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    heroTouchStart.current = touch.clientX;
    heroIsSwiping.current = false;
  };

  const handleHeroTouchEnd = (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    const distance = touch.clientX - heroTouchStart.current;
    if (Math.abs(distance) < 48) return;
    heroIsSwiping.current = true;
    advanceHero(distance < 0 ? 1 : -1);
    window.setTimeout(() => { heroIsSwiping.current = false; }, 650);
  };

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow-plain">Peer-to-Peer Rental Marketplace</p>
          <h1 className="hero-title">Why buy it when<br />you can rent it?</h1>
          <p className="hero-sub">
            Borrow cameras, bikes, camping gear, and power tools from people nearby — or list what&apos;s
            sitting idle in your closet and start earning every weekend.
          </p>
          <form
            className="search-bar"
            onSubmit={(e) => { e.preventDefault(); goTo("explore", { q: query }); }}
          >
            <Search size={18} className="search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cameras, gaming consoles, bikes, tents..."
            />
            <button type="submit" className="btn btn-primary search-submit">Search</button>
          </form>
          <div className="hero-stats">
            <div><strong><AnimatedNumber value={publicListings.length} format={(n) => n + "+"} /></strong><span>active listings</span></div>
            <div><strong>38 cities</strong><span>across India</span></div>
            <div><strong>4.9 / 5</strong><span>average host rating</span></div>
          </div>
        </div>
        <div
          className={"hero-visual" + (heroNavigating ? " hero-zooming" : "")}
          onTouchStart={handleHeroTouchStart}
          onTouchEnd={handleHeroTouchEnd}
        >
          <button
            type="button"
            className="hero-product-button hero-product-main"
            aria-label={`Open ${heroProduct?.title || "featured rental"}`}
            onClick={() => openHeroProduct(heroProduct)}
          >
            <SmartImage
              key={heroProduct?.id || "hero-main"}
              src={heroProduct?.primaryImage || heroProduct?.img}
              alt={heroProduct?.title || "Rento rental product"}
              className={`hero-img-main hero-product-swap hero-direction-${heroDirection}`}
            />
          </button>
          <button
            type="button"
            className="hero-product-button hero-product-float"
            aria-label={`Open ${floatProduct?.title || "featured rental"}`}
            onClick={() => openHeroProduct(floatProduct)}
          >
            <SmartImage
              key={floatProduct?.id || "hero-float"}
              src={floatProduct?.primaryImage || floatProduct?.img}
              alt={floatProduct?.title || "Featured rental product"}
              className={`hero-img-float hero-product-swap hero-direction-${heroDirection}`}
            />
          </button>
          <div className="hero-badge">
            <ShieldCheck size={16} />
            <span>{heroProduct?.category || "Verified rentals"}</span>
          </div>
          <div className="hero-product-caption" aria-live="polite">
            <strong>{heroProduct?.title || "Featured rental"}</strong>
            <span>{heroProduct ? money(heroProduct.price) + " / day" : ""}</span>
          </div>
          <div className="hero-dots" aria-label="Featured products">
            {publicListings.slice(0, Math.min(publicListings.length, 5)).map((product, index) => (
              <button
                key={product.id}
                type="button"
                className={"hero-dot" + (heroProduct?.id === product.id ? " hero-dot-active" : "")}
                aria-label={`Show ${product.title}`}
                onClick={() => { setHeroDirection(index >= heroPosition ? "next" : "previous"); setHeroIndex(index); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <Reveal className="section">
        <div className="section-head">
          <h2>Browse by category</h2>
          <button className="link-more" onClick={() => goTo("explore")}>See all <ChevronRight size={15} /></button>
        </div>
        <div className="cat-row">
          {CATEGORIES.map((c) => (
            <button key={c.name} className="cat-chip" onClick={() => goTo("explore", { category: c.name })}>
              <c.icon size={18} strokeWidth={1.6} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* FEATURED */}
      <Reveal className="section" delay={60}>
        <div className="section-head">
          <h2>Featured rentals near you</h2>
          <button className="link-more" onClick={() => goTo("explore")}>Explore all <ChevronRight size={15} /></button>
        </div>
        <div className="grid-featured">
          {featured.map((item, i) => (
            <ProductCard
              key={item.id}
              item={item}
              large={i === 0}
              onOpen={() => goTo("product", { id: item.id })}
              isFav={favorites.has(item.id)}
              onFav={() => toggleFav(item.id, toast, item.title)}
            />
          ))}
        </div>
      </Reveal>

      {/* LISTING CTA */}
      <Reveal className="earn-wrap">
        <div className="earn">
          <div className="earn-copy">
            <p className="eyebrow-plain">For hosts</p>
            <h2>Put unused gear to work.</h2>
            <p>Set your price, choose available dates, and approve the requests you want.</p>
            <button className="btn btn-primary" onClick={onOpenWizard}>
              <Plus size={16} /> List an item <ArrowUpRight size={15} />
            </button>
          </div>
          <SmartImage
            className="earn-img"
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop"
            alt="Audio gear ready to be listed"
          />
        </div>
      </Reveal>
    </main>
  );
}

/* ---------------------------------- PRODUCT CARD ---------------------------------- */

function ProductCard({ item, large, onOpen, isFav, onFav }) {
  const tilt = useTilt(6);
  const [pop, setPop] = useState(false);

  const handleFav = (e) => {
    e.stopPropagation();
    setPop(true);
    setTimeout(() => setPop(false), 260);
    onFav();
  };

  return (
    <div className={"pcard" + (large ? " pcard-lg" : "")}>
      <div
        className="pcard-media"
        onClick={onOpen}
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{ transform: tilt.style.transform, transitionDuration: tilt.style.transitionDuration }}
      >
        <SmartImage src={item.primaryImage || item.img} alt={item.title} />
        <span className="avail-pill"><span className="avail-dot" />Available</span>
        <button
          className={"fav-btn" + (isFav ? " fav-btn-active" : "") + (pop ? " fav-btn-pop" : "")}
          onClick={handleFav}
          aria-label="Save to favorites"
        >
          <Heart size={15} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="pcard-body" onClick={onOpen}>
        <div className="pcard-top">
          <h3>{item.title}</h3>
          <span className="pcard-price">{money(item.price)}<small>/day</small></span>
        </div>
        <div className="pcard-meta">
          <span><MapPin size={13} /> {item.location ? item.location.split(",")[0] : "Nearby"}</span>
          <span><Star size={13} fill="currentColor" /> {item.rating} ({item.reviews})</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- EXPLORE ---------------------------------- */

function Explore({ goTo, favorites, toggleFav, listings, initialCategory, initialQuery }) {
  const [category, setCategory] = useState(initialCategory || "All");
  const [sort, setSort] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const toast = useToast();

  // Filter only PUBLISHED listings for public search
  const results = useMemo(() => {
    let r = listings.filter(l => l.status === "PUBLISHED");
    if (category !== "All") {
      r = r.filter(l => l.category === category);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(l =>
        l.title.toLowerCase().includes(q) ||
        (l.description && l.description.toLowerCase().includes(q)) ||
        (l.brand && l.brand.toLowerCase().includes(q))
      );
    }
    r = r.filter(l => l.price <= maxPrice);
    if (deliveryOnly) {
      r = r.filter(l => l.deliveryAvailable);
    }

    if (sort === "price-low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [listings, category, searchQuery, maxPrice, deliveryOnly, sort]);

  const resetFilters = () => {
    setCategory("All");
    setMaxPrice(1500);
    setDeliveryOnly(false);
    setSearchQuery("");
    toast("Filters reset");
  };

  return (
    <main className="explore">
      <div className="explore-head">
        <div>
          <h1>Explore rentals</h1>
          <p>{results.length} verified item{results.length !== 1 ? "s" : ""}{category !== "All" ? ` in ${category}` : ""}</p>
        </div>
        <div style={{ maxWidth: 320, width: "100%" }}>
          <div className="search-bar" style={{ marginTop: 0 }}>
            <Search size={16} className="search-icon" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword..."
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", color: "var(--muted)" }}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="explore-body">
        <aside className="filters">
          <div className="filter-block">
            <h4>Category</h4>
            <button className={"filter-item" + (category === "All" ? " filter-item-active" : "")} onClick={() => setCategory("All")}>
              <Check size={13} className="filter-check" /> All categories
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.name}
                className={"filter-item" + (category === c.name ? " filter-item-active" : "")}
                onClick={() => setCategory(c.name)}
              >
                <Check size={13} className="filter-check" /> {c.name}
              </button>
            ))}
          </div>

          <div className="filter-block">
            <h4>Max price / day</h4>
            <input
              type="range" min="200" max="1500" step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="range"
            />
            <div className="range-value">Up to <AnimatedNumber value={maxPrice} format={money} /></div>
          </div>

          <div className="filter-block">
            <button
              type="button"
              className={"toggle-row" + (deliveryOnly ? " toggle-row-active" : "")}
              onClick={() => setDeliveryOnly((v) => !v)}
              role="switch"
              aria-checked={deliveryOnly}
            >
              <span className="toggle-track"><span className="toggle-thumb" /></span>
              Delivery available
            </button>
          </div>
        </aside>

        <section className="results">
          <div className="results-toolbar">
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>Showing {results.length} results</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>

          {results.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><Search size={22} /></div>
              <p>No published listings match those criteria.</p>
              <button className="btn btn-ghost" onClick={resetFilters}>Reset filters</button>
            </div>
          ) : (
            <div className="grid-explore">
              {results.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onOpen={() => goTo("product", { id: item.id })}
                  isFav={favorites.has(item.id)}
                  onFav={() => toggleFav(item.id, toast, item.title)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* ---------------------------------- PRODUCT PAGE ---------------------------------- */

function ProductPage({ id, goTo, favorites, toggleFav, listings, onCreateRentalRequest }) {
  const item = listings.find((l) => l.id === id) || listings[0];
  const [imgIndex, setImgIndex] = useState(0);
  const [startDate, setStartDate] = useState("2026-09-18");
  const [endDate, setEndDate] = useState("2026-09-20");
  const toast = useToast();

  const gallery = item.images && item.images.length > 0
    ? item.images
    : [item.primaryImage || item.img];

  // Calculate days
  const startObj = new Date(startDate);
  const endObj = new Date(endDate);
  const diffTime = endObj.getTime() - startObj.getTime();
  const rawDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const days = isNaN(rawDays) || rawDays < 1 ? 1 : rawDays;

  // Check conflicts
  const conflict = checkBookingConflict(item, startDate, endDate);
  const durationInvalid = (item.minDays && days < item.minDays) || (item.maxDays && days > item.maxDays);

  const subtotal = item.price * days;
  const serviceFee = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee + item.deposit;

  const handleBook = () => {
    if (conflict.hasConflict) {
      toast(conflict.reason, "default");
      return;
    }
    if (durationInvalid) {
      toast(`Rental duration must be between ${item.minDays} and ${item.maxDays} days`, "default");
      return;
    }

    const res = onCreateRentalRequest(item.id, {
      startDate,
      endDate,
      days,
      total
    }, toast);

    if (res.success) {
      goTo("dashboard", { tab: "requests" });
    }
  };

  const similar = listings.filter((l) => l.category === item.category && l.id !== item.id && l.status === "PUBLISHED").slice(0, 3);

  return (
    <main className="product-page">
      <button className="back-link" onClick={() => goTo("explore")}><ChevronLeft size={16} /> Back to explore</button>

      {/* Moderation banner if item is not published */}
      {item.status !== "PUBLISHED" && (
        <div className="alert-box alert-error" style={{ marginBottom: 20 }}>
          <AlertCircle size={18} />
          <div>
            <strong>Private Preview Mode:</strong> This listing is currently <strong>{item.status}</strong> and is NOT visible publicly in explore or search.
          </div>
        </div>
      )}

      <div className="product-grid">
        <Reveal>
          <div className="gallery">
            <div className="gallery-main">
              <div key={imgIndex} className="gallery-main-inner">
                <SmartImage src={gallery[imgIndex]} alt={item.title} />
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="gallery-thumbs">
                {gallery.map((g, i) => (
                  <button key={i} className={"thumb" + (i === imgIndex ? " thumb-active" : "")} onClick={() => setImgIndex(i)}>
                    <SmartImage src={g} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="product-info">
            <p className="eyebrow-plain">{item.category}</p>
            <h1>{item.title}</h1>
            <div className="product-meta">
              <span><Star size={14} fill="currentColor" /> {item.rating} ({item.reviews} reviews)</span>
              <span><MapPin size={14} /> {item.location}</span>
              <span className="pill pill-grey">Condition: {item.condition}</span>
            </div>

            <p className="product-desc">{item.description}</p>

            <div className="owner-row">
              <div className="owner-avatar">{item.owner ? item.owner.split(" ").map((n) => n[0]).join("") : "H"}</div>
              <div>
                <strong>{item.owner}</strong>
                <div className="owner-sub">Owner &amp; Verified Community Host</div>
              </div>
            </div>

            {/* INTERACTIVE BOOKING CARD */}
            <div className="booking-card">
              <div className="booking-price">
                <span className="big">{money(item.price)}</span><span className="unit">/ day</span>
                {item.weekly && <span className="weekly">{money(item.weekly)} / week</span>}
              </div>

              {/* DATE PICKERS */}
              <div className="date-selector-row">
                <div className="date-field">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="date-field">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {/* DOUBLE-BOOKING CONFLICT WARNING */}
              {conflict.hasConflict && (
                <div className="conflict-alert">
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong>Dates Unavailable:</strong> {conflict.reason}. Please select other dates.
                  </div>
                </div>
              )}

              {durationInvalid && (
                <div className="conflict-alert">
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    Rental duration must be between {item.minDays} and {item.maxDays} days.
                  </div>
                </div>
              )}

              <div className="price-breakdown">
                <div><span>{money(item.price)} × {days} day{days > 1 ? "s" : ""}</span><span>{money(subtotal)}</span></div>
                <div><span>Rento safety &amp; platform fee (8%)</span><span>{money(serviceFee)}</span></div>
                <div><span>Refundable security deposit</span><span>{money(item.deposit)}</span></div>
                {item.deliveryAvailable && <div><span>Delivery available</span><span>{money(item.deliveryFee || 0)}</span></div>}
                <div className="price-total"><span>Total due today</span><span>{money(total)}</span></div>
              </div>

              <button
                className="btn btn-primary btn-full"
                disabled={conflict.hasConflict || durationInvalid}
                style={{ opacity: conflict.hasConflict || durationInvalid ? 0.5 : 1, cursor: conflict.hasConflict || durationInvalid ? "not-allowed" : "pointer" }}
                onClick={handleBook}
              >
                {item.approvalMode === "instant" ? "Instant Book" : "Request to Rent"}
              </button>

              <button className="btn btn-ghost btn-full" onClick={() => toggleFav(item.id, toast, item.title)}>
                <Heart size={15} fill={favorites.has(item.id) ? "currentColor" : "none"} />
                {favorites.has(item.id) ? "Saved in Favorites" : "Save for later"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* LOWER DETAILS & RULES */}
      <Reveal className="product-lower">
        <div className="rules-block">
          <h3>Specifications &amp; Handover Guidelines</h3>
          {item.specifications && item.specifications.length > 0 && (
            <div className="preview-specs-table" style={{ marginBottom: 20 }}>
              {item.specifications.map((s, idx) => (
                <div key={idx} className="spec-table-row">
                  <strong>{s.key}</strong>
                  <span>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {item.includedAccessories && (
            <p style={{ marginBottom: 20, fontSize: "14px" }}>
              <strong>Included Accessories:</strong> {item.includedAccessories}
            </p>
          )}

          <h4>Rules from Host:</h4>
          <ul>
            {(item.rules || ["Valid ID required at pickup", "Return in clean original condition"]).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
            <li>Minimum rental: {item.minDays || 1} day · Maximum: {item.maxDays || 30} days</li>
            <li>Full security deposit refund upon confirmed item return</li>
          </ul>
        </div>
      </Reveal>

      {similar.length > 0 && (
        <Reveal className="section">
          <div className="section-head"><h2>Similar listings in {item.category}</h2></div>
          <div className="grid-explore">
            {similar.map((s) => (
              <ProductCard
                key={s.id}
                item={s}
                onOpen={() => goTo("product", { id: s.id })}
                isFav={favorites.has(s.id)}
                onFav={() => toggleFav(s.id, toast, s.title)}
              />
            ))}
          </div>
        </Reveal>
      )}
    </main>
  );
}

/* ---------------------------------- DASHBOARD ---------------------------------- */

function Dashboard({
  goTo, favorites, listings, requests, initialTab, onOpenWizard,
  onTogglePause, onDeleteListing, onManageAvailability, onApproveListing,
  onRejectListing, onUpdateRequestStatus, onToggleHandover, onCompleteRental
}) {
  const [tab, setTab] = useState(initialTab || "overview");
  const [listingFilter, setListingFilter] = useState("all");
  const toast = useToast();

  const myListings = listings.filter(l => l.ownerId === "user_satyam");
  const pendingCount = listings.filter(l => l.status === "PENDING_APPROVAL").length;

  const filteredMyListings = myListings.filter(l => {
    if (listingFilter === "all") return true;
    if (listingFilter === "published") return l.status === "PUBLISHED";
    if (listingFilter === "pending") return l.status === "PENDING_APPROVAL";
    if (listingFilter === "paused") return l.status === "PAUSED";
    if (listingFilter === "rejected") return l.status === "REJECTED";
    return true;
  });

  const savedItems = listings.filter((l) => favorites.has(l.id));

  const tabs = [
    { key: "overview", label: "Overview", icon: LayoutGrid },
    { key: "listings", label: `My Listings (${myListings.length})`, icon: Sofa },
    { key: "requests", label: `Requests (${requests.length})`, icon: MessageSquare },
    { key: "admin", label: "Admin Approvals", icon: ShieldAlert, badge: pendingCount > 0 ? pendingCount : null },
    { key: "earnings", label: "Earnings", icon: Wallet },
    { key: "favorites", label: "Favorites", icon: HeartIcon }
  ];

  return (
    <main className="dash">
      <div className="dash-side">
        <p className="dash-side-title">Dashboard</p>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={"dash-tab" + (tab === t.key ? " dash-tab-active" : "")}
            onClick={() => setTab(t.key)}
          >
            <t.icon size={16} /> {t.label}
            {t.badge && <span className="dash-badge">{t.badge}</span>}
          </button>
        ))}

        <button className="btn btn-primary dash-new-btn" onClick={() => onOpenWizard()}>
          <Plus size={15} /> List New Item
        </button>
      </div>

      <div className="dash-content page-transition" key={tab}>
        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <>
            <div className="dash-head-bar">
              <h1>Welcome back, SATYAM</h1>
              <button className="btn btn-primary btn-sm" onClick={() => onOpenWizard()}>
                <Plus size={14} /> List an Item
              </button>
            </div>

            <div className="stat-row">
              <div className="stat-card">
                <span className="stat-label">Host Earnings</span>
                <span className="stat-value"><AnimatedNumber value={28400} format={money} /></span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Active Listings</span>
                <span className="stat-value"><AnimatedNumber value={myListings.filter(l => l.status === "PUBLISHED").length} /></span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Pending Approval</span>
                <span className="stat-value"><AnimatedNumber value={myListings.filter(l => l.status === "PENDING_APPROVAL").length} /></span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Rental Requests</span>
                <span className="stat-value"><AnimatedNumber value={requests.length} /></span>
              </div>
            </div>

            <div className="dash-chart-block">
              <h3>Earnings Trend, last 6 months</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={EARNINGS_DATA}>
                    <CartesianGrid stroke="#2A2833" vertical={false} />
                    <XAxis dataKey="month" stroke="#8B889A" tickLine={false} axisLine={false} />
                    <YAxis stroke="#8B889A" tickLine={false} axisLine={false} width={40} />
                    <Tooltip
                      cursor={{ fill: "rgba(194,149,79,0.08)" }}
                      contentStyle={{ background: "#1D1B24", border: "1px solid #322F3B", borderRadius: 8, color: "#F6F2E9" }}
                    />
                    <Bar dataKey="value" fill="#C2954F" radius={[4, 4, 0, 0]} animationDuration={600} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* MY LISTINGS TAB */}
        {tab === "listings" && (
          <>
            <div className="dash-head-bar">
              <div>
                <h1>My Equipment Listings</h1>
                <p style={{ color: "var(--muted)", fontSize: "13.5px" }}>Manage pricing, blackout dates, pause status, and edits.</p>
              </div>
              <button className="btn btn-primary" onClick={() => onOpenWizard()}>
                <Plus size={15} /> List an Item
              </button>
            </div>

            {/* Filter Chips */}
            <div className="dash-filters">
              {["all", "published", "pending", "paused", "rejected"].map((filterKey) => (
                <button
                  key={filterKey}
                  className={"dash-filter-btn" + (listingFilter === filterKey ? " dash-filter-btn-active" : "")}
                  onClick={() => setListingFilter(filterKey)}
                >
                  {filterKey.toUpperCase()} ({
                    filterKey === "all" ? myListings.length : myListings.filter(l => l.status.toLowerCase().includes(filterKey)).length
                  })
                </button>
              ))}
            </div>

            {filteredMyListings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><Sofa size={24} /></div>
                <h3>No listings in this view</h3>
                <p>You have not listed any items matching this filter yet.</p>
                <button className="btn btn-primary" onClick={() => onOpenWizard()}>
                  <Plus size={15} /> List Your First Item
                </button>
              </div>
            ) : (
              <div className="my-listings-list">
                {filteredMyListings.map((l) => (
                  <div className="my-listing-card" key={l.id}>
                    <img src={l.primaryImage || l.img} alt="" className="my-listing-img" />
                    <div className="my-listing-info">
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <span className={"pill " + (
                          l.status === "PUBLISHED" ? "pill-green" :
                          l.status === "PENDING_APPROVAL" ? "pill-amber" :
                          l.status === "REJECTED" ? "pill-red" : "pill-grey"
                        )}>
                          {l.status === "PENDING_APPROVAL" && <Clock size={11} />}
                          {l.status}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--muted)" }}>{l.category}</span>
                      </div>

                      <h3>{l.title}</h3>
                      <div className="my-listing-price">{money(l.price)} / day · Deposit {money(l.deposit)}</div>

                      <div className="my-listing-stats">
                        <span><Eye size={13} /> {l.views || 0} views</span>
                        <span><Heart size={13} /> {l.favoritesCount || 0} saves</span>
                        <span><CalendarIcon size={13} /> {l.rentalCount || 0} rentals</span>
                        <span><Wallet size={13} /> {money(l.earnings || 0)} earned</span>
                      </div>

                      {l.status === "REJECTED" && (
                        <div className="rejection-banner">
                          <AlertCircle size={14} />
                          <strong>Rejection Reason:</strong> {l.rejectionReason || "Incomplete details"}
                        </div>
                      )}
                    </div>

                    <div className="my-listing-actions">
                      <div className="action-row">
                        <button
                          className="btn btn-ghost btn-sm"
                          title="View product page"
                          onClick={() => goTo("product", { id: l.id })}
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          title="Edit details"
                          onClick={() => onOpenWizard(l)}
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                      </div>

                      <div className="action-row">
                        <button
                          className="btn btn-ghost btn-sm"
                          title="Manage blackout dates"
                          onClick={() => onManageAvailability(l)}
                        >
                          <CalendarIcon size={14} /> Calendar
                        </button>

                        <button
                          className="btn btn-ghost btn-sm"
                          title={l.status === "PAUSED" ? "Resume listing" : "Pause listing"}
                          onClick={() => onTogglePause(l.id, toast)}
                        >
                          {l.status === "PAUSED" ? <Play size={14} /> : <Pause size={14} />}
                          {l.status === "PAUSED" ? "Resume" : "Pause"}
                        </button>

                        <button
                          className="btn btn-ghost btn-sm"
                          title="Delete listing"
                          onClick={() => onDeleteListing(l.id, toast)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* REQUESTS TAB */}
        {tab === "requests" && (
          <>
            <h1>Rental Requests &amp; Handover</h1>
            <div className="table">
              <div className="table-row table-head">
                <span>Item</span><span>Renter</span><span>Dates</span><span>Status &amp; Actions</span>
              </div>
              {requests.map((r) => (
                <div className="table-row" key={r.id}>
                  <strong>{r.item}</strong>
                  <span>{r.renter}</span>
                  <span>{r.dates}</span>
                  <div>
                    <div style={{ marginBottom: 6 }}>
                      <span className={"pill " + (
                        r.status === "Accepted" || r.status === "Confirmed" ? "pill-green" :
                        r.status === "Pending" ? "pill-amber" :
                        r.status === "Declined" ? "pill-red" : "pill-grey"
                      )}>
                        {r.status}
                      </span>
                    </div>

                    {r.status === "Pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => onUpdateRequestStatus(r.id, "Accepted", toast)}>
                          Accept
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => onUpdateRequestStatus(r.id, "Declined", toast)}>
                          Decline
                        </button>
                      </div>
                    )}

                    {(r.status === "Accepted" || r.status === "Confirmed") && (
                      <div className="handover-box">
                        <label>
                          <input
                            type="checkbox"
                            checked={!!r.handoverOwnerConfirmed}
                            onChange={() => onToggleHandover(r.id, "owner", toast)}
                          />
                          <span>Item handed over in stated condition</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={!!r.handoverRenterConfirmed}
                            onChange={() => onToggleHandover(r.id, "renter", toast)}
                          />
                          <span>Renter received in stated condition</span>
                        </label>
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ marginTop: 4 }}
                          onClick={() => onCompleteRental(r.id, toast)}
                        >
                          Confirm Return &amp; Refund Deposit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ADMIN APPROVAL TAB */}
        {tab === "admin" && (
          <AdminPortal
            listings={listings}
            onApprove={(id, note) => {
              onApproveListing(id, note);
              toast("Listing approved and published to marketplace!", "success");
            }}
            onReject={(id, reason) => {
              onRejectListing(id, reason);
              toast("Listing rejected. Rejection reason saved.", "default");
            }}
          />
        )}

        {/* EARNINGS TAB */}
        {tab === "earnings" && (
          <>
            <h1>Earnings &amp; Payouts</h1>
            <div className="stat-row">
              <div className="stat-card"><span className="stat-label">Total Earned</span><span className="stat-value">{money(42600)}</span></div>
              <div className="stat-card"><span className="stat-label">Completed Rentals</span><span className="stat-value">31</span></div>
              <div className="stat-card"><span className="stat-label">Pending Payout</span><span className="stat-value">{money(2100)}</span></div>
            </div>
            <div className="dash-chart-block">
              <h3>Monthly breakdown</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={EARNINGS_DATA}>
                    <CartesianGrid stroke="#2A2833" vertical={false} />
                    <XAxis dataKey="month" stroke="#8B889A" tickLine={false} axisLine={false} />
                    <YAxis stroke="#8B889A" tickLine={false} axisLine={false} width={40} />
                    <Tooltip contentStyle={{ background: "#1D1B24", border: "1px solid #322F3B", borderRadius: 8, color: "#F6F2E9" }} />
                    <Bar dataKey="value" fill="#C2954F" radius={[4, 4, 0, 0]} animationDuration={600} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* FAVORITES TAB */}
        {tab === "favorites" && (
          <>
            <h1>Saved Gear</h1>
            {savedItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><HeartIcon size={22} /></div>
                <p>Nothing saved yet — items you favorite will show up here.</p>
              </div>
            ) : (
              <div className="grid-explore">
                {savedItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onOpen={() => goTo("product", { id: item.id })}
                    isFav
                    onFav={() => {}}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

/* ---------------------------------- FOOTER ---------------------------------- */

function Footer({ onOpenWizard, goTo }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="brand"><span className="brand-mark">R</span><span>Rento</span></div>
          <p>Rent what you need. Earn from what you own. Peer-to-peer equipment sharing across India.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h5>Marketplace</h5>
            <span style={{ cursor: "pointer" }} onClick={() => goTo("explore")}>Explore Rentals</span>
            <span style={{ cursor: "pointer" }} onClick={() => goTo("explore")}>Popular Categories</span>
            <span style={{ cursor: "pointer" }} onClick={() => goTo("home")}>How it works</span>
          </div>
          <div>
            <h5>Hosting</h5>
            <span style={{ cursor: "pointer" }} onClick={onOpenWizard}>List an Item</span>
            <span style={{ cursor: "pointer" }} onClick={() => goTo("dashboard", { tab: "earnings" })}>Earnings Calculator</span>
            <span style={{ cursor: "pointer" }} onClick={() => goTo("dashboard", { tab: "admin" })}>Trust &amp; Verification</span>
          </div>
          <div>
            <h5>Company</h5>
            <span>About Us</span>
            <span>Safety Guidelines</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
