// src/components/GTM.js
export default function TAGFOOTER() {
  return (
    <>
	
     
	
	<script
	dangerouslySetInnerHTML={{
	__html: `
	function INSERT_FUNCTION_NAME_HERE(){
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "https://tag.simpli.fi/sifitag/1b1b4113-f234-4312-aec9-3563eea748cd";
	document.getElementsByTagName('head')[0].appendChild(s);
	}
	`,
	}}
	/>	  

	
     

   
	    
      
    </>
	
	
  );
}



 


