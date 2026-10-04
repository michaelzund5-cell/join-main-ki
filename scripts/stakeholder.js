"use strict";

const REQUEST_DAILY_LIMIT = 10;
const REQUEST_EMAIL = window.JOIN_CONFIG?.FEATURE_REQUEST_EMAIL || "diepausenclowns@gmail.com";
const REQUEST_BASE_URL = window.JOIN_CONFIG?.BASE_URL || "";

/** Returns today's Zurich date key in YYYY-MM-DD form. */
function getRequestDateKey() {
   return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Zurich",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
   }).format(new Date());
}

/** Converts a Firebase counter value into a safe non-negative integer. */
function normalizeRequestCount(value) {
   if (typeof value === "number") return Math.max(0, Math.floor(value));
   if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return Math.max(0, Math.floor(parsed));
   }
   if (value && typeof value === "object") {
      const parsed = Number(value.count ?? value.value);
      if (Number.isFinite(parsed)) return Math.max(0, Math.floor(parsed));
   }
   return 0;
}

/** Returns true when a timestamp belongs to today in Europe/Zurich. */
function isTodayInZurich(value) {
   const timestamp = Number(value);
   if (!Number.isFinite(timestamp) || timestamp <= 0) return false;
   return getRequestDateKey() === new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Zurich",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
   }).format(new Date(timestamp));
}

/** Derives today's request count from the actual email-created tasks. */
async function loadTaskDerivedRequestCount() {
   const response = await fetch(`${REQUEST_BASE_URL}tasks.json`, { cache: "no-store" });
   if (!response.ok) throw new Error(`HTTP ${response.status}`);
   const rawTasks = await response.json();
   const tasks = rawTasks && typeof rawTasks === "object" ? Object.values(rawTasks) : [];
   return tasks.filter((task) => {
      if (!task || typeof task !== "object") return false;
      const isEmailRequest = task.source === "email" || task.aiGenerated === true;
      const createdAt = task.createdAt ?? task.id;
      return isEmailRequest && isTodayInZurich(createdAt);
   }).length;
}

/** Loads the request counter written by the n8n workflow. */
async function loadRequestCount() {
   if (!REQUEST_BASE_URL) return 0;
   try {
      const [counterResult, taskResult] = await Promise.allSettled([
         fetch(`${REQUEST_BASE_URL}emailRequestUsage/${getRequestDateKey()}.json`, {
            cache: "no-store",
         }).then(async (response) => {
            if (!response.ok) throw new Error(`Counter HTTP ${response.status}`);
            return normalizeRequestCount(await response.json());
         }),
         loadTaskDerivedRequestCount(),
      ]);
      const storedCount = counterResult.status === "fulfilled" ? counterResult.value : 0;
      const derivedCount = taskResult.status === "fulfilled" ? taskResult.value : 0;
      return Math.max(storedCount, derivedCount);
   } catch (error) {
      console.warn("Daily request counter could not be loaded:", error);
      return 0;
   }
}

/** Creates one identical Gmail compose URL for desktop and mobile layouts. */
function buildRequestEmailUrl() {
   const subject = encodeURIComponent("Join feature request");
   const body = encodeURIComponent("Describe your request:\n\nSubtasks (optional):\n- \n- \n\nDeadline (optional):");
   const recipient = encodeURIComponent(REQUEST_EMAIL);
   return `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
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
   const emailUrl = buildRequestEmailUrl();
   document.getElementById("createEmailRequest")?.setAttribute("href", emailUrl);
   document.getElementById("sendManualEmail")?.setAttribute("href", emailUrl);
   renderRequestState(await loadRequestCount());
}

document.addEventListener("DOMContentLoaded", initializeStakeholderPage);

/** Refreshes the counter whenever the user returns from the mail application. */
async function refreshRequestState() {
   renderRequestState(await loadRequestCount());
}

window.addEventListener("focus", refreshRequestState);
window.addEventListener("pageshow", refreshRequestState);
document.addEventListener("visibilitychange", () => {
   if (document.visibilityState === "visible") refreshRequestState();
});
