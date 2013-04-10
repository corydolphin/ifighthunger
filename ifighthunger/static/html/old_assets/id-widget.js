//jQuery.noConflict();
jQuery(document).ready(function(e) {
	
	jQuery('.product-dashed-heading').click(function () {
		jQuery('#prodfaq').slideToggle('fast', function () {
			if (jQuery('.product-dashed-heading').children('.sign').html() == "+")
				jQuery('.product-dashed-heading').children('.sign').html('-');
			else
				jQuery('.product-dashed-heading').children('.sign').html('+');
		});
		
		
		//jQuery(this).hide('1000');
		//jQuery('.show_product-dashed-heading').show();
		
	});
	
	jQuery('.product-dashed-heading1').click(function () {		
		jQuery('#produpdates').slideToggle('fast', function () {
			if (jQuery('.product-dashed-heading1').children('.sign').html() == "+")
				jQuery('.product-dashed-heading1').children('.sign').html('-');
			else
				jQuery('.product-dashed-heading1').children('.sign').html('+');
		});
		
	});
	
	jQuery('.product-dashed-heading2').click(function () {
		jQuery('#prodbuyers').slideToggle('fast', function () {
			if (jQuery('.product-dashed-heading2').children('.sign').html() == "+")
				jQuery('.product-dashed-heading2').children('.sign').html('-');
			else
				jQuery('.product-dashed-heading2').children('.sign').html('+');
		});
	});
	
	jQuery('#level_select').change(function () {
		var price = jQuery(this).find(':selected').attr('price');
		//alert(price);
		jQuery('input[name="price"]').val(price);
		jQuery('.preorder-form-product-price').html(price);
	});

	jQuery('#level_select').change(function() {
		var desc = jQuery(this).find(':selected').attr('desc');
		//alert(desc);
		jQuery('input[name="desc"]').val(desc);
		jQuery('.id-checkout-level-desc').html(desc);
	});

});

function get_levels(main_url) {
	jQuery.ajax({
		type: "POST",
		url: main_url+'/wp-admin/admin-ajax.php',
		data: "action=" + 'get_product_levels'
			+ "&product_id=" + jQuery('#product_id').val()
		,
		success: function(html) {						
			//alert(jQuery.trim(html));
			jQuery('#product_level').html(jQuery.trim(html));
		}
	});
};

function generateEmbedCode(site_url) {
	product_number = document.getElementById('product_number').value;
	document.getElementById('embed_code').innerHTML = '<iframe frameBorder="0" scrolling="no" src="'+site_url+'/?ig_embed_widget=1&product_no='+product_number+'" width="214" height="366"></iframe>';
};

src="http://platform.twitter.com/widgets.js">

jQuery(document).ready(function() {
    /*jQuery('.id-widget .main-btn').fancybox();*/
	//jQuery('.id-ask-link').fancybox();
});
(function(d, s, id) {
	
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#appId=185394331531225&xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//alert('hi');
/*jQuery(document).ready(function(e) {
	alert("hi");
	jQuery('.product-dashed-heading').click(function () {
		
		
		jQuery('#prodfaq').hide('1000');
		
		jQuery(this).hide('1000');
		jQuery('.show_product-dashed-heading').show();
		
	});
	
	
	jQuery('.show_product-dashed-heading').click(function () {
		jQuery('#prodfaq').show('1000');
		jQuery(this).hide('1000');
		jQuery('.product-dashed-heading').show();
	});
	
	jQuery('.product-dashed-heading1').click(function () {
		
		jQuery(this).hide('1000');
		jQuery('.show_product-dashed-heading1').show('1000');
		
	});
	
	jQuery('.show_product-dashed-heading1').click(function () {
		
		jQuery(this).hide('1000');
		jQuery('.product-dashed-heading1').show('1000');
		
	});
	
	jQuery('.product-dashed-heading2').click(function () {
		
		jQuery(this).hide('1000');
		jQuery('.show_product-dashed-heading2').show('1000');
		
	});
	
	jQuery('.show_product-dashed-heading2').click(function () {
		
		jQuery(this).hide('1000');
		jQuery('.product-dashed-heading2').show('1000');
		
	});
});*/