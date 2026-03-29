function objetus(file) {
    xmlhttp              = false;
    this.requestFile     = file;
    this.encodeURIString = true;
    this.execute         = false;
    if(window.XMLHttpRequest) { 
        this.xmlhttp = new XMLHttpRequest();
        if(this.xmlhttp.overrideMimeType) {
			this.xmlhttp.overrideMimeType('text/xml');
        }
    } 
    else if(window.ActiveXObject) { // IE
        try {
            this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                this.xmlhttp = null;
            }
        }
        if(!this.xmlhttp && typeof XMLHttpRequest != 'undefined') {
            this.xmlhttp = new XMLHttpRequest();
            if (!this.xmlhttp){
                this.failed = true; 
            }
        } 
    }
    return this.xmlhttp ;
}

function web2pd(message) { 
	pagina = "web2pd.php";
    ajax    = objetus(pagina);
    
    if(message != ""){
        ajax.open("POST", pagina+"?value="+message,true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send(message);
    } else {
        ajax.send(null);
    }


} 
