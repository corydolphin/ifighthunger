//jQuery.noConflict();
function checkIgnitionDeckForm(formId){
    // temp
	//return false;
    
    //clear previous results
    jQuery('#'+ formId +' .required').removeClass('red-border');
    jQuery('#'+ formId +' .form-item-error-msg').remove();

    
    var result = true;
    jQuery('#'+ formId +' .required').each(function(){
        if(isEmpty(this)){
            jQuery(this).addClass('red-border');
            jQuery(this).after('<span class="form-item-error-msg"> required </span>');
            
            if(result){
               result= !result;
            }
        }
    });

    if(!isEmail(jQuery('#'+ formId +' .email').val())){
        jQuery('#'+ formId +' .email').addClass('red-border');
        jQuery('#'+ formId +' .email').after('<span class="form-item-error-msg"> invalid </span>');
        
        if(result){
           result= !result;
        }
    }
    return result;
}

function isEmpty(element){
    if(element.value == ''){
        return true;
    }
    return false;
}

function isEmail(email){
    var emailfilter=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
    return emailfilter.test(email);
}

var app = {
    log: function(mixed){
//        console.log(mixed);
    }
}

app.popupwindow = function(url, title, w, h){
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

//ONLOAD function to call after the window has been loaded
window.onload = function () {
	// FOR getting the project number, is called for the ignitiondeck-functions.php when Product
	// is changed in Add Post/Add Page page
	jQuery('#project_id_shortcodes').change(function () {
		jQuery.ajax({
			type: "POST",
			url: jQuery('.id-metabox-short-codes span[url]').attr('url'),
			data: "action=" + 'get_product_number'
			+ "&product_id=" + jQuery(this).val()
			,
			success: function(html) {						
				//alert(jQuery.trim(html));
				jQuery('.id-metabox-short-codes .shortcode-content span').html(jQuery.trim(html));
			}
		});
	});
	
	/*jQuery('.insert-project-link').fancybox({
		'width'				: '300px',
		'autoScale'			: false,
		'transitionIn'		: 'none',
		'transitionOut'		: 'none'
	});*/
	
	//================================================================================================
	// Add New Project page popup for inserting a Project URL
	//================================================================================================
	// For Add New Project page to fill the text box with a link of the post, page or ID project page
	
	jQuery('.post-link-filler').click(function () {
		var page_link = jQuery(this).attr('href');
		//alert("page_link: " + page_link);
		jQuery('[name=link-insert-box]').val(page_link);
		return false;
	});
	
	jQuery('#insert-project-link #search_page').keypress(function () {
		var ajax_url = jQuery('#insert-project-link span[url]').attr('url');
		jQuery.ajax({
			type: "POST",
			url: ajax_url,
			data: "action=" + 'get_pages_links'
			+ "&page_title=" + jQuery(this).val()
			,
			success: function(html) {						
				//alert(jQuery.trim(html));
				jQuery('#insert-project-link .pages-links').html(jQuery.trim(html));
				jQuery('.post-link-filler').click(function () {
					var page_link = jQuery(this).attr('href');
					jQuery('[name=link-insert-box]').val(page_link);
					return false;
				});
			}
		});
	});
	
	jQuery('#insert-project-link #btnTransferLink').click(function () {
		jQuery('.product-url-container').val(jQuery('#link-insert-box').val());
		jQuery.fancybox.close();
	});
	//================================================================================================
};
function storeurladdress() {
   	if(document.getElementById('select_pageurls').value == 'external_url')
   	{
	   	document.getElementById('insert_pro_link').style.display = 'block';
	   	document.getElementById('proj_url_cont').style.display = 'block';
	   	document.getElementById('proj_posts').style.display = 'none';
   	}
   	if(document.getElementById('select_pageurls').value == 'page_or_post')
   	{
	   	document.getElementById('proj_posts').style.display = 'block';
	   	document.getElementById('insert_pro_link').style.display = 'none';
	   	document.getElementById('proj_url_cont').style.display = 'none';
   	}
   	if(document.getElementById('select_pageurls').value == 'current_page')
	{
		document.getElementById('proj_posts').style.display = 'none';
	   	document.getElementById('insert_pro_link').style.display = 'none';
	   	document.getElementById('proj_url_cont').style.display = 'none';
	}
}

function storepurchaseurladdress() {
   	if(document.getElementById('select_purchase_pageurls').value == 'external_url')
   	{
	   	document.getElementById('insert_purchase_link').style.display = 'block';
	   	document.getElementById('purchase_url_cont').style.display = 'block';
	   	document.getElementById('purchase_posts').style.display = 'none';
   	}
   	if(document.getElementById('select_purchase_pageurls').value == 'page_or_post')
   	{
	   	document.getElementById('purchase_posts').style.display = 'block';
	   	document.getElementById('insert_purchase_link').style.display = 'none';
	   	document.getElementById('purchase_url_cont').style.display = 'none';
   	}
   	if(document.getElementById('select_purchase_pageurls').value == 'current_page')
	{
		document.getElementById('purchase_posts').style.display = 'none';
	   	document.getElementById('insert_purchase_link').style.display = 'none';
	   	document.getElementById('purchase_url_cont').style.display = 'none';
	}
}

function storetyurladdress()
{
   	if(document.getElementById('select_ty_pageurls').value == 'external_url')
   	{
	   	document.getElementById('insert_ty_link').style.display = 'block';
	   	document.getElementById('ty_url_cont').style.display = 'block';
	   	document.getElementById('ty_posts').style.display = 'none';
   	}
   	if(document.getElementById('select_ty_pageurls').value == 'page_or_post')
   	{
	   	document.getElementById('ty_posts').style.display = 'block';
	   	document.getElementById('insert_ty_link').style.display = 'none';
	   	document.getElementById('ty_url_cont').style.display = 'none';
   	}
   	if(document.getElementById('select_ty_pageurls').value == 'current_page')
	{
		document.getElementById('ty_posts').style.display = 'none';
	   	document.getElementById('insert_ty_link').style.display = 'none';
	   	document.getElementById('ty_url_cont').style.display = 'none';
	}
}

// Submit form function for Purchasing product
function submitPurchaseForm(ajax_url) {
	//var dgFlow = new PAYPAL.apps.DGFlow({ trigger: 'submitBtn' });
	//jQuery('#submitBtn').trigger('click');
	//return false;
	//jQuery('#btnPayKey').attr('style','background: url("../images/loading.gif") no-repeat scroll top right transparent;');
	jQuery('#btnPayKey').val('Processing Payment...');
	jQuery.ajax({
		type: "POST",
		url: ajax_url,
		data: "action=" + 'get_paypal_paykey'
		+ "&" + jQuery('#form_pay').serialize()
		,
		success: function(html) {						
			//alert(jQuery.trim(html));
			console.log(jQuery.trim(html));
			reply = jQuery.trim(html).split("|");
			if (reply[0] == "success") {
				console.log(reply[1]);
				//jQuery('#pay_form_embedded').attr("action",reply[2]);
				jQuery('#paykey').val(reply[1]);
				var dgFlow = new PAYPAL.apps.DGFlow({ trigger: 'submitBtn' });
				jQuery('#submitBtn').trigger('click');
			} else {
				console.log("Error: "+reply[1]);
				jQuery('#btnPayKey').val('Make Payment');
				jQuery('.message-container').html(	'<div class="notification error">' +
									'<a href="#" class="close-notification" title="Hide Notification" rel="tooltip">x</a>' +
									'<p><strong>Payment Error</strong> '+ reply[1] +'</p>' +
								'</div>');
				jQuery('.message-container').slideDown();
			}
		}
	});
	
	return false;
}