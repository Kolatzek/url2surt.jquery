url2surt.jquery
===============

jquery plugin for converting of given URL to a SURT or SURT prefix and adding it to a form.

## Description

SURT (Sort-friendly URI Reordering Transform) is a spacial way to write url. A SURT prefix is very similar, but describes common parts of many possible urls. [SURT in Heritrix' glossar](http://crawler.archive.org/articles/user_manual/glossary.html)

This plugin takes a url from input field and converts it on click to SURT or surt prefix. After this the surt or surt prefix will be appended as a hidden input field into a html element (form or its child) wrapped with a span with visible url (given by user). A click on wrapper-span will remove span and hiddden input field.

## Configuration

Put one or more settings in an javascript data / object as usual.

* **sourceId**  
  id of input text element with url to convert into a surt / surt prefix. Default: *url*
* **destitationId**  
  id of form or form child to append wrapped surt input element to. Default: *surts*
* **surtClass**  
  name of the CSS class for the span/wrapper with the surt. Default: *urts*
* **asSurtPrefix**  
  should be converted to **SURT prefix**? If false, convert to **SURT**. Default: *false*
* **clickToDelteStr**  
  string with message like "on click this will be removed". Default: *Click to delete*
* **inputName**  
  value of name attribute for hidden input element(s) with surt / surt prefix. It will be an array! "**surt[]**". Default: *surt*

## Usage and examples

Include *jquery*, include *url2surt.jquery*, create a form. Put a text input field for url. Make two buttons: one for surt, one for surt prefix.

```html
<form id="heritrix">  
<div id="mysurts"></div>  
URL:  
<input type="text" id="url4surt"><br>  
<input type="button" id="url2surt" value="convert to surt">  
<input type="button" id="url2prefix" value="convert to surt prefix">  
</form>
```

```html
<script>  
$(document).ready(function(){  
	$("#url2surt").url2surt({destitationId: 'mysurts', sourceId: 'url4surt', surtClass: 'surt', clickToDelteStr: 'Single click to remove SURT.', inputName: 'surt_url'});  
	$("#url2prefix").url2surt({destitationId: 'mysurts', sourceId: 'url4surt', surtClass: 'surtprefix', clickToDelteStr: 'Single click to remove SURT prefix.', inputName: 'surt_prefix', asSurtPrefix: true});  
});  
</script>
```


## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).