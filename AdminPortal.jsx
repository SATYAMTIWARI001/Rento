import React, { useState } from "react";
import {
  ShieldAlert, CheckCircle2, XCircle, Clock, Eye, AlertCircle,
  MapPin, Check, X, Star, FileText, ChevronRight
} from "lucide-react";
import { REJECTION_REASONS, money } from "./rentoData.js";

export default function AdminPortal({ listings, onApprove, onReject, onRequestChanges }) {
  const [selectedListing, setSelectedListing] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [selectedReason, setSelectedReason] = useState(REJECTION_REASONS[0]);
  const [customReason, setCustomReason] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const pendingListings = listings.filter(l => l.status === "PENDING_APPROVAL");
  const reviewedListings = listings.filter(l => l.status === "PUBLISHED" || l.status === "REJECTED");

  const handleConfirmReject = () => {
    const finalReason = customReason.trim() ? customReason.trim() : selectedReason;
    if (!finalReason) {
      alert("Please specify a rejection reason.");
      return;
    }
    onReject(rejectingId, finalReason);
    setRejectingId(null);
    setCustomReason("");
    if (selectedListing && selectedListing.id === rejectingId) {
      setSelectedListing(null);
    }
  };

  return (
    <div className="admin-portal">
      <div className="admin-header">
        <div>
          <h2>Listing Moderation &amp; Verification Portal</h2>
          <p>Review new equipment submissions to ensure quality, accurate descriptions, and member safety.</p>
        </div>
        <div className="admin-tabs">
          <button
            className={"admin-tab" + (activeTab === "pending" ? " admin-tab-active" : "")}
            onClick={() => setActiveTab("pending")}
          >
            Pending Review ({pendingListings.length})
          </button>
          <button
            className={"admin-tab" + (activeTab === "history" ? " admin-tab-active" : "")}
            onClick={() => setActiveTab("history")}
          >
            Audit Log ({reviewedListings.length})
          </button>
        </div>
      </div>

      {activeTab === "pending" && (
        <>
          {pendingListings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><CheckCircle2 size={32} /></div>
              <h3>Verification Queue Clean!</h3>
              <p>All submitted listings have been reviewed. New submissions from hosts will appear here instantly.</p>
            </div>
          ) : (
            <div className="admin-queue-grid">
              {pendingListings.map((item) => (
                <div key={item.id} className="admin-card">
                  <div className="admin-card-media">
                    <img src={item.primaryImage || item.img} alt={item.title} />
                    <span className="pill pill-amber admin-pill">
                      <Clock size={12} /> Pending Approval
                    </span>
                  </div>
                  <div className="admin-card-body">
                    <div className="admin-card-top">
                      <h3>{item.title}</h3>
                      <span className="admin-price">{money(item.price)}<small>/day</small></span>
                    </div>

                    <div className="admin-meta">
                      <span><strong>Category:</strong> {item.category}</span>
                      <span><strong>Owner:</strong> {item.owner}</span>
                      <span><strong>Location:</strong> {item.location}</span>
                      <span><strong>Deposit:</strong> {money(item.deposit)}</span>
                    </div>

                    <div className="admin-actions">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setSelectedListing(item)}
                      >
                        <Eye size={14} /> Full Details
                      </button>

                      <div className="admin-btn-group">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onApprove(item.id, "Approved by Admin on verified specs")}
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setRejectingId(item.id)}
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "history" && (
        <div className="table">
          <div className="table-row table-head">
            <span>Listing</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Reviewed Action</span>
          </div>
          {reviewedListings.map((item) => (
            <div className="table-row" key={item.id}>
              <span className="table-item">
                <img src={item.primaryImage || item.img} alt="" />
                <div>
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>{item.category} · {money(item.price)}/day</div>
                </div>
              </span>
              <span>{item.owner}</span>
              <span>
                <span className={"pill " + (item.status === "PUBLISHED" ? "pill-green" : "pill-red")}>
                  {item.status}
                </span>
              </span>
              <span style={{ fontSize: "12.5px" }}>
                {item.status === "REJECTED" ? (
                  <span style={{ color: "#9C2A24" }}>Rejected: {item.rejectionReason}</span>
                ) : (
                  <span>Live on marketplace</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* FULL DETAIL MODAL */}
      {selectedListing && (
        <div className="wizard-overlay">
          <div className="wizard-modal detail-modal">
            <div className="wizard-header">
              <div>
                <h2>Listing Inspector: {selectedListing.title}</h2>
                <p className="wizard-sub">Owner: {selectedListing.owner} · Category: {selectedListing.category}</p>
              </div>
              <button className="icon-btn" onClick={() => setSelectedListing(null)}><X size={18} /></button>
            </div>

            <div className="wizard-body">
              <div className="inspector-gallery">
                {(selectedListing.images || [selectedListing.img]).map((img, i) => (
                  <img key={i} src={img} alt="" className="inspector-img" />
                ))}
              </div>

              <div className="inspector-details">
                <div className="inspector-grid">
                  <div><strong>Daily Rate:</strong> {money(selectedListing.price)}</div>
                  <div><strong>Weekly Rate:</strong> {money(selectedListing.weekly)}</div>
                  <div><strong>Security Deposit:</strong> {money(selectedListing.deposit)}</div>
                  <div><strong>Condition:</strong> {selectedListing.condition}</div>
                  <div><strong>Brand / Model:</strong> {selectedListing.brand} {selectedListing.model}</div>
                  <div><strong>Location:</strong> {selectedListing.location}</div>
                  <div><strong>Rental Duration:</strong> {selectedListing.minDays} – {selectedListing.maxDays} days</div>
                  <div><strong>Approval Mode:</strong> {selectedListing.approvalMode === "instant" ? "Instant Booking" : "Manual Approval"}</div>
                </div>

                <div className="inspector-sec">
                  <h4>Description</h4>
                  <p>{selectedListing.description}</p>
                </div>

                {selectedListing.includedAccessories && (
                  <div className="inspector-sec">
                    <h4>Included Accessories</h4>
                    <p>{selectedListing.includedAccessories}</p>
                  </div>
                )}

                {selectedListing.specifications && selectedListing.specifications.length > 0 && (
                  <div className="inspector-sec">
                    <h4>Specifications</h4>
                    <div className="preview-specs-table">
                      {selectedListing.specifications.map((s, idx) => (
                        <div key={idx} className="spec-table-row">
                          <strong>{s.key}</strong>
                          <span>{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedListing.rules && selectedListing.rules.length > 0 && (
                  <div className="inspector-sec">
                    <h4>Rental Rules</h4>
                    <ul>
                      {selectedListing.rules.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="wizard-footer">
              <button className="btn btn-ghost" onClick={() => setSelectedListing(null)}>Close</button>
              <div className="wizard-footer-right">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setRejectingId(selectedListing.id);
                  }}
                >
                  <X size={16} /> Reject Listing
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onApprove(selectedListing.id, "Approved by Admin");
                    setSelectedListing(null);
                  }}
                >
                  <Check size={16} /> Approve &amp; Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON DIALOG */}
      {rejectingId && (
        <div className="wizard-overlay">
          <div className="wizard-modal reject-dialog">
            <div className="wizard-header">
              <div>
                <h2>Reject Listing Submission</h2>
                <p className="wizard-sub">Please select or provide a clear reason so the host can fix issues and resubmit.</p>
              </div>
              <button className="icon-btn" onClick={() => setRejectingId(null)}><X size={18} /></button>
            </div>

            <div className="wizard-body">
              <div className="form-group">
                <label>Standard Rejection Reasons</label>
                <div className="reason-options">
                  {REJECTION_REASONS.map((r, i) => (
                    <label key={i} className="reason-option">
                      <input
                        type="radio"
                        name="rejectionReason"
                        checked={selectedReason === r && !customReason}
                        onChange={() => { setSelectedReason(r); setCustomReason(""); }}
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Custom Reason / Detailed Feedback</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Or enter custom feedback for the owner..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              </div>
            </div>

            <div className="wizard-footer">
              <button className="btn btn-ghost" onClick={() => setRejectingId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleConfirmReject}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
