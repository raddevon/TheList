// Detect local storage support
function supports_html5_storage(){try{return"localStorage"in window&&window.localStorage!==null}catch(e){return!1}};