!function(e,t){function r(e){return plupload.translate(e)||e}function i(t,n){n.contents().each(function(t,n){n=e(n),n.is(".plupload")||n.remove()}),n.prepend('<div class="plupload_wrapper plupload_scroll"><div id="'+t+'_container" class="plupload_container"><div class="plupload"><div class="plupload_header"><div class="plupload_header_content"><div class="plupload_header_title">'+r("Select files")+'</div><div class="plupload_header_text">'+r("Add files to the upload queue and click the start button.")+'</div></div></div><div class="plupload_content"><div class="plupload_filelist_header"><div class="plupload_file_name">'+r("Filename")+'</div><div class="plupload_file_action">&nbsp;</div><div class="plupload_file_status"><span>'+r("Status")+'</span></div><div class="plupload_file_size">'+r("Size")+'</div><div class="plupload_clearer">&nbsp;</div></div><ul id="'+t+'_filelist" class="plupload_filelist"></ul><div class="plupload_filelist_footer"><div class="plupload_file_name"><div class="plupload_buttons"><a href="#" class="plupload_button plupload_add" id="'+t+'_browse">'+r("Add Files")+'</a><a href="#" class="plupload_button plupload_start">'+r("Start Upload")+'</a></div><span class="plupload_upload_status"></span></div><div class="plupload_file_action"></div><div class="plupload_file_status"><span class="plupload_total_status">0%</span></div><div class="plupload_file_size"><span class="plupload_total_file_size">0 b</span></div><div class="plupload_progress"><div class="plupload_progress_container"><div class="plupload_progress_bar"></div></div></div><div class="plupload_clearer">&nbsp;</div></div></div></div></div><input type="hidden" id="'+t+'_count" name="'+t+'_count" value="0" /></div>')}var n={};e.fn.pluploadQueue=function(s){return s?(this.each(function(){function a(t){var n;t.status==plupload.DONE&&(n="plupload_done"),t.status==plupload.FAILED&&(n="plupload_failed"),t.status==plupload.QUEUED&&(n="plupload_delete"),t.status==plupload.UPLOADING&&(n="plupload_uploading");var r=e("#"+t.id).attr("class",n).find("a").css("display","block");t.hint&&r.attr("title",t.hint)}function _(){e("span.plupload_total_status",c).html(u.total.percent+"%"),e("div.plupload_progress_bar",c).css("width",u.total.percent+"%"),e("span.plupload_upload_status",c).html(t.sprintf(r("Uploaded %d/%d files"),u.total.uploaded,u.files.length))}function p(){var s,n=e("ul.plupload_filelist",c).html(""),i=0;e.each(u.files,function(t,r){s="",r.status==plupload.DONE&&(r.target_name&&(s+='<input type="hidden" name="'+f+"_"+i+'_tmpname" value="'+plupload.xmlEncode(r.target_name)+'" />'),s+='<input type="hidden" name="'+f+"_"+i+'_name" value="'+plupload.xmlEncode(r.name)+'" />',s+='<input type="hidden" name="'+f+"_"+i+'_status" value="'+(r.status==plupload.DONE?"done":"failed")+'" />',i++,e("#"+f+"_count").val(i)),n.append('<li id="'+r.id+'"><div class="plupload_file_name"><span>'+r.name+'</span></div><div class="plupload_file_action"><a href="#"></a></div><div class="plupload_file_status">'+r.percent+'%</div><div class="plupload_file_size">'+plupload.formatSize(r.size)+'</div><div class="plupload_clearer">&nbsp;</div>'+s+"</li>"),a(r),e("#"+r.id+".plupload_delete a").click(function(t){e("#"+r.id).remove(),u.removeFile(r),t.preventDefault()})}),e("span.plupload_total_file_size",c).html(plupload.formatSize(u.total.size)),e("span.plupload_add_text",c).html(0===u.total.queued?r("Add Files"):t.sprintf(r("%d files queued"),u.total.queued)),e("a.plupload_start",c).toggleClass("plupload_disabled",u.files.length==u.total.uploaded+u.total.failed),n[0].scrollTop=n[0].scrollHeight,_(),!u.files.length&&u.features.dragdrop&&u.settings.dragdrop&&e("#"+f+"_filelist").append('<li class="plupload_droptext">'+r("Drag files here.")+"</li>")}function d(){delete n[f],u.destroy(),c.html(l),u=c=l=null}var u,c,f,l;c=e(this),f=c.attr("id"),f||(f=plupload.guid(),c.attr("id",f)),l=c.html(),i(f,c),s=e.extend({dragdrop:!0,browse_button:f+"_browse",container:f},s),s.dragdrop&&(s.drop_element=f+"_filelist"),u=new plupload.Uploader(s),n[f]=u,u.bind("UploadFile",function(t,n){e("#"+n.id).addClass("plupload_current_file")}),u.bind("Init",function(t,n){!s.unique_names&&s.rename&&c.on("click","#"+f+"_filelist div.plupload_file_name span",function(n){var i,s,o,r=e(n.target),u="";i=t.getFile(r.parents("li")[0].id),o=i.name,s=/^(.+)(\.[^.]+)$/.exec(o),s&&(o=s[1],u=s[2]),r.hide().after('<input type="text" />'),r.next().val(o).focus().blur(function(){r.show().next().remove()}).keydown(function(t){var n=e(this);13==t.keyCode&&(t.preventDefault(),i.name=n.val()+u,r.html(i.name),n.blur())})}),e("#"+f+"_container").attr("title","Using runtime: "+n.runtime),e("a.plupload_start",c).click(function(t){e(this).hasClass("plupload_disabled")||u.start(),t.preventDefault()}),e("a.plupload_stop",c).click(function(e){e.preventDefault(),u.stop()}),e("a.plupload_start",c).addClass("plupload_disabled")}),u.bind("Error",function(t,n){var s,i=n.file;i&&(s=n.message,n.details&&(s+=" ("+n.details+")"),n.code==plupload.FILE_SIZE_ERROR&&alert(r("Error: File too large:")+" "+i.name),n.code==plupload.FILE_EXTENSION_ERROR&&alert(r("Error: Invalid file extension:")+" "+i.name),i.hint=s,e("#"+i.id).attr("class","plupload_failed").find("a").css("display","block").attr("title",s)),n.code===plupload.INIT_ERROR&&setTimeout(function(){d()},1)}),u.bind("PostInit",function(t){t.settings.dragdrop&&t.features.dragdrop&&e("#"+f+"_filelist").append('<li class="plupload_droptext">'+r("Drag files here.")+"</li>")}),u.init(),u.bind("StateChanged",function(){u.state===plupload.STARTED?(e("li.plupload_delete a,div.plupload_buttons",c).hide(),u.disableBrowse(!0),e("span.plupload_upload_status,div.plupload_progress,a.plupload_stop",c).css("display","block"),e("span.plupload_upload_status",c).html("Uploaded "+u.total.uploaded+"/"+u.files.length+" files"),s.multiple_queues&&e("span.plupload_total_status,span.plupload_total_file_size",c).show()):(p(),e("a.plupload_stop,div.plupload_progress",c).hide(),e("a.plupload_delete",c).css("display","block"),s.multiple_queues&&u.total.uploaded+u.total.failed==u.files.length&&(e(".plupload_buttons,.plupload_upload_status",c).css("display","inline"),u.disableBrowse(!1),e(".plupload_start",c).addClass("plupload_disabled"),e("span.plupload_total_status,span.plupload_total_file_size",c).hide()))}),u.bind("FilesAdded",p),u.bind("FilesRemoved",function(){var t=e("#"+f+"_filelist").scrollTop();p(),e("#"+f+"_filelist").scrollTop(t)}),u.bind("FileUploaded",function(e,t){a(t)}),u.bind("UploadProgress",function(t,n){e("#"+n.id+" div.plupload_file_status",c).html(n.percent+"%"),a(n),_()}),s.setup&&s.setup(u)}),this):n[e(this[0]).attr("id")]}}(jQuery,mOxie);