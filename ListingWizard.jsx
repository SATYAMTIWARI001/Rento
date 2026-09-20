import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud, Plus, Trash2, Check, Star, AlertCircle, ArrowUpRight,
  ChevronLeft, ChevronRight, MapPin, ShieldCheck, Clock, Sparkles,
  MoveLeft, MoveRight, HelpCircle, CheckCircle2, ImageOff, X, Calendar as CalendarIcon
} from "lucide-react";
import { CATEGORIES, CATEGORY_SPECS, SAMPLE_PHOTOS, money } from "./rentoData.js";

const STEPS = [
  { id: 1, label: "Photos", icon: "📸" },
  { id: 2, label: "Details", icon: "📝" },
  { id: 3, label: "Pricing", icon: "💰" },
  { id: 4, label: "Duration", icon: "⏱️" },
  { id: 5, label: "Availability", icon: "📅" },
  { id: 6, label: "Location", icon: "📍" },
  { id: 7, label: "Rules", icon: "📜" },
  { id: 8, label: "Review", icon: "✨" }
];

const PRESET_RULES = [
  "Valid Government ID required at handover",
  "Return in original clean condition",
  "No outdoor use in wet or rainy conditions",
  "Handle with care (delicate precision equipment)",
  "No third-party subleasing or unauthorized sharing",
  "No smoking around the equipment"
];

const CONDITIONS = [
  { value: "Brand New", desc: "Never used, in original packaging" },
  { value: "Like new", desc: "Minimal or zero visible wear, flawless function" },
  { value: "Excellent", desc: "Very light cosmetic signs, 100% operational" },
  { value: "Good", desc: "Normal wear from standard use, works perfectly" },
  { value: "Fair", desc: "Visible wear or scratches, fully functional" }
];

export default function ListingWizard({ isOpen, onClose, onSaveListing, initialData, isEditMode = false }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submittedItem, setSubmittedItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        images: initialData.images || (initialData.img ? [initialData.img] : []),
        primaryImage: initialData.primaryImage || initialData.img || "",
        specifications: initialData.specifications || [],
        rules: initialData.rules || [...PRESET_RULES.slice(0, 3)],
        blockedDates: initialData.blockedDates || []
      };
    }
    return {
      title: "",
      category: "Cameras",
      brand: "",
      model: "",
      condition: "Like new",
      yearPurchased: "2023",
      quantity: 1,
      description: "",
      includedAccessories: "",
      specifications: [],
      images: [SAMPLE_PHOTOS[0].url],
      primaryImage: SAMPLE_PHOTOS[0].url,
      price: 800,
      weekly: 4800,
      monthly: 17500,
      deposit: 3000,
      minDays: 1,
      maxDays: 14,
      approvalMode: "manual",
      blockedDates: [],
      city: "Bengaluru",
      area: "Koramangala",
      pincode: "560034",
      pickupAvailable: true,
      deliveryAvailable: true,
      deliveryRadius: 10,
      deliveryFee: 150,
      pickupInstructions: "Pickup near main entrance. Please bring original government ID for verification.",
      rules: [...PRESET_RULES.slice(0, 3)]
    };
  });

  const [customRuleText, setCustomRuleText] = useState("");
  const [customSpecKey, setCustomSpecKey] = useState("");
  const [customSpecVal, setCustomSpecVal] = useState("");
  const [errors, setErrors] = useState({});
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Auto initialize category specs when category changes
  useEffect(() => {
    if (formData.specifications.length === 0 && CATEGORY_SPECS[formData.category]) {
      const template = CATEGORY_SPECS[formData.category].map(s => ({ key: s.key, value: s.default }));
      setFormData(prev => ({ ...prev, specifications: template }));
    }
  }, [formData.category]);

  // Image Upload Handlers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    
    files.forEach(file => {
      if (!file.type.startsWith("image/")) {
        setErrors(prev => ({ ...prev, images: "Only image files (JPG, PNG, WebP) are allowed." }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, images: "Image size must be under 10MB." }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const url = loadEvt.target.result;
        setFormData(prev => {
          const newImages = [...prev.images, url];
          return {
            ...prev,
            images: newImages,
            primaryImage: prev.primaryImage || url
          };
        });
        setErrors(prev => ({ ...prev, images: null }));
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const addSamplePhoto = (sampleUrl) => {
    setFormData(prev => {
      const newImages = prev.images.includes(sampleUrl) ? prev.images : [...prev.images, sampleUrl];
      return {
        ...prev,
        images: newImages,
        primaryImage: prev.primaryImage || sampleUrl
      };
    });
    setErrors(prev => ({ ...prev, images: null }));
  };

  const setPrimary = (imgUrl) => {
    setFormData(prev => ({
      ...prev,
      primaryImage: imgUrl
    }));
  };

  const moveImage = (index, dir) => {
    setFormData(prev => {
      const arr = [...prev.images];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return prev;
      const tmp = arr[index];
      arr[index] = arr[target];
      arr[target] = tmp;
      return { ...prev, images: arr };
    });
  };

  const removeImage = (imgUrl) => {
    setFormData(prev => {
      const nextImgs = prev.images.filter(x => x !== imgUrl);
      const nextPrimary = prev.primaryImage === imgUrl ? (nextImgs[0] || "") : prev.primaryImage;
      return { ...prev, images: nextImgs, primaryImage: nextPrimary };
    });
  };

  // Step Validation
  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (!formData.images || formData.images.length === 0) {
        errs.images = "At least one product photo is required.";
      }
    } else if (s === 2) {
      if (!formData.title.trim()) errs.title = "Product title is required.";
      if (!formData.description.trim()) errs.description = "Product description is required.";
      if (!formData.brand.trim()) errs.brand = "Brand name is required.";
    } else if (s === 3) {
      if (!formData.price || Number(formData.price) <= 0) errs.price = "Valid daily rental price is required.";
      if (!formData.deposit || Number(formData.deposit) <= 0) errs.deposit = "Security deposit amount is required.";
    } else if (s === 4) {
      if (Number(formData.minDays) <= 0) errs.minDays = "Minimum duration must be at least 1 day.";
      if (Number(formData.maxDays) < Number(formData.minDays)) {
        errs.maxDays = "Maximum duration cannot be less than minimum duration.";
      }
    } else if (s === 6) {
      if (!formData.city.trim()) errs.city = "City is required.";
      if (!formData.area.trim()) errs.area = "Area / Locality is required.";
      if (!formData.pickupAvailable && !formData.deliveryAvailable) {
        errs.logistics = "Choose at least one fulfillment option (Pickup or Delivery).";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(STEPS.length, prev + 1));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const jumpToStep = (targetStep) => {
    setStep(targetStep);
  };

  // Submission
  const handleSubmit = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4) || !validateStep(6)) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    const primaryImg = formData.primaryImage || formData.images[0];
    const newListing = {
      ...formData,
      id: initialData?.id || Date.now(),
      img: primaryImg,
      primaryImage: primaryImg,
      location: `${formData.area}, ${formData.city}`,
      owner: initialData?.owner || "Aditya R.",
      ownerId: initialData?.ownerId || "user_aditya",
      rating: initialData?.rating || 5.0,
      reviews: initialData?.reviews || 0,
      views: initialData?.views || 0,
      favoritesCount: initialData?.favoritesCount || 0,
      rentalCount: initialData?.rentalCount || 0,
      earnings: initialData?.earnings || 0,
      status: isEditMode && initialData?.status === "PUBLISHED" ? "PUBLISHED" : "PENDING_APPROVAL",
      rejectionReason: null,
      approvalHistory: [
        ...(initialData?.approvalHistory || []),
        {
          date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
          action: isEditMode ? "UPDATED" : "SUBMITTED",
          by: "Aditya R. (Owner)",
          note: isEditMode ? "Listing details updated by owner." : "New listing submitted for verification."
        }
      ],
      bookings: initialData?.bookings || [],
      createdAt: initialData?.createdAt || new Date().toISOString()
    };

    onSaveListing(newListing);
    setSubmittedItem(newListing);
    setSubmitted(true);
  };

  return (
    <div className="wizard-overlay">
      <div className="wizard-modal">
        {/* Header */}
        <div className="wizard-header">
          <div>
            <h2>{isEditMode ? "Edit Rental Listing" : "List Your Item for Rent"}</h2>
            <p className="wizard-sub">Step {step} of {STEPS.length}: {STEPS[step - 1].label}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="stepper-nav">
          {STEPS.map((s) => (
            <button
              key={s.id}
              className={"step-chip" + (step === s.id ? " step-chip-active" : "") + (step > s.id ? " step-chip-done" : "")}
              onClick={() => jumpToStep(s.id)}
            >
              <span className="step-num">{step > s.id ? <Check size={12} strokeWidth={3} /> : s.id}</span>
              <span className="step-label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="wizard-body">
          {/* SUCCESS VIEW */}
          {submitted ? (
            <div className="wizard-success">
              <div className="success-icon">
                <CheckCircle2 size={54} />
              </div>
              <h3>Listing Successfully Submitted!</h3>
              <p>
                <strong>{submittedItem?.title}</strong> is now in the <strong>PENDING APPROVAL</strong> queue.
                Our moderation team reviews listings within 1-2 hours to ensure trust and safety across the community.
              </p>

              <div className="timeline-box">
                <div className="timeline-step timeline-done">
                  <div className="t-dot"><Check size={12} /></div>
                  <div>
                    <strong>1. Submitted</strong>
                    <span>Listing photos &amp; details saved</span>
                  </div>
                </div>
                <div className="timeline-step timeline-active">
                  <div className="t-dot"><Clock size={12} /></div>
                  <div>
                    <strong>2. Verification in Progress</strong>
                    <span>Trust &amp; safety review (Usually 1-2 hrs)</span>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="t-dot" />
                  <div>
                    <strong>3. Published to Marketplace</strong>
                    <span>Renters nearby can request and book</span>
                  </div>
                </div>
              </div>

              <div className="success-actions">
                <button className="btn btn-primary" onClick={onClose}>
                  Go to My Listings
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: PHOTOS */}
              {step === 1 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Upload High-Resolution Photos</h3>
                    <p>Rentals with 3+ well-lit photos get 4x more requests. The first photo will be used as your primary marketplace cover.</p>
                  </div>

                  {errors.images && (
                    <div className="alert-box alert-error">
                      <AlertCircle size={16} /> {errors.images}
                    </div>
                  )}

                  <div
                    className={"upload-dropzone" + (dragOver ? " dropzone-active" : "")}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud size={40} className="upload-icon" />
                    <div className="dropzone-text">
                      <strong>Drag &amp; drop photos here</strong> or <span>browse from your device</span>
                    </div>
                    <small>Supports JPG, PNG, WebP up to 10MB each</small>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                  </div>

                  {/* Sample presets for quick testing */}
                  <div className="sample-photos-bar">
                    <span className="sample-label"><Sparkles size={14} /> Quick Demo Photos:</span>
                    <div className="sample-chips">
                      {SAMPLE_PHOTOS.slice(0, 6).map((sp) => (
                        <button
                          type="button"
                          key={sp.label}
                          className="btn-sample-chip"
                          onClick={() => addSamplePhoto(sp.url)}
                        >
                          + {sp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Gallery & Reorder Controls */}
                  {formData.images.length > 0 && (
                    <div className="wizard-photo-grid">
                      {formData.images.map((imgUrl, idx) => {
                        const isPrimary = (formData.primaryImage === imgUrl) || (!formData.primaryImage && idx === 0);
                        return (
                          <div key={idx} className={"photo-item" + (isPrimary ? " photo-item-primary" : "")}>
                            <img src={imgUrl} alt={`Upload ${idx + 1}`} />
                            {isPrimary && (
                              <span className="primary-tag"><Star size={11} fill="currentColor" /> Cover Photo</span>
                            )}
                            <div className="photo-actions">
                              {!isPrimary && (
                                <button type="button" className="photo-btn" title="Set as primary cover" onClick={() => setPrimary(imgUrl)}>
                                  <Star size={13} /> Cover
                                </button>
                              )}
                              {idx > 0 && (
                                <button type="button" className="photo-btn" title="Move left" onClick={() => moveImage(idx, -1)}>
                                  <MoveLeft size={13} />
                                </button>
                              )}
                              {idx < formData.images.length - 1 && (
                                <button type="button" className="photo-btn" title="Move right" onClick={() => moveImage(idx, 1)}>
                                  <MoveRight size={13} />
                                </button>
                              )}
                              <button type="button" className="photo-btn photo-btn-delete" title="Delete" onClick={() => removeImage(imgUrl)}>
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: BASIC DETAILS */}
              {step === 2 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Basic Product Information</h3>
                    <p>Describe your gear clearly so renters know exactly what to expect.</p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group col-span-2">
                      <label>Product Title *</label>
                      <input
                        type="text"
                        className={"form-input" + (errors.title ? " input-err" : "")}
                        placeholder="e.g. Sony A7 III Mirrorless Kit"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                      {errors.title && <span className="field-err">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value, specifications: [] })}
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Brand *</label>
                      <input
                        type="text"
                        className={"form-input" + (errors.brand ? " input-err" : "")}
                        placeholder="e.g. Sony, Trek, Apple"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      />
                      {errors.brand && <span className="field-err">{errors.brand}</span>}
                    </div>

                    <div className="form-group">
                      <label>Model</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. ILCE-7M3 or Marlin 7"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Year Purchased (Optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 2023"
                        value={formData.yearPurchased}
                        onChange={(e) => setFormData({ ...formData, yearPurchased: e.target.value })}
                      />
                    </div>

                    {/* Condition Selector */}
                    <div className="form-group col-span-2">
                      <label>Product Condition *</label>
                      <div className="condition-grid">
                        {CONDITIONS.map((c) => (
                          <div
                            key={c.value}
                            className={"condition-card" + (formData.condition === c.value ? " condition-active" : "")}
                            onClick={() => setFormData({ ...formData, condition: c.value })}
                          >
                            <strong>{c.value}</strong>
                            <span>{c.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="form-group col-span-2">
                      <label>Description *</label>
                      <textarea
                        className={"form-textarea" + (errors.description ? " input-err" : "")}
                        rows={4}
                        placeholder="Describe key features, ideal use cases, and tips for renters..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                      {errors.description && <span className="field-err">{errors.description}</span>}
                    </div>

                    <div className="form-group col-span-2">
                      <label>Included Accessories &amp; Items</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 2x batteries, dual charger, carrying strap, 64GB SD card, travel bag"
                        value={formData.includedAccessories}
                        onChange={(e) => setFormData({ ...formData, includedAccessories: e.target.value })}
                      />
                    </div>

                    {/* Category-Specific Dynamic Specifications */}
                    <div className="form-group col-span-2 dynamic-specs-box">
                      <div className="specs-header">
                        <h4>{formData.category} Specifications</h4>
                        <small>Custom tailored for this category</small>
                      </div>

                      <div className="specs-list">
                        {formData.specifications.map((spec, idx) => (
                          <div key={idx} className="spec-row">
                            <span className="spec-key">{spec.key}:</span>
                            <input
                              type="text"
                              className="form-input spec-input"
                              value={spec.value}
                              onChange={(e) => {
                                const next = [...formData.specifications];
                                next[idx].value = e.target.value;
                                setFormData({ ...formData, specifications: next });
                              }}
                            />
                            <button
                              type="button"
                              className="icon-btn-sm"
                              onClick={() => {
                                const next = formData.specifications.filter((_, i) => i !== idx);
                                setFormData({ ...formData, specifications: next });
                              }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add custom spec row */}
                      <div className="add-spec-bar">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Feature (e.g. Resolution)"
                          value={customSpecKey}
                          onChange={(e) => setCustomSpecKey(e.target.value)}
                        />
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Value (e.g. 4K 60fps)"
                          value={customSpecVal}
                          onChange={(e) => setCustomSpecVal(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => {
                            if (customSpecKey.trim() && customSpecVal.trim()) {
                              setFormData({
                                ...formData,
                                specifications: [...formData.specifications, { key: customSpecKey.trim(), value: customSpecVal.trim() }]
                              });
                              setCustomSpecKey("");
                              setCustomSpecVal("");
                            }
                          }}
                        >
                          <Plus size={14} /> Add Spec
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: RENTAL PRICING */}
              {step === 3 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Rental Pricing &amp; Host Earnings</h3>
                    <p>Transparent pricing. No hidden costs. Set your rate and see exactly what you will take home.</p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Price per Day (₹) *</label>
                      <div className="input-prefix">
                        <span>₹</span>
                        <input
                          type="number"
                          className={"form-input" + (errors.price ? " input-err" : "")}
                          min="50"
                          step="50"
                          value={formData.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setFormData({
                              ...formData,
                              price: val,
                              weekly: Math.round(val * 6),
                              monthly: Math.round(val * 22)
                            });
                          }}
                        />
                      </div>
                      {errors.price && <span className="field-err">{errors.price}</span>}
                    </div>

                    <div className="form-group">
                      <label>Price per Week (₹)</label>
                      <div className="input-prefix">
                        <span>₹</span>
                        <input
                          type="number"
                          className="form-input"
                          value={formData.weekly}
                          onChange={(e) => setFormData({ ...formData, weekly: Number(e.target.value) })}
                        />
                      </div>
                      <small>Suggested 15% discount for 7+ days</small>
                    </div>

                    <div className="form-group">
                      <label>Price per Month (₹, Optional)</label>
                      <div className="input-prefix">
                        <span>₹</span>
                        <input
                          type="number"
                          className="form-input"
                          value={formData.monthly}
                          onChange={(e) => setFormData({ ...formData, monthly: Number(e.target.value) })}
                        />
                      </div>
                      <small>For long-term rentals (30+ days)</small>
                    </div>

                    <div className="form-group">
                      <label>Refundable Security Deposit (₹) *</label>
                      <div className="input-prefix">
                        <span>₹</span>
                        <input
                          type="number"
                          className={"form-input" + (errors.deposit ? " input-err" : "")}
                          min="0"
                          step="100"
                          value={formData.deposit}
                          onChange={(e) => setFormData({ ...formData, deposit: Number(e.target.value) })}
                        />
                      </div>
                      {errors.deposit && <span className="field-err">{errors.deposit}</span>}
                    </div>
                  </div>

                  {/* Fee Calculator Card */}
                  <div className="calculator-card">
                    <div className="calc-header">
                      <h4>Earnings Breakdown per Rental Day</h4>
                      <span className="calc-badge">8% Platform Fee</span>
                    </div>

                    <div className="calc-row">
                      <span>Renter daily rental rate:</span>
                      <strong>{money(formData.price)} / day</strong>
                    </div>
                    <div className="calc-row">
                      <span>Rento service &amp; protection fee (8%):</span>
                      <span className="calc-fee">- {money(Math.round(formData.price * 0.08))}</span>
                    </div>
                    <div className="calc-row calc-highlight">
                      <span>Your estimated net earnings:</span>
                      <strong className="calc-takehome">
                        {money(Math.round(formData.price * 0.92))} <small>/ day</small>
                      </strong>
                    </div>

                    <div className="deposit-notice">
                      <ShieldCheck size={16} />
                      <div>
                        <strong>Security deposit of {money(formData.deposit)} is held separately</strong>
                        <p>Deposits are never commingled with rental income and are returned to the renter once you confirm safe handover.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: RENTAL DURATION */}
              {step === 4 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Rental Duration &amp; Approval Settings</h3>
                    <p>Choose your rental window boundaries and how booking requests are handled.</p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Minimum Rental Days *</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        className={"form-input" + (errors.minDays ? " input-err" : "")}
                        value={formData.minDays}
                        onChange={(e) => setFormData({ ...formData, minDays: Number(e.target.value) })}
                      />
                      {errors.minDays && <span className="field-err">{errors.minDays}</span>}
                    </div>

                    <div className="form-group">
                      <label>Maximum Rental Days *</label>
                      <input
                        type="number"
                        min="1"
                        max="90"
                        className={"form-input" + (errors.maxDays ? " input-err" : "")}
                        value={formData.maxDays}
                        onChange={(e) => setFormData({ ...formData, maxDays: Number(e.target.value) })}
                      />
                      {errors.maxDays && <span className="field-err">{errors.maxDays}</span>}
                    </div>

                    <div className="form-group col-span-2">
                      <label>Booking Approval Mode</label>
                      <div className="approval-options">
                        <div
                          className={"approval-card" + (formData.approvalMode === "manual" ? " approval-card-active" : "")}
                          onClick={() => setFormData({ ...formData, approvalMode: "manual" })}
                        >
                          <div className="approval-radio">
                            {formData.approvalMode === "manual" && <div className="radio-dot" />}
                          </div>
                          <div>
                            <strong>Manual Approval (Recommended)</strong>
                            <p>You review and approve each rental request before the booking is confirmed. Ideal for valuable or delicate equipment.</p>
                          </div>
                        </div>

                        <div
                          className={"approval-card" + (formData.approvalMode === "instant" ? " approval-card-active" : "")}
                          onClick={() => setFormData({ ...formData, approvalMode: "instant" })}
                        >
                          <div className="approval-radio">
                            {formData.approvalMode === "instant" && <div className="radio-dot" />}
                          </div>
                          <div>
                            <strong>Instant Booking</strong>
                            <p>Renters can book instantly without waiting for your response, as long as dates are open in your availability calendar.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: AVAILABILITY CALENDAR */}
              {step === 5 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Set Availability &amp; Block Dates</h3>
                    <p>Click dates to block them out (e.g. days when you need the item yourself). Blocked dates will not be bookable by renters.</p>
                  </div>

                  <div className="calendar-block">
                    <div className="calendar-top">
                      <h4>September – October 2026</h4>
                      <div className="cal-legend">
                        <span><span className="dot dot-avail" /> Available</span>
                        <span><span className="dot dot-blocked" /> Blocked by you</span>
                      </div>
                    </div>

                    <div className="mini-cal-grid">
                      {Array.from({ length: 30 }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `2026-09-${day < 10 ? "0" + day : day}`;
                        const isBlocked = formData.blockedDates.includes(dateStr);

                        return (
                          <button
                            type="button"
                            key={dateStr}
                            className={"cal-day-cell" + (isBlocked ? " day-blocked" : " day-avail")}
                            onClick={() => {
                              setFormData(prev => {
                                const next = isBlocked
                                  ? prev.blockedDates.filter(d => d !== dateStr)
                                  : [...prev.blockedDates, dateStr];
                                return { ...prev, blockedDates: next };
                              });
                            }}
                          >
                            <span className="cell-day">{day}</span>
                            <span className="cell-status">{isBlocked ? "Blocked" : "Open"}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="cal-actions">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => {
                          const weekends = ["2026-09-19", "2026-09-20", "2026-09-26", "2026-09-27"];
                          setFormData(prev => ({
                            ...prev,
                            blockedDates: Array.from(new Set([...prev.blockedDates, ...weekends]))
                          }));
                        }}
                      >
                        Block All Weekends
                      </button>

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => setFormData(prev => ({ ...prev, blockedDates: [] }))}
                      >
                        Clear All Blocked Dates
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: LOCATION & PICKUP */}
              {step === 6 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Location &amp; Handover Logistics</h3>
                    <p>Renters search by locality. Your exact address is never shown publicly.</p>
                  </div>

                  {errors.logistics && (
                    <div className="alert-box alert-error">
                      <AlertCircle size={16} /> {errors.logistics}
                    </div>
                  )}

                  <div className="form-grid">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        className={"form-input" + (errors.city ? " input-err" : "")}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Bengaluru, Mumbai, Pune"
                      />
                    </div>

                    <div className="form-group">
                      <label>Locality / Area *</label>
                      <input
                        type="text"
                        className={"form-input" + (errors.area ? " input-err" : "")}
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="e.g. Koramangala, Baner, Bandra"
                      />
                    </div>

                    <div className="form-group">
                      <label>Pincode</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="e.g. 560034"
                      />
                    </div>

                    {/* Privacy Guarantee Box */}
                    <div className="form-group col-span-2 privacy-box">
                      <ShieldCheck size={18} />
                      <div>
                        <strong>Privacy Safeguard</strong>
                        <p>Public listings only display approximate locality (e.g. &quot;{formData.area || "Area"}, {formData.city || "City"}&quot;). Exact pickup instructions are only revealed to a verified renter after you confirm their booking.</p>
                      </div>
                    </div>

                    {/* Fulfillment Options */}
                    <div className="form-group col-span-2">
                      <label>Fulfillment Options *</label>
                      <div className="fulfillment-grid">
                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={formData.pickupAvailable}
                            onChange={(e) => setFormData({ ...formData, pickupAvailable: e.target.checked })}
                          />
                          <div>
                            <strong>Self Pickup Available</strong>
                            <span>Renter collects item from your location</span>
                          </div>
                        </label>

                        <label className="checkbox-row">
                          <input
                            type="checkbox"
                            checked={formData.deliveryAvailable}
                            onChange={(e) => setFormData({ ...formData, deliveryAvailable: e.target.checked })}
                          />
                          <div>
                            <strong>Delivery Available</strong>
                            <span>You or a courier deliver to renter</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {formData.deliveryAvailable && (
                      <>
                        <div className="form-group">
                          <label>Delivery Fee (₹)</label>
                          <div className="input-prefix">
                            <span>₹</span>
                            <input
                              type="number"
                              className="form-input"
                              value={formData.deliveryFee}
                              onChange={(e) => setFormData({ ...formData, deliveryFee: Number(e.target.value) })}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Delivery Radius (km)</label>
                          <input
                            type="number"
                            className="form-input"
                            value={formData.deliveryRadius}
                            onChange={(e) => setFormData({ ...formData, deliveryRadius: Number(e.target.value) })}
                          />
                        </div>
                      </>
                    )}

                    <div className="form-group col-span-2">
                      <label>Private Handover Instructions (Revealed Post-Booking)</label>
                      <textarea
                        className="form-textarea"
                        rows={3}
                        placeholder="e.g. Lobby entrance behind security desk. Please carry original government ID."
                        value={formData.pickupInstructions}
                        onChange={(e) => setFormData({ ...formData, pickupInstructions: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: RENTAL RULES */}
              {step === 7 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Rental Rules &amp; Agreement</h3>
                    <p>Set clear expectations for the renter to ensure your gear is returned in top shape.</p>
                  </div>

                  <div className="rules-section">
                    <h4>Recommended Preset Rules</h4>
                    <div className="preset-rules-grid">
                      {PRESET_RULES.map((rule) => {
                        const active = formData.rules.includes(rule);
                        return (
                          <button
                            type="button"
                            key={rule}
                            className={"rule-chip" + (active ? " rule-chip-active" : "")}
                            onClick={() => {
                              setFormData(prev => {
                                const next = active
                                  ? prev.rules.filter(r => r !== rule)
                                  : [...prev.rules, rule];
                                return { ...prev, rules: next };
                              });
                            }}
                          >
                            <span className="rule-check">{active ? <Check size={12} strokeWidth={3} /> : "+"}</span>
                            {rule}
                          </button>
                        );
                      })}
                    </div>

                    <h4 style={{ marginTop: 24 }}>Custom Rules</h4>
                    <div className="custom-rule-bar">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Add a custom rule (e.g. Must carry specialized rain cover)"
                        value={customRuleText}
                        onChange={(e) => setCustomRuleText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && customRuleText.trim()) {
                            e.preventDefault();
                            setFormData(prev => ({ ...prev, rules: [...prev.rules, customRuleText.trim()] }));
                            setCustomRuleText("");
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => {
                          if (customRuleText.trim()) {
                            setFormData(prev => ({ ...prev, rules: [...prev.rules, customRuleText.trim()] }));
                            setCustomRuleText("");
                          }
                        }}
                      >
                        <Plus size={15} /> Add Rule
                      </button>
                    </div>

                    <div className="active-rules-list">
                      {formData.rules.map((rule, idx) => (
                        <div key={idx} className="active-rule-item">
                          <span>• {rule}</span>
                          <button
                            type="button"
                            className="icon-btn-sm"
                            onClick={() => setFormData(prev => ({ ...prev, rules: prev.rules.filter((_, i) => i !== idx) }))}
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: REVIEW & PREVIEW */}
              {step === 8 && (
                <div className="step-content">
                  <div className="step-intro">
                    <h3>Review Your Listing Before Submission</h3>
                    <p>This is exactly how renters will see your listing on the marketplace. You can click &quot;Edit&quot; on any section to make quick adjustments.</p>
                  </div>

                  <div className="preview-container">
                    <div className="preview-card">
                      {/* Photos section */}
                      <div className="preview-section">
                        <div className="preview-sec-head">
                          <h4>Product Photos ({formData.images.length})</h4>
                          <button className="preview-edit-btn" onClick={() => jumpToStep(1)}>Edit</button>
                        </div>
                        <div className="preview-gallery">
                          <img src={formData.primaryImage || formData.images[0]} alt="Primary Cover" className="preview-main-img" />
                          <div className="preview-thumbs">
                            {formData.images.map((img, i) => (
                              <img key={i} src={img} alt="" className="preview-thumb-img" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Details section */}
                      <div className="preview-section">
                        <div className="preview-sec-head">
                          <h4>Details &amp; Specifications</h4>
                          <button className="preview-edit-btn" onClick={() => jumpToStep(2)}>Edit</button>
                        </div>
                        <h2 className="preview-title">{formData.title || "Untitled Product"}</h2>
                        <div className="preview-meta">
                          <span className="pill pill-grey">{formData.category}</span>
                          <span className="pill pill-amber">Condition: {formData.condition}</span>
                          <span><MapPin size={13} /> {formData.area}, {formData.city}</span>
                        </div>
                        <p className="preview-desc">{formData.description}</p>

                        {formData.includedAccessories && (
                          <p className="preview-acc"><strong>Included:</strong> {formData.includedAccessories}</p>
                        )}

                        {formData.specifications.length > 0 && (
                          <div className="preview-specs-table">
                            {formData.specifications.map((s, i) => (
                              <div key={i} className="spec-table-row">
                                <strong>{s.key}</strong>
                                <span>{s.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Pricing & Logistics section */}
                      <div className="preview-section">
                        <div className="preview-sec-head">
                          <h4>Pricing &amp; Handover</h4>
                          <button className="preview-edit-btn" onClick={() => jumpToStep(3)}>Edit</button>
                        </div>
                        <div className="preview-pricing-grid">
                          <div><span>Daily Rate:</span><strong>{money(formData.price)}</strong></div>
                          <div><span>Weekly Rate:</span><strong>{money(formData.weekly)}</strong></div>
                          <div><span>Refundable Deposit:</span><strong>{money(formData.deposit)}</strong></div>
                          <div><span>Rental Duration:</span><strong>{formData.minDays} – {formData.maxDays} days</strong></div>
                          <div><span>Fulfillment:</span><strong>{formData.pickupAvailable ? "Self Pickup" : ""}{formData.pickupAvailable && formData.deliveryAvailable ? " + " : ""}{formData.deliveryAvailable ? `Delivery (₹${formData.deliveryFee})` : ""}</strong></div>
                          <div><span>Approval Mode:</span><strong>{formData.approvalMode === "instant" ? "Instant Booking" : "Manual Approval"}</strong></div>
                        </div>
                      </div>

                      {/* Rules section */}
                      <div className="preview-section">
                        <div className="preview-sec-head">
                          <h4>Rental Rules ({formData.rules.length})</h4>
                          <button className="preview-edit-btn" onClick={() => jumpToStep(7)}>Edit</button>
                        </div>
                        <ul className="preview-rules-list">
                          {formData.rules.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!submitted && (
          <div className="wizard-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={step === 1 ? onClose : handleBack}
            >
              {step === 1 ? "Cancel" : <><ChevronLeft size={16} /> Back</>}
            </button>

            <div className="wizard-footer-right">
              {step < STEPS.length ? (
                <button type="button" className="btn btn-primary" onClick={handleNext}>
                  Next: {STEPS[step].label} <ChevronRight size={16} />
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Submit for Approval <ArrowUpRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
