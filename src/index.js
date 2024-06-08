let isString = value => typeof value === 'string';

let lang = "en"

function info_open(id) {document.getElementById(id).style.display = "block"}
function info_close(id) {document.getElementById(id).style.display = "none"}
function openInNewTab(url) {window.open(url, '_blank').focus()}

function closeElem(event, id, elem) { // Close if click outside of modal                     
  if (event.target.classList.contains(elem)) { document.getElementById(id).style.display = 'none'}
}

function makeDocumentModal(id, content) {
  new Elem({tag: 'div', attrs: {className: 'modal',id:id, onmousedown: function(event) {
    closeElem(event, id, 'modal')}},children:[content],parent:document.body});
}

function headerWithClose(id, title, style) {
  return new Elem({tag:'header',attrs:{className:`theme-l1 ${style}`},children:[
    {tag:'p',attrs:{textContent:title}},
    {tag:'div',attrs:{className:'button display-topright button-extra',onclick:()=>info_close(id)},children:[
      {tag:'i',attrs:{className:'fa fa-remove'}}]}]}).elem;
}

function createFooter(content) {
  const footer = new Elem({tag: 'footer', attrs: {className: 'theme-l1 modal-footer font-medium'}}).elem;
  if (typeof content === 'object' && !(content instanceof Array)) {
    for (const key in content) { // If footerContent is an object (not an array), handle as key-value pairs for links
      new Elem({tag: 'p', attrs: {className: 'font-medium'}, children:[
        {tag:'a',attrs:{className:'button padding-top-bottom button-extra',textContent: key,
          onclick: () => openInNewTab(footerContent[key])}}], parent: footer});
    }
  } 
  else { new Elem({tag:'p',attrs:{className: 'font-medium', textContent:footerContent}, parent:footer}) } 
  return footer
}

function createModal(id, title, content, footerContent) {
  const modalContent = new Elem({tag:'div',attrs:{className: 'modal-content card-4 modal-animate-top'},
    children: [headerWithClose(id, title, "modal-header font-xlarge"),
      {tag: 'div', attrs: {className: 'padding'}, children:[
        {tag: 'p', attrs: {className:'font-large',textContent:content}}]}]}).elem;
  if (footerContent && footerContent != ""){ modalContent.appendChild(createFooter(footerContent)) }
  makeDocumentModal(id, modalContent)
}

function changeLang(language) {
  lang = language
  setButtonText('contactButton', '#contact');
  setButtonText('aboutButton', '#about');
  createAddress(lang);
  document.querySelectorAll('.modal').forEach(modal => modal.remove());
  if (lang==="en") {
    modalDataEN.forEach(function(modal) {createModal(modal.id, modal.title, modal.content, modal.footerContent)});
  } else if (lang==="fi") {
    modalDataFI.forEach(function(modal) {createModal(modal.id, modal.title, modal.content, modal.footerContent)});
  }
}

function createLangButtons() {
  const buttonContainer = document.getElementById('button-container');
  // Image URLs (replace with your actual image paths)
  const images = [
    { src: 'src/img/en.png', lang: 'en' },
    { src: 'src/img/fi.png', lang: 'fi' }
  ];
  images.forEach((imgSrc, index) => {
    let button = new Elem({tag:'button', attrs: {className: 'lang-btns',onclick:()=>changeLang(imgSrc.lang)}, children:[
      {tag: 'img', attrs: {className:'lang-btns-img', src: imgSrc.src}}], parent: buttonContainer}).elem;
    button.style.right = `${index * 50}px`;
  });
}

function genContent(parentELement, content) {
  if (typeof content === 'string') {
    new Elem({tag: 'p', attrs: {className: 'font-large',textContent: content}, parent: parentELement});
  } else if (typeof content === 'object') { 
    console.log(content)
    for (const [key, value] of Object.entries(content)) { 
      new Elem({tag: 'p', attrs: {className: 'font-large',textContent: value}, parent: parentELement});
    } 
  } else {console.error(`Content generation error to ${parentELement}`);}
}

function createAddress(lang) {
  let adressElem = document.getElementById('addressDIV')
  adressElem.innerHTML = ''
  if (lang === "en") {
    genContent(adressElem, infoBoxEN);
  } else if (lang === "fi") {
    genContent(adressElem, infoBoxFI)
  }
}

document.addEventListener('DOMContentLoaded', function() { 
  createLangButtons();
  changeLang(lang);
  /* REMOVE */
  document.getElementById('unfinished_modal').style.display='block'
  /* REMOVE */
});

function getText(identifier, lang) {
  if (lang==="en") {
    return textsEN[identifier] || 'Default Text, ERROR';
  } else if (lang==="fi") {
    return textsFI[identifier] || 'Default Text, ERROR';
  }
}

function setButtonText(buttonId, textIdentifier) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.textContent = getText(textIdentifier, lang);
  } else {
    console.error(`Button with ID ${buttonId} not found.`);
  }
}