function log(...args) {
  console.log("conventional comments", ...args);
}

// log();

const config = {
  commentFormHeadClass: "comment-form-head",
  conventionalCommentClass: "conventionalcomments__container",
};

/**
 * Get all the github PR comment form containers which we want to add conventional comment
 * components after
 */
function getAllPrCommentFormHead(element = document) {
  const elements = element.querySelectorAll(`.${config.commentFormHeadClass}`);

  // log("getAllPrCommentInputs", elements);

  return elements;
}

/**
 * Creates a new one of our conventional comment components
 */
function getConventionalCommentElement() {
  const element = document.createElement("div");

  element.className = config.conventionalCommentClass;

  element.innerHTML = `
    <div style="margin: 10px;">
      <p>
        Use 
        <a href="https://conventionalcomments.org/" target="_blank">Conventional Comments</a>
      </p>
    </div>
  `;

  return element;
}

/**
 * Injects a new conventional comments component after the given element
 */
function injectConventionalCommentsAfterElement(element) {
  // log("injectConventionalCommentsAfterElement");

  const conventionalCommentElement = getConventionalCommentElement();

  element.after(conventionalCommentElement);
}

/**
 * Returns true if a conventional comment component already exists in the given components parent
 */
function getDoesParentHaveConventionalComment(element) {
  const parent = element.parentNode;

  if (!parent) return false;

  return !!element.parentNode.querySelector(
    `.${config.conventionalCommentClass}`
  );
}

/**
 * Inject conventional comment components inside all the given elements
 */
function injectAllConventionalCommentComponents(elements) {
  // Go through each element we want to add conventional comments to
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    // If the parent element already has one of our conventional comments in it, don't add another
    // one
    if (getDoesParentHaveConventionalComment(element)) return;

    // Inject the conventional comments
    injectConventionalCommentsAfterElement(element);
  }
}

function init() {
  // log("init");

  // On each loop see if there's any new elements we should add conventional comment components to
  setInterval(() => {
    const elements = getAllPrCommentFormHead();

    // There aren't any elements to add conventional comments to, so let's stop
    if (!elements || elements.length <= 0) {
      return;
    }

    injectAllConventionalCommentComponents(elements);
  }, 500);
}

init();
