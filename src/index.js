let isString = value => typeof value === 'string';

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
    {tag:'div',attrs:{className:'button display-topright',onclick:()=>info_close(id)},children:[
      {tag:'i',attrs:{className:'fa fa-remove'}}]}]}).elem;
}

function createFooter(content) {
  const footer = new Elem({tag: 'footer', attrs: {className: 'theme-l1 modal-footer font-medium'}}).elem;
  if (typeof content === 'object' && !(content instanceof Array)) {
    for (const key in content) { // If footerContent is an object (not an array), handle as key-value pairs for links
      new Elem({tag: 'p', attrs: {className: 'font-medium'}, children:[
        {tag:'a',attrs:{className:'button padding-top-bottom',textContent: key,
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

function createLangButtons() {
  const buttonContainer = document.getElementById('button-container');
  // Image URLs (replace with your actual image paths)
  const images = [
    'src/img/en.png',
    'src/img/fi.png'
  ];
  images.forEach((imgSrc, index) => {
    let button = new Elem({tag:'button',attrs:{className:`lang-btns`},children:[
      {tag:'img',attrs:{className:'cButton display-topright'}, src: imgSrc}], parent: buttonContainer}).elem;
    //button.style.left = `${index * -50}px`; // Adjust the position of each button
  });
}

document.addEventListener('DOMContentLoaded', function() { 
  modalData.forEach(function(modal) {createModal(modal.id, modal.title, modal.content, modal.footerContent)});
  createLangButtons();
  /* REMOVE */
  document.getElementById('unfinished_modal').style.display='block'
  /* REMOVE */
 });