let isString = value => typeof value === 'string';

let lang = "en"
let currentTab = "tabOne"
var slideIndex = 1;

function info_open(id) {document.getElementById(id).style.display = "block"}
function info_close(id) {document.getElementById(id).style.display = "none"}
function openInNewTab(url) {window.open(url, '_blank').focus()}

function closeElem(id, event, elem) { // Close if click outside of modal                     
  if (event.target.classList.contains(elem)) { info_close(id)}
}

function makeDocumentModal(id, content) {
  new Elem({tag: 'div', attrs: {className: 'modal',id:id, onmousedown: function(event) {
    closeElem(id, event, 'modal')}}, children:[content], parent:document.body});
}

function headerWithClose(id, title, style) {
  return new Elem({tag:'header',attrs:{className:`theme-header padding-3 ${style}`},children:[
    {tag:'p',attrs:{textContent:title}},
    {tag:'div',attrs:{className:'button display-topright dark-green', onclick:()=>info_close(id)},children:[
      { tag: 'span', attrs: { className:'bold', textContent: 'X' } }]}]}).elem;
}

function createFooter(content) {
  const footer = new Elem({tag: 'footer', attrs: {className: 'theme-header modal-footer font-medium'}}).elem;
  if (typeof content === 'object' && !(content instanceof Array)) {
    for (const key in content) { // If footerContent is an object (not an array), handle as key-value pairs for links
      new Elem({tag: 'p', attrs: {className: 'font-medium'}, children:[
        {tag:'a',attrs:{className:'button padding-top-bottom dark-green',textContent: key,
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
      tag: 'div', attrs: { className: 'modal-content theme-bg card-4 modal-animate-top' },
      children: [
        headerWithClose(id, title, "modal-header font-xlarge"),
        {tag: 'form', attrs: { className: 'contact-form padding-3 font-weight-large' }, children: [
          {tag: 'div', attrs: { className: "font-xlarge", textContent: "Currently not functional!" } },
          {tag: 'div', attrs: { className: 'form-row' }, children: [
            {tag: 'input', attrs: { type: "text", id: 'fName', name: "fName", placeholder: getText('#fName', lang) + "*", required: true, className: 'form-input' } },
            {tag: 'input', attrs: { type: "text", id: 'lName', name: "lName", placeholder: getText('#lName', lang) + "*", required: true, className: 'form-input' } },]
          },
          {tag: 'div', attrs: { className: 'form-row' }, children: [
            { tag: 'input', attrs: { type: "email", id: 'email', name: "email", placeholder: getText('#email', lang) + "*", required: true, className: 'form-input' } },
            { tag: 'input', attrs: { type: "number", id: 'phone', name: "phone", placeholder: getText('#phoneNum', lang), className: 'form-input', inputmode: 'numeric', 
              onkeydown: 'if(event.key==="."){event.preventDefault();}'} },]
          },
          {tag: 'div', attrs: { className: 'form-row' }, children: [
            { tag: 'input', attrs: { type: "text", id: 'company', name: "company", placeholder: getText('#company', lang), className: 'form-input' } },]
          },
          {tag: 'textarea', attrs: { id: 'message', name: "message", placeholder: getText('#message', lang) + "*", required: true, className: 'form-textarea', rows: 12 } },
          {tag: 'p', attrs: { className: 'font-weight-large', textContent: getText('#contactBy', lang) } },
          {tag: 'div', attrs: { className: 'form-row-radio font-large' }, children: [
            {tag: 'label', attrs: { for: "byEmail", textContent: getText('#email', lang), className: 'form-label' } },
            {tag: 'input', attrs: { type: "radio", id: 'byEmail', name: "contactBy", className: 'form-radio', checked: true } },
            {tag: 'label', attrs: { for: "byPhone", textContent: getText('#phone', lang), className: 'form-label' } },
            {tag: 'input', attrs: { type: "radio", id: 'byPhone', name: "contactBy", className: 'form-radio' } },]
          },
          {tag: 'input', attrs: { type: "submit", className: "button dark-green" , value: getText('#submitButton', lang)}}
          ]
        }
      ]
    }).elem;
  } else {
    modalContent = new Elem({tag:'div',attrs:{className: 'modal-content theme-bg card-4 modal-animate-top'},
      children: [headerWithClose(id, title, "modal-header font-xlarge"),
        {tag: 'div', attrs: {className: 'padding'}, children:[
          {tag: 'p', attrs: {className:'font-large',textContent:content}}]}]}).elem;
    if (footerContent && footerContent != ""){ modalContent.appendChild(createFooter(footerContent)) }
  }
  makeDocumentModal(id, modalContent)
}

function changeLang(language) {
  lang = language // used in createModal!
  createNav(language)
  changeTab(currentTab, true)
  footerContents(language)
  document.querySelectorAll('.modal').forEach(modal => modal.remove());
  if (language==="en") {
    modalDataEN.forEach(function(modal) {createModal(modal.id, modal.title, modal.content, modal.footerContent)});
  } else if (language==="fi") {
    modalDataFI.forEach(function(modal) {createModal(modal.id, modal.title, modal.content, modal.footerContent)});
  }

}

function footerContents(lang) {
  let footer = document.getElementById('footer')
  footer.innerHTML = ''
  new Elem({ tag: 'div', attrs: { className: 'footer-container user-select-none padding-2-lb' }, children: [
    new Elem({ tag: 'div', attrs: { className: 'footer-left' }, children: [
      { tag: 'p', attrs: { className: 'font-large font-weight-smaller padding-top-bottom', textContent: getText('#info1', lang) } },
      { tag: 'p', attrs: { className: 'font-large font-weight-smaller padding-top-bottom', textContent: getText('#info2', lang) } },
      { tag: 'p', attrs: { className: 'font-large font-weight-smaller padding-top-bottom', textContent: getText('#info3', lang) } }
    ]}),
    new Elem({tag: 'div', attrs: { className: 'footer-section' }, children: [
      { tag: 'div', attrs: { className: 'button font-xlarge dark-green button-margin box-shadow', textContent: getText('#contactBTN', lang), onclick: () => info_open('contact_modal') } },
      { tag: 'div', attrs: { className: 'button font-xlarge dark-green button-margin box-shadow', textContent: getText('#aboutBTN', lang), onclick: () => info_open('about_modal') } }
    ]}),
    new Elem({tag: 'div', attrs: { className: 'footer-right' }, children: [
      { tag: 'p', attrs: { className: 'font-large', innerHTML: '&copy; 2024 Paceville Oy. All rights reserved.' } }
    ]})
  ], parent: footer});
}

// Function to create the "back to top" button
function createBackToTopButton() {
  if (!document.querySelector('.topBtn')) {
    new Elem({tag: 'div', attrs: {className: 'button font-xxlarge dark-green corner-all btn-container2 box-shadow topBtn',
    onclick: () => window.scrollTo({top: 0, behavior: 'smooth'})}, children:[
      {tag: 'div', attrs: {innerHTML: '&mapstoup;'}}], parent:document.body});
  }
}

// Function to remove the "back to top" button
function removeBackToTopButton() {
  const button = document.querySelector('.topBtn');
  if (button) {
    button.remove();
  }
}

// Function to check the scroll position and conditionally create/remove the button
function checkScroll() {
  if (window.scrollY > 0) {
    createBackToTopButton();
  } else {
    removeBackToTopButton();
  }
}

function createLangButtons() {
  const buttonContainer = document.getElementById('button-container');
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

function createNav(lang) {
  let navElem = document.getElementById('navbar')
  navElem.innerHTML = ''
  let tabs = getText('tabs', lang)
  for (const [key, value] of Object.entries(tabs)) {
    new Elem({tag: 'button', attrs: {id: key, className: 'button font-large dark-green font-weight-medium padding-3 corner-top', textContent: value, onclick:()=>changeTab(key)}, parent: navElem});
  }
}

function arrows() {
  let rArrow = new Elem({tag: 'div', attrs: {className: "button dark-green font-xxxlarge arrows-right corner-all btn-container2 box-shadow", onclick:()=>plusDivs(+1)}, children:[
    {tag: 'div', attrs: {innerHTML: '&rarr;'}}]}).elem
  let lArrow = new Elem({tag: 'div', attrs: {className: "button dark-green font-xxxlarge arrows-left corner-all btn-container2 box-shadow", onclick:()=>plusDivs(-1)}, children:[
    {tag: 'div', attrs: {innerHTML: '&larr;'}}]}).elem
  return  {lArrow, rArrow}
}

function changeTab(tab, init) {
  if (currentTab === tab && !init) {return}

  document.getElementById(currentTab).className = "button corner-top font-large font-weight-medium dark-green padding-3"
  currentTab = tab
  document.getElementById(currentTab).className = "button corner-top font-large font-weight-medium theme-bg contrastbtn padding-3"
  
  var tabs = document.getElementsByClassName("navbar");
  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = ''
  const { lArrow, rArrow } = arrows();

  if (currentTab === "tabOne") {
    new Elem({tag: 'img', attrs: {className: "centerimg",src: "src/img/contentIMG/image_2.jpeg"}, parent: contentContainer});
  } else if (currentTab === "tabTwo") {
    new Elem({tag: 'div', attrs: {className: "centerimg"}, children:[
      {tag: 'iframe', attrs: {className: "pdf", src: "src/img/products/Catalogue of UFO POWER 20231115.pdf"}}
    ], parent: contentContainer});
  } else if (currentTab === "tabThree") {
    slideIndex = 1
    new Elem({tag: 'div', attrs: {className: "centerimg"}, children:[lArrow, rArrow,
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/PPower/PPower51-2V200AH-320.png"}},
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/PPower/PPower51-2V200AH-325.png"}},
    ], parent: contentContainer});
    showDivs(1);
  } else if (currentTab === "tabFour") {
    slideIndex = 1
    new Elem({tag: 'div', attrs: {className: "centerimg"}, children:[lArrow, rArrow,
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/G POWER-B/GPOWER140.png"}},
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/G POWER-B/GPOWER137.png"}},
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/G POWER-B/GPOWER142.png"}},
      {tag: 'div', attrs: {className: "mySlides centercontent user-select-text"}, children:[
        { tag: 'h1', attrs: { innerText: 'GPOWER-B Low Voltage Stackable System' } },
        { tag: 'ul', children: [
          { tag: 'li', attrs: { innerText: 'Available kWh: 5.12kWh, 10.24kWh, 15.36kWh, 20.48kWh' } },
          { tag: 'li', attrs: { innerText: 'Suitable for both off-grid and hybrid inverters and protocol match well.' } },
          { tag: 'li', attrs: { innerText: 'Communication port: RS232/RS485/CAN' } },
          { tag: 'li', attrs: { innerText: 'Energy storage SAAS unified platform available, OTA upgrading and other maintenance function' } },
          { tag: 'li', attrs: { innerText: 'Bluetooth/WIFI remotely monitoring system' } },
          { tag: 'li', attrs: { innerText: 'Faulty battery module auto isolates to keep system operating Plug and play' } },
          { tag: 'li', attrs: { innerText: 'Elegant design, IP65' } },
          { tag: 'li', attrs: { innerText: 'Multi-level software and hardware protection' } },
          { tag: 'li', attrs: { innerText: 'Cycles: More than 6000 cycle life with 80% DOD' } },
          { tag: 'li', attrs: { innerText: 'Design Life >10 years @25℃' } },
          { tag: 'li', attrs: { innerText: 'Certificates: Comply with IEC62619, TUV, ROHS, UN38.3, CEI, VDE, MSDS, CE Standard.' } },
        ]}
      ]}
    ], parent: contentContainer});
    showDivs(1);
  }
  else if (currentTab === "tabFive") {
    slideIndex = 1
    new Elem({tag: 'div', attrs: {className: "centerimg"}, children:[lArrow, rArrow,
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/UApower/APower.296.png"}},
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/UApower/APower.299.png"}},
      {tag: 'img', attrs: {className: "mySlides img-max",src: "src/img/products/UApower/APower.301.png"}},
      {tag: 'iframe', attrs: {className: "mySlides pdf", src: "src/img/products/UApower/UApower wall 48v 15s powerwall battery pack V2-0.pdf"}}
    ], parent: contentContainer});
    showDivs(1);
  }
}

// Slideshows
function plusDivs(n) {
  slideIndex = slideIndex + n;
  showDivs(slideIndex);
}

function showDivs(n) {
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

window.addEventListener('scroll', checkScroll);

document.addEventListener('DOMContentLoaded', function() { 
  createLangButtons();
  changeLang(lang);
  checkScroll();

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
