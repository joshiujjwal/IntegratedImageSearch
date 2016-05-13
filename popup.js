// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, we will take input from user!
 *
 * @type {string}
 */
var QUERY ;
 	
document.getElementById("searchbtn").addEventListener("click", searchFunction);

$("#mySearch").keyup(function(event){
    if(event.keyCode == 13){
        searchFunction();
    }
});




	function searchFunction() {
		
		var QUERY =  document.getElementById("mySearch").value;
		
		//=======START====================== Flickr Image search ============================= //
		var flickrimgGenerator = {
		
	
	/**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=17e8b2cdd72776c0cdde964bed84e399&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=25',

  /**
   * Sends an XHR GET request to grab photos. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestImage: function() {
	var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our Image XHR request, generated in
   * 'requestImage', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
	
    var image = e.target.responseXML.querySelectorAll('photo');
	for (var i = 0; i < image.length; i++) {
	 var img = document.createElement('img');
      img.src = this.constructImageURL_(image[i]);
      img.setAttribute('alt', image[i].getAttribute('title'));
	  var img_flickr = document.createElement('div');
	  img_flickr.setAttribute('class' ,'row');
	  var img_flickr_col = document.createElement('div');
	  img_flickr_col.setAttribute('class','col-xs-4 col-md-2 ');
	  var img_flickr_link = document.createElement('a');
	  img_flickr_link.setAttribute('class' ,'thumbnail');
	  img_flickr.appendChild(img_flickr_col);
	  img_flickr_col.appendChild(img_flickr_link);
	  img_flickr_link.appendChild(img);
	  document.getElementById("imgContainer_Flickr").appendChild(img_flickr_col);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlImagel
   *
   * @param {DOMElement} An Image.
   * @return {string} The image's URL.
   * @private
   */
  constructImageURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
		
		
  }
}; 
		//========END===================== Flickr Image search ============================= //
				
		//=========START==================== Getty Image search ============================= //
		
		function gettyimgGenerator() {
		var apiKey = 'fvdhug9rx6xe6p7h9jyvffw5';
		
		$.ajax(
    {
        type:'GET',
        url:"https://api.gettyimages.com/v3/search/images/creative?phrase="+ QUERY,
         beforeSend: function (request)
            {
                request.setRequestHeader("Api-Key", apiKey);
            }})
    .done(function(data){
        //console.log("Success with data" + data)
        for(var i = 0;i<data.images.length;i++)
        {
			var $img_getty = $("<div ></div>");
							
		$img_getty.append("<div class='col-xs-6'> <a href=# class='thumbnail'><img src='" + data.images[i].display_sizes[0].uri + "'/> </a></div>");
							
										
			
           $("#imgContainer_Getty").append($img_getty);
        }
    })
    .fail(function(data){
        alert(JSON.stringify(data,2))
    });
	
		}
		//=========END==================== Getty Image search ============================= //
		
		//=========START==================== Bing Image search=============
		
		
		function bingimgGenerator(){
			
			
		$.ajax({
		url: 'http://ujjwaljoshi.com/projects/ext/bing_basic.php',
		type: 'GET',
		data: { query: QUERY},
		datatype: 'JSON',
		success: function(response) {
						
												
							var $img_bing = $("<div class='row' ></div>");
							
							$img_bing.append(response);
							
							$('#imgContainer_Bing').html($img_bing);
						
						
				
		}
		
		});
			
			
		}
		
		
		
		//=========END==================== Bing Image search===========
		
		
		
		// Call img function 
		
		var isFlickr = $('#flickr').prop('checked');
		var isGetty = $('#getty').prop('checked');
		var isBing = $('#bing').prop('checked');
		if(!(isFlickr || isGetty || isBing)) { 
		alert("Please select any one option to view search results.");
		} else {
		if(isFlickr) { document.getElementById("imgContainer_Flickr").innerHTML = ""; flickrimgGenerator.requestImage();}else {document.getElementById("imgContainer_Flickr").innerHTML = "";}
		if(isGetty){ document.getElementById("imgContainer_Getty").innerHTML = ""; gettyimgGenerator(); }else {document.getElementById("imgContainer_Getty").innerHTML = "";}
		if(isBing) {document.getElementById("imgContainer_Bing").innerHTML = ""; bingimgGenerator(); }else {document.getElementById("imgContainer_Bing").innerHTML = "";}
   
  }
		
		
		
		
	 
	}



