const isInTemplates = window.location.pathname.includes("/templates/");
const assetBasePath = isInTemplates ? "../assets/" : "./assets/";

/**
 * Initializes legal information navigation handlers.
 * @returns {void} Nothing.
 */
function initLegalInformation() {
    document.addEventListener("DOMContentLoaded", transformNavbarForLogin);
}

/**
 * Prepares the login legal navigation flow.
 * @returns {boolean} Always returns true.
 */
function prepareLoginLegalNavigation() {
    return true;
}

window.prepareLoginLegalNavigation = prepareLoginLegalNavigation;

/**
 * Transforms the navbar for login.
 * @returns {void} Nothing.
 */
function transformNavbarForLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get("from");
    const isPublicEntry = from === "welcome" || from === "stakeholder";
    if (from === "login" || from === "signup" || isPublicEntry) {
        renderPublicLegalNavigation();
        hideHeaderElements();
        centerHeaderContent();
        document.body.classList.add("legal-page--public");
    }
}

/**
 * Renders the public navigation used on legal pages.
 * @returns {void} Nothing.
 */
function renderPublicLegalNavigation() {
    const navMenu = document.querySelector(".navBar__menu");
    if (!navMenu) return;

    const isPrivacy = window.location.pathname.toLowerCase().includes("privacy-policy");
    const isLegal = window.location.pathname.toLowerCase().includes("legalnotice");
    navMenu.innerHTML = `
        <ul class="navBar__list navBar__list--public list">
            <li><a class="navBar__public-link" href="./login.html">Log In</a></li>
            <li><a class="navBar__public-link${isPrivacy ? " navBar__quicklink--active" : ""}" href="./privacy-Policy.html?from=login">Privacy Policy</a></li>
            <li><a class="navBar__public-link${isLegal ? " navBar__quicklink--active" : ""}" href="./legalnotice.html?from=login">Legal Notice</a></li>
        </ul>`;
}

/**
 * Returns the safe public page for the legal back button.
 *
 * @param {string|null} from - The navigation source.
 * @param {boolean} isFromSignup - Whether the source is signup.
 * @returns {string} The previous page URL.
 */
function getLegalPreviousPage(from, isFromSignup) {
    if (from === "stakeholder") return "./stakeholder.html";
    if (from === "welcome") return "../index.html";
    if (isFromSignup) return "./signup.html";
    return isInTemplates ? "./login.html" : "./templates/login.html";
}

/**
 * Replaces the nav menu with back button.
 *
 * @param {string} buttonText - The button text.
 * @param {string} previousPage - The previous page path.
 * @returns {void} Nothing.
 */
function replaceNavMenuWithBackButton(buttonText, previousPage) {
    const navMenu = document.querySelector(".navBar__menu");
    if (!navMenu) return;

    navMenu.innerHTML = legalBackToLoginButtonHTML(assetBasePath, buttonText);

    const backButton = document.getElementById("back-to-login");
    if (!backButton) return;
    backButton.dataset.previousPage = previousPage;
    backButton.addEventListener("click", handleBackToLoginClick);
}

/**
 * Handles back-to-login click.
 *
 * @param {MouseEvent} event - The click event.
 * @returns {void} Nothing.
 */
function handleBackToLoginClick(event) {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    const previousPage = target.dataset.previousPage;
    if (!previousPage) return;
    location.href = previousPage;
}

/**
 * Adds the hidden class.
 *
 * @param {Element} item - The item.
 * @returns {void} Nothing.
 */
function addHiddenClass(item) {
    item.classList.add("d-none");
}

/**
 * Hides the nav buttons and user icon.
 * @returns {void} Nothing.
 */
function hideHeaderElements() {
    const navQuicklinks = document.querySelectorAll(".navBar__quicklink");
    const helpIcon = document.getElementById("help");
    const userInitials = document.getElementById("login__initials");

    navQuicklinks.forEach(addHiddenClass);
    helpIcon?.classList.add("d-none");
    userInitials?.classList.add("d-none");
}

/**
 * Centers the header content.
 * @returns {void} Nothing.
 */
function centerHeaderContent() {
    const header = document.querySelector(".header");
    const topBar = document.querySelector(".topBar");
    if (header) {
        header.style.display = "flex";
        header.style.alignItems = "center";
    }
    if (topBar) {
        topBar.style.display = "flex";
        topBar.style.justifyContent = "center";
    }
}

initLegalInformation();
