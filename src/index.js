let isString = value => typeof value === 'string';

let lang = "en"
let currentTab = "tabOne"

function info_open(id) {document.getElementById(id).style.display = "block"}
function info_close(id) {document.getElementById(id).style.display = "none"}
function openInNewTab(url) {window.open(url, '_blank').focus()}

function closeElem(id, event, elem) { // Close if click outside of modal                     
  if (event.target.classList.contains(elem)) { document.getElementById(id).style.display = 'none'}
}

function makeDocumentModal(id, content) {
  new Elem({tag: 'div', attrs: {className: 'modal',id:id, onmousedown: function(event) {
    closeElem(id, event, 'modal')}}, children:[content], parent:document.body});
}

function headerWithClose(id, title, style) {
  return new Elem({tag:'header',attrs:{className:`theme-l1 ${style}`},children:[
    {tag:'p',attrs:{textContent:title}},
    {tag:'div',attrs:{className:'button display-topright button-extra', onclick:()=>info_close(id)},children:[
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
  let modalContent;
  if (id === "contact_modal") {
    modalContent = new Elem({
      tag: 'div', attrs: { className: 'modal-content card-4 modal-animate-top' },
      children: [
        headerWithClose(id, title, "modal-header font-xlarge"),
        {
          tag: 'form', attrs: { className: 'contact-form padding-3' }, children: [
            { tag: 'div', attrs: { className: "font-xlarge", textContent: "Currently not functional!" } },
            {
              tag: 'div', attrs: { className: 'form-row' }, children: [
                { tag: 'input', attrs: { type: "text", id: 'fName', name: "fName", placeholder: getText('#fName') + "*", required: true, className: 'form-input' } },
                { tag: 'input', attrs: { type: "text", id: 'lName', name: "lName", placeholder: getText('#lName') + "*", required: true, className: 'form-input' } }
              ]
            },
            {
              tag: 'div', attrs: { className: 'form-row' }, children: [
                { tag: 'input', attrs: { type: "email", id: 'email', name: "email", placeholder: getText('#email') + "*", required: true, className: 'form-input' } },
                { tag: 'input', attrs: { type: "number", id: 'phone', name: "phone", placeholder: getText('#phoneNum'), className: 'form-input' } }
              ]
            },
            {
              tag: 'div', attrs: { className: 'form-row' }, children: [
                { tag: 'input', attrs: { type: "text", id: 'company', name: "company", placeholder: getText('#company'), className: 'form-input' } },
              ]
            },
            { tag: 'textarea', attrs: { id: 'message', name: "message", placeholder: getText('#message') + "*", required: true, className: 'form-textarea', rows: 12 } },
            { tag: 'p', attrs: { textContent: "Contact by:" } },
            {
              tag: 'div', attrs: { className: 'form-row' }, children: [
                { tag: 'label', attrs: { for: "byEmail", textContent: getText('#email'), className: 'form-label' } },
                { tag: 'input', attrs: { type: "radio", id: 'byEmail', name: "contactBy", className: 'form-radio', checked: true } },
                { tag: 'label', attrs: { for: "byPhone", textContent: getText('#phone'), className: 'form-label' } },
                { tag: 'input', attrs: { type: "radio", id: 'byPhone', name: "contactBy", className: 'form-radio' } },
              ]
            },
            { tag: 'input', attrs: { type: "submit", className: "button dark-green" } }
          ]
        }
      ]
    }).elem;
  } else {
    modalContent = new Elem({tag:'div',attrs:{className: 'modal-content card-4 modal-animate-top'},
      children: [headerWithClose(id, title, "modal-header font-xlarge"),
        {tag: 'div', attrs: {className: 'padding'}, children:[
          {tag: 'p', attrs: {className:'font-large',textContent:content}}]}]}).elem;
    if (footerContent && footerContent != ""){ modalContent.appendChild(createFooter(footerContent)) }
  }

  makeDocumentModal(id, modalContent)
}

function changeLang(language) {
  lang = language
  createNav(lang)
  changeTab(currentTab, true)
  setButtonText('contactButton', '#contactBTN');
  setButtonText('aboutButton', '#aboutBTN');
  createAddress(lang);
  document.querySelectorAll('.modal').forEach(modal => modal.remove());
  if (lang==="en") {
    modalDataEN.forEach(function(modal) {createModal(modal.id, modal.title, modal.content, modal.footerContent)});
  } else if (lang==="fi") {
    modalDataFI.forEach(function(modal) {createModal(modal.id, modal.title, modal.content, modal.footerContent)});
  }
}

function createContactForm() {
  
}

function createMainContent() {
  
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

function genContent(parentELement, content, tag, classList) {
  if (typeof content === 'string') {
    new Elem({tag: tag, attrs: {className: classList,textContent: content}, parent: parentELement});
  } else if (typeof content === 'object') { 
    for (const [key, value] of Object.entries(content)) { 
      if (tag === "button") {
        new Elem({tag: tag, attrs: {id: key, className: classList,textContent: value, onclick:()=>changeTab(key)}, parent: parentELement});
      }
      else {
        new Elem({tag: tag, attrs: {id: key, className: classList,textContent: value}, parent: parentELement});
      }
    } 
  } else {console.error(`Content generation error to ${parentELement}`);}
}

function createAddress(lang) {
  let adressElem = document.getElementById('addressDIV')
  adressElem.innerHTML = ''
  if (lang === "en") {
    genContent(adressElem, infoBoxEN, 'p', 'font-large');
  } else if (lang === "fi") {
    genContent(adressElem, infoBoxFI, 'p', 'font-large')
  }
}

function createNav(lang) {
  let navElem = document.getElementById('navbar')
  navElem.innerHTML = ''
  if (lang === "en") {
    genContent(navElem, tabsEN, 'button', 'button font-large dark-green padding-3');
  } else if (lang === "fi") {
    genContent(navElem, tabsFI, 'button', 'button font-large dark-green padding-3')
  }
}

function changeTab(tab, init) {
  if (currentTab === tab && !init) {return}
  document.getElementById(currentTab).className = "button font-large dark-green padding-3"
  currentTab = tab
  document.getElementById(currentTab).className = "button font-large dark-grey padding-3"
  var tabs = document.getElementsByClassName("navbar");
  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = ''
  if (currentTab === "tabOne") {
    new Elem({tag: 'img', attrs: {className: "centerimg",src: "src/img/contentIMG/image_2.jpeg"}, parent: contentContainer});
  } else if (currentTab === "tabTwo") {
    new Elem({tag: 'img', attrs: {className: "centerimg",src: "src/img/contentIMG/image_1.jpeg"}, parent: contentContainer});
  } else if (currentTab === "tabThree") {
    new Elem({tag: 'img', attrs: {className: "centerimg",src: "src/img/contentIMG/image_3.jpeg"}, parent: contentContainer});
  }
}

document.addEventListener('DOMContentLoaded', function() { 
  createLangButtons();
  changeLang(lang);

  /* REMOVE */
  document.getElementById('unfinished_modal').style.display='block'
  /* REMOVE */
});

function getText(identifier, lang=lang) {
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