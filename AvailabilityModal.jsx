import React, { useState } from "react";
import { X, Calendar as CalendarIcon, ShieldCheck, Check } from "lucide-react";

export default function AvailabilityModal({ isOpen, onClose, listing, onSaveAvailability }) {
  if (!isOpen || !listing) return null;

  const [blockedDates, setBlockedDates] = useState(listing.blockedDates || []);

  const toggleDate = (dateStr) => {
    setBlockedDates(prev =>
      prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]
    );
  };

  const handleSave = () => {
    onSaveAvailability(listing.id, blockedDates);
    onClose();
  };

  return (
    <div className="wizard-overlay">
      <div className="wizard-modal detail-modal">
        <div className="wizard-header">
          <div>
            <h2>Manage Availability: {listing.title}</h2>
            <p className="wizard-sub">Click dates to toggle them as available or blocked for personal use/maintenance.</p>
          </div>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="wizard-body">
          <div className="calendar-top">
            <h4>September – October 2026</h4>
            <div className="cal-legend">
              <span><span className="dot dot-avail" /> Available</span>
              <span><span className="dot dot-blocked" /> Blocked by you</span>
              <span><span className="dot dot-booked" /> Booked by renter</span>
            </div>
          </div>

          <div className="mini-cal-grid">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const dateStr = `2026-09-${day < 10 ? "0" + day : day}`;
              const isBlocked = blockedDates.includes(dateStr);
              const isBooked = (listing.bookings || []).some(b => {
                return (b.status === "Accepted" || b.status === "Confirmed" || b.status === "Active") &&
                  dateStr >= b.startDate && dateStr <= b.endDate;
              });

              return (
                <button
                  type="button"
                  key={dateStr}
                  disabled={isBooked}
                  className={
                    "cal-day-cell" +
                    (isBooked ? " day-booked" : isBlocked ? " day-blocked" : " day-avail")
                  }
                  onClick={() => !isBooked && toggleDate(dateStr)}
                >
                  <span className="cell-day">{day}</span>
                  <span className="cell-status">{isBooked ? "Rented" : isBlocked ? "Blocked" : "Open"}</span>
                </button>
              );
            })}
          </div>

          <div className="cal-actions" style={{ marginTop: 20 }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                const weekends = ["2026-09-19", "2026-09-20", "2026-09-26", "2026-09-27"];
                setBlockedDates(prev => Array.from(new Set([...prev, ...weekends])));
              }}
            >
              Block Weekends
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setBlockedDates([])}
            >
              Clear Blocked Dates
            </button>
          </div>
        </div>

        <div className="wizard-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
}
