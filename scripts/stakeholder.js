"use strict";

const REQUEST_DAILY_LIMIT = 10;
const REQUEST_EMAIL = window.JOIN_CONFIG?.FEATURE_REQUEST_EMAIL || "diepausenclowns@gmail.com";
const REQUEST_BASE_URL = window.JOIN_CONFIG?.BASE_URL || "";

/** Returns today's local date key in YYYY-MM-DD form. */
function getRequestDateKey() {
   const now = new Date();
   const offset = now.getTimezoneOffset() * 60000;
   return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** Converts a Firebase counter value into a safe non-negative integer. */
function normalizeRequestCount(value) {
   if (typeof value === "number") return Math.max(0, Math.floor(value));
   if (value && typeof value === "object") return Object.keys(value).length;
   return 0;
}

/** Loads the request counter written by the n8n workflow. */
async function loadRequestCount() {
   if (!REQUEST_BASE_URL) return 0;
   try {
      const response = await fetch(`${REQUEST_BASE_URL}emailRequestUsage/${getRequestDateKey()}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return normalizeRequestCount(await response.json());
   } catch (error) {
      console.warn("Daily request counter could not be loaded:", error);
      return 0;
   }
}

/** Creates the mailto address used for both request states. */
function buildRequestMailto() {
   const subject = encodeURIComponent("Join feature request");
   const body = encodeURIComponent("Describe your request:\n\nSubtasks (optional):\n- \n- \n\nDeadline (optional):");
   return `mailto:${REQUEST_EMAIL}?subject=${subject}&body=${body}`;
}

/** Renders the available or reached-limit state. */
function renderRequestState(count) {
   const safeCount = Math.min(count, REQUEST_DAILY_LIMIT);
   const limitReached = safeCount >= REQUEST_DAILY_LIMIT;
   const counter = document.getElementById("requestCounter");
   const available = document.getElementById("requestAvailable");
   const reached = document.getElementById("requestLimitReached");
   if (counter) {
      counter.textContent = `${safeCount} of ${REQUEST_DAILY_LIMIT} requests used today`;
      counter.classList.toggle("stakeholder-counter--limit", limitReached);
   }
   if (available) available.hidden = limitReached;
   if (reached) reached.hidden = !limitReached;
}

/** Initializes request links and the daily usage state. */
async function initializeStakeholderPage() {
   const mailto = buildRequestMailto();
   document.getElementById("createEmailRequest")?.setAttribute("href", mailto);
   document.getElementById("sendManualEmail")?.setAttribute("href", mailto);
   renderRequestState(await loadRequestCount());
}

document.addEventListener("DOMContentLoaded", initializeStakeholderPage);
